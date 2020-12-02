using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.ServiceModel.Description;
using System.Web;

namespace LinkDev.MOA.POC.Portal.API.Helpers.CRMConnector
{
	public class CRMConnector
	{
		
		private static CrmServiceClient _CRMServiceClientAr;
		public static CrmServiceClient CRMAccess
		{
			get
			{
				
					return GetArabicServiceClient();
			}
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
			clientCred.UserName.UserName = "emad.beshai@linkdev.com";
			clientCred.UserName.Password = "linkP@ss";

			var proxy = new OrganizationServiceProxy(url, null, clientCred, null);
			proxy.Timeout = new TimeSpan(0, 0, 30, 0);
			var createdConnetion = new CrmServiceClient(proxy);


			if (!createdConnetion.IsReady)
				throw createdConnetion.LastCrmException;

			SaveCRMConnection(createdConnetion);
			return createdConnetion;
		}

		
		

		private static void SaveCRMConnection(CrmServiceClient connection)
		{
			
				_CRMServiceClientAr = connection;
			
		}

	}
}