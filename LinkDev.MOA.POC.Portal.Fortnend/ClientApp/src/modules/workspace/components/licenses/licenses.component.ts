import { Component, OnInit } from '@angular/core';
import { ILicenseResult } from '../../interfaces/LicenseResult.interface';
import { WorkspaceBase } from '../../services/workspace-base';
import { ILicenseFiltration } from '../../interfaces/LicenseFiltration.interface';
import { CrTypeEnum } from 'src/modules/Building-License-Request/Model/BuildingLicenseRequestModel';
import { LicenseService } from '../../services/license.service';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent extends WorkspaceBase<ILicenseFiltration, ILicenseResult> implements OnInit {
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
  public getFiltrationInstance(): ILicenseFiltration {
    return new ILicenseFiltration();
  }
  // public getContract() {

  // }
  public getAllowedCrTypes(): number[] {
    return [CrTypeEnum.Investor, 2, 3];

  }
  public addContractsToSearch(): boolean {
    return false;
  }

  constructor(public licenseService: LicenseService,
    public lookupService: LookupService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public sharedService: SharedService) {
    super(sharedService, licenseService, lookupService, activatedRoute, alertService, translateService);
    this.math = Math;
    this.cols = [
      { field: 'LicenseNumber', header: 'WorkspaceBase.Licenses.LicenseNumber' },
      {
        field: 'Type', header: 'WorkspaceBase.Licenses.LicenseType'
      },
      { field: 'IssuanceDate', header: 'WorkspaceBase.Licenses.IssuanceDate' }
    ];
  }

  ngOnInit() {
  }

}
