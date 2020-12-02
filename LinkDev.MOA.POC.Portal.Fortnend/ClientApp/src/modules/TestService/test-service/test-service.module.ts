import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestServiceComponent } from './test-service.component';
import { SharedModule } from 'src/modules/shared/shared.module';
import { FileUploadModule } from 'src/modules/shared/form-guide/file-upload/modules/file-upload.module';
import { UploadersListComponent } from 'src/modules/shared/Documents/Components/Uploaders-List/Uploaders-List.component';
import { TestServiceRoutingModule } from './test-service-routing.module';
import { ContractSubmissionSimulationComponent } from '../contract-submission-simulation/contract-submission-simulation.component';
import { StagesComponent } from '../stages/stages.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FileUploadModule,
    TestServiceRoutingModule
  ],
  declarations: [
    TestServiceComponent,
    ContractSubmissionSimulationComponent,
    StagesComponent
  ]
})
export class TestServiceModule { }
