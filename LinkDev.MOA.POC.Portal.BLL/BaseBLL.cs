using LinkDev.MOA.POC.Portal.BLL.Helpers.Common;
using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMConnector;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Tooling.Connector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL
{
    public class BaseBLL
    {
        protected IOrganizationService CRMAccess { get { return CRMConnector.CRMAccess; } }
        protected Caching Caching { get { return new Caching(CRMAccess); } }

        protected void ThrowError(string message)
        {
            throw new Exception($"0x01 | {message}");
        }
    }
}
