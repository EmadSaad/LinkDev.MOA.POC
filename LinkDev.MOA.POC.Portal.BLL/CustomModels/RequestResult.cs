using LinkDev.MOA.POC.CRMModel.Incident;
using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper;
using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{
    [CrmEntityLogicalName(incident.EntityName)]
    [DataContract]
    public class RequestResult
    {
        [CrmFieldLogicalNameAttribute(incident.ticketnumber)]
        [DataMember]
        public string RequestNumber { get; set; }
        [CrmFormattedValueAtrribute(incident.createdon)]
        [DataMember]
        public string SubmissionDate { get; set; }
        [DataMember]
        public int? Rating => 5;
        [DataMember]
        public string PortalUrl { get; set; }
        [DataMember]
        [CrmFieldLogicalNameAttribute(incident.PrimaryKey)]
        public string RelatedRecordId { get; set; }
        [CrmFormattedValueAtrribute(incident.statuscode)]
        public string status { get; set; }

        [CrmFormattedValueAtrribute(incident.ldv_moacasetype)]
        public string CaseType { get; set; }
        [DataMember]
        public string PortalStatusName => status;
        [DataMember]
        public string ServiceName => CaseType;
        [DataMember]
        public bool ContainsClosureDate { get; set; }
        [DataMember]
        public bool ShowRating
        {
            get { return ContainsClosureDate /*&& (Rating == null || Rating == 0)*/; }
            set { }
        }
        [DataMember]
        public string Url => $"{ConfigurationManager.AppSettings["ViewCaseURL"]}?Id={RelatedRecordId}";
    }
}
