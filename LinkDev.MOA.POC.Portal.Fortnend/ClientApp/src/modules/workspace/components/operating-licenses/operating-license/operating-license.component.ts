import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { AlertService } from 'src/modules/shared/services';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { IOperatingLicenseFiltration } from 'src/modules/workspace/interfaces/OperatingLicenseFiltration';
import { IOperatingLicenseResult } from 'src/modules/workspace/interfaces/OperatingLicenseResult.interface';
import { WorkspaceBase } from 'src/modules/workspace/services/workspace-base';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/modules/workspace/services/shared.service';
import { OperatingLicensesService } from 'src/modules/workspace/services/operatingLicenses.service';
import { CrTypeEnum } from 'src/modules/shared/Common/Bidding/models/PriceOfferModel';


@Component({
  selector: 'app-operating-license',
  templateUrl: './operating-license.component.html',
  styleUrls: ['./operating-license.component.css']
})
export class OperatingLicenseComponent extends WorkspaceBase<IOperatingLicenseFiltration, IOperatingLicenseResult> implements OnInit {

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

  public getLookupTypes(): RetrieveOptionsRequest[] {
    return [];
  }
  public getFiltrationInstance(): IOperatingLicenseFiltration {
    return new IOperatingLicenseFiltration();
  }
  public getAllowedCrTypes(): number[] {
    return [CrTypeEnum.Investor, 2, 3];

  }
  public addContractsToSearch(): boolean {
    return false;
  }

  constructor(public operatingLicensesService: OperatingLicensesService,
    public lookupService: LookupService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public sharedService: SharedService) {

    super(sharedService, operatingLicensesService, lookupService, activatedRoute, alertService, translateService);

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

    this.cols = [
      { field: 'LicenseNumber', header: 'WorkspaceBase.Licenses.LicenseNumber' },
      { field: 'LicenseTypeName', header: 'WorkspaceBase.Licenses.LicenseType' },
      { field: 'IssuanceDate', header: 'WorkspaceBase.Licenses.IssuanceDate' }];

    this.math = Math;

  }

  ngOnInit() {
  }

}
