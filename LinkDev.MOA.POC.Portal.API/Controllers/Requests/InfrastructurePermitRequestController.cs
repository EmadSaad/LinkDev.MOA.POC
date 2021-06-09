using LinkDev.ECZA.POC.BLL.CustomModels;
using LinkDev.ECZA.POC.BLL.RequestsBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LinkDev.MOA.POC.Portal.API.Controllers.Requests
{
    [RoutePrefix("api/InfrastructurePermitRequest")]
    public class InfrastructurePermitRequestController : ApiController
    {
        private readonly InfrastructurePermitRequest _requestsBll;
        public InfrastructurePermitRequestController()
        {
            _requestsBll = new InfrastructurePermitRequest();

        }
        [HttpPost]
        [Route("PostInfrastructurePermitRequest")]

        public ApiGenericResponse<ApplicationPostModel> PostInfrastructurePermitRequest(EServiceModel<InfrastructurePermitModel> eServiceModel)
        {



            var postModel = _requestsBll.PostInfrastructurePermit(eServiceModel);
            if (!string.IsNullOrEmpty(postModel.RequestNumber))
            {
                return OkSuccessful(postModel);
            }
            else
            {
                return ErrorResponse<ApplicationPostModel>("لقد حدث خطأ ما من فضلك جرب مرة أخري.");
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

    }
}
