import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceSidenavComponent } from './workspace-sidenav.component';
import { SharedModule } from 'src/modules/shared/shared.module';





@NgModule({
  declarations: [WorkspaceSidenavComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[WorkspaceSidenavComponent]
})
export class WorkspaceSidenavModule { }
