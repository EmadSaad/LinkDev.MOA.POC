import { Component, OnInit } from '@angular/core';
import { FormHierarchyBase } from 'src/modules/shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from 'src/modules/shared/form-guide/form-hierarchy/node-type-enum';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { SharedHelper } from 'src/modules/shared/services/shared-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { GridColumn } from 'src/modules/shared/form-guide/grid/models/GridColumn';
import { ColumnFieldType } from 'src/modules/shared/form-guide/gridEmmitter/models/GridColumn';
import { ContractDetails } from '../../interfaces/contract-details';
import { TranslateService } from '@ngx-translate/core';
import { ContractService } from '../../services/contract.service';
import { ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { ContractStatement } from '../../interfaces/contract-statement';
import { ContractorCr } from '../../interfaces/contractor-cr';
import { ContractContactDetails } from '../../interfaces/contract-contact-details';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { LookupService } from 'src/modules/shared/Services/lookup.service';
import { AlertService } from 'src/modules/shared/services/alert.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit {

  contractDetails: ContractDetails;
  activeLevelOne = 1;
  activeLevelTwo = 1;
  formStructure: FormHierarchyBase[] = [];
  contractId: string;
  contactsGridColumns: GridColumn[];
  invoicesGridColumns: GridColumn[];
  contractorsGridColumns: GridColumn[];
  contractStatement: ContractStatement;
  contractContacts: ContractContactDetails[] = [];
  contractContractorsAndConsultingOffice: ContractorCr[] = [];
  documentSettings: DocumentSettingModel[] = [];
  maximumContactNumber = 2;
  contactList: any[] = [];
  selectedContact: any;
  addItemFailed = false;
  submissionInfo: string;
  submissionAlertClass: string;
  tabText = 'Outputs.Contract.ContractDetails';
  config = {
    displayKey: 'Text', // if objects array passed which key to be displayed defaults to description
    search: true, // true/false for the search functionlity defaults to false,
    placeholder: 'SELECT', // text to be displayed when no item is selected defaults to Select,
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Search', // label thats displayed in search input,
    searchOnKey: 'Text'
  };
  workspaceLabel: string;

  constructor(private api: ContractService, private activatedRoute: ActivatedRoute, private router: Router,
    public translate: TranslateService, protected lookupService: LookupService, private alertService: AlertService) {
    this.activeLevelOne = 1;
    this.activeLevelTwo = 1;
    this.contractDetails = { ContractNumber: '' };
    this.formStructure.push({ index: 1, label: 'Outputs.Contract.ContractDetails', type: NodeType.Parent });

    this.activatedRoute.queryParams.subscribe(p => {
      this.contractId = p.Id;
      if (this.contractId !== null && this.contractId !== undefined) {
        SharedHelper.showLoader();
        this.getContractDetails();
        this.getAttachments();
        this.getContacts(false);
        this.getContractContractorsAndConsultingOffices();
      } else {
        this.router.navigate(['/workspace']);
      }
    });
    this.contactsGridColumns = [
      { header: 'Outputs.Contract.Contacts.FullName', field: 'FullName', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.Contacts.Email', field: 'Email', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.Contacts.PhoneNumber', field: 'PhoneNumber', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.Contacts.CommunicationRole', field: 'CommunicationRole', typeConfig: { type: ColumnFieldType.Text, } }
    ];
    this.contractorsGridColumns = [
      { header: 'Outputs.Contract.ContractsAndConsultingOffice.CRName', field: 'CRName', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.ContractsAndConsultingOffice.CRNumber', field: 'CRNumber', typeConfig: { type: ColumnFieldType.Text, } },
      {
        header: 'Outputs.Contract.ContractsAndConsultingOffice.RelationType',
        field: 'RelationType', typeConfig: { type: ColumnFieldType.Text, }
      },
      {
        header: 'Outputs.Contract.ContractsAndConsultingOffice.QualificationNumber',
        field: 'QualificationNumber', typeConfig: { type: ColumnFieldType.Text, }
      },
    ];
    this.invoicesGridColumns = [
      { header: 'Outputs.Contract.Statement.TransactionNumber', field: 'transactionNumber', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.Statement.TransactionType', field: 'transactionType', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.Statement.Amount', field: 'Amount', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.Statement.AmountPaid', field: 'PaidAmount', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.Statement.EffectiveDate', field: 'effectiveDate', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.Statement.InvoiceStartDate', field: 'invoiceStartDate', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.Statement.InvoiceEndDate', field: 'invoiceEndDate', typeConfig: { type: ColumnFieldType.Text, } },
      { header: 'Outputs.Contract.Statement.EffectiveDateHijri', field: 'effectiveDateHijri', typeConfig: { type: ColumnFieldType.Text, } },
      {
        header: 'Outputs.Contract.Statement.InvoiceStartDateHijri',
        field: 'invoiceStartDateHijri', typeConfig: { type: ColumnFieldType.Text, }
      },
      {
        header: 'Outputs.Contract.Statement.InvoiceEndDateHijri',
        field: 'invoiceEndDateHijri', typeConfig: { type: ColumnFieldType.Text, }
      },
      { header: 'Outputs.Contract.Statement.RunningTotal', field: 'RunningAmount', typeConfig: { type: ColumnFieldType.Text, } },
    ];
    this.translate.get('SELECT').subscribe(
      sel => {
        this.translate.get('NO_RESULT_FOUND').subscribe(
          no => {
            this.config['placeholder'] = sel;
            this.config['noResultsFound'] = no;
          }
        );
      }
    );
    this.translate.get('WORKSPACE.Home').subscribe(res => {
      this.workspaceLabel = res;
    });
  }

  ngOnInit() {
  }

  onSelect(node: FormHierarchyBase) {
    this.activeLevelOne = node.index;
    this.tabText = node.label;
  }
  getContractDetails() {
    this.api.getContractDetails(this.contractId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.contractDetails = res.Content;
        console.log(this.contractDetails);
        SharedHelper.hideLoader();
        this.getInvoices();
        this.getRelatedContacts(this.contractDetails.CRId);

      } else {
        SharedHelper.hideLoader();
        this.alertService.error(res.FriendlyResponseMessage, 'workspace', this.workspaceLabel);
        this.router.navigateByUrl('/notification');
      }
    }, error => {
      SharedHelper.hideLoader();
      this.alertService.error(error.error.Message, 'workspace', this.workspaceLabel);
      this.router.navigateByUrl('/notification');
    });
  }
  getContacts(showLoader: boolean) {
    if (showLoader) {
      SharedHelper.showLoader();
    }
    this.api.getContractContacts(this.contractId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.contractContacts = res.Content;
        this.contractContacts.forEach(e => {
          e.IsDeleted = false;
          e.Id = e.ContactId;
        });
        if (showLoader) {
          SharedHelper.hideLoader();
        } else {

          this.formStructure.push({ index: 2, label: 'Outputs.Contract.ContractContacts', type: NodeType.Parent });
        }
      }

    });
  }
  getAttachments() {
    this.api.getContractDocuments(this.contractId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.documentSettings = res.Content;
        this.formStructure.push({ index: 3, label: 'Outputs.Contract.ContractAttachments', type: NodeType.Parent });
      }

    }, error => {
      SharedHelper.hideLoader();
      this.alertService.error(error.error.Message, 'workspace', this.workspaceLabel);
      this.router.navigateByUrl('/notification');
    });
  }
  getInvoices() {

    this.api.getContractStatement(this.contractDetails.ContractNumber).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.contractStatement = res.Content as ContractStatement;
        this.contractStatement.Transactions.forEach(s => {
          s.IsDeleted = false;
        });
        this.formStructure.push({ index: 4, label: 'Outputs.Contract.ContractInvoices', type: NodeType.Parent });
      }
    }, error => {
      SharedHelper.hideLoader();
      this.alertService.error(error.error.Message, 'workspace', this.workspaceLabel);
      this.router.navigateByUrl('/notification');
    });
  }
  getContractContractorsAndConsultingOffices() {
    this.api.getContractContractorsAndConsultingOffices(this.contractId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.contractContractorsAndConsultingOffice = res.Content;
        this.contractContractorsAndConsultingOffice.forEach(s => {
          s.IsDeleted = false;
        });
        this.formStructure.push({ index: 5, label: 'Outputs.Contract.ContractorsAndConsultingOffice', type: NodeType.Parent });
      }
    }, error => {
      SharedHelper.hideLoader();
      this.alertService.error(error.error.Message, 'workspace', this.workspaceLabel);
      this.router.navigateByUrl('/notification');

    });
  }
  getRelatedContacts(crId: string) {
    this.api.getAvailableContacts(crId).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        this.lookupService.handleRetrievedLookup(res.Content);
      }
    }, error => {
      SharedHelper.hideLoader();
      this.alertService.error(error.error.Message, 'workspace', this.workspaceLabel);
      this.router.navigateByUrl('/notification');

    });
  }

  contactChanged(value) {
    console.log(value);
  }
  deletedContact(deletedContact) {
    SharedHelper.showLoader();
    this.api.deleteContact(this.contractId, deletedContact).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        if (res.Content === true) {
          const deletedIndex = this.contractContacts.findIndex(c => c.ContactId === deletedContact);
          if (deletedIndex >= 0) {
            this.contractContacts.splice(deletedIndex, 1);
          }
        }
      } else {
        this.submissionAlertClass = 'alert-danger';
        this.submissionInfo = res.FriendlyResponseMessage;
      }
      SharedHelper.hideLoader();

    }, error => {
      this.submissionAlertClass = 'alert-danger';
      this.submissionInfo = error.FriendlyResponseMessage;
      this.getContacts(true);

    });
    console.log(deletedContact);
  }
  addContact(value) {
    SharedHelper.showLoader();
    this.api.addContact(this.contractId, this.selectedContact).subscribe(res => {
      if (res.ResponseCode === ResponseCode.Success) {
        if (res.Content === true) {
          this.addItemFailed = false;
          this.getContacts(true);
        } else {
          this.submissionAlertClass = 'alert-danger';
          this.submissionInfo = res.FriendlyResponseMessage;
          this.addItemFailed = false;
        }
      } else {
        // this.addItemFailed = true;
        this.contractContacts.splice(-1, 1);
        this.submissionAlertClass = 'alert-danger';
        this.submissionInfo = res.FriendlyResponseMessage;
        SharedHelper.hideLoader();
      }


    }, error => {
      // this.addItemFailed = true;
      this.submissionAlertClass = 'alert-danger';
      this.submissionInfo = error.FriendlyResponseMessage;
      SharedHelper.hideLoader();

    });
  }
}
