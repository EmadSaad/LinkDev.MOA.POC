using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{
	public class DependentField
	{
		public string PortalFieldName { get; set; }
		public DependentFieldOperator Operator { get; set; }
		public string Value { get; set; }
	}
	public enum DependentFieldOperator
	{
		greaterThan = 1,
		equal = 2,
		lessThan = 3
	}
}
