import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormGuideComponent } from "src/modules/shared/form-guide/form-guide.component";
import { AlertComponent } from "src/modules/shared/form-guide/alerts/components/alerts.component";
import { ProfileGuardService } from "src/modules/Guards/ProfileGuard.guard ";
import { AuthGuardService } from "src/modules/Guards/AuthGuard.guard ";
import { NotFoundComponent } from "./not-found/not-found.component";


const routes: Routes = [
  { path: '', loadChildren: 'src/modules/home/home.module#HomeModule', canActivate: [] },
  { path: "form-guide", component: FormGuideComponent, canActivate: [] },
  { path: 'auth', loadChildren: 'src/modules/auth/auth.module#AuthModule', canActivate: [] },
  { path: 'test-service', loadChildren: 'src/modules/TestService/test-service/test-service.module#TestServiceModule', canActivate: [] },
  { path: 'factory-inside-factory', loadChildren: 'src/modules/factory-inside-factory/factory-inside-factory.module#FactoryInsideFactoryModule', canActivate: [] },
  { path: 'plan-approval', loadChildren: 'src/modules/Plan-Approval/Plan-Approval.module#PlanApprovalModule', canActivate: [] },
  { path: 'building-license-request', loadChildren: 'src/modules/Building-License-Request/building-license-request.module#BuildingLicenseRequestModule', canActivate: [] },
  { path: "Profile-Managment", loadChildren: 'src/modules/Profile-Managment/Profile-Managment.module#ProfileManagmentModule', canActivate: [] },
  // This path name is pointing to the configred services in CRM Dyanmic
  { path: "ticket-details", loadChildren: 'src/modules/Ticket-Details/Ticket-Details.module#TicketManagementModule', canActivate: [] },
  { path: "new-ticket", loadChildren: 'src/modules/Ticket-Management/Ticket-Management.module#TicketManagementModule', canActivate: [] },
  { path: "CR-Managment", loadChildren: 'src/modules/CR-Management/CR-Management.module#CRManagementModule', canActivate: [AuthGuardService] },
  { path: 'contract-submission', loadChildren: 'src/modules/Contract-Submission/contract-submission.module#ContractSubmissionModule', canActivate: [AuthGuardService] },
  { path: 'Construction-Report-Request', loadChildren: 'src/modules/Construction-Report-Request/Construction-Report-Request.module#ConstructionReportRequestModule', canActivate: [] },
  { path: 'Consulting-Office-Qualification', loadChildren: 'src/modules/Consulting-Office-Qualification/Consulting-Office-Qualification.module#ConsultingOfficeQualificationModule', canActivate: [] },
  { path: 'notification', component: AlertComponent, canActivate: [] },
  { path: 'Contractor-Qualification-Request', loadChildren: 'src/modules/Contractor-Qualification/contractor-qualification-request.module#ContractorQualificationRequestModule',canActivate: [] },
  { path: 'workspace', loadChildren: 'src/modules/workspace/workspace.module#WorkspaceModule', canActivate: [AuthGuardService] },
  { path: 'outputs', loadChildren: 'src/modules/outputs/outputs.module#OutputsModule' },
  { path: 'Permits-Letter', loadChildren: 'src/modules/permits-letter/permits-letter.module#PermitsLetterModule' },
  { path: 'Drilling-Permit', loadChildren: 'src/modules/Drilling-Permit/Drilling-Permit.module#DrillingPermitModule' },
  { path: 'coordination-letter', loadChildren: 'src/modules/Coordination-Letter/Coordination-Letter.module#CoordinationLetterModule', canActivate: [] },
  { path: 'modon-services', loadChildren: 'src/modules/Portal-Services/portal-services.module#PortalServicesModule' },
  { path: 'partial-building-request', loadChildren:'src/modules/Partial-Building-Request/partial-building-request.module#PartialBuildingRequestModule', canActivate: [] },
  { path: 'contract-edit', loadChildren: 'src/modules/Contract-Edit/contract-edit.module#ContractEditModule', canActivate: [AuthGuardService] },
  { path: 'contract-merge', loadChildren: 'src/modules/Contract-Merge/contract-merge.module#ContractMergeModule', canActivate: [] },
{ path:'moa-cases', loadChildren: 'src/modules/MOA-Cases/moa-cases.module#MoaCasesModule', canActivate: []},
  {path: 'create-case', loadChildren: 'src/modules/MOA-CreateCase/MOA-CreateCase.module#MOACreateCaseModule',canActivate:[]},
{ path: 'contract-split', loadChildren: 'src/modules/Split-Request/split-request.module#SplitRequestModule', canActivate: [] },
  { path: 'contract-update', loadChildren: 'src/modules/Contract-Update/contract-update.module#ContractUpdateModule', canActivate: [AuthGuardService] },
  { path: 'operating-license-request', loadChildren:'src/modules/Operating-License-Request/operating-license-request.module#OperatingLicenseRequestModule', canActivate: [] },
  { path: "**", redirectTo: "not-found" },
  { path: "not-found", component: NotFoundComponent },


];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
