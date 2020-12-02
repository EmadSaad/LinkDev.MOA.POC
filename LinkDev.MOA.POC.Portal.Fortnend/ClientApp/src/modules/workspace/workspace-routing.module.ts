import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';
import { MyRequestsComponent } from './components/my-requests/my-requests.component';
import { MyBiddingsComponent } from './components/my-biddings/my-biddings.component';
import { MyAvailableBiddingsComponent } from './components/my-available-biddings/my-available-biddings.component';
import { MyTestComponent } from './components/my-test/my-test.component';
import { MyContractsComponent } from './components/my-contracts/my-contracts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyLicensesComponent } from './components/my-licenses/my-licenses.component';
import { RequestsComponent } from './components/requests/requests.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MyDashboardComponent } from './components/my-dashboard/my-dashboard.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { LicensesComponent } from './components/licenses/licenses.component';
import { AvailableBiddingsComponent } from './components/available-biddings/available-biddings.component';
import { WonBiddingsComponent } from './components/won-biddings/won-biddings.component';
import { PermitRequestComponent } from './components/PermitRequest/PermitRequest.component';
import { QualificationsComponent } from './components/Qualifications/Qualifications.component';
import { OperatingLicenseComponent } from './components/operating-licenses/operating-license/operating-license.component';
import { LettersComponent } from './components/letters/letters.component';
import { TicketComponent } from './components/my-ticket/my-ticket.component';

const routes: Routes = [
  {
    path: '', component: MyDashboardComponent
  },
  { path: 'my-requests', component: RequestsComponent },
  { path: 'my-tasks', component: TasksComponent },
  // { path: 'my-dashboard', component: MyDashboardComponent },
  { path: 'my-contracts', component: ContractsComponent },
  { path: 'my-licenses', component: LicensesComponent },
  { path: 'my-available-bidding', component: AvailableBiddingsComponent },
  { path: 'my-won-bidding', component: WonBiddingsComponent },
  { path: 'my-permits', component: PermitRequestComponent },
  { path: 'my-qualification', component: QualificationsComponent },

  { path: 'my-operating-licenses', component: OperatingLicenseComponent },
  { path: 'my-letters', component: LettersComponent },
  { path: 'my-ticket', component: TicketComponent }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
