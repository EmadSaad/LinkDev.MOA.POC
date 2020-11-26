import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CrOwners } from '../../Models/CROwners';
import { CRsInfo, ILISICActivities } from '../../Models/CRsInfo';
import { GridColumn, ColumnFieldType } from '../../../shared/form-guide/grid/models/GridColumn';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CRServices } from '../../Services/CR-Services';
import { SharedHelper } from '../../../shared/services/shared-helper';
import { AlertService } from '../../../shared/services';

@Component({
  selector: 'app-crinfo',
  templateUrl: './crinfo.component.html',
  styleUrls: ['./crinfo.component.css']
})
export class CRInfoComponent implements OnInit {
  public MyCurrentCR: CRsInfo;
  public CROwners: CrOwners[] = [];
  public CRActivity: ILISICActivities[] = [];
  isPopUpOpened: boolean = false;
  public SyncMsgClass: string = "";
  public SyncMsg: string = "";


  gridcols: GridColumn[] = [
    { header: "CRManagement.OwnerName", field: "CROwnerFullName", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.Nationality", field: "CROwnerNationality", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.RelationshipType", field: "RelationshipType", typeConfig: { type: ColumnFieldType.Text } },
    //{ header: "CRManagement.Share", field: "CROwnerShare", typeConfig: { type: ColumnFieldType.Text } },
  ];
  gridModel: CrOwners = new CrOwners();

  constructor(protected CRServices: CRServices,
    protected activatedRoute: ActivatedRoute,
    protected modalService: NgbModal,
    protected router: Router,
    protected alertService: AlertService) { }
  ISICActivitygridcols: GridColumn[] = [
    { header: "CRManagement.IlActivitydivision", field: "Division", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.IlActivityClass", field: "Class", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.IlActivityName", field: "Activity", typeConfig: { type: ColumnFieldType.Text } },
    { header: "CRManagement.ILISICCode", field: "ISICCode", typeConfig: { type: ColumnFieldType.Text } },
  ];
  ISICActivitygridModel: ILISICActivities = new ILISICActivities();

  ngOnInit() {
    this.MyCurrentCR = {};
    this.GetCRIntegrationInfoByCRId();
  }

  GetCRIntegrationInfoByCRId() {
    SharedHelper.showLoader();
    let CRId = this.activatedRoute.snapshot.queryParams["CrId"];
    this.CRServices.GetCRIntegrationInfoByCRId(`CrId=${CRId}`).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage != null) {
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else {
        this.MyCurrentCR = res.Content
        this.getCrIsicActs();
        this.getCROwners();
      }
    }, err => {
      this.SyncMsgClass = "alert alert-danger"
      this.SyncMsg = err.error.FriendlyResponseMessage == undefined ? err.message : "";
      SharedHelper.hideLoader();
    });
  }
  getCrIsicActs() {
    let CRId = this.MyCurrentCR.Id;
    this.CRServices.getCrIsicActs(`CrId=${CRId}`).subscribe(res => {
      SharedHelper.hideLoader();
      this.CRActivity = res.Content;
    })
  }
  getCROwners() {
    let CRId = this.MyCurrentCR.Id;
    this.CRServices.getCROwners(`CrId=${CRId}`).subscribe(res => {
      SharedHelper.hideLoader();
      this.CROwners = res.Content;
    })
  }
  UpdateCRFromIntgeration() {
    SharedHelper.showLoader();
    this.SyncMsg = "";
    let CrNumber = this.MyCurrentCR.CrNumber;
    let CRId = this.activatedRoute.snapshot.queryParams["CrId"];
    this.CRServices.getCRUpdateFromIntgeration(`CRnumber=${CrNumber}` + `&` + `CrId=${CRId}`).subscribe(res => {
      SharedHelper.hideLoader();
      if (res.FriendlyResponseMessage !== null) {
        SharedHelper.hideLoader();
        this.alertService.error(res.FriendlyResponseMessage);
        this.router.navigate(['/notification']);
      }
      else if (!res.Content.IsResponsefail) {
        this.MyCurrentCR = res.Content;
        this.SyncMsgClass = "alert alert-success"
        this.SyncMsg = res.Content.ResponseMsg
        this.getCROwners();
      }
      else {
        this.SyncMsgClass = "alert alert-danger"
        this.SyncMsg = res.Content.ResponseMsg
        this.getCROwners();
      }
    }, err => {
      this.SyncMsgClass = "alert alert-danger"
      this.SyncMsg = err.error.FriendlyResponseMessage;
      SharedHelper.hideLoader();
    });
  }

}
