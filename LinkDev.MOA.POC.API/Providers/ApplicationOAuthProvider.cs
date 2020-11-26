using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using LinkDev.MOA.POC.API.Models;
using System.Web.Configuration;
using System.Configuration;
using System.Web;
using LinkDev.MOA.POC.API.Common;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Linkdev.MOA.POC.BLL;
using LinkDev.MOA.POC.BLL.ProfileManagement;

namespace LinkDev.MOA.POC.API.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;
        bool isOldAuthenticationAllowed = bool.Parse(WebConfigurationManager.AppSettings["IsoldStyleAuthenticationAllowed"]);
        string BackAPIBaseURL = ConfigurationManager.AppSettings["BackAPIBaseURL"];
        string frontURL = ConfigurationManager.AppSettings["FrontURL"];

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }

        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            bool? isFrontEndLogin = false;
            bool? isOldPortalLogin = false;
            if (HttpContext.Current.Request.UrlReferrer?.ToString() != null)
            {
                isFrontEndLogin = HttpContext.Current.Request.UrlReferrer?.ToString().Contains(frontURL);
            }
            bool? isIamResponse = HttpContext.Current.Request.UrlReferrer?.ToString().Contains(BackAPIBaseURL);
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            ApiGenericResponse<bool> apiGenericResponse = new ApiGenericResponse<bool>() { };

            #region Update Identity Password Using Modon Old Password
            if (isOldAuthenticationAllowed && (bool)isFrontEndLogin)
            {
                var intialUser = userManager.FindByName(context.UserName);
                if (intialUser == null)
                {
                    apiGenericResponse.FriendlyResponseMessage = Linkdev.MOA.POC.BLL.ResourceFiles.Common.Common.INVAILD_USER;
                    apiGenericResponse.ResponseCode = 0;
                    var DataMessage = JsonConvert.SerializeObject(apiGenericResponse);
                    context.SetError(DataMessage);
                    return Task.FromResult(DataMessage);
                }
                else
                {
                    // check to update the password from ModonHashedPassowrd to the IdentityHashedPassword
                    if (intialUser.IsMigratedUser)
                    {
                        //// check here if context password already hashed (in case of login from old portal)
                        /// and compare with the current hashed password else compare salt password with hashed password
                        bool IsmatchedModonPass;
                        if (context.Password == intialUser.ModonHashedPassword)
                        {
                            IsmatchedModonPass = true;
                            isOldPortalLogin = true;
                        }
                        else
                            IsmatchedModonPass = BCrypt.Net.BCrypt.Verify(context.Password, intialUser.ModonHashedPassword);

                        if (IsmatchedModonPass)
                        {
                            if (!intialUser.IsPasswordUpdated)
                            {
                                var newHashedPassword = "";
                                //update the identity password with passowrd captured
                                if (!(bool)isOldPortalLogin)
                                    newHashedPassword = userManager.PasswordHasher.HashPassword(context.Password);
                                else
                                    newHashedPassword = context.Password;  // because password already hashed 

                                intialUser.PasswordHash = newHashedPassword;
                                intialUser.IsPasswordUpdated = true;
                                IdentityResult updatePassResult = userManager.Update(intialUser);
                                if (!updatePassResult.Succeeded)
                                {
                                    apiGenericResponse.FriendlyResponseMessage = Linkdev.MOA.POC.BLL.ResourceFiles.Common.Common.Password_Not_Updated;
                                    apiGenericResponse.ResponseCode = 0;
                                    var DataMessage = JsonConvert.SerializeObject(apiGenericResponse);
                                    context.SetError(DataMessage);
                                    return Task.FromResult(DataMessage);
                                }
                            }
                        }
                        else  // The password doesn't match with Modon Hashed Password
                        {
                            apiGenericResponse.FriendlyResponseMessage = Linkdev.MOA.POC.BLL.ResourceFiles.Common.Common.Incorrect_Password;
                            apiGenericResponse.ResponseCode = 0;
                            var DataMessage = JsonConvert.SerializeObject(apiGenericResponse);
                            context.SetError(DataMessage);
                            return Task.FromResult(DataMessage);
                        }

                    }
                }
            }
            #endregion

            #region GetAuthenticated
            ApplicationUser user = null;

            if ((bool)!isFrontEndLogin || (bool)isOldPortalLogin)// Comes From Backend or from old portal
            {
                user = userManager.FindByName(context.UserName);
            }
            else
            {
                user = userManager.Find(context.UserName, context.Password);
            }

            if (user == null)
            {
                apiGenericResponse.FriendlyResponseMessage = Linkdev.MOA.POC.BLL.ResourceFiles.Common.Common.INVAILD_USER;
                apiGenericResponse.ResponseCode = 0;

                var Data = JsonConvert.SerializeObject(apiGenericResponse);
                context.SetError(Data);
                return Task.FromResult<object>(Data);
            }
            if (!user.EmailConfirmed && !user.IsMigratedUser)
            {
                apiGenericResponse.FriendlyResponseMessage = "Email Not Confirmed";
                apiGenericResponse.ResponseCode = 0;
                var DataMessage = JsonConvert.SerializeObject(apiGenericResponse);
                context.SetError(DataMessage);
                return Task.FromResult(DataMessage);
            }

            ClaimsIdentity oAuthIdentity = user.GenerateUserIdentity(userManager,
               OAuthDefaults.AuthenticationType);
            ClaimsIdentity cookiesIdentity = user.GenerateUserIdentity(userManager,
                CookieAuthenticationDefaults.AuthenticationType);

            AuthenticationProperties properties = CreateProperties(user.UserName);
            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(cookiesIdentity);

            var externalAccessToken = userManager.GetClaims(user.Id);
            var httpContext = context.OwinContext.Get<HttpContextBase>(typeof(HttpContextBase).FullName);


            var userData = new UserDto()
            {
                UserName = user.UserName,
                Email = user.Email,
            };
            context.Ticket.Properties.Dictionary.Add("userData", JsonConvert.SerializeObject(userData, new JsonSerializerSettings() { ContractResolver = new CamelCasePropertyNamesContractResolver() }));
            return Task.FromResult<object>(null);
            #endregion

        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string userName)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName }
            };
            return new AuthenticationProperties(data);
        }

        public override Task TokenEndpointResponse(OAuthTokenEndpointResponseContext context)
        {
            var accessToken = context.AccessToken;
            try
            {
                MembershipHelpers.CreateUserSession(context.Identity.GetUserId(), accessToken);
                return Task.FromResult<object>(null);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}