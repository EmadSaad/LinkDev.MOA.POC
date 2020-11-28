using LinkDev.MOA.POC.Portal.BLL.CustomModels;
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
    }
}