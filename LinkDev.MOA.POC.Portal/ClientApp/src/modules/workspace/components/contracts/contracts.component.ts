import { Component, OnInit } from '@angular/core';
import { WorkspaceBase } from '../../services/workspace-base';
import { IContractFiltration } from '../../interfaces/ContractFiltration.interface';
import { IContractResult } from '../../interfaces/ContractResult.interface';
import { CrTypeEnum } from 'src/modules/shared/Common/Bidding/models/PriceOfferModel';
import { ContractsService } from '../../services/contracts.service';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent extends WorkspaceBase<IContractFiltration, IContractResult> implements OnInit {
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
    return [
      {
        EntityName: 'product',
        CachingKey: 'product_ContractMainType',
        Mode: LookupRequestMode.ContractMainType,
      }
    ];
  }
  public getFiltrationInstance(): IContractFiltration {
    return new IContractFiltration();
  }
  public addContractsToSearch(): boolean {
    return false;
  }
  // public getContract() {

  // }
  public getAllowedCrTypes(): number[] {
    return [CrTypeEnum.ConsultingOffice, CrTypeEnum.Contractor, CrTypeEnum.Investor, 2, 3, 4, 5];
  }

  constructor(public contractService: ContractsService,
    public lookupService: LookupService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public sharedService: SharedService) {
    super(sharedService, contractService, lookupService, activatedRoute, alertService, translateService);
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
    this.cols = [
      { field: 'ContractNumber', header: 'WorkspaceBase.Contracts.ContractNumber' },
      { field: 'MainType', header: 'WorkspaceBase.Contracts.ContractType' },
      { field: 'IndustrialStatus', header: 'WorkspaceBase.Contracts.IndustrialStatus' },
      { field: 'LegalStatus', header: 'WorkspaceBase.Contracts.LegalStatus' },
      { field: 'IssuanceDate', header: 'WorkspaceBase.Contracts.IssuanceDate' }
    ];
  }

  ngOnInit() {
  }

}
