using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Common.Core.Helpers.CRMMapper.CRMMapperAttributes
{

	public sealed class AttributesMapperCollection : ICollection<KeyValuePair<Tuple<Type, Type>, Func<object, object>>>
	{
		IDictionary<Tuple<Type, Type>, Func<object, object>> Dictionary { get; set; }
		public int Count => Dictionary.Count;

		public bool IsReadOnly => Dictionary.IsReadOnly;

		public AttributesMapperCollection()
		{
			Dictionary = new Dictionary<Tuple<Type, Type>, Func<object, object>>();
		}

		public Func<object, object> this[Type source, Type distination]
		{
			get
			{
				return Dictionary[new Tuple<Type, Type>(source, distination)];
			}
		}

		public void Add(KeyValuePair<Tuple<Type, Type>, Func<object, object>> item)
		{
			Dictionary.Add(item);
		}

		public void Add<TSource, TDistination>(Func<TSource, TDistination> func)
		{
			Add(
				new KeyValuePair<Tuple<Type, Type>, Func<object, object>>(
					new Tuple<Type, Type>(typeof(TSource), typeof(TDistination)),
					func1 => func((TSource)func1)));
		}

		public void Clear()
		{
			Dictionary.Clear();
		}

		public bool Contains(KeyValuePair<Tuple<Type, Type>, Func<object, object>> item)
		{
			return Dictionary.Contains(item);
		}

		public bool Contains(Type source, Type distination)
		{
			return Dictionary.ContainsKey(new Tuple<Type, Type>(source, distination));
		}

		public void CopyTo(KeyValuePair<Tuple<Type, Type>, Func<object, object>>[] array, int arrayIndex)
		{
			Dictionary.CopyTo(array, arrayIndex);
		}

		public IEnumerator<KeyValuePair<Tuple<Type, Type>, Func<object, object>>> GetEnumerator()
		{
			return Dictionary.GetEnumerator();
		}

		public bool Remove(KeyValuePair<Tuple<Type, Type>, Func<object, object>> item)
		{
			return Dictionary.Remove(item);
		}

		IEnumerator IEnumerable.GetEnumerator()
		{
			return Dictionary.GetEnumerator();
		}

		public object Convert(Type sourceType, Type distinationType, object value)
		{
			if (Contains(sourceType, distinationType))
			{
				return this[sourceType, distinationType].Invoke(value);
			}
			else
			{
				return System.Convert.ChangeType(value, distinationType);
			}
		}
	}

	public sealed class AttributesToCrmMapperCollection : ICollection<KeyValuePair<Type, Func<object, object>>>
	{
		IDictionary<Type, Func<object, object>> Dictionary { get; set; }
		public int Count => Dictionary.Count;

		public bool IsReadOnly => Dictionary.IsReadOnly;

		public AttributesToCrmMapperCollection()
		{
			Dictionary = new Dictionary<Type, Func<object, object>>();
		}

		public Func<object, object> this[Type source]
		{
			get
			{
				return Dictionary[source];
			}
		}

		public void Add(KeyValuePair<Type, Func<object, object>> item)
		{
			Dictionary.Add(item);
		}

		public void Add(Type sourceType, Func<object, object> func)
		{
			Add(new KeyValuePair<Type, Func<object, object>>(sourceType, func));
		}

		public void Add<TSource, TDistination>(Func<TSource, TDistination> func)
		{
			Add(
				new KeyValuePair<Type, Func<object, object>>(
					typeof(TSource),
					func1 => func((TSource)func1)));
		}

		public void Clear()
		{
			Dictionary.Clear();
		}

		public bool Contains(KeyValuePair<Type, Func<object, object>> item)
		{
			return Dictionary.Contains(item);
		}

		public bool Contains(Type source)
		{
			return Dictionary.ContainsKey(source);
		}

		public void CopyTo(KeyValuePair<Type, Func<object, object>>[] array, int arrayIndex)
		{
			Dictionary.CopyTo(array, arrayIndex);
		}

		public IEnumerator<KeyValuePair<Type, Func<object, object>>> GetEnumerator()
		{
			return Dictionary.GetEnumerator();
		}

		public bool Remove(KeyValuePair<Type, Func<object, object>> item)
		{
			return Dictionary.Remove(item);
		}

		IEnumerator IEnumerable.GetEnumerator()
		{
			return Dictionary.GetEnumerator();
		}

		public object Convert(Type sourceType, object value)
		{
			if (Contains(sourceType))
			{
				return this[sourceType].Invoke(value);
			}
			else
			{
				throw new Exception($"Unkown type '{sourceType.Name}' to convert it");
			}
		}
	}
}
