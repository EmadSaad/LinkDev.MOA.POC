var Fields = {
  //Decissions
  IndustrialCityAdminDecision: "ldv_industrialcityadmindecision",
  FinanceManagerDecision: "ldv_financemanagerdecision",
  GISAdminDecision: "ldv_gisadmindecision",
  FinanceManagerConfirmation: "ldv_financemanagerconfirmation",
  IsSubmitted: "ldv_issubmitted",
  Comment: "ldv_comment",
  CommentType: "ldv_commenttype",
  //general
  Requester: "ldv_requester",
  RequestNumber: "ldv_name",
  Contract: "ldv_contractid",
  UpdateType: "ldv_updatetype",
  CR: "ldv_cr",
  UpdateReasons: "ldv_updatereasons",
  NewArea: "ldv_newarea",
  Owner: "ownerid",
  HasIL: "ldv_hasil",
  UpdatecurrentCRIL: "ldv_updatecurrentcril",
  NewCR: "ldv_newcr",
  NewIL: "ldv_newil",
  NewCRVersion: "ldv_newcrversion",
  NewILVersion: "ldv_newilversion",
  SubmissionDate: "ldv_submissiondate",
  IndustrialCity: "ldv_industrialcity",
  //hidden fields -Helper f
  RequestStatus: "ldv_requeststatus",
  PortalRequestStatus: "ldv_portalrequeststatus",
  Status: "statecode"
};

var Commenttype = {
  Internal: 1,
  External: 2
};
var FinanceManagerConfirmation = {
  Yes: 1
};

var FinanceManagerDecision = {
  Proceedwithrequest: 1,
  SendBack: 2
};
var IndustrialCityAdminDecisions = {
  Proceedwithrequest: 1,
  Sendbacktoinvestor: 2,
  Cantbeproceed: 3
};

var UpdateType = {
  AreaUpdate: 1,
  ILandCRUpdate: 2
};

var TwoOptionValues = {
  Yes: 1,
  No: 2
};

var BPFFields = {
  IsSubmitted: "header_process_ldv_issubmitted",
  IndustrialCityAdminDecision: "header_process_ldv_industrialcityadmindecision",
  FinanceManagerDecision: "header_process_ldv_financemanagerdecision",
  GISAdminDecision: "header_process_ldv_gisadmindecision",
  FinanceManagerConfirmation: "header_process_ldv_financemanagerconfirmation",
  Comment: "header_process_ldv_comment",
  CommentType: "header_process_ldv_commenttype",
  UpdateType: "header_process_ldv_updatetype",
  NewArea: "header_process_ldv_newarea"
};

var HeaderFiledsStatus = {
  RequestStatus: "header_ldv_requeststatus",
  PortalRequestStatus: "header_ldv_portalrequeststatus",
  Status: "header_statecode"

};
var RequestStatusCode = {
  Draft: "1",
  RequestReview: "2",
  PendingonIndustrialCityAdmin: "132",
  FinanceManagerReview: "132",
  GISAdminReview: "129",
  UpdateData: "6",
  Completed: "39",
  Anapologyfortherequest: "3"
};

var RequestStatusIDs = {
  Draft: "{E462A859-E84B-EA11-A9B6-000D3A46F0D9}",
  RequestReview: "{B4D31D72-E84B-EA11-A9B6-000D3A46F0D9}",
  IndustrialCityAdminReview: "{E5758D80-ABF6-EA11-A985-000D3AAA6848}",
  FinanceManagerReview: "{32F0C28E-B0F6-EA11-A985-000D3AAA6848}",
  GISAdminReview: "{E25ED85C-ABF6-EA11-A985-000D3AAA6848 }",
  Completed: "{D4FE1AC8-566C-EA11-A964-000D3AAB0880}",
  UpdateData: "{E74D3DE8-E84B-EA11-A9B6-000D3A46F0D9}",
  Reject: "{7E404590-3FF3-EA11-A97E-000D3AAA6848}"
};
var StagesIDs = {
  Draft: "0b70527e-ec2c-41b2-9e6a-2795b623b2ea",
  IndustrialCityApproval: "235b2e38-0eef-4bb2-9f65-6016a2c4a595",
  FinanceManagerDecission: "170f3ac5-dcd5-4ea0-a93e-879f5814796c",
  FinanceManagerConfirmation: "a7abae3f-372a-414f-b711-093b17f7430e",
  GIS: "b7f2fa49-4ee1-40e3-939b-1dca7ce297e7",
  Completed: "b8c89bb3-b93e-46dd-9adf-31d9992cae10"
};


function UpdateContractsRequest_OnLoad(executionContext) {
  //alert("run yah");
  debugger;
  var formContext = executionContext.getFormContext();
  Common.LockFormControls(formContext);
  CheckActiveStage(formContext);
  UpdateType_OnChange(executionContext);

  /////// show/hide based on update current IL CR flag
  var updatecurrentcril_value = formContext.getAttribute(Fields.UpdatecurrentCRIL).getValue();
  if (updatecurrentcril_value == TwoOptionValues.Yes) {
    Common.ShowField(formContext, Fields.NewCR, true);
    Common.ShowField(formContext, Fields.NewCRVersion, true);
    HasIL_OnChange(executionContext);
  }
  else {
    Common.ShowField(formContext, Fields.NewCR, false);
    Common.ShowField(formContext, Fields.NewIL, false);
    Common.ShowField(formContext, Fields.NewILVersion, false);
    Common.ShowField(formContext, Fields.NewCRVersion, false);
    Common.ShowField(formContext, Fields.HasIL, false);
  }
  // show / hide IL CR compresion based on update type
  if (Fields.UpdateType == UpdateType.AreaUpdate) {
    Common.HideSection(formContext, "GeneralTab", "CRVersionComparison", false);
    Common.HideSection(formContext, "GeneralTab", "ILVersionComparison", false);
  }
  else {
    Common.HideSection(formContext, "GeneralTab", "CRVersionComparison", true);
    Common.HideSection(formContext, "GeneralTab", "ILVersionComparison", true);
  }


}

function CheckActiveStage(formContext) {
  //alert("run CheckActiveStage");
  debugger;
  var activeStage = formContext.data.process.getActiveStage();
  var stageId = activeStage.getId();
  var requestStatus = formContext.getAttribute(Fields.RequestStatus).getValue();
  // alert (requestStatus);

  //alert(requestStatus == RequestStatusIDs.UpdateData);
  if (stageId == StagesIDs.Draft) {
    Common.DisableField(formContext, Fields.IsSubmitted, false);
    Common.DisableField(formContext, BPFFields.IsSubmitted, false);

    //fieldds  just for  test 
    Common.DisableField(formContext, Fields.Requester, false);
    Common.DisableField(formContext, Fields.UpdateType, false);
    Common.DisableField(formContext, Fields.HasIL, false);
    Common.DisableField(formContext, Fields.UpdatecurrentCRIL, false);
    Common.DisableField(formContext, Fields.NewCR, false);
    Common.DisableField(formContext, Fields.NewIL, false);
    Common.DisableField(formContext, Fields.NewCRVersion, false);
    Common.DisableField(formContext, Fields.NewILVersion, false);
    Common.DisableField(formContext, Fields.IndustrialCity, false);


    if (requestStatus[0].id != RequestStatusIDs.UpdateData) {
      Common.DisableField(formContext, Fields.CR, false);
      Common.DisableField(formContext, Fields.Contract, false);
    }
    // end



  }
  else if (stageId == StagesIDs.IndustrialCityApproval) {
    Common.DisableField(formContext, Fields.IndustrialCityAdminDecision, false);
    Common.DisableField(formContext, Fields.CommentType, false);
    Common.DisableField(formContext, Fields.Comment, false);
    Common.DisableField(formContext, BPFFields.IndustrialCityAdminDecision, false);
    Common.DisableField(formContext, BPFFields.CommentType, false);
    Common.DisableField(formContext, BPFFields.Comment, false);

  }
  else if (stageId == StagesIDs.FinanceManagerDecission) {
    Common.DisableField(formContext, Fields.FinanceManagerDecision, false);
    Common.DisableField(formContext, Fields.CommentType, false);
    Common.DisableField(formContext, Fields.Comment, false);
    Common.DisableField(formContext, BPFFields.FinanceManagerDecision, false);
    Common.DisableField(formContext, BPFFields.CommentType + "_1", false);
    Common.DisableField(formContext, BPFFields.Comment + "_1", false);
  }
  else if (stageId == StagesIDs.FinanceManagerConfirmation) {
    Common.DisableField(formContext, Fields.FinanceManagerConfirmation, false);
    Common.DisableField(formContext, BPFFields.FinanceManagerConfirmation, false);
  }
  else if (stageId == StagesIDs.GIS) {
    Common.DisableField(formContext, Fields.GISAdminDecision, false);
    Common.DisableField(formContext, BPFFields.GISAdminDecision, false);
    Common.DisableField(formContext, Fields.NewArea, false);
    Common.DisableField(formContext, BPFFields.NewArea, false);

  }
  else {
    Common.LockFormControls(formContext);
  }

  if (IsUCI()) {
    HideAllStageButtonsUCI();
    formContext.data.process.addOnStageSelected(onClickStageInUCI);

  }
  else {
    HideBPFFinishAction();
    HideBPFSetActive();
    HideBPFNextAction();
    HideBPFBackAction();
    HideBPFProcessName();
  }

}

function UpdateContractsRequest_OnSave(executionContext) {

  var formContext = executionContext.getFormContext();
  CheckActiveStage(formContext);

}
function UpdateType_OnChange(executionContext) {

  var formContext = executionContext.getFormContext();
  var UpdateType_Value = formContext.getAttribute(Fields.UpdateType).getValue();
  if (UpdateType_Value == UpdateType.ILandCRUpdate) {
    Common.ShowField(formContext, Fields.HasIL, true);
    Common.ShowField(formContext, Fields.UpdatecurrentCRIL, true);
    Common.ShowField(formContext, Fields.NewCR, true);
    Common.ShowField(formContext, Fields.NewCRVersion, true);

    HasIL_OnChange(executionContext);

  }
  else {


    Common.ShowField(formContext, Fields.HasIL, false);
    Common.ShowField(formContext, Fields.UpdatecurrentCRIL, false);
    Common.ShowField(formContext, Fields.NewCR, false);
    Common.ShowField(formContext, Fields.NewIL, false);
    Common.ShowField(formContext, Fields.NewCRVersion, false);
    Common.ShowField(formContext, Fields.NewILVersion, false);
  }

}
function updatecurrentcril_onchange(executionContext) {
  var formContext = executionContext.getFormContext();
  var updatecurrentcril_value = formContext.getattribute(fields.updatecurrentcril).getvalue();
  if (updatecurrentcril_value == TwoOptionValues.yes) {
    common.showfield(formContext, fields.newcr, true);
    common.showfield(formContext, fields.newcrversion, true);
    hasil_onchange(executioncontext);
  }
  else {
    common.showfield(formContext, fields.newcr, false);
    common.showfield(formContext, fields.newil, false);
    common.showfield(formContext, fields.newcrversion, false);
    common.showfield(formContext, fields.newilversion, false);
    common.showfield(formContext, fields.Fields.HasIL, false);
  }


}

function HasIL_OnChange(executionContext) {
  //alert("run HasIL");
  var formContext = executionContext.getFormContext();
  var HasIL_Value = formContext.getAttribute(Fields.HasIL).getValue();
  if (HasIL_Value != TwoOptionValues.Yes) {
    Common.ShowField(formContext, Fields.NewIL, false);
    Common.ShowField(formContext, Fields.NewILVersion, false);
    // Common.ShowField(formContext, Fields.HasIL, false);
  }
  else {
    Common.ShowField(formContext, Fields.NewIL, true);
    Common.ShowField(formContext, Fields.NewILVersion, true);
  }
}


function IndustrialCityAdministratorDecision_OnChange(executionContext) {
  var formContext = executionContext.getFormContext();
  var IndustrialCityAdminDecision_value = formContext.getAttribute(Fields.IndustrialCityAdminDecision).getValue();
  if (IndustrialCityAdminDecision_value == IndustrialCityAdminDecisions.Sendbacktoinvestor || IndustrialCityAdminDecision_value == IndustrialCityAdminDecisions.Cantbeproceed) {

    HideNextStageUCI();
    // Classic
    Common.HideBPFNextButton();
    // HideBPFBackButtonInClassic();
  }
  else {

    ShowNextStageUCI();
    // Classic
    Common.ShowBPFNextButton();

  }
}

function FinanceManagerDecision_OnChange(executionContext) {
  var formContext = executionContext.getFormContext();
  var FinanceDecision = formContext.getAttribute(Fields.FinanceManagerDecision).getValue();
  if (FinanceDecision == FinanceManagerDecision.SendBack) {

    HideAllStageButtonsUCI();
    // Classic
    Common.HideBPFNextButton();

  }
  else {

    ShowNextStageUCI();
    // Classic
    Common.ShowBPFNextButton();

  }
}

function FinanceManagerConfirmation_OnChange(executionContext) {
  var formContext = executionContext.getFormContext();
  var FinanceConfirmation = formContext.getAttribute(Fields.FinanceManagerConfirmation).getValue();
  if (FinanceConfirmation != FinanceManagerConfirmation.Yes) {

    HideAllStageButtonsUCI();
    // Classic
    Common.HideBPFNextButton();
    //HideBPFBackButtonInClassic();

  }
  else {

    ShowNextStageUCI();
    // Classic
    Common.ShowBPFNextButton();

  }
}


function GISAdminDecision_OnChange(executionContext) {
  var formContext = executionContext.getFormContext();
  var GISDecision = formContext.getAttribute(Fields.GISAdminDecision).getValue();
  if (GISDecision != TwoOptionValues.Yes) {

    HideAllStageButtonsUCI();
    // Classic
    Common.HideBPFNextButton();
    //HideBPFBackButtonInClassic();

  }
  else {

    ShowNextStageUCI();
    // Classic
    Common.ShowBPFNextButton();

  }
}


///UCI Function 

function HideAllStageButtonsUCI() {
  if (IsUCI()) {
    setTimeout(function () {
      $(window.parent.document).find("[data-id = 'MscrmControls.Containers.ProcessStageControl-businessProcessFlowFlyoutFooterContainer']").find('button').each(function (index) { $(this).hide() })
    }, 100)
  }
}
function ShowAllStageButtonsUCI() {
  if (IsUCI()) {
    setTimeout(function () {
      $(window.parent.document).find("[data-id = 'MscrmControls.Containers.ProcessStageControl-businessProcessFlowFlyoutFooterContainer']").find('button').each(function (index) { $(this).show() })
    }, 100)
  }
}
function onClickStageInUCI(executionContext) {
  if (IsUCI()) {
    $(window.parent.document).find("body").on("click", "[data-id='MscrmControls.Containers.ProcessBreadCrumb-headerStageContainer'] li", function () {
      setTimeout(function () {
        HideAllStageButtonsUCI(executionContext);
      }, 100)
    })
  }
}


function HideNextStageUCI() {
  setTimeout(function () {
    $(window.parent.document)
      .find(
        "[data-id = 'MscrmControls.Containers.ProcessStageControl-businessProcessFlowFlyoutFooterContainer']")
      .find('button').each(function (index) {
        $(this).hide();
      });
  },
    100);
  var hide = true;
  var interval = setInterval(function () {
    var element5 = parent.document.getElementById("MscrmControls.Containers.ProcessStageControl-stageDockFooterContainer");
    if (element5 != null && hide == true) {
      hide = false;
      element5.style.display = "none";
      clearInterval(interval);
    }
  }, 1000);
}

function ShowNextStageUCI() {
  setTimeout(function () {
    $(window.parent.document)
      .find(
        "[data-id = 'MscrmControls.Containers.ProcessStageControl-businessProcessFlowFlyoutFooterContainer']")
      .find('button').each(function (index) {
        $(this).show();
      });
  },
    100);
  var show = true;
  var intervalShowNextStageAfterExpand = setInterval(function () {
    var element5 = parent.document.getElementById("MscrmControls.Containers.ProcessStageControl-stageDockFooterContainer");
    if (element5 != null && show == true) {
      show = false;
      element5.style.display = "";
      clearInterval(intervalShowNextStageAfterExpand);
    }
  }, 1000);
  //HidePreviusButtonInUCI();
}
function IsUCI() {
  var globalContext = Xrm.Utility.getGlobalContext();
  var appURL = globalContext.getCurrentAppUrl();
  var clientURL = globalContext.getClientUrl();
  if (appURL !== clientURL)
    return true;

  return false;
}


//classic 
function HideBPFBackAction() {
  parent.document.getElementById("stageBackActionContainer").style.visibility = 'hidden';
}

function HideBPFNextAction() {
  parent.document.getElementById("stageAdvanceActionContainer").style.visibility = 'hidden';
}

function HideBPFFinishAction() {
  parent.document.getElementById("stageFinishActionContainer").style.visibility = 'hidden';
}

function HideBPFSetActive() {
  parent.document.getElementById("stageSetActiveActionContainer").style.visibility = 'hidden';
}
function HideBPFProcessName() {
  parent.document.getElementById("processName").style.visibility = 'hidden';
}


