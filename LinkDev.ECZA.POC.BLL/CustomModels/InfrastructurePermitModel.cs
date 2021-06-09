using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using LinkDev.ECZA.POC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.CustomModels
{
    [CrmEntityLogicalNameAttribute(InfrastructurePermitIssuanceRequest.EntityName)]
    public class InfrastructurePermitModel
    {
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.PrimaryKey)]
        public string Id { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.DesignConsultant)]
        public string DesignConsultantId { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.DesignReviewConsultant)]
        public string DesignReviewConsultantId { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.ClientaccountECAID)]
        public string ClientAccountECAID { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.PrequalifiedConsultantaccountECAID)]
        public string PrequalifiedConsultantAccountECAID { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.PRN)]
        public string PRN { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.PIN)]
        public string PIN { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.LandArea)]
        public string LandArea { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.CityArabicName)]
        public string City { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.DistrictArabicName)]
        public string District { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.NeighborhoodArabicName)]
        public string Neighborhood { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.Floor)]
        public string Floor { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.Unit)]
        public string Unit { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.StreetArabicName)]
        public string Street { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.TotalUnits)]
        public string TotalUnits { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.ProposedUsage)]
        public string ProposedUsage { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.ExistingUSage)]
        public string ExistingUSage { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.BuildingArea)]
        public string BuildingArea { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.UsedArea)]
        public string UsedArea { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.BasementArea)]
        public string BasementArea { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.RoofArea)]
        public string RoofArea { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.ParkingArea)]
        public string ParkingArea { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.OtherArea)]
        public string OtherArea { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.ProjectTitle)]
        public string ProjectTitle { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.Description)]
        public string Description { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.Location)]
        public string Location { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.SiteArea)]
        public string SiteArea { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.BuildingHeight)]
        public string BuildingHeight { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.ProjectType)]
        public string ProjectType { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.ProjectCostUSD)]
        public decimal ProjectCostUSD { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.ProjectCostSAR)]
        public decimal ProjectCostSAR { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.ExemptionType)]
        public string ExemptionType { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.ExemptionAmount)]
        public string ExemptionAmount { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.TotalFees)]
        public decimal TotalFees { get; set; }
        [CrmFieldLogicalNameAttribute(InfrastructurePermitIssuanceRequest.FinalFees)]
        public decimal FinalFees { get; set; }

    }
}
