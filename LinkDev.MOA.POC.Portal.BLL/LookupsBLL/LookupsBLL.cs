using LinkDev.MOA.POC.Portal.BLL.CustomModels;
using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.LookupsBLL
{
    public class LookupsBLL : BaseBLL
    {
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
                       LookupSchemaName = "Companies",
                       Value = c.First().Value,
                       Text = c.First().Text
                   };
               }).ToList();

            return RelatedCompnaies;
        }
    }
}
