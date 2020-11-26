using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Common.Core.Helpers.CRMMapper
{
	public sealed class PriceItem
	{
		public decimal Value { get; set; }

		public PriceItem()
		{
		}

		public PriceItem(Microsoft.Xrm.Sdk.Money money)
		{
			Value = money.Value;
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
				var p = (PriceItem)obj;
				return Value == p.Value;
			}
		}
		public override int GetHashCode()
		{
			return Tuple.Create(Value).GetHashCode();
		}
		public override string ToString()
		{
			return $"{nameof(Value)}={Value}";
		}

		public static implicit operator PriceItem(Microsoft.Xrm.Sdk.Money money)
		{
			if (money == null)
				return null;
			else return new PriceItem(money);
		}

		public static explicit operator Microsoft.Xrm.Sdk.Money(PriceItem priceItem)
		{
			if (priceItem is null)
				return null;
			else return new Microsoft.Xrm.Sdk.Money(priceItem.Value);
		}

		public static bool operator ==(PriceItem x, PriceItem y)
		{
			if (!(x is null))
				return x.Equals(y);
			else return false;
		}

		public static bool operator !=(PriceItem x, PriceItem y)
		{
			return !(x == y);
		}
	}
}
