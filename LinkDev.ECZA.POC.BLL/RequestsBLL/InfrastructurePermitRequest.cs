using LinkDev.ECZA.POC.BLL.CustomModels;
using LinkDev.ECZA.POC.Models;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace LinkDev.ECZA.POC.BLL.RequestsBLL
{
    public class InfrastructurePermitRequest:BaseBLL
    {

        public ApplicationPostModel PostInfrastructurePermit(EServiceModel<InfrastructurePermitModel> eServiceModel)
        {
            Entity InfrastructurePermit = new Entity(InfrastructurePermitIssuanceRequest.EntityName);
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.DesignConsultant] = new EntityReference(DesignConsultant.EntityName, Guid.Parse(eServiceModel.Request.DesignConsultantId));
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.DesignReviewConsultant] = new EntityReference(DesignConsultant.EntityName, Guid.Parse(eServiceModel.Request.DesignReviewConsultantId));
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.ClientaccountECAID] =eServiceModel.Request.ClientAccountECAID;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.PrequalifiedConsultantaccountECAID] =eServiceModel.Request.PrequalifiedConsultantAccountECAID;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.PRN] = eServiceModel.Request.PRN;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.PIN] = eServiceModel.Request.PIN;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.LandArea] = eServiceModel.Request.LandArea;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.CityArabicName] = eServiceModel.Request.City;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.DistrictArabicName] = eServiceModel.Request.District;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.NeighborhoodArabicName] = eServiceModel.Request.Neighborhood;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.Floor] = eServiceModel.Request.Floor;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.Unit] = eServiceModel.Request.Unit;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.StreetArabicName] = eServiceModel.Request.Street;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.TotalUnits] = eServiceModel.Request.TotalUnits;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.ProposedUsage] = eServiceModel.Request.ProposedUsage;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.ExistingUSage] = eServiceModel.Request.ExistingUSage;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.BuildingArea] = eServiceModel.Request.BuildingArea;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.UsedArea] = eServiceModel.Request.UsedArea;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.BasementArea] = eServiceModel.Request.BasementArea;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.RoofArea] = eServiceModel.Request.RoofArea;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.ParkingArea] = eServiceModel.Request.ParkingArea;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.OtherArea] = eServiceModel.Request.OtherArea;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.ProjectTitle] = eServiceModel.Request.ProjectTitle;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.Description] = eServiceModel.Request.Description;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.Location] = eServiceModel.Request.Location;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.SiteArea] = eServiceModel.Request.SiteArea;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.BuildingHeight] = eServiceModel.Request.BuildingHeight;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.ProjectType] = eServiceModel.Request.ProjectType;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.ProjectCostUSD] = new Money(eServiceModel.Request.ProjectCostUSD);
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.ProjectCostSAR] = new Money(eServiceModel.Request.ProjectCostSAR);
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.ExemptionType] = eServiceModel.Request.ExemptionType;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.ExemptionAmount] = eServiceModel.Request.ExemptionAmount;
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.TotalFees] = new Money(eServiceModel.Request.TotalFees);
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.FinalFees] = new Money(eServiceModel.Request.FinalFees);
            InfrastructurePermit[InfrastructurePermitIssuanceRequest.Applicant] = new EntityReference("contact", Guid.Parse(WebConfigurationManager.AppSettings["ContactId"]));
            Guid InfrastructurePermitId = Guid.Empty;
            if (string.IsNullOrEmpty(eServiceModel.Request.Id))
             InfrastructurePermitId = CRMAccess.Create(InfrastructurePermit);
            else
            {
                InfrastructurePermitId =Guid.Parse(eServiceModel.Request.Id);
                InfrastructurePermit.Id = InfrastructurePermitId;
                CRMAccess.Update(InfrastructurePermit);
            }
            var request = new ExecuteMultipleRequest()
            {
                Requests = new OrganizationRequestCollection(),
                Settings = new ExecuteMultipleSettings
                {
                    ContinueOnError = false,
                    ReturnResponses = true
                }
            };


           foreach (var document in eServiceModel.Documents)
            {
                foreach (var file in document.Files)
                {
                    Entity documentActivity = new Entity("ldv_documents", Guid.Parse(file.FileId));
                    documentActivity["regardingobjectid"] = new EntityReference(InfrastructurePermitIssuanceRequest.EntityName, InfrastructurePermitId);


                    var createRequest = new UpdateRequest()
                    {
                        Target = documentActivity
                    };
                    request.Requests.Add(createRequest);
                }

            }
            var response = (ExecuteMultipleResponse)CRMAccess.Execute(request);
            var InfrastructurePermitAttr = CRMAccess.Retrieve(InfrastructurePermitIssuanceRequest.EntityName, InfrastructurePermitId, new ColumnSet(InfrastructurePermitIssuanceRequest.PrimaryName));
            var InfrastructurePermitNumber = string.Empty;
            if(InfrastructurePermitAttr.Attributes.Contains(InfrastructurePermitIssuanceRequest.PrimaryName))
                InfrastructurePermitNumber = InfrastructurePermitAttr[InfrastructurePermitIssuanceRequest.PrimaryName].ToString();
            return new ApplicationPostModel
            {
                RequestId = InfrastructurePermitId,
                RequestNumber = InfrastructurePermitNumber
            };
           
        }
    }
}
