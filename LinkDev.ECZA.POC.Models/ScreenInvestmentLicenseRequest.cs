// *********************************************************************
// Created by : Latebound Constants Generator 1.2021.1.2 for XrmToolBox
// Author     : Jonas Rapp https://jonasr.app/
// GitHub     : https://github.com/rappen/LCG-UDG/
// Source Org : https://org0b3142d0.crm.dynamics.com
// Filename   : C:\Users\emad.beshai\Desktop\ScreenInvestmentLicenseRequest.cs
// Created    : 2021-06-09 08:47:01
// *********************************************************************

namespace LinkDev.ECZA.POC.Models
{
    /// <summary>DisplayName: Screen Investment License Request, OwnershipType: UserOwned, IntroducedVersion: 1.0.0.0</summary>
    public static class ScreenInvestmentLicenseRequest
    {
        public const string EntityName = "ldv_screeninvestmentlicenserequest1";
        public const string EntityCollectionName = "ldv_screeninvestmentlicenserequest1s";

        #region Attributes

        /// <summary>Type: Uniqueidentifier, RequiredLevel: SystemRequired</summary>
        public const string PrimaryKey = "ldv_screeninvestmentlicenserequest1id";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string PrimaryName = "ldv_name";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string FillPRN = "ldv_fllprn";
        /// <summary>Type: Uniqueidentifier, RequiredLevel: None</summary>
        public const string DeprecatedStageId = "stageid";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 1250, Format: Text</summary>
        public const string DeprecatedTraversedPath = "traversedpath";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: account</summary>
        public const string Applicant = "ldv_applicant";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string ApprovalDocumentsAttached = "ldv_approvaldocumentsattached";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ArabicName = "ldv_arabicname";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Asses Case , OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string AssesCase = "ldv_assescase";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Business Type, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string BusinessType = "ldv_businesstype";
        /// <summary>Type: Integer, RequiredLevel: None, MinValue: -2147483648, MaxValue: 2147483647</summary>
        public const string calculatedtest = "ldv_calculatedtest";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string CaseAssessedAndEvaluated = "ldv_caseassessedandevaluated";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string CloseRequest = "ldv_closerequest";
        /// <summary>Type: Integer, RequiredLevel: None, MinValue: -2147483648, MaxValue: 2147483647</summary>
        public const string CommitteeApprovalPercent = "ldv_committeeapprovalpercent";
        /// <summary>Type: Integer, RequiredLevel: None, MinValue: -2147483648, MaxValue: 2147483647</summary>
        public const string CommitteeRejectPercent = "ldv_committeerejectpercent";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string ConfirmLandAvailability = "ldv_confirmlandavailability";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: systemuser</summary>
        public const string CreatedBy = "createdby";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string CreatedOn = "createdon";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: transactioncurrency</summary>
        public const string Currency = "transactioncurrencyid";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string DocumentUploaded = "ldv_documentuploaded";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Email</summary>
        public const string EmailAddress = "emailaddress";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateOnly, DateTimeBehavior: UserLocal</summary>
        public const string EndDate = "ldv_enddate";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string EnglishName = "ldv_englishname";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Entity Category, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string EntityCategory = "ldv_entitycategory";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Entity Type, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string EntityType = "ldv_entitytype";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string EntityName_ = "ldv_entityname";
        /// <summary>Type: Decimal, RequiredLevel: None, MinValue: 0.0000000001, MaxValue: 100000000000, Precision: 10</summary>
        public const string ExchangeRate = "exchangerate";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Facility Type, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string FacilityType = "ldv_facilitytype";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: contact</summary>
        public const string IndividualApplicant = "ldv_individualapplicant";
        /// <summary>Type: Picklist, RequiredLevel: ApplicationRequired, DisplayName: Investment License Type, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string InvestmentLicenseType = "ldv_investmentlicensetype";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Investment Type, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string InvestmentType = "ldv_investmenttype";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string IsPaid = "ldv_ispaid";
        /// <summary>Type: String (Logical), RequiredLevel: None, MaxLength: 160, Format: Text</summary>
        public const string ldv_applicantname = "ldv_applicantname";
        /// <summary>Type: String (Logical), RequiredLevel: None, MaxLength: 160, Format: Text</summary>
        public const string ldv_applicantyominame = "ldv_applicantyominame";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_approvaldocumentsattachedname = "ldv_approvaldocumentsattachedname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_assescasename = "ldv_assescasename";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_businesstypename = "ldv_businesstypename";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_caseassessedandevaluatedname = "ldv_caseassessedandevaluatedname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_closerequestname = "ldv_closerequestname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_confirmlandavailabilityname = "ldv_confirmlandavailabilityname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_documentuploadedname = "ldv_documentuploadedname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_entitycategoryname = "ldv_entitycategoryname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_entitytypename = "ldv_entitytypename";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_facilitytypename = "ldv_facilitytypename";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_fllprnname = "ldv_fllprnname";
        /// <summary>Type: String (Logical), RequiredLevel: None, MaxLength: 160, Format: Text</summary>
        public const string ldv_individualapplicantname = "ldv_individualapplicantname";
        /// <summary>Type: String (Logical), RequiredLevel: None, MaxLength: 450, Format: Text</summary>
        public const string ldv_individualapplicantyominame = "ldv_individualapplicantyominame";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_investmentlicensetypename = "ldv_investmentlicensetypename";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_investmenttypename = "ldv_investmenttypename";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_ispaidname = "ldv_ispaidname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_legalstatusname = "ldv_legalstatusname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_paymentmethodname = "ldv_paymentmethodname";
        /// <summary>Type: String (Logical), RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ldv_paymentname = "ldv_paymentname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_servicerequiresfeesname = "ldv_servicerequiresfeesname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_submitrequestname = "ldv_submitrequestname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_targetedcityname = "ldv_targetedcityname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_thirdpartiesapprovalname = "ldv_thirdpartiesapprovalname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_verifyrequestname = "ldv_verifyrequestname";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Legal Status, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string LegalStatus = "ldv_legalstatus";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: systemuser</summary>
        public const string ModifiedBy = "modifiedby";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string ModifiedOn = "modifiedon";
        /// <summary>Type: Owner, RequiredLevel: SystemRequired, Targets: systemuser,team</summary>
        public const string Owner = "ownerid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: ldv_payment</summary>
        public const string Payment = "ldv_payment";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Payment Method, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string PaymentMethod = "ldv_paymentmethod";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string PRN = "ldv_prn";
        /// <summary>Type: Uniqueidentifier, RequiredLevel: None</summary>
        public const string ProcessId = "processid";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 0, CalculationOf: ldv_servicefees</summary>
        public const string ServiceFeesBase = "ldv_servicefees_base";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 0</summary>
        public const string ServiceFees = "ldv_servicefees";
        /// <summary>Type: Boolean, RequiredLevel: ApplicationRequired, True: 1, False: 0, DefaultValue: False</summary>
        public const string ServiceRequiresFees = "ldv_servicerequiresfees";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateOnly, DateTimeBehavior: UserLocal</summary>
        public const string StartDate = "ldv_startdate";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string statecodename = "statecodename";
        /// <summary>Type: State, RequiredLevel: SystemRequired, DisplayName: Status, OptionSetType: State</summary>
        public const string Status = "statecode";
        /// <summary>Type: Status, RequiredLevel: None, DisplayName: Status Reason, OptionSetType: Status</summary>
        public const string StatusReason = "statuscode";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string statuscodename = "statuscodename";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string SubCity = "ldv_subcity";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string SubmitRequest = "ldv_submitrequest";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string TargetCity = "ldv_targetcity";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Targeted City, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string TargetedCity = "ldv_targetedcity";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Third Parties Approval, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ThirdPartiesApproval = "ldv_thirdpartiesapproval";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string Tickersymbol = "ldv_tickersymbol";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 0, CalculationOf: ldv_totalfees</summary>
        public const string TotalFeesBase = "ldv_totalfees_base";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 0</summary>
        public const string TotalFees = "ldv_totalfees";
        /// <summary>Type: Integer, RequiredLevel: None, MinValue: 0, MaxValue: 500</summary>
        public const string TotalScore = "ldv_totalscore";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 250, Format: Text</summary>
        public const string TradeName = "ldv_tradename";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Verify Request, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string VerifyRequest = "ldv_verifyrequest";

        #endregion Attributes

        #region OptionSets

        public enum AssesCase_OptionSet
        {
            Caseassessedandevaluated = 100000000,
            Rejected = 100000001,
            Approved = 100000002,
            RequiresNewRoleInterference = 100000003
        }
        public enum BusinessType_OptionSet
        {
            NewBusiness = 100000000,
            Branch = 100000001
        }
        public enum EntityCategory_OptionSet
        {
            LargeEnterprise = 100000000,
            SME = 100000001,
            Entrepreneur = 100000002
        }
        public enum EntityType_OptionSet
        {
            HeadQuarter = 100000000,
            Branch = 100000001
        }
        public enum FacilityType_OptionSet
        {
            Warehouse = 100000000,
            Plot = 100000001,
            Work_station = 100000002,
            Manufacture = 100000003,
            Others = 100000004
        }
        public enum InvestmentLicenseType_OptionSet
        {
            Service = 100000000,
            Industry = 100000001,
            Retail = 100000002
        }
        public enum InvestmentType_OptionSet
        {
            Saudi = 100000000,
            Foreign = 100000001,
            JointVenture = 100000002
        }
        public enum LegalStatus_OptionSet
        {
            IndividualEstablishment = 100000000,
            SolelyOwnershipLimitedLiabilityCompany = 100000001,
            LimitedLiabilityCompany = 100000002,
            PublicShare_holdingCompany = 100000003,
            ClosedShare_holdingCompany = 100000004,
            HoldingCompany = 100000005
        }
        public enum PaymentMethod_OptionSet
        {
            BankDeposit = 100000000,
            BankTransfer = 100000001,
            Saddad = 100000002
        }
        public enum Status_OptionSet
        {
            Active = 0,
            Inactive = 1
        }
        public enum StatusReason_OptionSet
        {
            Submitted = 1,
            InProgress = 100000000,
            Approved = 100000001,
            PendingPayment = 100000002,
            NotVerified = 100000006,
            Rejected = 100000007,
            Completed = 100000008,
            Inactive = 2,
            Rejected1 = 100000003,
            RequestClosed = 100000004,
            NotVerified1 = 100000005
        }
        public enum TargetedCity_OptionSet
        {
            KingAbdullahEconomicCity = 100000000,
            KnowledgeEconomicCity = 100000001,
            JazanEconomicCity = 100000002,
            PrinceAbdulazizBinMosaedEconomicCity = 100000003
        }
        public enum ThirdPartiesApproval_OptionSet
        {
            Approved = 100000000,
            Return = 100000001,
            Rejected = 100000002,
            Hold = 100000003
        }
        public enum VerifyRequest_OptionSet
        {
            VerifiedCase = 100000000,
            NotVerifiedCase = 100000001
        }

        #endregion OptionSets
    }
}
