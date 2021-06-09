import { Component, OnInit } from '@angular/core';
import { FactoryInsideFactoryModule } from '../../factory-inside-factory.module';
import { EServicesBase } from '../../../shared/EService-Base/eService-base';
import { FactoryInsideFactoryModal } from '../../Modals/FactoryInsideFactoryModal';
import { LookupService } from '../../../shared/Services/lookup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FactoryInsideFactoryService } from '../../Services/factory-inside-factory.service';
import { RetrieveOptionsRequest } from '../../../shared/Models/lookup-request.model';
import { LookupRequestMode } from '../../../shared/Enums/lookup-request-mode.enum';

@Component({
  selector: 'app-factory-inside-factory',
  templateUrl: './factory-inside-factory.component.html',
  styleUrls: ['./factory-inside-factory.component.css']
})
export class FactoryInsideFactoryComponent extends EServicesBase<FactoryInsideFactoryModal> implements OnInit {

  yesText: string = "Yes";
  NoText: string = "No";
  config = {
    displayKey: "Text",
    search: false,
    placeholder: "select",
    noResultsFound: "No results found!",
    searchPlaceholder: "Search"
  };

  constructor(FactoryInsideFactoryService: FactoryInsideFactoryService,
    public lookupService: LookupService,
    protected activatedRoute: ActivatedRoute,
    protected alertService: AlertService,
    protected translateService: TranslateService,
    protected modalService: NgbModal,
    private titleService: Title,
    protected router: Router) {
    super(FactoryInsideFactoryService, lookupService, activatedRoute, alertService, translateService, modalService, router);
    this.titleService.setTitle("ECZA | Contract submission");
  }

  ngOnInit() {
  }

  //#region Implement eservice base
  public TApplicationNewInstance(): FactoryInsideFactoryModal {
    return new FactoryInsideFactoryModal();
  }
  public getQueryStringNames(): string[] {
    return ["Id"];
  }
  public getLookupTypes(): RetrieveOptionsRequest[] {
    this.translateService.get('Yes').subscribe(res => {
      this.yesText = res;
      this.translateService.get('No').subscribe(
        res => {
          this.NoText = res;
          let d: RetrieveOptionsRequest[] = [{ CachingKey: "YesNo", EntityName: "", Mode: 1, Result: [{ Text: this.yesText, Value: 'true' }, { Text: this.NoText, Value: 'false' }] }]
          this.lookupService.handleRetrievedLookup(d);
        }
      )
    })

    return [
      { EntityName: "account", CachingKey: "account_Account", Mode: LookupRequestMode.Account },
      { EntityName: "ldv_contract", CachingKey: "ldv_contract_LookupWithName", Mode: LookupRequestMode.LookupWithName },
      { EntityName: "contact", CachingKey: "contact_Requester", Mode: LookupRequestMode.Requester },
      { EntityName: "ldv_industriallicense", CachingKey: "ldv_industriallicense_LookupWithName", Mode: LookupRequestMode.LookupWithName },
     
    ];
  }
 
  public getContractLookup(): any[] {
    if (this.lookupService.lookupEntities['ldv_contract_LookupWithName']) {
      var x = this.lookupService.lookupEntities['ldv_contract_LookupWithName']
      return x;
    }
    else
      return [];
  }

  public getCrsLookup(): any[] {
    if (this.lookupService.lookupEntities['account_Account']) {
      var x = this.lookupService.lookupEntities['account_Account']
      return x;
    }
    else
      return [];
  }
  public getContactLookup(): any[] {
    if (this.lookupService.lookupEntities['contact_Requester']) {
      var x = this.lookupService.lookupEntities['contact_Requester']
      return x;
    }
    else
      return [];
  }
  public getILLookup(): any[] {
    if (this.lookupService.lookupEntities['ldv_industriallicense_LookupWithName"']) {
      var x = this.lookupService.lookupEntities['ldv_industriallicense_LookupWithName"']
      return x;
    }
    else
      return [];
  }
  //#endregion

  public setIslamicDate() {
    debugger;
    this.Application.Request.EstablishingContractDateInhijriDays = this.Application.Request.EstablishingContractDateInhijri.day;
    this.Application.Request.EstablishingContractDateInhijriMonth = this.Application.Request.EstablishingContractDateInhijri.month;
    this.Application.Request.EstablishingContractDateInhijriYear = this.Application.Request.EstablishingContractDateInhijri.year;
  }
}
