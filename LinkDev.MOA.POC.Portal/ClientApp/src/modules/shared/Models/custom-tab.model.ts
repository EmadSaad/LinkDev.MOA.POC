import { NgForm } from '@angular/forms';
//import { DocumentsComponent } from '../documents/components/documents/documents.component';
export class CustomTab {
  tabIndex: number;
  form: NgForm;
  formName: string;
  isTabValid?: (self: any) => boolean;
  isHidden?: (self: any) => boolean;
  // documentComponents:DocumentsComponent[];
}
