using LinkDev.MOA.POC.Portal.API.Attributes;
using LinkDev.MOA.POC.Portal.BLL.CustomModels;
using LinkDev.MOA.POC.Portal.BLL.CustomModels.Lookups;
using LinkDev.MOA.POC.Portal.BLL.LookupsBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;


namespace LinkDev.MOA.POC.Portal.API.Controllers.LookupsController
{
    [RoutePrefix("api/Lookups")]
  
    public class LookupsController : ApiController
    {
        private readonly LookupsBLL _lookupsBll;
        public LookupsController()
        {
            _lookupsBll = new LookupsBLL();

        }

        [HttpGet]
        [Route("CompaniesLookups")]
        public List<LookupModel> CompaniesLookups()
        {
            var result =
                _lookupsBll.GetRelatedCompanies();

            return result;
        }

        [HttpGet]
        [Route("CountriesLookups")]
        public List<CountriesLookupModel> CountriesLookups()
        {
            var result =
                _lookupsBll.GetCountries();

            return result;
        }

        [HttpGet]
        [Route("ArrivingPortsLookups")]
        public List<ArrivingPortsLookupsModel> ArrivingPortsLookups()
        {
            var result =
                _lookupsBll.GetArrivingPorts();

            return result;
        }

        [HttpGet]
        [Route("ProductsLookups")]
        public List<ProductsLookupModel> ProductsLookups()
        {
            var result =
                _lookupsBll.GetProducts();

            return result;
        }
    
}
}