using LinkDev.MOA.POC.Portal.BLL.CustomModels;
using LinkDev.MOA.POC.Portal.BLL.CustomModels.Lookups;
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

        public List<CountriesLookupModel> GetCountries()
        {
          
            // Instantiate QueryExpression QEldv_country
            var query = new QueryExpression("ldv_country");

            // Add columns to QEldv_country.ColumnSet
            query.ColumnSet.AddColumns("ldv_countryid", "ldv_name");


            var CRMRelatedCompanies = CRMAccess.RetrieveMultiple(query);
            List<CountriesLookupModel> RelatedCompnaies = CRMRelatedCompanies.Entities.Select(x => CrmMapper.ConvertToT<CountriesLookupModel>(x)).ToList()
               .GroupBy(c => c.Value).Select(c =>
               {
                   return new CountriesLookupModel
                   {
                       LookupSchemaName = "Countries",
                       Value = c.First().Value,
                       Text = c.First().Text
                   };
               }).ToList();

            return RelatedCompnaies;
        }

        public List<ArrivingPortsLookupsModel> GetArrivingPorts()
        {

            // Instantiate QueryExpression QEldv_arrivingport
            var query = new QueryExpression("ldv_arrivingport");

            // Add columns to QEldv_arrivingport.ColumnSet
            query.ColumnSet.AddColumns("ldv_name", "ldv_arrivingportid");



            var CRMRelatedCompanies = CRMAccess.RetrieveMultiple(query);
            List<ArrivingPortsLookupsModel> RelatedCompnaies = CRMRelatedCompanies.Entities.Select(x => CrmMapper.ConvertToT<ArrivingPortsLookupsModel>(x)).ToList()
               .GroupBy(c => c.Value).Select(c =>
               {
                   return new ArrivingPortsLookupsModel
                   {
                       LookupSchemaName = "Countries",
                       Value = c.First().Value,
                       Text = c.First().Text
                   };
               }).ToList();

            return RelatedCompnaies;
        }

        public List<ProductsLookupModel> GetProducts()
        {

            
            var QEproduct_ldv_customproducttype = 2;

            // Instantiate QueryExpression QEproduct
            var query = new QueryExpression("product");

            // Add columns to QEproduct.ColumnSet
            query.ColumnSet.AddColumns("productid", "name");

            // Define filter QEproduct.Criteria
            query.Criteria.AddCondition("ldv_customproducttype", ConditionOperator.Equal, QEproduct_ldv_customproducttype);


            var CRMRelatedCompanies = CRMAccess.RetrieveMultiple(query);
            List<ProductsLookupModel> RelatedCompnaies = CRMRelatedCompanies.Entities.Select(x => CrmMapper.ConvertToT<ProductsLookupModel>(x)).ToList()
               .GroupBy(c => c.Value).Select(c =>
               {
                   return new ProductsLookupModel
                   {
                       LookupSchemaName = "Countries",
                       Value = c.First().Value,
                       Text = c.First().Text
                   };
               }).ToList();

            return RelatedCompnaies;
        }
    }
}
