using LinkDev.MOA.POC.API.Common;
using LinkDev.MOA.POC.BLL.Common.EServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LinkDev.MOA.POC.API.Controllers.Common
{

	[RoutePrefix("api/EServices")]
	public class EServicesCommonController : BaseController
	{
		private EServicesCommonBLL eServicesCommonBLL;
		private AuthorizationBLL authorizationBLL;
		public EServicesCommonController()
		{
			eServicesCommonBLL = new EServicesCommonBLL();
			authorizationBLL = new AuthorizationBLL();
		}

		/*[HttpGet]
		[Route("GetRequestComments")]
		public ApiGenericResponse<List<RequestComment>> GetRequestComments(Guid regardingID)
		{
			var requestCommentList = eServicesCommonBLL.GetRequestComments(regardingID);
			return OkSuccessful(requestCommentList);
		}*/

		/*[HttpGet]
		[Route("GetCRsByContact")]
		public ApiGenericResponse<List<RetrieveOptionsRequest>> GetCRsByContact()
		{
			var lookups = eServicesCommonBLL.GetCRsByContactId(userInfo.Id);
			return OkSuccessful<List<RetrieveOptionsRequest>>(lookups);
		}
		*/

		

		

		[HttpGet]
		[Route("GetCurrentUserType")]
		[SessionAuthorize]
		public ApiGenericResponse<int> GetCurrentUserType(Guid? CRId)
		{
			var currentUserType = eServicesCommonBLL.GetCurrentUserType(userInfo.Id, CRId);
			return OkSuccessful<int>(currentUserType);
		}

		[HttpGet]
		[Route("GetContactsByCR")]
		[SessionAuthorize]
		public ApiGenericResponse<List<RetrieveOptionsRequest>> GetContactsByCR(Guid CRId)
		{
			if (authorizationBLL.IsCRRelatedToContact(userInfo.Id, CRId))
			{
				var lookups = eServicesCommonBLL.GetContactsByCRId(CRId);
				return OkSuccessful<List<RetrieveOptionsRequest>>(lookups);
			}
			else
				return ErrorResponse<List<RetrieveOptionsRequest>>(BLL.ResourceFiles.Common.Common.NotAuthorizedAction);
		}

		[HttpGet]
		[Route("GetContactDetailsByCR")]
		public ApiGenericResponse<List<RetrieveOptionsRequest>> GetContactDetailsByCR(Guid CRId)
		{
			if (authorizationBLL.IsCRRelatedToContact(userInfo.Id, CRId))
			{
				var lookups = eServicesCommonBLL.GetContactDetailsByCR(CRId);
				return OkSuccessful<List<RetrieveOptionsRequest>>(lookups);
			}
			else
				return ErrorResponse<List<RetrieveOptionsRequest>>(BLL.ResourceFiles.Common.Common.NotAuthorizedAction);
		}

		[HttpGet]
		[Route("GetContractsRelatedToCR")]
		public ApiGenericResponse<List<RetrieveOptionsRequest>> GetContractsRelatedToCR(Guid CRId)
		{
			if (authorizationBLL.IsCRRelatedToContact(userInfo.Id, CRId))
			{
				var lookups = eServicesCommonBLL.GetContractsByCR(CRId);
				return OkSuccessful<List<RetrieveOptionsRequest>>(lookups);
			}
			else
				return ErrorResponse<List<RetrieveOptionsRequest>>(BLL.ResourceFiles.Common.Common.NotAuthorizedAction);
		}

		[HttpGet]
		[Route("GetRequestQuote")]
		public ApiGenericResponse<QuoteWithRelatedQuoteLines> GetRequestQuote(Guid applicationHeaderId)
		{
			var result = eServicesCommonBLL.GetRequestQuote(applicationHeaderId);
			return OkSuccessful<QuoteWithRelatedQuoteLines>(result);
		}

		[HttpGet]
		[Route("GetFilteredOffice")]
		[SessionAuthorize]
		public ApiGenericResponse<List<RetrieveOptionsRequest>> GetFilteredOffice(Guid industrialCity, int requestType)
		{
			var lookups = eServicesCommonBLL.GetFilteredOffice(industrialCity, requestType);
			return OkSuccessful<List<RetrieveOptionsRequest>>(lookups);
		}

		[HttpGet]
		[Route("GetFilteredContractors")]
		[SessionAuthorize]
		public ApiGenericResponse<List<RetrieveOptionsRequest>> GetFilteredContractors()
		{
			var lookups = eServicesCommonBLL.GetFilteredContractors();
			return OkSuccessful<List<RetrieveOptionsRequest>>(lookups);
		}

		[HttpGet]
		[Route("GetContractsByLoggedInUser")]
		public ApiGenericResponse<List<RetrieveOptionsRequest>> GetContractsByLoggedInUser()
		{

			var contracts = eServicesCommonBLL.GetContractsByLoggedInUser(userInfo.Id);
			return OkSuccessful(contracts);
		}

		[HttpGet]
		[Route("GetCRVersionDetails")]
		public ApiGenericResponse<CRVersion> GetCRVersionDetails(string CRId)
		{
			var CRVersion = eServicesCommonBLL.GetCRVersionDetails(CRId);
			return OkSuccessful(CRVersion);
		}

		[HttpGet]
		[Route("GetILVersionDetails")]
		public ApiGenericResponse<ILVersion> GetILVersionDetails(string ILId)
		{
			var ILVersion = eServicesCommonBLL.GetILVersionDetails(ILId);
			return OkSuccessful(ILVersion);
		}

		//[HttpGet]
		//[Route("IsPostFilteredOfficeContractorValid")]
		//public bool IsPostFilteredOfficeContractorValid(Guid industrialCity, int requestType, int crType, Guid crId, int serviceType)
		//{
		//	bool lookups = eServicesCommonBLL.IsPostFilteredOfficeContractorValid(industrialCity, requestType, crType, crId, serviceType);
		//	return lookups;
		//}

		[HttpGet]
		[Route("GetContractDetails")]
		public ApiGenericResponse<ContractModel> GetContractDetails(Guid contractId)
		{
			var contractDetails = eServicesCommonBLL.GetContractDetails(contractId);
			return OkSuccessful<ContractModel>(contractDetails);
		}

		[HttpGet]
		[Route("GetContractsWithCodeByCR")]
		public ApiGenericResponse<List<RetrieveOptionsRequest>> GetContractsWithCodeByCR(Guid CRId, bool isFinalOnly)
		{
			var contracts = eServicesCommonBLL.GetContractsWithCodeByCR(CRId, isFinalOnly);
			return OkSuccessful(contracts);
		}

		[HttpGet]
		[Route("GetILsByCR")]
		public ApiGenericResponse<List<RetrieveOptionsRequest>> GetILsByCR(Guid CRId)
		{
			var ILs = eServicesCommonBLL.GetILsByCR(CRId);
			return OkSuccessful(ILs);
		}

		[HttpGet]
		[Route("GetModonProductsRelatedToCR")]
		[SessionAuthorize]
		public ApiGenericResponse<List<RetrieveOptionsRequest>> GetModonProductsRelatedToCR(Guid CRId)
		{
			if (authorizationBLL.IsCRRelatedToContact(userInfo.Id, CRId))
			{
				var lookups = eServicesCommonBLL.GetModonProductsRelatedToCR(CRId);
				return OkSuccessful<List<RetrieveOptionsRequest>>(lookups);
			}
			else
				return ErrorResponse<List<RetrieveOptionsRequest>>(BLL.ResourceFiles.Common.Common.NotAuthorizedAction);
		}

		[HttpGet]
		[Route("GetValidateCRContractsBalances")]
		[SessionAuthorize]
		public ApiGenericResponse<ContractsBalancesValidationModel> ValidateCRContractsBalances(Guid CRId)
		{
			var validationModel = eServicesCommonBLL.ValidateCRContractsBalances(CRId);
			return OkSuccessful<ContractsBalancesValidationModel>(validationModel);
		}

		[HttpGet]
		[Route("GetCRVersion")]
		public ApiGenericResponse<CRVersion> GetCRVersion(Guid CRId)
		{
			var CRVersion = eServicesCommonBLL.GetCRVersion(CRId);
			return OkSuccessful(CRVersion);
		}

		


	}
}
