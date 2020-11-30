using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels.Lookups
{
    public class ProductsLookupModel
    {

        public string LookupSchemaName { get; set; }
        [CrmFieldLogicalName("name")]
        public string Text { get; set; }
        [CrmFieldLogicalName("productid")]
        public string Value { get; set; }
    }
}
