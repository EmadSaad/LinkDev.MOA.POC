// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormGuideModule } from '../shared/form-guide/form-guide.module';
import { RatingModule } from 'primeng/rating';

// Components
import { MyRequestsComponent } from './components/my-requests/my-requests.component';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';
import { WorkspaceSidenavComponent } from './components/shared/workspace-sidenav/workspace-sidenav.component';
import { MyBiddingsComponent } from './components/my-biddings/my-biddings.component';
import { ListingGridComponent } from './components/shared/listing-grid/listing-grid.component';
import { WorkspaceComponent } from './workspace.component';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
// Services
import { WorkspaceService } from './services/workspace.services';
import { MyAvailableBiddingsComponent } from './components/my-available-biddings/my-available-biddings.component';
import { MyTestComponent } from './components/my-test/my-test.component';
import { MyContractsComponent } from './components/my-contracts/my-contracts.component';
import { MyLicensesComponent } from './components/my-licenses/my-licenses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestsComponent } from './components/requests/requests.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MyDashboardComponent } from './components/my-dashboard/my-dashboard.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { LicensesComponent } from './components/licenses/licenses.component';
import { AvailableBiddingsComponent } from './components/available-biddings/available-biddings.component';
import { WonBiddingsComponent } from './components/won-biddings/won-biddings.component';
import { PermitRequestComponent } from './components/PermitRequest/PermitRequest.component';
import { LettersComponent } from './components/letters/letters.component';
import { QualificationsComponent } from './components/Qualifications/Qualifications.component';
import { OperatingLicenseComponent } from './components/operating-licenses/operating-license/operating-license.component';
import { TicketComponent } from './components/my-ticket/my-ticket.component';

export const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 4,
  a11y: true,
  keyboard: true,
  mousewheel: true,
  scrollbar: false,
  navigation: false,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  loop: false,
  breakpoints: {
    480: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    }
  }
};
@NgModule({
  declarations: [
    WorkspaceComponent,
    WorkspaceSidenavComponent,
    ListingGridComponent,
    MyBiddingsComponent,
    MyRequestsComponent,
    MyTasksComponent,
    MyAvailableBiddingsComponent,
    MyTestComponent,
    MyContractsComponent,
    MyLicensesComponent,
    DashboardComponent,
    RequestsComponent,
    TasksComponent,
    MyDashboardComponent,
    ContractsComponent,
    LicensesComponent,
    AvailableBiddingsComponent,
    WonBiddingsComponent,
    PermitRequestComponent,
    LettersComponent,
    QualificationsComponent,
    OperatingLicenseComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WorkspaceRoutingModule,
    TableModule,
    TranslateModule,
    BreadcrumbModule,
    FormGuideModule,
    SwiperModule,
    RatingModule
   
  ],
  providers: [
    WorkspaceService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class WorkspaceModule { }
