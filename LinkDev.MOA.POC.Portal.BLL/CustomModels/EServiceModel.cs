using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{
	public class EServiceModel<T>
	{
		public ApplicationHeader ApplicationHeader { get; set; }
		public List<DocumentSettingModel> Documents { get; set; }
		public bool IsSubmitted { get; set; }
		public bool IsReadOnly { get; set; }
		public T Request { get; set; }
	}
}
