using LinkDev.MOA.POC.API.Attributes;
using LinkDev.MOA.POC.API.Common;
using LinkDev.MOA.POC.BLL.Common;
using LinkDev.MOA.POC.Models.CustomModels.ProfileManagement;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Results;
using System.Web.Mvc;

namespace LinkDev.MOA.POC.API.Controllers
{
    [ExceptionHandlingFilterAttribute]
    [OriginActionFilter]
    public abstract class BaseController : ApiController
    {
        public CultureInfo culture;
        public UserInfo userInfo;
        public CommonBLL _commonObj = new CommonBLL();

        private ConfigurationKeys _crmConfigurationKeys;
        public ConfigurationKeys CrmConfigurationKeys
        {
            get
            {
                if (_crmConfigurationKeys == null)
                {

                }

                return _crmConfigurationKeys;
            }
        }


        private Guid? _ApplicantId;
        public Guid? ApplicantId
        {
            get
            {

                if (!_ApplicantId.HasValue)
                {
                    //TODO get the user from identity and CRM
                    //var email = User.Identity.GetUserName();
                    //var bll = new LinkDev.Gea.Crm.Bll.Membership.ContactBll(CrmServiceClient, Logger, LanguageCode);
                    //_ApplicantId = bll.GetApplicantIdByEmail(email);
                }
                return _ApplicantId;
            }
        }

        protected override void Initialize(HttpControllerContext controllerContext)
        {
            base.Initialize(controllerContext);
            userInfo = _commonObj.GetUserInfo(User.Identity.Name);

        }

        private CultureInfo DetermineBestCulture(HttpRequestMessage request)
        {
            try
            {
                return request.Headers.AcceptLanguage.ToString() == "en"
                    ? CultureInfo.GetCultureInfo("en-US")
                    : CultureInfo.GetCultureInfo("ar-SA");

            }
            catch (Exception ex)
            {
                return CultureInfo.GetCultureInfo("en-US");
            }
        }

        protected internal ApiGenericResponse<T> OkSuccessful<T>(T content, string friendlyResponseMessage = null)
        {
            return new ApiGenericResponse<T>() { ResponseCode = ResponseCode.Success, Content = content, FriendlyResponseMessage = friendlyResponseMessage };
        }
        protected internal ApiGenericResponse<T> ErrorResponse<T>(string friendlyMessage)
        {
            return new ApiGenericResponse<T>() { ResponseCode = ResponseCode.Error, FriendlyResponseMessage = friendlyMessage };
        }

        protected override InvalidModelStateResult BadRequest(ModelStateDictionary modelState)
        {

            string allmessages = string.Join(";", modelState.Values
                                         .SelectMany(x => x.Errors)
                                         .Select(x => x.ErrorMessage));

            modelState.AddModelError("groupedmessages", allmessages);

            return base.BadRequest(modelState);

        }

        protected internal string GenerateFriendlyMessage(string message, string linkText, string linkURL)
        {
            return string.Format(Linkdev.MOA.POC.BLL.ResourceFiles.Common.Common.GenericMessage, message, linkURL, linkText);
        }

    }
}
