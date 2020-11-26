import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.services';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { IWorkspaceCRs } from '../../interfaces/WorkspaceCRs.interface';
import { IBidding } from '../../interfaces/Bidding.interface';
import { IBiddingsFiltration } from '../../interfaces/BiddingsFiltration.interface';
import { NgForm } from '@angular/forms';
import { LookupRequestMode } from 'src/modules/shared/Enums/lookup-request-mode.enum';
import { TranslateService } from '@ngx-translate/core';
import { Mode } from 'src/modules/shared/form-guide/utility/enums/enums';
@Component({
  selector: 'app-my-available-biddings',
  templateUrl: './my-available-biddings.component.html'
})
export class MyAvailableBiddingsComponent implements OnInit {
  CRs: RetrieveOptionsRequest[];
  currentCR: IWorkspaceCRs = new IWorkspaceCRs;
  biddingFilteration: IBiddingsFiltration;
  config = {
    displayKey: "Text", //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    placeholder: "Select", // text to be displayed when no item is selected defaults to Select,
    noResultsFound: "No results found!", // text to be displayed when no items are found while searching
    searchPlaceholder: "Search", // label thats displayed in search input,
    searchOnKey: 'Text', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    moreText: 'More Values'
  };
  crType: number;
  error: boolean = false;
  errorMode: Mode = Mode.Error;
  protected getLookupTypes(): RetrieveOptionsRequest[] {
    return [
      {
        EntityName: "ldv_bidding",
        OptionSetName: "ldv_biddingrequesttype",
        Mode: LookupRequestMode.OptionSet,
        CachingKey: "ldv_bidding_ldv_biddingrequesttype_OptionSet",
      },
    ];
  }
  constructor(
    public WorkspaceService: WorkspaceService,
    public lookupService: LookupService,
    public translateService: TranslateService) {
    this.translateService.get('SELECT').subscribe(
      sel => {
        this.translateService.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.translateService.get('SEARCH').subscribe(
              search => {
                this.translateService.get('moreValues').subscribe(
                  moreValues => {
                    this.config['placeholder'] = sel;
                    this.config['noResultsFound'] = no;
                    this.config['searchPlaceholder'] = search;
                    this.config['moreText'] = moreValues;
                  }
                )
              }
            )

          }
        )
      });
  }
  ngOnInit() {
    this.WorkspaceService.getCRS().subscribe(retrievedCRs => { if (retrievedCRs.length > 0) this.CRs = retrievedCRs; })
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.GetBiddings();
    });
  }
  GetBiddings() {
    this.WorkspaceService.getCrID().subscribe(crID => {
      SharedHelper.showLoader();
      this.currentCR.Text = crID;
      if (this.currentCR.Text) {
        this.WorkspaceService.getCRS().subscribe(CRs => {
          if (CRs.length > 0) {
            this.crType = CRs.filter(cr => cr.Value == this.currentCR.Text)[0].CrType;
          }
        });
        if (this.crType == 6 || this.crType == 7) {
          this.error = false;
          this.biddingFilteration.CRId = crID;
          this.biddingFilteration.PageNumber = 1;
          this.WorkspaceService.setAvailableBiddingFiltration(this.biddingFilteration);
         
        }else{
          this.error = true;
          SharedHelper.hideLoader();
        }
      }
    }, error => {
      console.log("GetCRsID error");
    });
    var lookups = this.getLookupTypes();
    this.lookupService.loadLookups(lookups).subscribe(result => {
      var isLookupsLoaded = result;
      SharedHelper.hideLoader();
    }, error => {
      console.log("Get Lookups error");
    });
  }
  UpdateCr(e) {
    SharedHelper.showLoader();
    this.WorkspaceService.setCrID(e);
  }
  searchBiddings(form: NgForm) {
    SharedHelper.showLoader();
    this.biddingFilteration.CRId = this.currentCR.Text;
    if (form.value.FromDate != undefined) {
      this.biddingFilteration.From = form.value.FromDate;
    }
    if (form.value.ToDate != undefined) {
      this.biddingFilteration.To = form.value.ToDate;
    }
    if (form.value.BiddingNumber != undefined) {
      this.biddingFilteration.BiddingNumber = form.value.BiddingNumber;
    }
    if (form.value.BiddingType != undefined) {
      this.biddingFilteration.BiddingType = form.value.BiddingType;
    }
    this.WorkspaceService.setAvailableBiddingFiltration(this.biddingFilteration);

  }
  resetSearch(f: NgForm) {
    SharedHelper.showLoader();
    f.reset();
    this.WorkspaceService.setAvailableBiddingFiltration(this.biddingFilteration);
  }
}
