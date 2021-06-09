using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.ServiceModel.Description;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.Helpers.CRMConnector
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
			/*var url = new Uri(@"https://org0b3142d0.api.crm.dynamics.com/XRMServices/2011/Organization.svc");
			var clientCred = new ClientCredentials();
			clientCred.UserName.UserName = @"presalesdemo01@powerplatform360.com";
			clientCred.UserName.Password = "linkP@ss1";
			ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072;
			var proxy = new OrganizationServiceProxy(url, null, clientCred, null);
			proxy.Timeout = new TimeSpan(0, 0, 30, 0);
			var createdConnetion = new CrmServiceClient(@"AuthType=Office365;Url=https://org0b3142d0.api.crm.dynamics.com;Username=presalesdemo01@powerplatform360.com;Password=linkP@ss1;");
			*/
			string authType = "OAuth";
			string userName = "presalesdemo01@powerplatform360.com";
			string password = "linkP@ss1";
			string url = "https://org0b3142d0.api.crm.dynamics.com/XRMServices/2011/Organization.svc";
			string appId = "0b091ac5-626b-41ff-b61b-ab58b6d8165c";
			string reDirectURI = "api://0b091ac5-626b-41ff-b61b-ab58b6d8165c";
			string loginPrompt = "Never";
			string ConnectionString = string.Format("AuthType = {0};Username = {1};Password = {2}; Url = {3}; AppId={4}; RedirectUri={5};LoginPrompt={6}",
													authType, userName, password, url, appId, reDirectURI, loginPrompt);
			string clientSecret = ".PWC8Z9TNLC-z.lNiY8N7F9-0Ic.EGEc0v";
			 //string _connectionString = @"Url=https://org0b3142d0.api.crm.dynamics.com; Username=presalesdemo01@powerplatform360.com; Password=linkP@ss1; authtype=Office365";

	
            
			//CrmServiceClient createdConnetion = new CrmServiceClient(ConnectionString);
			var createdConnetion = new CrmServiceClient($@"AuthType=ClientSecret;url={url};ClientId={appId};ClientSecret={clientSecret}");

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

		/*
				private static IOrganizationService _CRMServiceClientAr;
				public static IOrganizationService CRMAccess
				{
					get
					{

						return GetArabicServiceClient();
					}
				}


				private static IOrganizationService GetArabicServiceClient()
				{
					if (_CRMServiceClientAr != null)
						return _CRMServiceClientAr;

					return CreateCRMConnection();
				}

				private static IOrganizationService CreateCRMConnection()
				{
					ClientCredentials clientCredentials = new ClientCredentials();

					clientCredentials.UserName.UserName = "presalesdemo01@powerplatform360.com";
					clientCredentials.UserName.Password = "linkP@ss1";

					// Set security protocol to TLS 1.2 for version 9.0 of Customer Engagement Platform
					ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

					OrganizationServiceProxy proxy = new OrganizationServiceProxy(
						new Uri("https://org0b3142d0.crm.dynamics.com/XRMServices/2011/Organization.svc"),
						null,
						clientCredentials,
						null);
					proxy.EnableProxyTypes();
					var createdConnetion = (IOrganizationService)proxy;





					SaveCRMConnection(createdConnetion);
					return createdConnetion;
				}




				private static void SaveCRMConnection(IOrganizationService connection)
				{

					_CRMServiceClientAr = connection;

				}
		*/
	}

}
