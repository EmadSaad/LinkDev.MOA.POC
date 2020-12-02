import { Injectable } from "@angular/core";
import { BreadCrumbItem } from "./modules/shared/breadcrumb/breadcrumb.component";

@Injectable()
export class Globals {
  // ApiUrl: string = 'http://localhost:3055/';
}

// QC
// export const DTCMAPI = "http://dtcmmiddle.linkdev.com/";

// QC- Sec
// export const DTCMAPI = "http://10.20.4.7:8070/";

// Uploaded Dev
// export const DTCMAPI = "http://10.20.4.85:8040/";

// Dev
// export const DTCMAPI = "http://localhost:5369/";

export const MODONbreadcrumbs: BreadCrumbItem[] = [
  { ComponentName: "Home", ItemTextKey: "BREADCRUMB.HOME", HasRoute: true, Parameters: "", ParentComponentName: "", Route: "" },
  { ComponentName: "FormGuide", ItemTextKey: "BREADCRUMB.FORM_GUIDE", HasRoute: true, Parameters: "", ParentComponentName: "Home", Route: "/" },
  { ComponentName: "CompleteProfile", ItemTextKey: "BREADCRUMB.COMPLETE_PROFILE", HasRoute: true, Parameters: "", ParentComponentName: "Home", Route: "/" },
  { ComponentName: "ModonServices", ItemTextKey: "BREADCRUMB.MODON_SERVICES", HasRoute: true, Parameters: "", ParentComponentName: "Home", Route: "/modon-services" },
  { ComponentName: "1", ItemTextKey: "BREADCRUMB.REQUEST_PRODUCT", HasRoute: true, Parameters: "", ParentComponentName: "ModonServices", Route: "/modon-services/services/1" },
  { ComponentName: "2", ItemTextKey: "BREADCRUMB.CONTRACT_MANAGEMENT", HasRoute: true, Parameters: "", ParentComponentName: "ModonServices", Route: "/modon-services/services/2" },
  { ComponentName: "3", ItemTextKey: "BREADCRUMB.LICENSES", HasRoute: true, Parameters: "", ParentComponentName: "ModonServices", Route: "/modon-services/services/3" },
  { ComponentName: "4", ItemTextKey: "BREADCRUMB.PermitsLetter", HasRoute: true, Parameters: "", ParentComponentName: "ModonServices", Route: "/modon-services/services/4" },
  { ComponentName: "6", ItemTextKey: "BREADCRUMB.Qualifications", HasRoute: true, Parameters: "", ParentComponentName: "ModonServices", Route: "/modon-services/services/6" },
  { ComponentName: "CoordinationLetter", ItemTextKey: "BREADCRUMB.CoordinationLetter", HasRoute: true, Parameters: "", ParentComponentName: "4", Route: "/coordination-letter" },
  { ComponentName: "ContractSubmission", ItemTextKey: "BREADCRUMB.CONTRACT_SUBMISSION", HasRoute: true, Parameters: "", ParentComponentName: "1", Route: "/contract-submission" },
  { ComponentName: "BuildingLicense", ItemTextKey: "BREADCRUMB.BUILDING_LICENSE_REQUEST", HasRoute: true, Parameters: "", ParentComponentName: "3", Route: "/building-license-request" },
  { ComponentName: "Workspace", ItemTextKey: "BREADCRUMB.WORKSPACE", HasRoute: true, Parameters: "", ParentComponentName: "Home", Route: "/workspace" },
  { ComponentName: "ContractDetails", ItemTextKey: "BREADCRUMB.CONTRACT_DETAILS", HasRoute: true, Parameters: "", ParentComponentName: "Home", Route: "/contract-details" },
  // { ComponentName: "Outputs", ItemTextKey: "BREADCRUMB.OUTPUTS", HasRoute: false, Parameters: "", ParentComponentName: "Home", Route: "/" },
  { ComponentName: "LicenseDetails", ItemTextKey: "BREADCRUMB.LICENSE_DETAILS", HasRoute: true, Parameters: "", ParentComponentName: "Home", Route: "/license-details" },
  { ComponentName: "OfficeCertificateDetails", ItemTextKey: "BREADCRUMB.OfficeCertificateDetails", HasRoute: true, Parameters: "", ParentComponentName: "Home", Route: "/Consulting-Office-Certificate-details" },
  { ComponentName: "ContractorCertificateDetails", ItemTextKey: "BREADCRUMB.ContractorCertificateDetails", HasRoute: true, Parameters: "", ParentComponentName: "Home", Route: "/Contractor-Certificate-details" },
  { ComponentName: "MyProfile", ItemTextKey: "BREADCRUMB.MYPROFILE", HasRoute: true, Parameters: "", ParentComponentName: "Home", Route: "/" },
  { ComponentName: "PartialBuildingRequest", ItemTextKey: "BREADCRUMB.PARTIAL_BUILDING_REQUEST", HasRoute: true, Parameters: "", ParentComponentName: "3", Route: "/partial-building-request" },
  { ComponentName: "OperatingLicenseRequest", ItemTextKey: "BREADCRUMB.OPERATING_LICENSE_REQUEST", HasRoute: true, Parameters: "", ParentComponentName: "3", Route: "/operating-license-request" },
  { ComponentName: "ConsultingOfficeQualification", ItemTextKey: "BREADCRUMB.Consulting_Office_Qualification", HasRoute: true, Parameters: "", ParentComponentName: "6", Route: "/Consulting-Office-Qualification" },
  { ComponentName: "SplitContract", ItemTextKey: "BREADCRUMB.SPLIT_CONTRACT", HasRoute: true, Parameters: "", ParentComponentName: "2", Route: "/contract-split" },
  { ComponentName: "ContractorQualification", ItemTextKey: "BREADCRUMB.ContractorQualification", HasRoute: true, Parameters: "", ParentComponentName: "6", Route: "/Contractor-Qualification-Request" },
  { ComponentName: "contractmerge", ItemTextKey: "BREADCRUMB.MERGE_CONTRACT", HasRoute: true, Parameters: "", ParentComponentName: "2", Route: "/contract-merge" },
  { ComponentName: "contractedit", ItemTextKey: "BREADCRUMB.CONTRACT_EDIT", HasRoute: true, Parameters: "", ParentComponentName: "2", Route: "/contract-edit" },
  { ComponentName: "Updatecontract", ItemTextKey: "BREADCRUMB.UPDATE_CONTRACT", HasRoute: true, Parameters: "", ParentComponentName: "2", Route: "/contract-update" },
    // Ticket Service
    { ComponentName: "99", ItemTextKey: "BREADCRUMB.TICKET_MANAGEMENT", HasRoute: true, Parameters: "", ParentComponentName: "ModonServices", Route: "/modon-services/services/99" },
    { ComponentName: "moacases", ItemTextKey: "BREADCRUMB.MOARequests", HasRoute: true, Parameters: "", ParentComponentName: "Home", Route: "/moa-cases" },
    { ComponentName: "moaCreateCase", ItemTextKey: "BREADCRUMB.moaCreateCase", HasRoute: true, Parameters: "", ParentComponentName: "moacases", Route: "/create-case" },
    { ComponentName: "moaPayment", ItemTextKey: "BREADCRUMB.Payment", HasRoute: true, Parameters: "", ParentComponentName: "moacases", Route: "/moa-payment" },
];
