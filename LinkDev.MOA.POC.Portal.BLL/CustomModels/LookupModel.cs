using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{
   public class LookupModel
    {
      
        public string LookupSchemaName { get; set; }
        [CrmFieldLogicalName("name")]
        public string Text { get; set; }
        [CrmFieldLogicalName("accountid")]
        public string Value { get; set; }
    }
}
