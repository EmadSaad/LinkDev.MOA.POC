import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-submission-info',
  templateUrl: './request-submission-info.component.html',
  styleUrls: ['./request-submission-info.component.css']
})
export class RequestSubmissionInfoComponent implements OnInit {

  @Input() submissionAlertClass: string;
  @Input() submissionInfo: string;
  constructor() { }

  ngOnInit() {
  }

}
