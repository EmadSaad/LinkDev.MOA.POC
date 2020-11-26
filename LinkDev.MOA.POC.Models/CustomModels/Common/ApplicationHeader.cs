using LinkDev.MOA.POC.Common.Core.Helpers;
using LinkDev.MOA.POC.Common.Core.Helpers.CRMMapper;
using LinkDev.MOA.POC.Common.Core.Helpers.CRMMapper.CRMMapperAttributes;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Models.CustomModels.Common
{
	[CrmEntityLogicalNameAttribute("ldv_applicationheader.EntityName")]
	public class ApplicationHeader
	{
		[CrmFieldLogicalNameAttribute("ldv_applicationheader.PrimaryKey")]
		public Guid Id { get; set; }
		[CrmFieldLogicalNameAttribute("ldv_applicationheader.PrimaryName")]
		public string RequestNumber { get; set; }
		[CrmFieldLogicalNameAttribute("ldv_applicationheader.ldv_submissiondate")]
		public DateTime SubmissionDate { get; set; }
		public string SubmissionDateString { get { return SubmissionDate != DateTime.MinValue ? SubmissionDate.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture) : null; } }
		[CrmFieldLogicalNameAttribute("ldv_applicationheader.ldv_serviceid")]
		[CrmEntityRefrenceCodeLogicalNameAtrribute("ldv_service.EntityName", "ldv_service.ldv_code", "Service")]
		public string ServiceCode { get; set; }
		public string ServiceNameEn { get; set; }
		public string ServiceNameAr { get; set; }
		public string ServiceName { get { return LanguageHelper.IsArabic ? ServiceNameAr : ServiceNameEn; } }
		[CrmFieldLogicalNameAttribute("ldv_applicationheader.ldv_crmrequeststatus")]
		[CrmEntityRefrenceCodeLogicalNameAtrribute("ldv_requeststatus.EntityName", "ldv_requeststatus.ldv_code", "CRMStatus")]
		public string CRMStatusCode { get; set; }
		[CrmFieldLogicalNameAttribute("ldv_applicationheader.ldv_portalrequeststatus")]
		[CrmEntityRefrenceCodeLogicalNameAtrribute("ldv_requeststatus.EntityName", "ldv_requeststatus.ldv_code", "PortalStatus")]
		public string PortalStatusCode { get; set; }
		public string PortalStatusNameEn { get; set; }
		public string PortalStatusNameAr { get; set; }
		public string PortalStatusName { get { return LanguageHelper.IsArabic ? PortalStatusNameAr : PortalStatusNameEn; } }
		[CrmFieldLogicalNameAttribute("ldv_applicationheader.ldv_contactid")]
		[CrmEntityRefrenceLogicalNameAtrribute("ContactEntity.EntityName")]
		public EntityReferenceItem Contact { get; set; }
		public Guid ContactId
		{
			get { return Contact?.Value != null ? Contact.Value : Guid.Empty; }
			set { Contact = new EntityReferenceItem() { Value = value }; }
		}
		public List<Guid> Accounts { get; set; }
	}
}
