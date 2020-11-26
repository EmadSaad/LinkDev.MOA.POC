import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { AuthGuardService } from '../Guards/AuthGuard.guard ';
const routes: Routes = [
    {
        path: '',
    component: HomeComponent,
    //canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }
