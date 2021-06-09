using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.CustomModels
{
	public class FileInfoModel
	{
		public byte[] Content { get; set; }
		[CrmFieldLogicalNameAttribute("activityid")]
		public string FileId { get; set; }
		[CrmFieldLogicalNameAttribute("subject")]
		public string FileName { get; set; }
		public string FileExtension { get; set; }

		public double FileSize => 1024;
		public string ContentType { get; set; }
		public bool IsDeleted { get; set; }
		public bool IsNewlyCreated { get; set; }
	}
}
