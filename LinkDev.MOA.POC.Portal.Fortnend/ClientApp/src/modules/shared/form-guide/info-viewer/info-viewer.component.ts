import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-viewer',
  templateUrl: './info-viewer.component.html',
  styleUrls: ['./info-viewer.component.css']
})
export class InfoViewerComponent implements OnInit {
  @Input() isLoading : boolean;
  @Input() modalFormTitleKey: string;

  @ViewChild("popup") popUpTemplate: any;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  showInfo()
  {
    this.modalService.open(this.popUpTemplate , {size: 'lg', backdrop: 'static' });
  }

}
