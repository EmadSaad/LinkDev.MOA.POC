using LinkDev.ECZA.POC.BLL.Helpers.Common;
using LinkDev.ECZA.POC.BLL.Helpers.CRMConnector;
using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL
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
