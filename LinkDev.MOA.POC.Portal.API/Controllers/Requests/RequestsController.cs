
using LinkDev.ECZA.POC.BLL.CustomModels;
using LinkDev.ECZA.POC.BLL.RequestsBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LinkDev.MOA.POC.Portal.API.Controllers.Requests
{
    
    [RoutePrefix("api/Requests")]
  
    public class RequestsController : ApiController
    {
        private readonly RequestsBLL _requestsBll;
        public RequestsController()
        {
            _requestsBll = new RequestsBLL();

        }
     /*   [HttpPost]
        [Route("PostCase")]
       
        public ApiGenericResponse<ApplicationPostModel> PostCase(EServiceModel<CaseModel> eServiceModel)
        {

            

            var postModel = _requestsBll.PostCase(eServiceModel);
            if (!string.IsNullOrEmpty(postModel.RequestNumber))
            {
                return OkSuccessful(postModel);
            }
            else
            {
                return ErrorResponse<ApplicationPostModel>("لقد حدث خطأ ما من فضلك جرب مرة أخري.");
            }
        }


        [HttpPost]
        [Route("GetRequests")]
        public ApiGenericResponse<GridResultBase<RequestResult>> GetRequests(
           [FromBody] RequestTaskFiltration requestFiltration)
        {
            var result = _requestsBll.GetRequests(requestFiltration);
            return OkSuccessful(result);
        }
        [HttpGet]
        [Route("CaseStatistics")]
        public CaseStatisticsModel CaseStatistics()
        {
            return _requestsBll.CaseStatistics();
        }*/

        [HttpGet]
        [Route("GetPayment")]
        public ApiGenericResponse<EServiceModel<InfrastructurePermitModel>> GetPayment(Guid Id)
        {
            return _requestsBll.GetPayment(Id.ToString());
        }

        [HttpPost]
        [Route("PostPayment")]

        public ApiGenericResponse<ApplicationPostModel> PostPayment(EServiceModel<InfrastructurePermitModel> eServiceModel)
        {



            var postModel = _requestsBll.PostPayment(eServiceModel);
            if (!string.IsNullOrEmpty(postModel.RequestNumber))
            {
                return OkSuccessful(postModel,"تم إتمام الدفع بنجاح.");
            }
            else
            {
                return ErrorResponse<ApplicationPostModel>("لقد حدث خطأ ما من فضلك جرب مرة أخري.");
            }
        }
       

        #region Helper
        protected internal ApiGenericResponse<T> OkSuccessful<T>(T content, string friendlyResponseMessage = null)
        {
            return new ApiGenericResponse<T>() { ResponseCode = ResponseCode.Success, Content = content, FriendlyResponseMessage = friendlyResponseMessage };
        }
        protected internal ApiGenericResponse<T> ErrorResponse<T>(string friendlyMessage)
        {
            return new ApiGenericResponse<T>() { ResponseCode = ResponseCode.Error, FriendlyResponseMessage = friendlyMessage };
        }

        #endregion
    }

}