using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.Caching;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Common.Core.Helpers
{
	public class Caching
	{
		#region Private Variables
		private CrmServiceClient Client;
		#endregion

		public Caching(CrmServiceClient client)
		{
			this.Client = client;
		}

		/// <summary>
		///     Gets the object from the MemCache.<br />
		///     Author: Ahmed el-Sawalhy
		/// </summary>
		/// <param name="key">The string key for the object to get.</param>
		public TItemType GetFromMemCache<TItemType>(string key)
		{
			ObjectCache cache = MemoryCache.Default;

			if (Client != null && cache.Contains(Client.OrganizationServiceProxy.ClientCredentials.UserName.UserName + Client.OrganizationServiceProxy.EndpointSwitch.PrimaryEndpoint.AbsoluteUri + key))
			{
				return (TItemType)cache.Get(Client.OrganizationServiceProxy.ClientCredentials.UserName.UserName + Client.OrganizationServiceProxy.EndpointSwitch.PrimaryEndpoint.AbsoluteUri + key);
			}

			return default(TItemType);
		}

		/// <summary>
		///     Removes the object from the MemCache.<br />
		///     Author: Ahmed el-Sawalhy
		/// </summary>
		/// <param name="key">The string key for the object to remove.</param>
		public void RemoveFromMemCache(string key)
		{
			ObjectCache cache = MemoryCache.Default;

			if (cache.Contains(Client.OrganizationServiceProxy.ClientCredentials.UserName.UserName + Client.OrganizationServiceProxy.EndpointSwitch.PrimaryEndpoint.AbsoluteUri + key))
			{
				cache.Remove(Client.OrganizationServiceProxy.ClientCredentials.UserName.UserName + Client.OrganizationServiceProxy.EndpointSwitch.PrimaryEndpoint.AbsoluteUri + key);
			}
		}

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

			RemoveFromMemCache(Client.OrganizationServiceProxy.ClientCredentials.UserName.UserName + Client.OrganizationServiceProxy.EndpointSwitch.PrimaryEndpoint.AbsoluteUri + key);

			if (slidingExpiration != null)
			{
				var policy = new CacheItemPolicy { SlidingExpiration = slidingExpiration.Value };

				if (offset != null)
				{
					policy.AbsoluteExpiration = offset.Value;
				}

				cache.Add(Client.OrganizationServiceProxy.ClientCredentials.UserName.UserName + Client.OrganizationServiceProxy.EndpointSwitch.PrimaryEndpoint.AbsoluteUri + key, item, policy);
			}

			cache.Add(Client.OrganizationServiceProxy.ClientCredentials.UserName.UserName + Client.OrganizationServiceProxy.EndpointSwitch.PrimaryEndpoint.AbsoluteUri + key, item, offset ?? ObjectCache.InfiniteAbsoluteExpiration);
		}

	}

	public static class CashingTerms
	{
		public static double shortTerm = double.Parse(ConfigurationManager.AppSettings["CashingShortTerm"]);
		public static double midTerm = double.Parse(ConfigurationManager.AppSettings["CashingMidTerm"]);
		public static double longTerm = double.Parse(ConfigurationManager.AppSettings["CashingLongTerm"]);
	}
}
