﻿using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels.Lookups
{
    public class CountriesLookupModel
    {
      

            public string LookupSchemaName { get; set; }
            [CrmFieldLogicalName("ldv_name")]
            public string Text { get; set; }
            [CrmFieldLogicalName("ldv_countryid")]
            public string Value { get; set; }
        }
    }
