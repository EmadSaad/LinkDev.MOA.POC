using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{
	public class GridResultBase<T>
	{
		public List<T> Data { get; set; }
		public int TotalNumber { get; set; }
		public int NumberPerPage { get; set; }
	}
}
