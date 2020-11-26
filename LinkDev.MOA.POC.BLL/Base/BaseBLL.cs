using LinkDev.MOA.POC.BLL.Common.EServices;
using LinkDev.MOA.POC.Common.Core.Helpers;
using LinkDev.MOA.POC.DAL.CRM;
using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.BLL.Base
{
	public abstract class BaseBLL
	{
		protected bool IsArabic { get { return LanguageHelper.IsArabic; } }
		protected CrmServiceClient CRMAccess { get { return CRMConnector.CRMAccess; } }
		protected Caching Caching { get { return new Caching(CRMAccess); } }
		private EServicesCommonBLL _eserviceCommon;
		protected EServicesCommonBLL EServiceCommon
		{
			get
			{
				if (_eserviceCommon == null)
					_eserviceCommon = new EServicesCommonBLL();

				return _eserviceCommon;
			}
		}
		protected void ThrowError(string message)
		{
			throw new Exception($"0x01 | {message}");
		}
	}
}
