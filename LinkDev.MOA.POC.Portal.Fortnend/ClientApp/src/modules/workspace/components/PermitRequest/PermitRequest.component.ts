import { Component, OnInit } from '@angular/core';
import { WorkspaceBase } from '../../services/workspace-base';
import { LicenseService } from '../../services/license.service';
import { LookupService } from '../../../shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';
import { IPermitRequestFiltration } from '../../interfaces/PermitRequestFiltration.interface';
import { IPermitRequestResult } from '../../interfaces/PermitRequestResult.interface';
import { PermitRequestService } from '../../services/PermitRequest.service';
import { CrTypeEnum } from '../../../Building-License-Request/Model/BuildingLicenseRequestModel';
import { AlertService } from 'src/modules/shared/services';

@Component({
  selector: 'app-licenses',
  templateUrl: './PermitRequest.component.html',
  styleUrls: ['./PermitRequest.componrnt.css']
})
export class PermitRequestComponent extends WorkspaceBase<IPermitRequestFiltration, IPermitRequestResult> implements OnInit {
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
  public getLookupTypes(): import('../../../shared/Models/lookup-request.model').RetrieveOptionsRequest[] {
    return [];
  }
  public getFiltrationInstance(): IPermitRequestFiltration {
    return new IPermitRequestFiltration();
  }
  // protected getContract() {

  // }
  public getAllowedCrTypes(): number[] {
    return [CrTypeEnum.ConsultingOffice, CrTypeEnum.Contractor, CrTypeEnum.Investor, 2, 3, 4, 5];
  }
  public addContractsToSearch(): boolean {
    return true;
  }

  constructor(public permitRequestService : PermitRequestService,
    public lookupService: LookupService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public sharedService: SharedService) {
    super(sharedService, permitRequestService, lookupService, activatedRoute, alertService, translateService);
    this.math = Math;
    this.cols = [
      { field: 'PermitRequestNumber', header: 'WorkspaceBase.Licenses.LicenseNumber' },
      {
        field: 'Type', header: 'WorkspaceBase.Licenses.LicenseType'
      },
      { field: 'IssuanceDate', header: 'WorkspaceBase.Licenses.IssuanceDate' }
    ];
  }

  ngOnInit() {
  }

}
