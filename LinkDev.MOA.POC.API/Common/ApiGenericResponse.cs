using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LinkDev.MOA.POC.API.Common
{
    public class ApiGenericResponse<T>
    {
		
			public T Content;
			public ResponseCode ResponseCode;
			public string FriendlyResponseMessage;
			public string InternalMessage;
		}
		public enum ResponseCode
		{
			Error = 0,
			Success = 1,
		}
	
}