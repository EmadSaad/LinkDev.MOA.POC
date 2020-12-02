
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppHeaderComponent } from './app-header.component';
// import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
// import { BreadcrumbrouteComponent } from '../breadcrumb/breadcrumbroute/breadcrumbroute.component';

@NgModule({
    declarations: [
        AppHeaderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule

    ],
    exports: [
        AppHeaderComponent
    ]
})
export class AppHeaderModule { }
