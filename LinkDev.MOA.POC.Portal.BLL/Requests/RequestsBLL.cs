using LinkDev.MOA.POC.Portal.BLL.CustomModels;
using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.Requests
{
    public class RequestsBLL: BaseBLL
    {
        #region Commented
        /*
        public GridResultBase<RequestResult> GetRequests(RequestTaskFiltration requestFiltration, Guid contactId, Guid? requestId = null)
        {
           


          

            var result = new GridResultBase<RequestResult>();

            var requestsQuery = new QueryExpression(ldv_applicationheader.EntityName) { NoLock = true };

            requestsQuery.AddOrder(ldv_applicationheader.createdon, OrderType.Descending);


            requestsQuery.ColumnSet.AddColumns(
                ldv_applicationheader.PrimaryName,
                ldv_applicationheader.ldv_relatedapplicationid,
                ldv_applicationheader.ldv_submissiondate,
                ldv_applicationheader.ldv_closuredate,
                ldv_applicationheader.ldv_rating
                );

            requestsQuery.Criteria.AddCondition("Service", ldv_service.ldv_isshowinrequests, ConditionOperator.Equal, true);

            //requestsQuery.Criteria.AddCondition("Account", Account.PrimaryKey, ConditionOperator.Equal, requestFiltration.CRId);

            requestsQuery.Criteria.AddCondition(ldv_applicationheader.ldv_accountid, ConditionOperator.Equal, requestFiltration.CRId);

            if (requestId != null && requestId != Guid.Empty)
            {
                requestsQuery.Criteria.AddCondition(ldv_applicationheader.ldv_relatedapplicationid, ConditionOperator.Equal, requestId.ToString());
            }

            if (requestFiltration.ContractId != Guid.Empty && requestFiltration.ContractId != null)
            {
                requestsQuery.Criteria.AddCondition("ldv_contractid", ConditionOperator.Equal, requestFiltration.ContractId);
            }

            if (requestFiltration.RequestNumber != null && !string.IsNullOrWhiteSpace(requestFiltration.RequestNumber))
            {
                requestsQuery.Criteria.AddCondition(ldv_applicationheader.PrimaryName, ConditionOperator.Like, $"%{requestFiltration.RequestNumber}%");
            }

            if (requestFiltration.RequestType != null && requestFiltration.RequestType != Guid.Empty)
            {
                requestsQuery.Criteria.AddCondition("Service", ldv_service.PrimaryKey, ConditionOperator.Equal, requestFiltration.RequestType);
            }

            if (requestFiltration.RequestStatus != null && requestFiltration.RequestStatus.Count > 0)
            {
                var statusesIds = new List<object>();
                statusesIds.AddRange((requestFiltration.RequestStatus.Select(e => (object)e)));
                requestsQuery.Criteria.AddCondition(new ConditionExpression("PortalRequestStatus", ldv_requeststatus.PrimaryKey, ConditionOperator.In, statusesIds.ToArray()));
            }

            if (requestFiltration.From != null)
            {

                var dateForFiltration =
                    $"{requestFiltration.From.year}-{requestFiltration.From.month}-{requestFiltration.From.day}";
                requestsQuery.Criteria.AddCondition(ldv_applicationheader.ldv_submissiondate, ConditionOperator.OnOrAfter, dateForFiltration);
            }
            if (requestFiltration.To != null)
            {
                var dateForFiltration =
                    $"{requestFiltration.To.year}-{requestFiltration.To.month}-{requestFiltration.To.day}";
                requestsQuery.Criteria.AddCondition(ldv_applicationheader.ldv_submissiondate, ConditionOperator.OnOrBefore, dateForFiltration);
            }

            var serviceLink = requestsQuery.AddLink(ldv_service.EntityName, ldv_applicationheader.ldv_serviceid, ldv_service.PrimaryKey, JoinOperator.LeftOuter);
            serviceLink.EntityAlias = "Service";
            serviceLink.Columns.AddColumns(ldv_service.ldv_name_ar, ldv_service.ldv_name_en, ldv_service.ldv_portalurl);

            //var accountLink = requestsQuery.AddLink("ldv_ldv_applicationheader_account", ldv_applicationheader.PrimaryKey, "ldv_applicationheaderid", JoinOperator.LeftOuter);
            //accountLink.EntityAlias = "Account";


            var portalRequestStatusLink = requestsQuery.AddLink(ldv_requeststatus.EntityName, ldv_applicationheader.ldv_portalrequeststatus, ldv_requeststatus.PrimaryKey, JoinOperator.LeftOuter);
            portalRequestStatusLink.EntityAlias = "PortalRequestStatus";
            portalRequestStatusLink.Columns.AddColumns(ldv_requeststatus.ldv_namear, ldv_requeststatus.ldv_nameen);


            AddPagingData(requestsQuery, requestFiltration.PageNumber);

            var res = CRMAccess.RetrieveMultiple(requestsQuery);

            result.TotalNumber = res.TotalRecordCount;
            result.NumberPerPage = requestFiltration.PageSize;

            if (res.Entities != null && res.Entities.Count > 0)
            {

                result.Data = res.Entities.Select(e => new RequestResult
                {
                    RequestNumber = e.GetAttributeValue<string>(ldv_applicationheader.PrimaryName),
                    SubmissionDate = e.GetAttributeValue<DateTime>(ldv_applicationheader.ldv_submissiondate) != DateTime.MinValue ?
                       e.GetAttributeValue<DateTime>(ldv_applicationheader.ldv_submissiondate).ToString("dd/MM/yyyy", CultureInfo.InvariantCulture) : null,
                    PortalUrl = e.GetAttributeValue<AliasedValue>($"Service.{ldv_service.ldv_portalurl}")?.Value.ToString(),
                    RelatedRecordId = e.GetAttributeValue<string>(ldv_applicationheader.ldv_relatedapplicationid),
                    PortalStatusName = LanguageHelper.IsArabic ? e.GetAttributeValue<AliasedValue>($"PortalRequestStatus.{ldv_requeststatus.ldv_namear}")?.Value.ToString() :
                        e.GetAttributeValue<AliasedValue>($"PortalRequestStatus.{ ldv_requeststatus.ldv_nameen }")?.Value.ToString(),
                    ServiceName = LanguageHelper.IsArabic ? e.GetAttributeValue<AliasedValue>($"Service.{ldv_service.ldv_name_ar}")?.Value.ToString() :
                        e.GetAttributeValue<AliasedValue>($"Service.{ldv_service.ldv_name_en}")?.Value.ToString(),
                    ContainsClosureDate = e.Contains((ldv_applicationheader.ldv_closuredate)),
                    Rating = e.Contains("ldv_rating") ? e.GetAttributeValue<OptionSetValue>("ldv_rating").Value : (int?)null

                }).ToList();
            }

            return GenerateResult<RequestResult>(result.Data, result.TotalNumber);
          
    }
 */
        #endregion

        public List<LookupModel> GetRelatedCompanies()
        {
            // Define Condition Values
            var query_ldv_accounttype = 5;
            var query_contact_contactid = "d888ded5-7913-eb11-a812-000d3ab114e3";

            // Instantiate QueryExpression query
            var query = new QueryExpression("account");

            // Add columns to query.ColumnSet
            query.ColumnSet.AddColumns("name", "accountid", "ldv_accounttype");

            // Define filter query.Criteria
            query.Criteria.AddCondition("ldv_accounttype", ConditionOperator.Equal, query_ldv_accounttype);

            // Add link-entity query_contact
            var query_contact = query.AddLink("contact", "primarycontactid", "contactid");
            query_contact.EntityAlias = "RelatedCompanies";

            // Add columns to query_contact.Columns
            query_contact.Columns.AddColumns("accountid");

            // Define filter query_contact.LinkCriteria
            query_contact.LinkCriteria.AddCondition("contactid", ConditionOperator.Equal, query_contact_contactid);


            var CRMRelatedCompanies = CRMAccess.RetrieveMultiple(query);
            List<LookupModel> RelatedCompnaies = CRMRelatedCompanies.Entities.Select(x => CrmMapper.ConvertToT<LookupModel>(x)).ToList()
               .GroupBy(c => c.Value).Select(c =>
               {
                   return new LookupModel
                   {
                      LookupSchemaName="Companies",
                      Value=c.First().Value,
                      Text=c.First().Text
                   };
               }).ToList();

            return RelatedCompnaies;
        }
    }
}
