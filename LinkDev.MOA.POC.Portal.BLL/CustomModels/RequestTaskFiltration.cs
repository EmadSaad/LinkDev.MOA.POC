using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{
    public class RequestTaskFiltration
    {
        public string RequestNumber { get; set; }
        public string RequestType { get; set; }
        public List<string> RequestStatus { get; set; }
        public DateModel From { get; set; }
        public DateModel To { get; set; }
        public int PageSize { get; set; }
        public bool ShowRating { get; set; }
        public int PageNumber { get; set; }
    }
}
