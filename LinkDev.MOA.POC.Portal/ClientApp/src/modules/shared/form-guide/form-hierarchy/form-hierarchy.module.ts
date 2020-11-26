import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormHierarchyComponent } from './form-hierarchy.component';
import { MatTreeModule, MatIconModule, MatButtonModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeModule } from 'primeng/tree';
import { SharedModule } from '../../shared.module';


@NgModule({
    declarations: [
        FormHierarchyComponent,
    ],
    imports: [
        CommonModule,
        //BrowserModule,
        //BrowserAnimationsModule,
        SharedModule,
        TreeModule
    ],
    providers: [],
    entryComponents: [],
    exports: [
        FormHierarchyComponent
    ]
})
export class FormHierarchyModule { }
