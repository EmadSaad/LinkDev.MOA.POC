using LinkDev.ECZA.POC.BLL.CustomModels;
using LinkDev.ECZA.POC.BLL.CustomModels.Lookups;
using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.LookupsBLL
{
    public class LookupsBLL:BaseBLL
    {
        public List<LookupModel> GetDesignConsultant()
        {
            // Define Condition Values
            var query_statuscode = 1;

            // Instantiate QueryExpression query
            var query = new QueryExpression("ldv_designconsultant");
            query.TopCount = 50;

            // Add columns to query.ColumnSet
            query.ColumnSet.AddColumns("ldv_designconsultantid", "ldv_name");

            // Define filter query.Criteria
            query.Criteria.AddCondition("statuscode", ConditionOperator.Equal, query_statuscode);

            var CRMDesignConsultant = CRMAccess.RetrieveMultiple(query);
            List<LookupModel> RelatedDesignConsultant = CRMDesignConsultant.Entities.Select(x => CrmMapper.ConvertToT<DesignConsultantLookupsModel>(x)).ToList()
               .GroupBy(c => c.Value).Select(c =>
               {
                   return new LookupModel
                   {
                       LookupSchemaName = "DesignConsultant",
                       Value = c.First().Value,
                       Text = c.First().Text
                   };
               }).ToList();

            return RelatedDesignConsultant;
        }
    }
}
