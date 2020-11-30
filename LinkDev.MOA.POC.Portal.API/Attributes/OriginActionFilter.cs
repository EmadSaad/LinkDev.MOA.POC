using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace LinkDev.MOA.POC.Portal.API.Attributes
{

    public class OriginActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var origin = actionContext.Request.Headers?.Referrer?.Authority;

            if (!AllowedOrigins.IsAllowedOrigin(origin)/* && !SkipCrossOriginValidation(actionContext)*/)
            {
               
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }



        //private static bool SkipCrossOriginValidation(HttpActionContext actionContext)
        //{
        //    return actionContext.ActionDescriptor.GetCustomAttributes<AllowCrossOriginAttribute>().Any();
        //}
    }

    //public class AllowCrossOriginAttribute : Attribute
    //{
    //}

    public static class AllowedOrigins
    {
        public static bool IsAllowedOrigin(string currentOrigin)
        {
            //return true;
            var allowedOrigins = new List<string>();

            if (ConfigurationManager.AppSettings.AllKeys.Contains("AllowedOrigins"))
            {
                allowedOrigins = ConfigurationManager.AppSettings["AllowedOrigins"].Split(',').ToList();
            }
            if (allowedOrigins.Count > 0 && allowedOrigins.FirstOrDefault(x => x.ToLower().Trim() == currentOrigin?.ToLower().Trim()) == null)
            {
                return false;
            }
            return true;
        }
    }
}