import { Component, OnInit, Input } from "@angular/core";
import { ApplicationHeader } from "../Models/application-header.model";
import { Type } from "@angular/compiler";

@Component({
  selector: "app-app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"]
})
export class AppHeaderComponent implements OnInit {
  @Input() appHeader: ApplicationHeader;
  // @Input() serviceStatus : string;
  // status: string = '';
  // hideSubmissionDate: boolean = false;

  constructor() { }

  ngOnInit() { }
}
