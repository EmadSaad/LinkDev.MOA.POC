import {BreadcrumbComponent} from './breadcrumb.component';
import {BreadcrumbrouteComponent} from './breadcrumbroute/breadcrumbroute.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from "@angular/router";
@NgModule({
    imports: [CommonModule,TranslateModule,RouterModule],
    exports: [BreadcrumbComponent,BreadcrumbrouteComponent],
    declarations: [BreadcrumbComponent,BreadcrumbrouteComponent],
    providers: [],
 })
 
 export class BreadcrumbModule {
 }