using LinkDev.MOA.POC.CRMModel.Incident;
using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{
    [CrmEntityLogicalNameAttribute(incident.EntityName)]
    public class CaseModel
    {
        [CrmFieldLogicalNameAttribute(incident.PrimaryKey)]
        public string Id { get; set; }
       public string CompanyId { get; set; }
       public string ProductId { get; set; }
       public string Exporter { get; set; }
       public string MadeInCountryId { get; set; }
       public string ExportingCountryId { get; set; }
       public decimal UnitPrice { get; set; }
       public decimal Qunatity { get; set; }
       public decimal TotalPrice { get; set; }
       public string ArrivingPortId { get; set; }
    }
}
