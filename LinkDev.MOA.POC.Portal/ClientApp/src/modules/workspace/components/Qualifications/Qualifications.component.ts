import { Component, OnInit } from '@angular/core';
import { WorkspaceBase } from '../../services/workspace-base';
import { IQualificationFiltration } from '../../interfaces/QualificationFiltration.interface';
import { IQualificationResult } from '../../interfaces/QualificationResult.interface';
import { CrTypeEnum } from 'src/modules/shared/Common/Bidding/models/PriceOfferModel';
import { SharedService } from '../../services/shared.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/modules/shared/services';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { QualificationService } from '../../services/Qualification.service';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';

@Component({
  selector: 'app-Qualifications',
  templateUrl: './Qualifications.component.html',
  styleUrls: ['./Qualifications.component.css']
})
export class QualificationsComponent extends WorkspaceBase<IQualificationFiltration, IQualificationResult> implements OnInit {

  config = {
    displayKey: 'Text',
    search: true,
    placeholder: 'Select',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'Text'
  };
  cols = [];
  math: any;


  constructor(public qualificationService: QualificationService,
    public lookupService: LookupService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public sharedService: SharedService) {

    super(sharedService, qualificationService, lookupService, activatedRoute, alertService, translateService);

          this.cols = [
            { field: 'QualificationNumber', header: 'WorkspaceBase.Qualifications.QualificationNumber' },
            { field: 'CertificateType', header: 'WorkspaceBase.Qualifications.CertificateType' },
            { field: 'Status', header: 'WorkspaceBase.Qualifications.Status' },
            { field: 'IssuanceDate', header: 'WorkspaceBase.Qualifications.IssuanceDate' },
            { field: 'EndDate', header: 'WorkspaceBase.Qualifications.EndDate' }
          ];

          this.translateService.get('SELECT').subscribe(
            sel => {
              this.translateService.get('NO_RESULT_FOUND').subscribe(
                no => {
                  this.translateService.get('SEARCH').subscribe(
                    search => {
                      this.config['placeholder'] = sel;
                      this.config['noResultsFound'] = no;
                      this.config['searchPlaceholder'] = search;
                    }
                  );
                }
              );
            });
            
            this.math = Math;


     }

  ngOnInit() {
  }

  public getLookupTypes(): import("../../../shared/Models/lookup-request.model").RetrieveOptionsRequest[] {
    return [ 
        {
        EntityName: 'ldv_service',
        CachingKey: 'ldv_service_WorkspaceServiceDefinitions',
        Mode: LookupRequestMode.WorkspaceServiceDefinitions,

        }
    ];
  }
  public getFiltrationInstance(): IQualificationFiltration {
    return new IQualificationFiltration();
  }
  public getAllowedCrTypes(): number[] {
    return [CrTypeEnum.ConsultingOffice, CrTypeEnum.Contractor, CrTypeEnum.Investor, 2, 3, 4, 5];
  }
  public addContractsToSearch(): boolean {
    return false;
  }



}
