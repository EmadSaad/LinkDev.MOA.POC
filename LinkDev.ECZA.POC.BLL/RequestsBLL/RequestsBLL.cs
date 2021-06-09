using LinkDev.ECZA.POC.BLL.CustomModels;
using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper;
using LinkDev.ECZA.POC.Models;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.RequestsBLL
{
    public class RequestsBLL:BaseBLL
    {
        public ApiGenericResponse<EServiceModel<InfrastructurePermitModel>> GetPayment(string requestId)
        {
            Guid ContactId = Guid.Parse("d888ded5-7913-eb11-a812-000d3ab114e3");

            var requestModel = new EServiceModel<InfrastructurePermitModel>();



            // Instantiate QueryExpression QEincident
            var Query = new QueryExpression(InfrastructurePermitIssuanceRequest.EntityName);

            // Add columns to QEincident.ColumnSet
            Query.ColumnSet.AddColumns(InfrastructurePermitIssuanceRequest.PrimaryKey, "statuscode", "createdon", "ldv_name");

            // Define filter QEincident.Criteria
            Query.Criteria.AddCondition(InfrastructurePermitIssuanceRequest.PrimaryKey, ConditionOperator.Equal, requestId);

            var Cases = CRMAccess.RetrieveMultiple(Query).Entities;

            ApplicationHeader appheader = Cases.Select(x => CrmMapper.ConvertToT<ApplicationHeader>(x)).FirstOrDefault();
            InfrastructurePermitModel model = Cases.Select(y => CrmMapper.ConvertToT<InfrastructurePermitModel>(y)).FirstOrDefault();
            List<DocumentSettingModel> documents = null;

            return new ApiGenericResponse<EServiceModel<InfrastructurePermitModel>>
            {
                Content = new EServiceModel<InfrastructurePermitModel> { ApplicationHeader = appheader, Documents = documents, Request = model, IsSubmitted = true, IsReadOnly = false },
                FriendlyResponseMessage = "",
                InternalMessage = "",
                ResponseCode = ResponseCode.Success
            };





        }

        public ApplicationPostModel PostPayment(EServiceModel<InfrastructurePermitModel> eServiceModel)
        {



            Entity paymentActivity = new Entity("ldv_documents", Guid.Parse(eServiceModel.Documents.FirstOrDefault().Files.FirstOrDefault().FileId));
            paymentActivity["regardingobjectid"] = new EntityReference(InfrastructurePermitIssuanceRequest.EntityName, Guid.Parse(eServiceModel.Request.Id));

            CRMAccess.Update(paymentActivity);
            Entity request = new Entity(InfrastructurePermitIssuanceRequest.EntityName, Guid.Parse(eServiceModel.Request.Id));
            request["ldv_ispaid"] = true;
            CRMAccess.Update(request);
            return new ApplicationPostModel
            {
                RequestId = Guid.Parse(eServiceModel.Request.Id),
                RequestNumber = eServiceModel.ApplicationHeader.RequestNumber
            };

        }
    }
}
