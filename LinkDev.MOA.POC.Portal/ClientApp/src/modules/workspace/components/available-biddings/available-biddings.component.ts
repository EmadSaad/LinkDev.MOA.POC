import { Component, OnInit } from '@angular/core';
import { IBiddingsFiltration } from '../../interfaces/BiddingsFiltration.interface';
import { IBidding } from '../../interfaces/Bidding.interface';
import { CrTypeEnum } from 'src/modules/shared/Common/Bidding/models/PriceOfferModel';
import { WorkspaceBase } from '../../services/workspace-base';
import { AvailableBiddingsService } from '../../services/available-biddings.service';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../services/shared.service';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';

@Component({
  selector: 'app-available-biddings',
  templateUrl: './available-biddings.component.html',
  styleUrls: ['./available-biddings.component.css']
})
export class AvailableBiddingsComponent extends WorkspaceBase<IBiddingsFiltration, IBidding> implements OnInit {
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
        EntityName: 'ldv_bidding',
        OptionSetName: 'ldv_biddingrequesttype',
        Mode: LookupRequestMode.OptionSet,
        CachingKey: 'ldv_bidding_ldv_biddingrequesttype_OptionSet',
      },
    ];
  }
  public getFiltrationInstance(): IBiddingsFiltration {
    return new IBiddingsFiltration();
  }
  // public getContract() {

  // }
  public getAllowedCrTypes(): number[] {
    return [CrTypeEnum.ConsultingOffice, CrTypeEnum.Contractor];

  }
  public addContractsToSearch(): boolean {
    return false;
  }

  constructor(public availableBiddingService: AvailableBiddingsService,
    public lookupService: LookupService,
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService,
    public translateService: TranslateService,
    public sharedService: SharedService) {
    super(sharedService, availableBiddingService, lookupService, activatedRoute, alertService, translateService);
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
      { field: 'BiddingNumber', header: 'WorkspaceBase.Biddings.BiddingNumber' },
      { field: 'ServiceName', header: 'WorkspaceBase.Biddings.BiddingType' },
      { field: 'CRName', header: 'WorkspaceBase.Biddings.CommercialName' },
      { field: 'InustrialCityName', header: 'WorkspaceBase.Biddings.IndustrialCity' },
      { field: 'LandArea', header: 'WorkspaceBase.Biddings.LandArea' },
    ];
  }

  ngOnInit() {
  }

}
