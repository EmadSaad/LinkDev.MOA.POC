import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//import { MyProfileComponent } from "./Components/MyProfile/MyProfile/MyProfile.component";
import { ProfileManagmentComponent } from "./Profile-Managment.component";
import { MyProfileComponent } from "./Components/MyProfile/MyProfile/MyProfile.component";
import { AuthGuardService } from "../Guards/AuthGuard.guard ";




const routes: Routes = [
  { path: '', component: ProfileManagmentComponent },
  { path: 'MyProfile', component: MyProfileComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class ProfileManagmentRoutingModule {

}
