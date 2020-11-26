using LinkDev.MOA.POC.API.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;

namespace LinkDev.MOA.POC.API.Attributes
{
	public class ExceptionHandlingFilterAttribute : ExceptionFilterAttribute
	{
		public override void OnException(HttpActionExecutedContext context)
		{
			if (context.Exception.Message.StartsWith("0x"))
			{
				int endIndex = context.Exception.Message.IndexOf("| ") + 2;
				if (endIndex > 1)
				{
					string toBeReplaced = context.Exception.Message.Substring(0, endIndex);
					var msg = context.Exception.Message.Replace(toBeReplaced, "");
					context.Response = context.Request.CreateResponse(HttpStatusCode.OK, new ApiGenericResponse<bool?>() { ResponseCode = ResponseCode.Error, InternalMessage = msg, FriendlyResponseMessage = msg });
				}
				else
				{
					
					context.Response = context.Request.CreateResponse(HttpStatusCode.InternalServerError, new ApiGenericResponse<bool?>() { ResponseCode = ResponseCode.Error, InternalMessage = context.Exception.Message, FriendlyResponseMessage = Linkdev.MOA.POC.BLL.ResourceFiles.Common.Common.Error });
				}

			}
			else
			{
				
				context.Response = context.Request.CreateResponse(HttpStatusCode.InternalServerError, new ApiGenericResponse<bool?>() { ResponseCode = ResponseCode.Error, InternalMessage = context.Exception.Message, FriendlyResponseMessage = Linkdev.MOA.POC.BLL.ResourceFiles.Common.Common.Error });
			}
		}
	}
}