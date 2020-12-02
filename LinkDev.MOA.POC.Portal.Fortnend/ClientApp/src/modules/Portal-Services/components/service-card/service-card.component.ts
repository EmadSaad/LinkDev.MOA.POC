import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'service-card',
  templateUrl: './service-card.component.html'
})
export class ServiceCardComponent implements OnInit {
  @Input() item;
  @Input() service:boolean = false;
  constructor() { }
  ngOnInit() {
  }
}
