import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileManagmentComponent } from './Profile-Managment.component';
//import { MyProfileComponent } from './Components/MyProfile/MyProfile/MyProfile.component';
import { FormsModule, NgForm } from '@angular/forms';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module'
import { ProfileManagmentRoutingModule } from './Profile_Managment-routing-module';
import { MyProfileComponent } from './Components/MyProfile/MyProfile/MyProfile.component';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';


@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    TextBoxModule,
    MutliselectModule,
    ProfileManagmentRoutingModule,
    TranslateModule,
    ValidationViewerModule,
    BreadcrumbModule
  ],
  declarations: [ProfileManagmentComponent, MyProfileComponent]
})
export class ProfileManagmentModule { }
