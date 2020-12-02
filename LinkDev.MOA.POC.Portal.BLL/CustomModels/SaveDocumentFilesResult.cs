using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{
	public class SaveDocumentFilesResult
	{
		public bool Result { get; set; }
		public string Error { get; set; }
		public List<FileInfoModel> Files { get; set; }
	}
}
