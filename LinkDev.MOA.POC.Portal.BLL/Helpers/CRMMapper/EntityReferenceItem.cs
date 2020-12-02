using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper
{
	public sealed class EntityReferenceItem
	{
		public string EntityLogicalName { get; set; }
		public string Name { get; set; }
		public Guid Value { get; set; }

		public EntityReferenceItem()
		{
		}

		public EntityReferenceItem(Microsoft.Xrm.Sdk.EntityReference entityReference)
		{
			EntityLogicalName = entityReference.LogicalName;
			Name = entityReference.Name;
			Value = entityReference.Id;
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
				var p = (EntityReferenceItem)obj;
				return (EntityLogicalName == p.EntityLogicalName) && (Value == p.Value) && (Name == p.Name);
			}
		}

		public override int GetHashCode()
		{
			return Tuple.Create(Name, Value).GetHashCode();
		}

		public override string ToString()
		{
			return $"{nameof(Name)}={Name}, {nameof(Value)}={Value}";
		}

		public static implicit operator EntityReferenceItem(Microsoft.Xrm.Sdk.EntityReference value)
		{
			if (value == null)
				return null;
			else return new EntityReferenceItem(value);
		}

		public static explicit operator Microsoft.Xrm.Sdk.EntityReference(EntityReferenceItem value)
		{
			if (value is null || value.Value == null || value.Value == Guid.Empty)
				return null;
			else return new Microsoft.Xrm.Sdk.EntityReference(value.EntityLogicalName, value.Value);
		}

		public static bool operator ==(EntityReferenceItem x, EntityReferenceItem y)
		{
			if (!(x is null))
				return x.Equals(y);
			else return false;
		}

		public static bool operator !=(EntityReferenceItem x, EntityReferenceItem y)
		{
			return !(x == y);
		}
	}
}
