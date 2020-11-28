using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper
{
	public sealed class OptionSetItem
	{
		public string OptionSetName { get; set; }
		public string Name { get; set; }
		public int Value { get; set; }

		public OptionSetItem()
		{
		}

		public OptionSetItem(string OptionSetLogicalName, string name, Microsoft.Xrm.Sdk.OptionSetValue optionSetValue)
		{
			OptionSetName = OptionSetLogicalName;
			Name = name;
			Value = optionSetValue.Value;
		}

		public override bool Equals(object obj)
		{
			//Check for null and compare run-time types.
			if ((obj == null) || !this.GetType().Equals(obj.GetType()))
			{
				return false;
			}
			else
			{
				var p = (OptionSetItem)obj;
				return (Name == p.Name) && (Value == p.Value) && (OptionSetName == p.OptionSetName);
			}
		}

		public override int GetHashCode()
		{
			return Tuple.Create(Name, Value).GetHashCode();
		}

		public override string ToString()
		{
			return $"{nameof(OptionSetName)} = \"{OptionSetName}\", {nameof(Name)} = \"{Name}\", {nameof(Value)} = {Value}";
		}

		public static implicit operator OptionSetItem(Microsoft.Xrm.Sdk.OptionSetValue value)
		{
			return new OptionSetItem("", "", value);
		}

		public static explicit operator Microsoft.Xrm.Sdk.OptionSetValue(OptionSetItem value)
		{
			return new Microsoft.Xrm.Sdk.OptionSetValue(value.Value);
		}

		public static bool operator ==(OptionSetItem x, OptionSetItem y)
		{
			if (x == null && y == null)
				return true;

			if (x == null || y == null)
				return false;

			return x.Equals(y);
		}

		public static bool operator !=(OptionSetItem x, OptionSetItem y)
		{
			return !x.Equals(y);
		}
	}

}
