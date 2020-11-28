using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{
    public class RequestResult
    {
        public string RequestNumber { get; set; }
        public string SubmissionDate { get; set; }
        public int? Rating { get; set; }
        public string PortalUrl { get; set; }
        public string RelatedRecordId { get; set; }
        public string PortalStatusName { get; set; }
        public string ServiceName { get; set; }
        public bool ContainsClosureDate { get; set; }
        public bool ShowRating
        {
            get { return ContainsClosureDate /*&& (Rating == null || Rating == 0)*/; }
            set { }
        }
        public string Url => $"{ConfigurationManager.AppSettings["FrontURL"]}{PortalUrl}?Id={RelatedRecordId}";
    }
}
