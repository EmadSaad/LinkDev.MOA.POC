using LinkDev.MOA.POC.BLL.Base;
using LinkDev.MOA.POC.Common.Core.Helpers.CRMMapper;
using LinkDev.MOA.POC.Models.CustomModels.Common;
using LinkDev.MOA.POC.Models.CustomModels.Common.EServices;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.BLL.Common.EServices
{
    public class EServicesCommonBLL : BaseBLL
    {
        public EServiceModel<T> GetEServiceModel<T>(QueryExpression query)
        {
            var applicationHeaderLink = query.AddLink("ldv_applicationheader.EntityName", "ldv_requestheaderid"," ldv_applicationheader.PrimaryKey", JoinOperator.LeftOuter);
            applicationHeaderLink.EntityAlias = "AppHeader";

            /*applicationHeaderLink.Columns.AddColumns(ldv_applicationheader.PrimaryName, ldv_applicationheader.ldv_contactid, ldv_applicationheader.PrimaryKey, ldv_applicationheader.ldv_submissiondate);

            var serviceLink = applicationHeaderLink.AddLink(ldv_service.EntityName, ldv_applicationheader.ldv_serviceid, ldv_service.PrimaryKey, JoinOperator.LeftOuter);
            serviceLink.EntityAlias = "Service";

            serviceLink.Columns.AddColumns(ldv_service.ldv_code, ldv_service.ldv_name_ar, ldv_service.ldv_name_en);

            var statusLink = applicationHeaderLink.AddLink(ldv_requeststatus.EntityName, ldv_applicationheader.ldv_crmrequeststatus, ldv_requeststatus.PrimaryKey, JoinOperator.LeftOuter);
            statusLink.EntityAlias = "CRMStatus";

            statusLink.Columns.AddColumns(ldv_requeststatus.ldv_code);

            var portalStatusLink = applicationHeaderLink.AddLink(ldv_requeststatus.EntityName, ldv_applicationheader.ldv_portalrequeststatus, ldv_requeststatus.PrimaryKey, JoinOperator.LeftOuter);
            portalStatusLink.EntityAlias = "PortalStatus";

            portalStatusLink.Columns.AddColumns(ldv_requeststatus.ldv_nameen, ldv_requeststatus.ldv_code, ldv_requeststatus.ldv_namear);
            */
            var request = CRMAccess.RetrieveMultiple(query);

            if (request != null && request.Entities?.Count > 0)
            {
                EServiceModel<T> model = new EServiceModel<T>();
                Entity retrievedRequest = request.Entities.FirstOrDefault();

                T requestModel = CrmMapper.ConvertToT<T>(retrievedRequest);
                model.Request = requestModel;

                ApplicationHeader appHeader = CrmMapper.ConvertToT<ApplicationHeader>(retrievedRequest, "AppHeader");

                string serviceNameEn = retrievedRequest.GetAttributeValue<AliasedValue>($"Service.{"ldv_service.ldv_name_en"}")?.Value?.ToString();
                string serviceNameAr = retrievedRequest.GetAttributeValue<AliasedValue>($"Service.{"ldv_service.ldv_name_ar"}")?.Value?.ToString();
                string PortalStatusNameEn = retrievedRequest.GetAttributeValue<AliasedValue>($"PortalStatus.{"ldv_requeststatus.ldv_nameen"}")?.Value?.ToString();
                string PortalStatusNameAr = retrievedRequest.GetAttributeValue<AliasedValue>($"PortalStatus.{"ldv_requeststatus.ldv_namear"}")?.Value?.ToString();

                appHeader.ServiceNameAr = serviceNameAr;
                appHeader.ServiceNameEn = serviceNameEn;
                appHeader.PortalStatusNameEn = PortalStatusNameEn;
                appHeader.PortalStatusNameAr = PortalStatusNameAr;

                model.ApplicationHeader = appHeader;

                return model;
            }
            return null;

        }

        /*public List<RequestComment> GetRequestComments(Guid regardingID)
        {
            var taskCollection = GetTaskDetail(regardingID);

            return (from taskRecord in taskCollection
                    where (taskRecord.GetAttributeValue<string>(task.ldv_decisioncomment)) != null
                    select new RequestComment()
                    {
                        Comment = taskRecord.GetAttributeValue<string>(task.ldv_decisioncomment),
                        CreatedOn = taskRecord.GetAttributeValue<DateTime>(task.actualend),
                    }).ToList();
        }*/

      
    
      


    }
}
