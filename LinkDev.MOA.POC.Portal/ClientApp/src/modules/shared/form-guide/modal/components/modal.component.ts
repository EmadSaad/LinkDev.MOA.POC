// import { Component, OnInit, Input } from '@angular/core';

// @Component({
//   selector: 'custom-modal',
//   templateUrl: './modal.component.html',

// })
// export class ModalComponent implements OnInit {
//   ngOnInit(): void {
//   }
//   //The internal data model
 
//   @Input() title: string;

//   @Input() body: string;

// }

import { Component, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'custom-modal',
  templateUrl: './modal.component.html',
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class NgbdModalConfig {
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

    @Input() title: string;
    @Input() body: string;

  openModal(content) {
    this.modalService.open(content, { centered: true, keyboard: true });
  }
}