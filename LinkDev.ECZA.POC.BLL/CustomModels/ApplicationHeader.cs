using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper;
using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using LinkDev.ECZA.POC.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.CustomModels
{
	[CrmEntityLogicalNameAttribute(InfrastructurePermitIssuanceRequest.EntityName)]
	public class ApplicationHeader
	{
		[CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.PrimaryKey)]
		public Guid Id { get; set; }
		[CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.PrimaryName)]
		public string RequestNumber { get; set; }
		[CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.CreatedOn)]
		public DateTime SubmissionDate { get; set; }
		public string SubmissionDateString { get { return SubmissionDate != DateTime.MinValue ? SubmissionDate.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture) : null; } }
		//[CrmFormattedValueAtrribute(InfrastructurePermitIssuanceRequest.ldv_casetype)]
		public string ServiceCode { get; set; }
		public string ServiceNameEn { get; set; }
		public string ServiceNameAr { get; set; }
		public string ServiceName => ServiceNameAr;
		[CrmFormattedValueAtrribute(InfrastructurePermitIssuanceRequest.StatusReason)]
		public string CRMStatusCode { get; set; }
		[CrmFormattedValueAtrribute(InfrastructurePermitIssuanceRequest.StatusReason)]
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
