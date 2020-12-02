using LinkDev.MOA.POC.CRMModel.Incident;
using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper;
using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{
	[CrmEntityLogicalNameAttribute(incident.EntityName)]
	public class ApplicationHeader
	{
		[CrmFieldLogicalNameAttribute(incident.PrimaryKey)]
		public Guid Id { get; set; }
		[CrmFieldLogicalNameAttribute(incident.ticketnumber)]
		public string RequestNumber { get; set; }
		[CrmFieldLogicalNameAttribute(incident.createdon)]
		public DateTime SubmissionDate { get; set; }
		public string SubmissionDateString { get { return SubmissionDate != DateTime.MinValue ? SubmissionDate.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture) : null; } }
		[CrmFormattedValueAtrribute(incident.ldv_casetype)]
		public string ServiceCode { get; set; }
		public string ServiceNameEn { get; set; }
		public string ServiceNameAr { get; set; }
		public string ServiceName => ServiceNameAr;
		[CrmFormattedValueAtrribute(incident.statuscode)]
		public string CRMStatusCode { get; set; }
		[CrmFormattedValueAtrribute(incident.statuscode)]
		public string PortalStatusCode { get; set; }
		public string PortalStatusNameEn { get; set; }
		public string PortalStatusNameAr { get; set; }
		public string PortalStatusName => PortalStatusCode;
		
		public EntityReferenceItem Contact { get; set; }
		public Guid ContactId
		{
			get { return Contact?.Value != null ? Contact.Value : Guid.Empty; }
			set { Contact = new EntityReferenceItem() { Value = value }; }
		}
		public List<Guid> Accounts { get; set; }
	}
}
