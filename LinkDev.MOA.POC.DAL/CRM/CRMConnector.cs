using LinkDev.MOA.POC.Common.Core.Helpers;
using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.ServiceModel.Description;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.DAL.CRM
{
	public class CRMConnector
	{
		private static CrmServiceClient _CRMServiceClientEn;
		private static CrmServiceClient _CRMServiceClientAr;
		public static CrmServiceClient CRMAccess
		{
			get
			{
				if (LanguageHelper.IsArabic)
					return GetArabicServiceClient();

				return GetEnglishServiceClient();
			}
		}

		private static CrmServiceClient GetEnglishServiceClient()
		{
			if (_CRMServiceClientEn != null && _CRMServiceClientEn.IsReady)
				return _CRMServiceClientEn;

			return CreateCRMConnection();
		}

		private static CrmServiceClient GetArabicServiceClient()
		{
			if (_CRMServiceClientAr != null && _CRMServiceClientAr.IsReady)
				return _CRMServiceClientAr;

			return CreateCRMConnection();
		}

		private static CrmServiceClient CreateCRMConnection()
		{
			var url = new Uri(ConfigurationManager.AppSettings["CrmOrganizationServiceUri"]);
			var clientCred = new ClientCredentials();
			clientCred.UserName.UserName = GetCRMUserName();
			clientCred.UserName.Password = GetCRMUserPassword();

			var proxy = new OrganizationServiceProxy(url, null, clientCred, null);
			proxy.Timeout = new TimeSpan(0, 0, 30, 0);
			var createdConnetion = new CrmServiceClient(proxy);


			if (!createdConnetion.IsReady)
				throw createdConnetion.LastCrmException;

			SaveCRMConnection(createdConnetion);
			return createdConnetion;
		}

		private static string GetCRMUserName()
		{
			if (LanguageHelper.IsArabic)
				return ConfigurationManager.AppSettings["CrmUserNameAr"];

			return ConfigurationManager.AppSettings["CrmUserNameEn"];
		}
		private static string GetCRMUserPassword()
		{
			if (LanguageHelper.IsArabic)
				return ConfigurationManager.AppSettings["CrmPasswordAr"];

			return ConfigurationManager.AppSettings["CrmPasswordEn"];
		}

		private static void SaveCRMConnection(CrmServiceClient connection)
		{
			if (LanguageHelper.IsArabic)
				_CRMServiceClientAr = connection;
			else
				_CRMServiceClientEn = connection;
		}

	}
}
