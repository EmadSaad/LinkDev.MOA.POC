using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{
    public class CaseModel
    {
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
