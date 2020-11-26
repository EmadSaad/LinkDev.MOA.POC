import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/modules/shared/services';
import { TranslateService } from '@ngx-translate/core';
import { OnInit, OnDestroy } from '@angular/core';
import { WorkspaceService } from './workspace-service.service';
import { RetrieveOptionsRequest } from 'src/modules/shared/Models/lookup-request.model';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { IGridResultBase } from '../interfaces/GridResultBase.interface';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { SharedService } from './shared.service';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FiltrationBase } from '../interfaces/filtration-base';
import { Mode } from 'src/modules/shared/form-guide/utility/enums/enums';
import { IWorkspaceContracts } from '../interfaces/WorkspaceContracts.interface';


export abstract class WorkspaceBase<TFiltration extends FiltrationBase, TResult> implements OnInit, OnDestroy {

    public filtration: TFiltration;
    public result: IGridResultBase<TResult>;
    public error = false;
    public errorMode: Mode = Mode.Error;
    public crType: number;
    public errorMessage: string;
    private isStaticLookupsLoaded: boolean;
    private init = true;
    public subscriptions: Subscription;
    public currentContractDetails: IWorkspaceContracts;
    constructor(
        public sharedService: SharedService,
        public workspaceService: WorkspaceService<TFiltration, TResult>,
        public lookupService: LookupService,
        public activatedRoute: ActivatedRoute,
        public alertService: AlertService, 
        public translateService: TranslateService) {
        this.subscriptions = new Subscription();
        this.filtration = this.getFiltrationInstance();
        this.loadLookups();
        setTimeout(() => {
            this.loadCrs();
        });
        setTimeout(() => {
            this.getCr();
        });
        if (this.addContractsToSearch()) {
            setTimeout(() => {
                this.getContract();
            });
        }
        this.getCrType();
        this.filtration.PageNumber = 1;
               this.translateService.get('WORKSPACE.ErrorMsg').subscribe(
      sel => {
        this.errorMessage = sel;
      });
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    ngOnInit(): void {
   
    }

    public abstract getLookupTypes(): RetrieveOptionsRequest[];
    public abstract getFiltrationInstance(): TFiltration;
    public abstract getAllowedCrTypes(): number[];
    public abstract addContractsToSearch(): boolean;
    public onLeaveComponent(): void { }
    public search() {
        SharedHelper.showLoader();
        if (this.filtration.CRId) {
            this.workspaceService.search(this.filtration).subscribe(res => {
                if (res.ResponseCode === ResponseCode.Success) {
                    this.result = res.Content;
                    SharedHelper.hideLoader();
                }else{
                    SharedHelper.hideLoader();
                    this.error = true;
                                this.errorMessage = res.FriendlyResponseMessage;
                }
            }, err => {
                console.log(err);
                SharedHelper.hideLoader();
            });
        }
    }
    private getContract() {
        const contractSub = this.sharedService.getContractId().subscribe(res => {
            this.filtration.ContractId = res;
            const contracts = this.lookupService.lookupEntities['ldv_contract_WorkspaceContracts'];
            if (contracts) {
                this.currentContractDetails = contracts.find(c => c.Value === res);
            }
            if (this.filtration.CRId !== '') {
                this.dynamicFunction(this.filtration.CRId, this.filtration.ContractId);
            }
        });
        this.subscriptions.add(contractSub);
    }
    public loadLookups(): void {
        const lookups = this.getLookupTypes();
        if (lookups && lookups.length > 0) {
            this.lookupService.loadLookups(lookups).subscribe(result => {
                this.isStaticLookupsLoaded = result;
            });
        } else {
            this.isStaticLookupsLoaded = true;
        }
    }
    private loadCrs() {
        SharedHelper.showLoader();
        if (this.sharedService.hasCrs()) {
            this.sharedService.getCrs().subscribe(res => {
                this.lookupService.handleRetrievedLookup(res);
                if (this.addContractsToSearch() && this.filtration.CRId !== undefined) {
                    this.getContracts(this.filtration.CRId);
                }
                // this.getContracts(res[0].Result[0].Value);
                // this.crType = res[0].Result[0].CrType;
                // this.sharedService.setCrType(this.crType);
                // if (this.isAllowedToAccessThisTab(this.crType)) {
                //     this.search();
                // }
            });
        } else {
            this.sharedService.getWorkspaceCRs().subscribe(res => {
                if (res.ResponseCode === ResponseCode.Success) {
                    this.lookupService.handleRetrievedLookup(res.Content);
                    this.sharedService.setCrID(res.Content[0].Result[0].Value);
                    this.sharedService.setCrs(res.Content);
                    if (this.addContractsToSearch()) {
                        this.getContracts(res.Content[0].Result[0].Value);
                    }
                    this.crType = res.Content[0].Result[0].CrType;
                    this.sharedService.setCrType(this.crType);
                    // if (this.isAllowedToAccessThisTab(this.crType)) {
                    //     this.search();
                    // }
                }
            }, err => {
                console.log(err);
            });
        }

    }
    public getContracts(crId: string) {
        // const contracts = this.lookupService.lookupEntities['ldv_contract_WorkspaceContracts'];
        // console.log(contracts);
        // if (!contracts) {
        this.sharedService.getCrContracts(crId).subscribe(res => {
            if (res.ResponseCode === ResponseCode.Success) {
                this.lookupService.handleRetrievedLookup(res.Content);
            }
        }, err => {
            console.log(err);
        });
        // }

    }
    public updateCr(crId: string) {
        if (crId !== null) {
            this.filtration.PageNumber = 1;
            SharedHelper.showLoader();
            this.sharedService.setCrID(crId);
            // this.sharedService.setContractId('');
            if (this.addContractsToSearch()) {
                this.getContracts(crId);
            }
            this.crType = this.lookupService.lookupEntities['account_WorkspaceCRs'].find(cr => cr.Value === crId).CrType;
            this.sharedService.setCrType(this.crType);
            // if (this.isAllowedToAccessThisTab(this.crType)) {
            //     this.search();
            // }
        } else {
            // empty contract list
        }

    }
    public updateContract(contractId: string) {
        SharedHelper.showLoader();
        this.sharedService.setContractId(contractId);
        this.search();
    }

    public clear(form: NgForm) {
        form.reset();
        this.search();
    }
    public pageChanged(pageNumber: number) {
        this.filtration.PageNumber = pageNumber;
        this.search();
    }
    public getCr() {
        const crSub = this.sharedService.getCrId().subscribe(res => {
            this.filtration.CRId = res;
            if (res !== '') {
                this.crType = this.lookupService.lookupEntities['account_WorkspaceCRs'].find(cr => cr.Value === res).CrType;
                this.sharedService.setCrType(this.crType);
                if (this.isAllowedToAccessThisTab(this.crType)) {
                    setTimeout(() => {
                        this.search();
                        if (this.filtration.CRId !== '') {
                            this.dynamicFunction(this.filtration.CRId, this.filtration.ContractId);
                        }
                    });
                }
            }

        }, err => {
            console.log(err);
        });
        this.subscriptions.add(crSub);
    }
    public isAllowedToAccessThisTab(crType: number): boolean {
        const exists = this.getAllowedCrTypes().find(x => x === crType);
        if (exists !== undefined && exists !== -1) {
            this.error = false;
            return true;
        } else {
            this.error = true;
            SharedHelper.hideLoader();
            return false;
        }
    }
    public advancedSearch() {
        this.filtration.PageNumber = 1;
        this.search();
    }
    // private getStatistics(){
    //     let contractSub;
    //     let requestStatisticsSub;
    //     const crSub = this.sharedService.getCrId().subscribe(res => {
    //         debugger;
    //         let crId = res;
    //         if (res !== '') {
    //             contractSub = this.sharedService.getContractId().subscribe(res => {
    //                 if (!this.isContractAdded) {
    //                     this.requestsubscriptions.add(contractSub);
    //                 }
    //                 debugger;
    //                 let contractId = res;
    //                 if (crId !== '') {
    //                     requestStatisticsSub = this.sharedService.getRequestStatistics(crId, contractId).subscribe(res => {
    //                         if (!this.isRequestStatisticsAdded) {
    //                             this.requestsubscriptions.add(requestStatisticsSub);
    //                         }
    //                         this.requestStatistics = res.Content;
    //                     });
    //                     crId = '';
    //                     contractId = '';
    //                 }
    //             });
    //         }
    //     });
    //     this.requestsubscriptions.add(crSub);
    //     // sub
    //     //dynamic 
    // }
    public dynamicFunction(crId: string, contractId: string): void { }
    private getCrType() {
        this.sharedService.getCrType().subscribe(res => {
            this.crType = res;
        }, err => {
            console.log(err);
        });
    }
}
