using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Common.Core.Helpers.CRMMapper
{
	public sealed class MultiSelectItem
	{
		public string OptionSetName { get; set; }
		public List<OptionSetItem> OptionSetItems { get; set; }

		public MultiSelectItem()
		{
			OptionSetItems = new List<OptionSetItem>();
		}

		public MultiSelectItem(string optionSetName, Microsoft.Xrm.Sdk.OptionSetValueCollection optionSetItems)
		{
			OptionSetName = optionSetName;
			OptionSetItems = new List<OptionSetItem>();
			foreach (var item in optionSetItems)
			{
				OptionSetItems.Add(new OptionSetItem(OptionSetName, string.Empty, item));
			}
		}

		public MultiSelectItem(string optionSetName, List<OptionSetItem> optionSetItems)
		{
			OptionSetName = optionSetName;
			OptionSetItems = optionSetItems;
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
				var p = (MultiSelectItem)obj;
				return (OptionSetItems == p.OptionSetItems) && (OptionSetName == p.OptionSetName);
			}
		}

		public override int GetHashCode()
		{
			return OptionSetItems.GetHashCode();
		}

		public override string ToString()
		{
			return $"{nameof(OptionSetItems.Count)} = {OptionSetItems.Count}";
		}

		public static implicit operator MultiSelectItem(Microsoft.Xrm.Sdk.OptionSetValueCollection optionSetValues)
		{
			return new MultiSelectItem(string.Empty, optionSetValues);
		}

		public static explicit operator Microsoft.Xrm.Sdk.OptionSetValueCollection(MultiSelectItem multiSelectItem)
		{
			var tmp = new Microsoft.Xrm.Sdk.OptionSetValueCollection();
			foreach (var item in multiSelectItem.OptionSetItems)
			{
				tmp.Add((Microsoft.Xrm.Sdk.OptionSetValue)item);
			}

			return tmp;
		}
	}

}
