import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { FiltrationBase } from '../../interfaces/filtration-base';
import { DashboardService } from '../../services/dashboard.service';
import { IOverviewResult } from '../../interfaces/OverviewResult.interface';
import { Service } from '../../interfaces/service.enum';
import { TranslateService } from '@ngx-translate/core';
import { Mode } from 'src/modules/shared/form-guide/utility/enums/enums';
import { RequestsService } from '../../services/requests.service';
import { IRequestsResult } from '../../interfaces/RequestResult.interface';
import { IGridResultBase } from '../../interfaces/GridResultBase.interface';
import { ITasksResult } from '../../interfaces/TasksResult.interface';
import { TasksService } from '../../services/tasks.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { IContractResult } from '../../interfaces/ContractResult.interface';
import { ILicenseResult } from '../../interfaces/LicenseResult.interface';
import { LicenseService } from '../../services/license.service';
import { ContractsService } from '../../services/contracts.service';
import { WonBiddingsService } from '../../services/won-biddings.service';
import { AvailableBiddingsService } from '../../services/available-biddings.service';
import { IBidding } from '../../interfaces/Bidding.interface';
import { Subscription } from 'rxjs';
import { SwiperComponent } from 'ngx-swiper-wrapper';
import { IWorkspaceContracts } from '../../interfaces/WorkspaceContracts.interface';
import { IQualificationResult } from '../../interfaces/QualificationResult.interface';
import { QualificationService } from '../../services/Qualification.service';
import { OperatingLicensesService } from '../../services/operatingLicenses.service';
import { IOperatingLicenseResult } from '../../interfaces/OperatingLicenseResult.interface';
import { ITicketResult } from '../../interfaces/TicketResult.interface';
import { TicketService } from '../../services/tickets.service';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ConfigService } from 'src/modules/shared/Services/Config-Service/config-service.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit, OnDestroy {
  public totalTickets: number;
  public url: string = ConfigService.CRMAPI;
  filtration: FiltrationBase;
  overviewData: IOverviewResult;
  requestResult: IGridResultBase<IRequestsResult>;
  taskResult: IGridResultBase<ITasksResult>;
  ticketResult: IGridResultBase<ITicketResult>;
  contractResult: IGridResultBase<IContractResult>;
  licenseResult: IGridResultBase<ILicenseResult>;
  operatingLicenseResult: IGridResultBase<IOperatingLicenseResult>;
  wonBiddingResult: IGridResultBase<IBidding>;
  availableBiddingResult: IGridResultBase<IBidding>;
  availableQualifications:IGridResultBase<IQualificationResult>;
  currentContractDetails: IWorkspaceContracts;
  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  isCrLoaded = false;
  isContractLoaded = false;
  isOverViewTobeLoaded = false;
  crType: number;
  error = false;
  errorMode: Mode = Mode.Error;
  errorMessage: string;
  crNotAuthorizedMessage: string;
  service: Service = Service.Requests;
  serviceEnum = Service;
  private init = true;
  config = {
    displayKey: 'Text',
    search: true,
    placeholder: 'Select',
    noResultsFound: 'No results found!',
    searchPlaceholder: 'Search',
    searchOnKey: 'Text'
  };
  cols: any[] = [];
  subscriptions: Subscription;

  constructor(public lookupService: LookupService,
    private sharedService: SharedService,
    private dashboardService: DashboardService,
    public translateService: TranslateService,
    private requestService: RequestsService,
    private taskService: TasksService,
    private licenseService: LicenseService,
    private contractService: ContractsService,
    private wonBiddingService: WonBiddingsService,
    private availableBiddingService: AvailableBiddingsService,
    public qualificationService: QualificationService,
    public operatingLicensesService: OperatingLicensesService,
    private ticketService: TicketService,
    protected api: APIService ) {

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    // this.sharedService.getCrs().unsubscribe();
    // this.sharedService.getCrId().unsubscribe();
    // this.sharedService.getContractId().unsubscribe();
  }

  ngOnInit() {
    this.subscriptions = new Subscription();
    SharedHelper.showLoader();
    this.filtration = { PageNumber: 1, ContractId: '' };
    this.translateService.get('SELECT').subscribe(
      sel => {
        this.translateService.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.translateService.get('SEARCH').subscribe(
              search => {
                this.config['placeholder'] = sel;
                this.config['noResultsFound'] = no;
                this.config['searchPlaceholder'] = search;
              });
          });
      });
    this.translateService.get('WORKSPACE.ErrorMsg').subscribe(
      sel => {
        this.crNotAuthorizedMessage = sel;
        this.errorMessage = sel;
      });
    setTimeout(() => {
      this.getCr();
    });
    setTimeout(() => {
      this.getContract();

    });
    this.getCrType();
  }
  private loadCrs() {
    if (this.sharedService.hasCrs()) {
      this.init = false;
      this.sharedService.getCrs().subscribe(res => {
        this.lookupService.handleRetrievedLookup(res);
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

          this.filtration.CRId = res.Content[0].Result[0].Value;
          this.getData(this.service);
        }
      }, err => {
        console.log(err);
      });
    }
  }
  private loadContracts(crId: string) {
    this.sharedService.getCrContracts(crId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.lookupService.handleRetrievedLookup(res.Content);
      }
    });
  }
  private getCr() {
    const crSub = this.sharedService.getCrId().subscribe(res => {
      this.filtration.CRId = res;
      if (this.filtration.CRId) {
        this.isCrLoaded = true;
        this.sharedService.setCrType(this.lookupService.lookupEntities['account_WorkspaceCRs'].find(cr => cr.Value === res).CrType);
        this.loadContracts(this.filtration.CRId);
        if (this.init === true) {
          this.getOverviewStatisticsAndData(false);
          // this.getOverviewStatistics(this.filtration.CRId, this.filtration.ContractId);
        }
        this.init = false;
      } else {
        this.loadCrs();
      }

    });
    this.subscriptions.add(crSub);
  }
  private getContract() {
    const contractSub = this.sharedService.getContractId().subscribe(res => {
      this.isContractLoaded = true;
      this.filtration.ContractId = res;
      const contracts = this.lookupService.lookupEntities['ldv_contract_WorkspaceContracts'];
      if (contracts)
        this.currentContractDetails = contracts.find(c => c.Value === res);
      if (this.init === false) {
        this.getOverviewStatisticsAndData(true);
      }
    });
    this.subscriptions.add(contractSub);
  }
  private getOverviewStatistics(crId: string, contractId: string) {
    this.dashboardService.getOverviewData(crId, contractId).subscribe(res => {
      debugger;
      this.isOverViewTobeLoaded = false;
      if (res.ResponseCode === ResponseCode.Success) {
        this.overviewData = res.Content;
        SharedHelper.hideLoader();
      }
    }, err => {
      console.log(err);
      SharedHelper.hideLoader();
    });
  }
  private getCrType() {
    this.sharedService.getCrType().subscribe(res => {
      this.crType = res;
    }, err => {
      console.log(err);
    });
  }
  updateContract(contractId: string) {
    this.sharedService.setContractId(contractId);
  }
  updateCr(crId: string) {
    if (crId !== null) {
      this.filtration.PageNumber = 1;
      SharedHelper.showLoader();
      this.sharedService.setCrID(crId);
      this.crType = this.lookupService.lookupEntities['account_WorkspaceCRs'].find(cr => cr.Value === crId).CrType;
      this.sharedService.setCrType(this.crType);
      this.componentRef.directiveRef.update();
      // this.getData(this.service);
    }

  }
  getContracts(crId: string) {
    this.sharedService.getCrContracts(crId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.lookupService.handleRetrievedLookup(res.Content);
      }
    }, err => {
      console.log(err);
    });
  }
  getData(service: number) {
    debugger;
    SharedHelper.showLoader();
    this.service = service;
    switch (service) {
      case this.serviceEnum.Requests: {
        this.cols = [
          { field: 'RequestNumber', header: 'WorkspaceBase.Requests.RequestNumber' },
          { field: 'ServiceName', header: 'WorkspaceBase.Requests.RequestType' },
          { field: 'PortalStatusName', header: 'WorkspaceBase.Requests.RequestStatus' },
          { field: 'SubmissionDate', header: 'WorkspaceBase.Requests.SubmissionDate' }];
        this.requestService.search(this.filtration).subscribe(res => {
          if (res.ResponseCode === ResponseCode.Success) {
            this.clearError();
            this.requestResult = res.Content;
            SharedHelper.hideLoader();
          }
          debugger;
          if (this.isOverViewTobeLoaded === false) {
            SharedHelper.hideLoader();
          }
        }, err => {
          SharedHelper.hideLoader();

        });
        break;
      }
      case this.serviceEnum.Tasks: {
        this.cols = [
          { field: 'RequestNumber', header: 'WorkspaceBase.Requests.RequestNumber' },
          { field: 'ServiceName', header: 'WorkspaceBase.Requests.RequestType' },
          { field: 'PortalStatusName', header: 'WorkspaceBase.Requests.RequestStatus' },
          { field: 'CreationDate', header: 'WorkspaceBase.Tasks.CreationDate' }];

        this.taskService.search(this.filtration).subscribe(res => {
          if (res.ResponseCode === ResponseCode.Success) {
            this.clearError();
            this.taskResult = res.Content;
            SharedHelper.hideLoader();
          }
          if (this.isOverViewTobeLoaded === false) {
            SharedHelper.hideLoader();
          }
        }, err => {
          SharedHelper.hideLoader();

        });
        break;
      }
      case this.serviceEnum.Licenses: {
        this.cols = [
          { field: 'LicenseNumber', header: 'WorkspaceBase.Licenses.LicenseNumber' },
          {
            field: 'Type', header: 'WorkspaceBase.Licenses.LicenseType'
          },
          { field: 'IssuanceDate', header: 'WorkspaceBase.Licenses.IssuanceDate' }
        ];
        this.licenseService.search(this.filtration).subscribe(res => {
          if (res.ResponseCode === ResponseCode.Success) {
            this.clearError();
            this.licenseResult = res.Content;
          } else {
            this.error = true;
            this.errorMessage = res.FriendlyResponseMessage;
            SharedHelper.hideLoader();
          }
          if (this.isOverViewTobeLoaded === false) {
            SharedHelper.hideLoader();
          }
        }, err => {
          SharedHelper.hideLoader();


        });
        break;
      }
      case this.serviceEnum.OperatingLicenses: {
        this.cols = [
          { field: 'LicenseNumber', header: 'WorkspaceBase.Licenses.LicenseNumber' },
          { field: 'LicenseTypeName', header: 'WorkspaceBase.Licenses.LicenseType' },
          { field: 'IssuanceDate', header: 'WorkspaceBase.Licenses.IssuanceDate' }
        ];
        this.operatingLicensesService.search(this.filtration).subscribe(res => {
          if (res.ResponseCode === ResponseCode.Success) {
            debugger;
            this.clearError();
            this.operatingLicenseResult = res.Content;
          } else {
            this.error = true;
            this.errorMessage = res.FriendlyResponseMessage;
            SharedHelper.hideLoader();
          }
          if (this.isOverViewTobeLoaded === false) {
            SharedHelper.hideLoader();
          }
        }, err => {
          SharedHelper.hideLoader();


        });
        break;
      }
      case this.serviceEnum.Contracts: {
        this.cols = [
          { field: 'ContractNumber', header: 'WorkspaceBase.Contracts.ContractNumber' },
          { field: 'MainType', header: 'WorkspaceBase.Contracts.ContractType' },
          { field: 'IndustrialStatus', header: 'WorkspaceBase.Contracts.IndustrialStatus' },
          { field: 'LegalStatus', header: 'WorkspaceBase.Contracts.LegalStatus' },
          { field: 'IssuanceDate', header: 'WorkspaceBase.Contracts.IssuanceDate' }
        ];
        this.contractService.search(this.filtration).subscribe(res => {
          if (res.ResponseCode === ResponseCode.Success) {
            this.clearError();
            this.contractResult = res.Content;
          } else {
            this.error = true;
            this.errorMessage = res.FriendlyResponseMessage;
            SharedHelper.hideLoader();

          }
          if (this.isOverViewTobeLoaded === false) {
            SharedHelper.hideLoader();
          }
        }, err => {
          SharedHelper.hideLoader();
        });
        break;
      }
      case this.serviceEnum.WonBiddings: {
        this.cols = [
          { field: 'ServiceName', header: 'WorkspaceBase.Biddings.BiddingType' },
          { field: 'CRName', header: 'WorkspaceBase.Biddings.CommercialName' },
          { field: 'InustrialCityName', header: 'WorkspaceBase.Biddings.IndustrialCity' },
          { field: 'LandArea', header: 'WorkspaceBase.Biddings.LandArea' },
        ];
        this.wonBiddingService.search(this.filtration).subscribe(res => {
          if (res.ResponseCode === ResponseCode.Success) {
            this.clearError();
            this.wonBiddingResult = res.Content;
          } else {
            this.error = true;
            this.errorMessage = res.FriendlyResponseMessage;
            SharedHelper.hideLoader();
          }
          if (this.isOverViewTobeLoaded === false) {
            SharedHelper.hideLoader();
          }
        });
        break;
      }
      case this.serviceEnum.AvailableBiddings: {
        this.cols = [
          { field: 'ServiceName', header: 'WorkspaceBase.Biddings.BiddingType' },
          { field: 'CRName', header: 'WorkspaceBase.Biddings.CommercialName' },
          { field: 'InustrialCityName', header: 'WorkspaceBase.Biddings.IndustrialCity' },
          { field: 'LandArea', header: 'WorkspaceBase.Biddings.LandArea' },
        ];
        this.availableBiddingService.search(this.filtration).subscribe(res => {
          if (res.ResponseCode === ResponseCode.Success) {
            this.clearError();
            this.availableBiddingResult = res.Content;
          } else {
            this.error = true;
            this.errorMessage = res.FriendlyResponseMessage;
            SharedHelper.hideLoader();
          }
          if (this.isOverViewTobeLoaded === false) {
            SharedHelper.hideLoader();
          }
        }, err => {
          SharedHelper.hideLoader();
        });
        break;
      }

      case this.serviceEnum.Quaifications:{
        this.cols = [
          { field: 'QualificationNumber', header: 'WorkspaceBase.Qualifications.QualificationNumber' },
          { field: 'CertificateType', header: 'WorkspaceBase.Qualifications.CertificateType' },
          { field: 'Status', header: 'WorkspaceBase.Qualifications.Status' },
          { field: 'IssuanceDate', header: 'WorkspaceBase.Qualifications.IssuanceDate' },
          { field: 'EndDate', header: 'WorkspaceBase.Qualifications.EndDate' }
        ];


        this.qualificationService.search(this.filtration).subscribe(res => {
          if (res.ResponseCode === ResponseCode.Success) {
            this.clearError();
            this.availableQualifications = res.Content;
          } else {
            this.error = true;
            this.errorMessage = res.FriendlyResponseMessage;
            SharedHelper.hideLoader();
          }
          if (this.isOverViewTobeLoaded === false) {
            SharedHelper.hideLoader();
          }
        }, err => {
          SharedHelper.hideLoader();
        });

        break;
      }
    }

  }
  getOverviewStatisticsAndData(getData: boolean) {
    debugger;
    if (this.isCrLoaded && this.isContractLoaded && this.filtration.CRId) {
      this.isOverViewTobeLoaded = true;
      this.getOverviewStatistics(this.filtration.CRId, this.filtration.ContractId);
      this.getTicketsList(this.filtration.CRId);
      if (getData) {
        this.getData(this.service);
      }
    }
  }
  private clearError() {
    this.error = false;
    this.errorMessage = this.crNotAuthorizedMessage;
  }

    public getTicketsList(contact: string): any {
        debugger;
        this.api.GetTicketList<any>(`${this.url}Cases?customerID=${contact}`).subscribe(
            (data: any) => {
                if (data.status.code == 200) {
                    var arr = data.data.cases;
                    this.totalTickets = data.data.cases.length;
                }
                return this.totalTickets;
            },
            (error) => {
                console.log("err", error);
                return 0;
            });
    }
}
