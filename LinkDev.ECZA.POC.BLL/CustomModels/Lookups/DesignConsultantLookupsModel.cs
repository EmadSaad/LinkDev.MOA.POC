using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using LinkDev.ECZA.POC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.CustomModels.Lookups
{
    public class DesignConsultantLookupsModel
    {

        public string LookupSchemaName { get; set; }
        [CrmFieldLogicalName(DesignConsultant.PrimaryName)]
        public string Text { get; set; }
        [CrmFieldLogicalName(DesignConsultant.PrimaryKey)]
        public string Value { get; set; }
    }
}
