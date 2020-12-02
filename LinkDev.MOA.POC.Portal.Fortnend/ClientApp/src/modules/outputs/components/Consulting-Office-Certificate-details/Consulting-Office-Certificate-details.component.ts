import { Component, OnInit } from '@angular/core';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { QualificationService } from '../../services/Qualification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { AlertService } from 'src/modules/shared/services';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { QualificationCertificateDetails } from '../../interfaces/QualificationCertificate';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { CRModel } from 'src/modules/Contract-Submission/interfaces/CR-model';
import { ContractSubmissionService } from 'src/modules/Contract-Submission/services/contract-submission.service';
import { GridColumn, ColumnFieldType } from 'src/modules/shared/form-guide/grid/models/GridColumn';


@Component({
  selector: 'app-Consulting-Office-Certificate-details',
  templateUrl: './Consulting-Office-Certificate-details.component.html',
  styleUrls: ['./Consulting-Office-Certificate-details.component.css']
})
export class ConsultingOfficeCertificateDetailsComponent implements OnInit {

  activeLevelOne : number = 1;
  activeLevelTwo = 1;

  submissionInfo: string;
  submissionAlertClass: string;


  CurrentCR: CRModel={};
  isCurrentCR:boolean;

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
     {index:1,label:"QualificationCertificate.GeneratedCertificate",type:NodeType.Parent,children:[]},
  ];



  CROwnerGridcols: GridColumn[] = [
    {header:"ContractSubmission.Name",field:"OwnerName",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.Nationality",field:"Nationality",typeConfig: {type:ColumnFieldType.Text}},
    {header:"ContractSubmission.SharingPercentage",field:"SharingPercentage",typeConfig: {type:ColumnFieldType.Text}}
  ];


  certificateId: string;

  GeneratedCertificate:QualificationCertificateDetails;


  constructor(public contractSubmissionService: ContractSubmissionService,
    private api: QualificationService,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    protected lookupService: LookupService,
    private router: Router,
    protected alertService: AlertService) { 
      this.activatedRoute.queryParams.subscribe((p) => {
        this.certificateId = p.Id;
        if (this.certificateId !== undefined && this.certificateId !== null) {
          SharedHelper.showLoader();
          this.LoadLookups();
          this.getCertificateInfo();
          // this.getAttachments();
        } else {
          this.router.navigate(["/workspace"]);
        }
      });
    }

  ngOnInit() {
    this.isCurrentCR=false;
  }


  onSelect = (node: FormHierarchyBase) => 
  {
    if(node.type == NodeType.Parent)
    this.activeLevelOne = node.index;
  }

  getCertificateInfo(){
    this.api.getOfficeCertificate(this.certificateId).subscribe(
      res => {
      if (res.ResponseCode === ResponseCode.Success) {

        this.GeneratedCertificate = res.Content;
        this.getCRInfo();
      }

      SharedHelper.hideLoader();

    });
  }


  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [


      //{ EntityName: "account", CachingKey: "account_Account", Mode: LookupRequestMode.Account },
      //{ EntityName: "ldv_service", CachingKey: "ldv_service_LookupWithName", Mode: LookupRequestMode.LookupWithName },
      //{ EntityName: "ldv_qualificationcertificate", CachingKey: "ldv_qualificationcertificate_LookupWithName", Mode: LookupRequestMode.LookupWithName },
      { EntityName: "ldv_qualificationcertificate", CachingKey: "ldv_qualificationcertificate_ldv_certificateregarding_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_certificateregarding" },
      { EntityName: "ldv_qualificationcertificate", CachingKey: "ldv_qualificationcertificate_ldv_certificationstatus_OptionSet", Mode: LookupRequestMode.OptionSet, OptionSetName: "ldv_certificationstatus" },
      // { EntityName: "ldv_ksaregion", CachingKey: "ldv_ksaregion_LookupWithName", Mode: LookupRequestMode.LookupWithName },

    ];
  }

  private LoadLookups() {
    var lookups = this.getLookupTypes();
    // 
    this.lookupService.loadLookups(lookups).subscribe(result => {
      // 
      var isLookupsLoaded = result;

    });
  }

  getCRInfo(){
    this.isCurrentCR = true;
    this.contractSubmissionService.GetCRDetailsAndRelatedILs(this.GeneratedCertificate.CertifiedAccountId.toString()).subscribe(results => {
      if(results.ResponseCode === ResponseCode.Success)
      {
        this.CurrentCR = results.Content.CR;
      }
    this.isCurrentCR = false;

    });
  }



}