//import { Component, OnInit ,Input} from '@angular/core';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
//import { Output, EventEmitter } from '@angular/core';

//@Component({
//  selector: 'app-modal-form',
//  templateUrl: './modal-form.component.html',
//  styleUrls: ['./modal-form.component.scss']
//})
//export class ModalFormComponent implements OnInit {
//  @Input() id: number;
//  myForm: FormGroup;

//  constructor(
//    public activeModal: NgbActiveModal,
//    private formBuilder: FormBuilder
//) {
//  this.createForm();

// }
// private createForm() {
//  this.myForm = this.formBuilder.group({
//    username: '',
//    password: ''
//  });
//}
//private submitForm() {
//  this.activeModal.close(this.myForm.value);
//}
//  closeModal() {
//    this.activeModal.close('Modal Closed');
//  }
//  ngOnInit() {
//  }

//}
