using LinkDev.MOA.POC.CRMModel.Incident;
using LinkDev.MOA.POC.Portal.BLL.CustomModels;
using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.Requests
{
    public class RequestsBLL : BaseBLL
    {

        public ApplicationPostModel PostCase(EServiceModel<CaseModel> eServiceModel)
        {
            Entity Case = new Entity(incident.EntityName);
            Case[incident.ldv_moacasetype] = new OptionSetValue((int)incident.ldv_moacasetype_OptionSet.ImportingPermissionRequest);
            Case[incident.customerid] = new EntityReference("contact", Guid.Parse("d888ded5-7913-eb11-a812-000d3ab114e3"));
            Case[incident.caseorigincode] = new OptionSetValue((int)incident.caseorigincode_OptionSet.Web);
            Case[incident.ldv_importercompany] = new EntityReference("account", Guid.Parse(eServiceModel.Request.CompanyId));
            Case[incident.ldv_quantity] = eServiceModel.Request.Qunatity;
            Case[incident.ldv_importedproduct] = new EntityReference("product", Guid.Parse(eServiceModel.Request.ProductId));
            Case[incident.ldv_exportername] = eServiceModel.Request.Exporter;
            Case[incident.ldv_madeincountry] = new EntityReference("ldv_country", Guid.Parse(eServiceModel.Request.MadeInCountryId));
            Case[incident.ldv_exportingcountry] = new EntityReference("ldv_country", Guid.Parse(eServiceModel.Request.ExportingCountryId));
            Case[incident.ldv_unitprice] = new Money(eServiceModel.Request.UnitPrice);
            Case[incident.ldv_arrivingport] = new EntityReference("ldv_arrivingport", Guid.Parse(eServiceModel.Request.ArrivingPortId));
            var CaseId = CRMAccess.Create(Case);

            var request = new ExecuteMultipleRequest()
            {
                Requests = new OrganizationRequestCollection(),
                Settings = new ExecuteMultipleSettings
                {
                    ContinueOnError = false,
                    ReturnResponses = true
                }
            };


            foreach (var document in eServiceModel.Documents)
            {
                foreach (var file in document.Files)
                {
                    Entity documentActivity = new Entity("ldv_documents", Guid.Parse(file.FileId));
                    documentActivity["regardingobjectid"] = new EntityReference(incident.EntityName, CaseId);


                    var createRequest = new UpdateRequest()
                    {
                        Target = documentActivity
                    };
                    request.Requests.Add(createRequest);
                }

            }
            var response = (ExecuteMultipleResponse)CRMAccess.Execute(request);
            var CaseAttr = CRMAccess.Retrieve(incident.EntityName, CaseId, new ColumnSet(incident.ticketnumber));
            var CaseNumber = CaseAttr[incident.ticketnumber].ToString();
            return new ApplicationPostModel
            {
                RequestId = CaseId,
                RequestNumber = CaseNumber
            };

        }


        public GridResultBase<RequestResult> GetRequests(
            RequestTaskFiltration requestFiltration)
        {
            // Define Condition Values
            var QEincident_customerid = "d888ded5-7913-eb11-a812-000d3ab114e3";
            var RequestStatus = requestFiltration.RequestStatus.Where(x => !string.IsNullOrEmpty(x)).ToList();

            // Instantiate QueryExpression QEincident
            var Query = new QueryExpression("incident");

            // Add columns to QEincident.ColumnSet
            Query.ColumnSet.AddColumns("statuscode", "createdon", "ticketnumber", "incidentid", "ldv_moacasetype");


            // Define filter QEincident.Criteria
            Query.Criteria.AddCondition("customerid", ConditionOperator.Equal, QEincident_customerid);
            var QEincident_Criteria_0 = new FilterExpression();
            Query.Criteria.AddFilter(QEincident_Criteria_0);

            // Define filter QEincident_Criteria_0
            QEincident_Criteria_0.FilterOperator = LogicalOperator.Or;
            if (!string.IsNullOrEmpty(requestFiltration.RequestType))
                QEincident_Criteria_0.AddCondition("ldv_moacasetype", ConditionOperator.Equal, Convert.ToInt32(requestFiltration.RequestType));
            if (RequestStatus.Count() > 0)
            {
                var Statuses = RequestStatus.Select(x => (Convert.ToInt32(x))).ToArray();
                QEincident_Criteria_0.AddCondition("statuscode", ConditionOperator.In, Statuses);
            }
            if (requestFiltration.From?.day > 0 && requestFiltration.To?.day > 0)
                QEincident_Criteria_0.AddCondition("createdon", ConditionOperator.Between, requestFiltration.From, requestFiltration.To);
            var Cases = CRMAccess.RetrieveMultiple(Query).Entities;

            List<RequestResult> CasesList = Cases.Select(x => CrmMapper.ConvertToT<RequestResult>(x)).ToList();

            return new GridResultBase<RequestResult>
            {
                Data = CasesList,
                TotalNumber = CasesList.Count(),
                NumberPerPage = 5
            };
        }

        public CaseStatisticsModel CaseStatistics()
        {
            // Define Condition Values
            var QEincident_customerid = "d888ded5-7913-eb11-a812-000d3ab114e3";

            // Instantiate QueryExpression QEincident
            var Query = new QueryExpression("incident");

            // Add columns to QEincident.ColumnSet
            Query.ColumnSet.AddColumns("statuscode", "createdon", "ticketnumber", "incidentid");

            // Define filter QEincident.Criteria
            Query.Criteria.AddCondition("customerid", ConditionOperator.Equal, QEincident_customerid);

            var AllCases = CRMAccess.RetrieveMultiple(Query);
            var ActiveCases = AllCases.Entities.Where(x => ((OptionSetValue)x["statuscode"]).Value == 1 || ((OptionSetValue)x["statuscode"]).Value == 3 || ((OptionSetValue)x["statuscode"]).Value == 753240000 || ((OptionSetValue)x["statuscode"]).Value == 753240003).ToList();
            int NumberOfActiveCases;
            int NumberClosedCases;
            int NumberOfAllCases = AllCases.Entities.Count();
            NumberOfActiveCases = ActiveCases.Count();
            NumberClosedCases = NumberOfAllCases - NumberOfActiveCases;

            return new CaseStatisticsModel
            {
                ActiveNumber = NumberOfActiveCases,
                CloseNumber = NumberClosedCases
            };
        }

        public ApiGenericResponse<EServiceModel<CaseModel>> GetPayment(string requestId)
        {
            Guid ContactId = Guid.Parse("d888ded5-7913-eb11-a812-000d3ab114e3");

            var requestModel = new EServiceModel<CaseModel>();



            // Instantiate QueryExpression QEincident
            var Query = new QueryExpression("incident");

            // Add columns to QEincident.ColumnSet
            Query.ColumnSet.AddColumns("incidentid", "statuscode", "createdon", "ticketnumber", "ldv_moacasetype");

            // Define filter QEincident.Criteria
            Query.Criteria.AddCondition("incidentid", ConditionOperator.Equal, requestId);

            var Cases = CRMAccess.RetrieveMultiple(Query).Entities;

            ApplicationHeader appheader = Cases.Select(x => CrmMapper.ConvertToT<ApplicationHeader>(x)).FirstOrDefault();
            CaseModel model = Cases.Select(y => CrmMapper.ConvertToT<CaseModel>(y)).FirstOrDefault();
            List<DocumentSettingModel> documents = null;

            return new ApiGenericResponse<EServiceModel<CaseModel>>
            {
                Content = new EServiceModel<CaseModel> { ApplicationHeader = appheader, Documents = documents, Request = model, IsSubmitted = true, IsReadOnly = false },
                FriendlyResponseMessage = "",
                InternalMessage = "",
                ResponseCode = ResponseCode.Success
            };





        }

        public ApplicationPostModel PostPayment(EServiceModel<CaseModel> eServiceModel)
        {
            

            
                    Entity paymentActivity = new Entity("ldv_payment", Guid.Parse(eServiceModel.Documents.FirstOrDefault().Files.FirstOrDefault().FileId));
                    paymentActivity["regardingobjectid"] = new EntityReference(incident.EntityName,Guid.Parse(eServiceModel.Request.Id));
                   
             CRMAccess.Update(paymentActivity);
            var CaseAttr = CRMAccess.Retrieve(incident.EntityName,Guid.Parse(eServiceModel.Request.Id), new ColumnSet(incident.ticketnumber, "ldv_ispaymentdocumentuploaded"));
            var CaseNumber = CaseAttr[incident.ticketnumber].ToString();
            Entity CaseEntity = new Entity(incident.EntityName, Guid.Parse(eServiceModel.Request.Id));
            CaseEntity["ldv_ispaymentdocumentuploaded"] = true;
            CRMAccess.Update(CaseEntity);
            return new ApplicationPostModel
            {
                RequestId = Guid.Parse(eServiceModel.Request.Id),
                RequestNumber = CaseNumber
            };

        }

    }
}
