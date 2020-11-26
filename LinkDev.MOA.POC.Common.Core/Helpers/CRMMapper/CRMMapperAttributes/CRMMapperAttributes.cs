using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Common.Core.Helpers.CRMMapper.CRMMapperAttributes
{
	[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
	public class CrmEntityLogicalNameAttribute : Attribute
	{
		public string LogicalName { get; private set; }
		public CrmEntityLogicalNameAttribute(string entityLogicalName)
		{
			LogicalName = entityLogicalName;
		}
	}

	[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
	public class CrmFieldLogicalNameAttribute : Attribute
	{
		public string FieldLogicalName { get; private set; }

		public CrmFieldLogicalNameAttribute(string fieldLogicalName)
		{
			FieldLogicalName = fieldLogicalName;
		}
	}

	[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
	public class CrmEntityLogicalIdAttribute : Attribute
	{
	}

	[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
	public class CrmEntityRefrenceLogicalNameAtrribute : Attribute
	{
		public string LogicalName { get; private set; }
		public CrmEntityRefrenceLogicalNameAtrribute(string entityLogicalName)
		{
			LogicalName = entityLogicalName;
		}
	}

	[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
	public class CrmFormattedValueAtrribute : Attribute
	{
		public string LogicalName { get; private set; }
		public CrmFormattedValueAtrribute(string fieldLogicalName)
		{
			LogicalName = fieldLogicalName;
		}
	}
	[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
	public class CrmEntityRefrenceCodeLogicalNameAtrribute : Attribute
	{
		public string LogicalName { get; private set; }
		public string FieldLogicalName { get; private set; }
		public string Alias { get; private set; }
		public CrmEntityRefrenceCodeLogicalNameAtrribute(string entityLogicalName, string fieldLogicalName, string alias)
		{
			LogicalName = entityLogicalName;
			FieldLogicalName = fieldLogicalName;
			Alias = alias;
		}
	}
	public class CrmMoneyAtrribute : Attribute
	{
		public string LogicalName { get; private set; }
		public CrmMoneyAtrribute(string entityLogicalName)
		{
			LogicalName = entityLogicalName;
		}
	}
	public class CrmoptionSetLogicalNameAtrribute : Attribute
	{
	}
	public class CrmSkipMappingAtrribute : Attribute
	{
	}

}
