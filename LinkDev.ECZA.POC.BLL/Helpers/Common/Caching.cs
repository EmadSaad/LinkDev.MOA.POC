using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.Caching;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.Helpers.Common
{
	public class Caching
	{
		#region Private Variables
		private IOrganizationService Client;
		#endregion

		public Caching(IOrganizationService client)
		{
			this.Client = client;
		}

		/// <summary>
		///     Gets the object from the MemCache.<br />
		///     Author: Ahmed el-Sawalhy
		/// </summary>
		/// <param name="key">The string key for the object to get.</param>


		/// <summary>
		///     Removes the object from the MemCache.<br />
		///     Author: Ahmed el-Sawalhy
		/// </summary>
		/// <param name="key">The string key for the object to remove.</param>


		/// <summary>
		///     Adds the given object to the MemCache. You can't use an offset with a sliding expiration together.<br />
		///     Author: Ahmed el-Sawalhy
		/// </summary>
		/// <param name="key">The string key to add this object under.</param>
		/// <param name="item">The object to add.</param>
		/// <param name="offset">
		///     [OPTIONAL] The time after which to remove the object from the cache. Not affected by the sliding
		///     expiration.
		/// </param>
		/// <param name="slidingExpiration">
		///     [OPTIONAL] The duration after which to remove the object from cache, if it was not
		///     accessed for that duration.
		/// </param>
		public void AddToMemCache(string key, object item, DateTimeOffset? offset = null, TimeSpan? slidingExpiration = null)
		{
			if (item == null)
			{
				return;
			}

			ObjectCache cache = MemoryCache.Default;



			if (slidingExpiration != null)
			{
				var policy = new CacheItemPolicy { SlidingExpiration = slidingExpiration.Value };

				if (offset != null)
				{
					policy.AbsoluteExpiration = offset.Value;
				}


			}


		}

	}

	public static class CashingTerms
	{
		public static double shortTerm = double.Parse(ConfigurationManager.AppSettings["CashingShortTerm"]);
		public static double midTerm = double.Parse(ConfigurationManager.AppSettings["CashingMidTerm"]);
		public static double longTerm = double.Parse(ConfigurationManager.AppSettings["CashingLongTerm"]);
	}
}
