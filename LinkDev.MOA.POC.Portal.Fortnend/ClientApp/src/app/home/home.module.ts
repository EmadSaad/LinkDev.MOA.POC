//import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { NgModule, Injectable } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormHierarchyModule } from "../../modules/shared/form-guide/form-hierarchy/form-hierarchy.module"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeModule } from 'primeng/tree';

@Injectable()
@NgModule({
  imports: [FormsModule, BrowserModule, BrowserAnimationsModule, TreeModule, FormHierarchyModule],
  declarations: [HomeComponent]
})
export class HomeModule { }
