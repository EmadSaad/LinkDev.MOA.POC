import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.services';
import { RetrieveOptionsRequest } from '../../../shared/Models/lookup-request.model';
import { LookupService } from '../../../shared/Services/lookup.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { TranslateService } from '@ngx-translate/core';
import { IContractFiltration } from '../../interfaces/ContractFiltration.interface';
import { IWorkspaceCRs } from '../../interfaces/WorkspaceCRs.interface';
import { IWorkspaceContracts } from '../../interfaces/WorkspaceContracts.interface';
import { IOverviewResult } from '../../interfaces/OverviewResult.interface';
import { IRequestFiltration } from '../../interfaces/RequestFiltration.interface';
import { IBiddingsFiltration } from '../../interfaces/BiddingsFiltration.interface';
import { ILicenseFiltration } from '../../interfaces/LicenseFiltration.interface';
import { SwiperComponent } from 'ngx-swiper-wrapper';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { Mode } from 'src/modules/shared/form-guide/utility/enums/enums';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    CRs: RetrieveOptionsRequest[];
    contracts: any[];
    currentCR: IWorkspaceCRs = new IWorkspaceCRs;
    currentContract: IWorkspaceContracts = new IWorkspaceContracts;
    currentContractDetails:IWorkspaceContracts = new IWorkspaceContracts;
    contractFiltration: IContractFiltration = new IContractFiltration;
    requestFiltration: IRequestFiltration = new IRequestFiltration;
    biddingFilteration: IBiddingsFiltration;
    licenseFilteration: ILicenseFiltration = new ILicenseFiltration;
    config = {
        displayKey: "Text", //if objects array passed which key to be displayed defaults to description
        search: true, //true/false for the search functionlity defaults to false,
        placeholder: "Select", // text to be displayed when no item is selected defaults to Select,
        noResultsFound: "No results found!", // text to be displayed when no items are found while searching
        searchPlaceholder: "Search", // label thats displayed in search input,
        searchOnKey: 'Text' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    };
    typeOfItems: string;
    OverviewData: IOverviewResult;
    crType: number;
    error: boolean = false;
    errorMode: Mode = Mode.Error;
    @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
    constructor(protected WorkspaceService: WorkspaceService, public lookupService: LookupService, protected translateService: TranslateService) {
        this.translateService.get('SELECT').subscribe(
            sel => {
                this.translateService.get('NO_RESULT_FOUND').subscribe(
                    no => {
                        this.translateService.get('SEARCH').subscribe(
                            search => {
                                this.config['placeholder'] = sel;
                                this.config['noResultsFound'] = no;
                                this.config['searchPlaceholder'] = search;
                            })
                    })
            });
        this.typeOfItems = 'requests';
    }
    ngOnInit() {
        this.WorkspaceService.getCRS().subscribe(retrievedCRs => { if (retrievedCRs.length > 0) { this.CRs = retrievedCRs; } });
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.InitDashboard();
        });
    }
    InitDashboard() {
        this.WorkspaceService.getCrID().subscribe(crID => {
            SharedHelper.showLoader();
            this.currentCR.Text = crID;
            if (this.currentCR.Text) {
                this.WorkspaceService.getCRS().subscribe(
                    CRs => {
                        if (CRs.length > 0) {
                            this.crType = CRs.filter(cr => cr.Value == this.currentCR.Text)[0].CrType;
                        }
                    });

                this.WorkspaceService.GetCRContracts(this.currentCR.Text).subscribe(res => {
                    this.lookupService.handleRetrievedLookup(res.Content);
                    this.contracts = this.lookupService.lookupEntities['ldv_contract_WorkspaceContracts'];
                });
                this.WorkspaceService.getContractID().subscribe(thisContract => {
                    this.currentContract.Text = thisContract;
                });
                this.WorkspaceService.GetOverviewData(this.currentCR.Text, this.currentContract.Text).subscribe(
                    res => {
                        if (res.ResponseCode = ResponseCode.Success) {
                            this.OverviewData = res.Content;
                            SharedHelper.hideLoader();
                        }
                    });
                    if(this.contracts && this.currentContract.Text){
                        this.currentContractDetails = this.contracts.filter(contract => contract.Value == this.currentContract.Text)[0];
                        console.log(this.currentContractDetails)
                    }      
                this.listData(this.typeOfItems);
            }
        });

    }
    UpdateCr(e) {
        SharedHelper.showLoader();
        this.currentContract.Text = " ";
        this.WorkspaceService.setContractID("");
        this.WorkspaceService.setCrID(e);
        this.WorkspaceService.getCRS().subscribe(
            CRs => {
                if (CRs.length > 0) {
                    this.crType = CRs.filter(cr => cr.Value == e)[0].CrType;
                    this.componentRef.directiveRef.update();
                }
            });
    }
    UpdateContract(e) {
        SharedHelper.showLoader();
        this.WorkspaceService.setContractID(e);
        this.WorkspaceService.GetOverviewData(this.currentCR.Text, e).subscribe(
            res => {
                if (res.ResponseCode = ResponseCode.Success) {
                    this.OverviewData = res.Content;
                    SharedHelper.hideLoader();
                }
            });   
        this.currentContractDetails = this.contracts.filter(contract => contract.Value == this.currentContract.Text)[0]; 
        this.listData(this.typeOfItems);
    }
    listData(type: string) {
        // SharedHelper.showLoader();
        // this.typeOfItems = type;
        // if (type == 'requests') {
        //     this.error = false;
        //     this.requestFiltration.CRId = this.currentCR.Text;
        //     this.requestFiltration.ContractId = this.currentContract.Text;
        //     this.WorkspaceService.setRequestFiltration(this.requestFiltration);

        // } else if (type == 'tasks') {
        //     this.error = false;
        //     this.requestFiltration.CRId = this.currentCR.Text;
        //     this.requestFiltration.ContractId = this.currentContract.Text;
        //     this.WorkspaceService.setTaskFiltration(this.requestFiltration);
        // } else if (type == 'contracts') {
        //     this.error = false;
        //     this.contractFiltration.CRId = this.currentCR.Text;
        //     this.WorkspaceService.setContractFiltration(this.contractFiltration);
        // }
        // else if (type == 'wonBiddings' && (this.crType == 6 || this.crType == 7)) {
        //     this.error = false;
        //     this.biddingFilteration.CRId = this.currentCR.Text;
        //     this.biddingFilteration.ContractId = this.currentContract.Text;
        //     this.WorkspaceService.setBiddingFiltration(this.biddingFilteration);
        // }
        // else if (type == 'availableBiddings'&& (this.crType == 6 || this.crType == 7)) {
        //     this.error = false;
        //     this.availableBiddingFilteration.CRId = this.currentCR.Text;
        //     this.availableBiddingFilteration.ContractId = this.currentContract.Text;
        //     this.WorkspaceService.setAvailableBiddingFiltration(this.availableBiddingFilteration);
        // }
        // else if (type == 'licenses' && this.crType == 1) {
        //     this.error = false;
        //     this.licenseFilteration.CRId = this.currentCR.Text;
        //     this.WorkspaceService.setLicenseFiltration(this.licenseFilteration);
        // }
        // else {
        //     this.error = true;
        // }
    }
}
