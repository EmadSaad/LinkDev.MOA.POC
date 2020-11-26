using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Common.Core.Helpers.CRMMapper
{
	public interface IExcludable
	{
		bool IsDirty { get; }
		bool HasValue { get; }
	}

	public struct Excludable<T> : IExcludable
	{
		private bool hasValue;
		private bool isDirty;
		internal T value;


		public Excludable(T value)
		{
			this.value = value;
			if (value != null)
			{
				this.hasValue = true;
			}
			else
			{
				this.hasValue = false;
			}
			this.isDirty = true;
		}

		public bool HasValue
		{
			get
			{
				return hasValue;
			}
		}

		public bool IsDirty
		{
			get { return isDirty; }
			private set { isDirty = value; }
		}

		public T Value
		{
			get
			{
				return value;
			}
		}

		public object GetT()
		{
			return value;
		}

		public T GetValueOrDefault()
		{
			return value;
		}


		public T GetValueOrDefault(T defaultValue)
		{
			return hasValue ? value : defaultValue;
		}

		public override bool Equals(object other)
		{
			if (!isDirty || !hasValue) return other == null;
			if (other == null) return false;
			return value.Equals(other);
		}

		public override int GetHashCode()
		{
			return hasValue ? value.GetHashCode() : 0;
		}

		public override string ToString()
		{
			return $"{nameof(IsDirty)} = {IsDirty.ToString()}, {nameof(Value)} = {Value.ToString()}";
		}

		public static implicit operator Excludable<T>(T value)
		{
			return new Excludable<T>(value);
		}

		public static explicit operator T(Excludable<T> value)
		{
			if (value.Value is T)
				return (T)value.Value;
			try
			{
				return (T)Convert.ChangeType(value.Value, typeof(T));
			}
			catch (InvalidCastException exception)
			{
				throw exception;
			}
		}

		public static bool operator ==(Excludable<T> x, T y)
		{
			return x.Equals(y);
		}

		public static bool operator !=(Excludable<T> x, T y)
		{
			return !x.Equals(y);
		}
	}
}
