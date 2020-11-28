using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.ServiceModel.Description;
using System.Web;

namespace LinkDev.MOA.POC.Portal.BLL.Helpers.CRMConnector
{
	public class CRMConnector
	{
		
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

			clientCredentials.UserName.UserName = "emad.beshai@linkdev.com";
			clientCredentials.UserName.Password = "e.s@dev44.";

			// Set security protocol to TLS 1.2 for version 9.0 of Customer Engagement Platform
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

			OrganizationServiceProxy proxy = new OrganizationServiceProxy(
				new Uri("https://presales.api.crm4.dynamics.com/XRMServices/2011/Organization.svc"),
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

	}
}