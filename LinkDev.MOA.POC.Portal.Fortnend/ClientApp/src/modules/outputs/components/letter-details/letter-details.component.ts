import { Component, OnInit, ViewChild } from "@angular/core";
import { FormHierarchyBase } from "src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model";
import {
  GridColumn,
  ColumnFieldType,
} from "src/modules/shared/form-guide/grid/models/GridColumn";
import { NodeType } from "src/modules/shared/form-guide/form-hierarchy/node-type-enum";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedHelper } from "src/modules/shared/services/shared-helper";
import { TranslateService } from "@ngx-translate/core";
import { ResponseCode } from "src/modules/shared/Models/api-generic-response";
import { DocumentSettingModel } from "src/modules/shared/Documents/Interfaces/DocumentSettingModel";
import { ContractorCr } from "../../interfaces/contractor-cr";
import { RetrieveOptionsRequest } from "src/modules/shared/Models/lookup-request.model";
import { LookupRequestMode } from "src/modules/shared/Enums/lookup-request-mode.enum";
import { LookupService } from "src/modules/shared/Services/lookup.service";
import { NgForm, Validators } from "@angular/forms";
import { AddSafetyCrToLicenseRequest } from "../../interfaces/add-safety-cr-to-license-request";
import { AlertService } from "src/modules/shared/services/alert.service";
import { letterDetails } from "../../interfaces/letter-details";
import { LettersService } from "../../services/letters.service";

@Component({
  selector: "app-letter-details",
  templateUrl: "./letter-details.component.html",
  styleUrls: ["./letter-details.component.css"],
})
export class LetterDetailsComponent implements OnInit {
  activeLevelOne : number = 1;
  LetterInfo: letterDetails;
  workspaceLabel: string;
  letterId: string;
  documentSettings: DocumentSettingModel[] = [];
  tabText = 'Outputs.LetterDetails.LetterDetails';
  config = {
    displayKey: "Text", // if objects array passed which key to be displayed defaults to description
    search: true, // true/false for the search functionlity defaults to false,
    placeholder: "Service", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: "Text",
  };
  formStructure: FormHierarchyBase[]=
  [
     {index:1,label:"CoordinationLetter.RequestDetails",type:NodeType.Parent,children:[]},
];
  constructor(
    private api: LettersService,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    protected lookupService: LookupService,
    private router: Router,
    protected alertService: AlertService
  ) {
    this.LetterInfo = {};
    this.activatedRoute.queryParams.subscribe((p) => {
      this.letterId = p.Id;
      if (this.letterId !== undefined && this.letterId !== null) {
        SharedHelper.showLoader();
        this.getLetterInfo();
        this.getAttachments();
      } else {
        this.router.navigate(["/workspace"]);
      }
    });

    // this.formStructure.push({ index: 1, label: 'Outputs.License.BuildingLicenseInfo', type: NodeType.Parent });
  }
  getLetterInfo() {
    this.api.getLetterDetails(this.letterId).subscribe(
      (res) => {
        if (res.ResponseCode === ResponseCode.Success) {
          debugger;
          this.LetterInfo = res.Content;
          SharedHelper.hideLoader();
        } else {
          SharedHelper.hideLoader();
          this.alertService.error(
            res.FriendlyResponseMessage,
            "workspace",
            this.workspaceLabel
          );
          this.router.navigateByUrl("/notification");
        }
      },
      (error) => {
        debugger;
        SharedHelper.hideLoader();
        this.alertService.error(
          error.error.Message,
          "workspace",
          this.workspaceLabel
        );
        this.router.navigateByUrl("/notification");
      }
    );
  }
  onSelect = (node: FormHierarchyBase) => 
  {
    if(node.type == NodeType.Parent)
    this.activeLevelOne = node.index;
  }
  getAttachments() {
    this.api.getContractDocuments(this.letterId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.documentSettings = res.Content;
       // this.formStructure.push({ index: 3, label: 'Outputs.Contract.ContractAttachments', type: NodeType.Parent });
      }

    }, error => {
      SharedHelper.hideLoader();
      this.alertService.error(error.error.Message, 'workspace', this.workspaceLabel);
      this.router.navigateByUrl('/notification');
    });
  }
  ngOnInit() {}
}
