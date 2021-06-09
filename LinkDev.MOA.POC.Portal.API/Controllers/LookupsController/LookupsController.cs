using LinkDev.ECZA.POC.BLL.CustomModels;
using LinkDev.ECZA.POC.BLL.CustomModels.Lookups;
using LinkDev.ECZA.POC.BLL.LookupsBLL;
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
        [Route("DesignConsultantLookups")]
        public List<LookupModel> DesignConsultantLookups()
        {
            var result =
                _lookupsBll.GetDesignConsultant();

            return result;
        }

        
    
}
}