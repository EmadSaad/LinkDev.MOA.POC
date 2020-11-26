using LinkDev.MOA.POC.DAL.MembershipIdentityDB;
using LinkDev.MOA.POC.Models.CustomModels.ProfileManagement;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace LinkDev.MOA.POC.BLL.ProfileManagement
{
    public static class MembershipHelpers
    {
        public static void SaveUserActivationToken(string UserId, string ActivationToken, DateTime ExpirationDate)
        {
            try
            {
                using (var context = new MODON_IdentityMembershipEntities())
                {
                    AspNetUser userRetrieved = context.AspNetUsers.FirstOrDefault<AspNetUser>(user => user.Id == UserId);
                    userRetrieved.Id = UserId;
                    userRetrieved.ActivationToken = ActivationToken;
                    userRetrieved.ActivationExpirationDate = ExpirationDate;
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static void SaveUserForgetToken(string UserId, string ForgetToken, DateTime ExpirationDate)
        {
            try
            {
                using (var context = new MODON_IdentityMembershipEntities())
                {
                    AspNetUser userRetrieved = context.AspNetUsers.FirstOrDefault<AspNetUser>(user => user.Id == UserId);
                    userRetrieved.Id = UserId;
                    userRetrieved.ForgetToken = ForgetToken;
                    userRetrieved.ForgetExpirationDat = ExpirationDate;
                    context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static bool UpdateUserEmailConfirmed(string UserId, bool IsEmailConfirmed)
        {
            try
            {
                using (var context = new MODON_IdentityMembershipEntities())
                {
                    AspNetUser userRetrieved = context.AspNetUsers.FirstOrDefault<AspNetUser>(user => user.Id == UserId);
                    userRetrieved.Id = UserId;
                    userRetrieved.EmailConfirmed = IsEmailConfirmed;
                    context.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;

            }
        }
        public static AspNetUserModel GetUserByActivaitonToken(string ActivationToken)
        {
            try
            {
                using (var context = new MODON_IdentityMembershipEntities())
                {
                    var query = context.AspNetUsers
                            .FirstOrDefault<AspNetUser>(user => user.ActivationToken == ActivationToken);
                    return CastFromAspNetUserToAspNetModel(query);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static AspNetUserModel GetUserByForgetToken(string forgetToken)
        {
            try
            {
                using (var context = new MODON_IdentityMembershipEntities())
                {
                    var query = context.AspNetUsers
                            .FirstOrDefault<AspNetUser>(user => user.ForgetToken == forgetToken);
                    return CastFromAspNetUserToAspNetModel(query);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static AspNetUserModel GetUserByEmail(string Email)
        {
            try
            {
                using (var context = new MODON_IdentityMembershipEntities())
                {
                    var query = context.AspNetUsers
                            .FirstOrDefault<AspNetUser>(user => user.UserName == Email);
                    return CastFromAspNetUserToAspNetModel(query);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static string GetActivationLink(UserManager<IdentityUser> userManager, string UserEmail)
        {
            try
            {
                var userRetrieved = userManager.FindByEmail(UserEmail);
                var newtoken = userManager.GenerateEmailConfirmationToken(userRetrieved.Id);
                var _endcodedToken = HttpUtility.UrlEncode(newtoken);
                var frontURL = ConfigurationManager.AppSettings["FrontURL"];
                DateTime _activationLinkExpirationDate = DateTime.Now.AddHours(int.Parse(ConfigurationManager.AppSettings["ActivationLinkExpirationInHours"]));
                MembershipHelpers.SaveUserActivationToken(userRetrieved.Id, _endcodedToken, _activationLinkExpirationDate);
                return $"{frontURL}/{_endcodedToken}";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static void CreateUserSession(string userId, string authToken)
        {
            using (var context = new MODON_IdentityMembershipEntities())
            {
                var userSession = new UserSession()
                {
                    OwnerUserId = userId,
                    AuthToken = authToken,
                    ExpirationDateTime = DateTime.Now.AddDays(int.Parse(ConfigurationManager.AppSettings["AccessTokenExpireTimeSpan"]))
                };
                context.UserSessions.Add(userSession);
                context.SaveChanges();
            }
        }
        public static void InvalidateUserSession(string userId, string authToken)
        {
            using (var context = new MODON_IdentityMembershipEntities())
            {
                var userSession = context.UserSessions.FirstOrDefault(s => s.AuthToken == authToken && s.OwnerUserId == userId);
                context.UserSessions.Remove(userSession);
                context.SaveChanges();
            }
        }
        public static bool ReValidateSession(string userId, string authToken)
        {
            using (var context = new MODON_IdentityMembershipEntities())
            {
                var userSession = context.UserSessions.FirstOrDefault(s => s.AuthToken == authToken && s.OwnerUserId == userId);

                if (userSession == null)
                {
                    // User does not have a session with this token --> invalid session
                    return false;
                }
                return true;
            }
        }
        public static AspNetUserModel CastFromAspNetUserToAspNetModel(AspNetUser UserObj)
        {
            if (UserObj != null)
                return new AspNetUserModel()
                {
                    UserName = UserObj.UserName,
                    AccessFailedCount = UserObj.AccessFailedCount,
                    ActivationExpirationDate = UserObj.ActivationExpirationDate,
                    ActivationToken = UserObj.ActivationToken,
                    CompleteProfileToken = UserObj.CompleteProfileToken,
                    Email = UserObj.Email,
                    EmailConfirmed = UserObj.EmailConfirmed,
                    ForgetExpirationDat = UserObj.ForgetExpirationDat,
                    ForgetToken = UserObj.ForgetToken,
                    Id = UserObj.Id,
                    IsMigratedUser = UserObj.IsMigratedUser,
                    IsPasswordUpdated = UserObj.IsPasswordUpdated,
                    LockoutEnabled = UserObj.LockoutEnabled,
                    LockoutEndDateUtc = UserObj.LockoutEndDateUtc,
                    ModonHashedPassword = UserObj.ModonHashedPassword,
                    PasswordHash = UserObj.PasswordHash,
                    PhoneNumber = UserObj.PhoneNumber,
                    PhoneNumberConfirmed = UserObj.PhoneNumberConfirmed,
                    SecurityStamp = UserObj.SecurityStamp,
                    TwoFactorEnabled = UserObj.TwoFactorEnabled

                };
            else
                return null;
        }
    }


}
