// *********************************************************************
// Created by : Latebound Constants Generator 1.2021.1.2 for XrmToolBox
// Author     : Jonas Rapp https://jonasr.app/
// GitHub     : https://github.com/rappen/LCG-UDG/
// Source Org : https://org0b3142d0.crm.dynamics.com
// Filename   : C:\Users\emad.beshai\Desktop\InfrastructurePermitIssuanceRequest.cs
// Created    : 2021-06-06 01:50:08
// *********************************************************************

namespace LinkDev.ECZA.POC.Models
{
    /// <summary>DisplayName: Infrastructure Permit Issuance Request, OwnershipType: UserOwned, IntroducedVersion: 1.0</summary>
    public static class InfrastructurePermitIssuanceRequest
    {
        public const string EntityName = "ldv_infrastructurepermitissuancerequest";
        public const string EntityCollectionName = "ldv_infrastructurepermitissuancerequests";

        #region Attributes

        /// <summary>Type: Uniqueidentifier, RequiredLevel: SystemRequired</summary>
        public const string PrimaryKey = "ldv_infrastructurepermitissuancerequestid";
        /// <summary>Type: String, RequiredLevel: ApplicationRequired, MaxLength: 100, Format: Text</summary>
        public const string PrimaryName = "ldv_name";
        /// <summary>Type: Uniqueidentifier, RequiredLevel: None</summary>
        public const string DeprecatedStageId = "stageid";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 1250, Format: Text</summary>
        public const string DeprecatedTraversedPath = "traversedpath";
        /// <summary>Type: Customer, RequiredLevel: None, Targets: account,contact</summary>
        public const string Applicant = "ldv_applicant";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string ApplicationSubmitted = "ldv_applicationsubmitted";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string BasementArea = "ldv_basementarea";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string BlockArabicName = "ldv_blockarabicname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string BlockEnglishName = "ldv_blockenglishname";
        /// <summary>Type: Integer, RequiredLevel: None, MinValue: -2147483648, MaxValue: 2147483647</summary>
        public const string BuildingMaximumHeightm = "ldv_buildingmaximumheightm";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string BuildingArea = "ldv_buildingarea";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string BuildingHeight = "ldv_buildingheight";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Check & Print Preview Request, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string CheckPrintPreviewRequest = "ldv_checkprintpreviewrequest";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Check Request, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string CheckRequest = "ldv_checkrequest";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string CityArabicName = "ldv_cityarabicname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string CityEnglishName = "ldv_cityenglishname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ClientaccountECAID = "ldv_clientaccountecaid";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string CloseApplication = "ldv_closeapplication";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string CommercialRegistration = "ldv_commercialregistration";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string CorporateName = "ldv_corporatename";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string CorporateNameEN = "ldv_corporatenameen";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: systemuser</summary>
        public const string CreatedBy = "createdby";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string CreatedOn = "createdon";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: transactioncurrency</summary>
        public const string Currency = "transactioncurrencyid";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string Delivered = "ldv_delivered";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string DeliveryInformationFilled = "ldv_deliveryinformationfilled";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Delivery Method, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string DeliveryMethod = "ldv_deliverymethod";
        /// <summary>Type: Memo, RequiredLevel: None, MaxLength: 2000</summary>
        public const string Description = "ldv_description";
        /// <summary>Type: Lookup, RequiredLevel: Recommended, Targets: ldv_designconsultant</summary>
        public const string DesignConsultant = "ldv_designconsultant";
        /// <summary>Type: Lookup, RequiredLevel: Recommended, Targets: ldv_designconsultant</summary>
        public const string DesignReviewConsultant = "ldv_designreviewconsultant";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string DistrictArabicName = "ldv_districtarabicname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string DistrictEnglishName = "ldv_districtenglishname";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string DocumentsUploaded = "ldv_documentsuploaded";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Email</summary>
        public const string EmailAddress = "emailaddress";
        /// <summary>Type: Decimal, RequiredLevel: None, MinValue: 0.0000000001, MaxValue: 100000000000, Precision: 10</summary>
        public const string ExchangeRate = "exchangerate";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ExemptionAmount = "ldv_exemptionamount";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ExemptionType = "ldv_exemptiontype";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ExistingUSage = "ldv_existingusage";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 4, CalculationOf: ldv_finalfees</summary>
        public const string FinalFeesBase = "ldv_finalfees_base";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 4</summary>
        public const string FinalFees = "ldv_finalfees";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string Floor = "ldv_floor";
        /// <summary>Type: Integer, RequiredLevel: None, MinValue: -2147483648, MaxValue: 2147483647</summary>
        public const string FloorAreaRatioFAR = "ldv_floorarearatiofar";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string KrokiNumber = "ldv_krokinumber";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string LandArea = "ldv_landarea";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string LandUsage = "ldv_landusage";
        /// <summary>Type: EntityName, RequiredLevel: None</summary>
        public const string ldv_applicantidtype = "ldv_applicantidtype";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 4000, Format: Text</summary>
        public const string ldv_applicantname = "ldv_applicantname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 4000, Format: Text</summary>
        public const string ldv_applicantyominame = "ldv_applicantyominame";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_applicationsubmittedname = "ldv_applicationsubmittedname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_checkprintpreviewrequestname = "ldv_checkprintpreviewrequestname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_checkrequestname = "ldv_checkrequestname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_closeapplicationname = "ldv_closeapplicationname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_deliveredname = "ldv_deliveredname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_deliveryinformationfilledname = "ldv_deliveryinformationfilledname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_deliverymethodname = "ldv_deliverymethodname";
        /// <summary>Type: String (Logical), RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ldv_designconsultantname = "ldv_designconsultantname";
        /// <summary>Type: String (Logical), RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ldv_designreviewconsultantname = "ldv_designreviewconsultantname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_documentsuploadedname = "ldv_documentsuploadedname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_fullstatusname = "ldv_fullstatusname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_paymentmethodname = "ldv_paymentmethodname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_paymentrequiredname = "ldv_paymentrequiredname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_plotstatusname = "ldv_plotstatusname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_printedname = "ldv_printedname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_realestatestatusname = "ldv_realestatestatusname";
        /// <summary>Type: String (Logical), RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ldv_screeninvestmentlicensename = "ldv_screeninvestmentlicensename";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_signedname = "ldv_signedname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string LocalPlan = "ldv_localplan";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string Location = "ldv_location";
        /// <summary>Type: Integer, RequiredLevel: None, MinValue: -2147483648, MaxValue: 2147483647</summary>
        public const string MaximumCoverage = "ldv_maximumcoverage";
        /// <summary>Type: Integer, RequiredLevel: None, MinValue: -2147483648, MaxValue: 2147483647</summary>
        public const string MaximumNumberOfFloors = "ldv_maximumnumberoffloors";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: systemuser</summary>
        public const string ModifiedBy = "modifiedby";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string ModifiedOn = "modifiedon";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string NeighborhoodArabicName = "ldv_neighborhoodarabicname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string NeighborhoodEnglishName = "ldv_neighborhoodenglishname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string Note = "ldv_note";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string OfficeArabicName = "ldv_officearabicname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string OfficeEnglishName = "ldv_officeenglishname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string OldStatus = "ldv_status";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string OtherArea = "ldv_otherarea";
        /// <summary>Type: Owner, RequiredLevel: SystemRequired, Targets: systemuser,team</summary>
        public const string Owner = "ownerid";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ParkingArea = "ldv_parkingarea";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Payment Method, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string PaymentMethod = "ldv_paymentmethod";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string PIN = "ldv_pin";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string PlotPropertyReferenceNumber = "ldv_plotpropertyreferencenumber";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Plot Status, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string PlotStatus = "ldv_plotstatus";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string PrequalifiedConsultantaccountECAID = "ldv_prequalifiedconsultantaccountecaid";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string Printed = "ldv_printed";
        /// <summary>Type: String, RequiredLevel: ApplicationRequired, MaxLength: 26, Format: Text</summary>
        public const string PRN = "ldv_prn";
        /// <summary>Type: Uniqueidentifier, RequiredLevel: None</summary>
        public const string ProcessId = "processid";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 4, CalculationOf: ldv_projectcostsar</summary>
        public const string ProjectCostSARBase = "ldv_projectcostsar_base";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 4</summary>
        public const string ProjectCostSAR = "ldv_projectcostsar";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 4, CalculationOf: ldv_projectcostusd</summary>
        public const string ProjectCostUSDBase = "ldv_projectcostusd_base";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 4</summary>
        public const string ProjectCostUSD = "ldv_projectcostusd";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ProjectTitle = "ldv_projecttitle";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ProjectType = "ldv_projecttype";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string PropertyArea = "ldv_propertyarea";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ProposedUsage = "ldv_proposedusage";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Real Estate Status, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string RealEstateStatus = "ldv_realestatestatus";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string RefNo = "ldv_refno";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string RoofArea = "ldv_roofarea";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: ldv_screeninvestmentlicenserequest1</summary>
        public const string ScreenInvestmentLicense = "ldv_screeninvestmentlicense";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 0, CalculationOf: ldv_servicefees</summary>
        public const string ServiceFeesBase = "ldv_servicefees_base";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 0</summary>
        public const string ServiceFees = "ldv_servicefees";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string ServiceRequiresFees = "ldv_paymentrequired";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string Signed = "ldv_signed";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string SiteArea = "ldv_sitearea";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string statecodename = "statecodename";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Status, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string Status = "ldv_fullstatus";
        /// <summary>Type: State, RequiredLevel: SystemRequired, DisplayName: Status, OptionSetType: State</summary>
        public const string Status1 = "statecode";
        /// <summary>Type: Status, RequiredLevel: None, DisplayName: Status Reason, OptionSetType: Status</summary>
        public const string StatusReason = "statuscode";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string statuscodename = "statuscodename";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string StreetArabicName = "ldv_streetarabicname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string StreetEnglishName = "ldv_streetenglishname";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateOnly, DateTimeBehavior: UserLocal</summary>
        public const string SurveyDate = "ldv_surveydate";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateOnly, DateTimeBehavior: UserLocal</summary>
        public const string SurveyDateHijri = "ldv_surveydatehijri";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string SurveyorName = "ldv_surveyorname";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string SurveyorNameArabic = "ldv_surveyornamearabic";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 4, CalculationOf: ldv_totalfees</summary>
        public const string TotalFeesBase = "ldv_totalfees_base";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 4</summary>
        public const string TotalFees = "ldv_totalfees";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string TotalUnits = "ldv_totalunits";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string Unit = "ldv_unit";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string UsedArea = "ldv_usedarea";

        #endregion Attributes

        #region OptionSets

        public enum CheckPrintPreviewRequest_OptionSet
        {
            Hold = 100000000,
            Reject = 100000001,
            Approve = 100000002
        }
        public enum CheckRequest_OptionSet
        {
            ReturnRequest = 100000000,
            ApproveRequest = 100000001
        }
        public enum DeliveryMethod_OptionSet
        {
            Pick_up = 100000000,
            Delivery = 100000001
        }
        public enum ldv_applicantidtype_OptionSet
        {
        }
        public enum PaymentMethod_OptionSet
        {
            BankDeposit = 100000000,
            BankTransfer = 100000001,
            Saddad = 100000002
        }
        public enum PlotStatus_OptionSet
        {
            Status1 = 100000000
        }
        public enum RealEstateStatus_OptionSet
        {
            Newoption = 100000000
        }
        public enum Status_OptionSet
        {
            Submitted = 100000000,
            RequestReturned = 100000001,
            RequestRe_submitted = 100000002,
            RequestApprovedbyDesignReviewConsultant = 100000003,
            RequestPending = 100000004,
            RequestRejected = 100000005,
            RequestCanceled = 100000006,
            RequestApproved = 100000007,
            InfrastructurePermitIssued = 100000008,
            PendingPayment = 100000009,
            PaymentCollected = 100000010,
            PermitPrinted = 100000011,
            PermitSigned = 100000012,
            PermitDelivered = 100000013,
            RequestClosed = 100000014
        }
        public enum StateCode_OptionSet
        {
            Active = 0,
            Inactive = 1
        }
        public enum StatusReason_OptionSet
        {
            Active = 1,
            Inactive = 2
        }

        #endregion OptionSets
    }
}
