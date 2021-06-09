// *********************************************************************
// Created by : Latebound Constants Generator 1.2021.1.2 for XrmToolBox
// Author     : Jonas Rapp https://jonasr.app/
// GitHub     : https://github.com/rappen/LCG-UDG/
// Source Org : https://org0b3142d0.crm.dynamics.com
// Filename   : C:\Users\emad.beshai\Desktop\ScreenLicenseWizardAnswers.cs
// Created    : 2021-06-09 13:43:18
// *********************************************************************

namespace LinkDev.ECZA.POC.Models
{
    /// <summary>DisplayName: Screen License Wizard Answers, OwnershipType: UserOwned, IntroducedVersion: 1.0.0.0</summary>
    public static class ScreenLicenseWizardAnswers
    {
        public const string EntityName = "ldv_screenlicensewizardanswers";
        public const string EntityCollectionName = "ldv_screenlicensewizardanswerses";

        #region Attributes

        /// <summary>Type: Uniqueidentifier, RequiredLevel: SystemRequired</summary>
        public const string PrimaryKey = "ldv_screenlicensewizardanswersid";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string PrimaryName = "ldv_name";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: systemuser</summary>
        public const string CreatedBy = "createdby";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string CreatedOn = "createdon";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_answername = "ldv_answername";
        /// <summary>Type: String (Logical), RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ldv_questionname = "ldv_questionname";
        /// <summary>Type: String (Logical), RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ldv_screenilrequestname = "ldv_screenilrequestname";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: systemuser</summary>
        public const string ModifiedBy = "modifiedby";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string ModifiedOn = "modifiedon";
        /// <summary>Type: Owner, RequiredLevel: SystemRequired, Targets: systemuser,team</summary>
        public const string Owner = "ownerid";
        /// <summary>Type: Lookup, RequiredLevel: ApplicationRequired, Targets: ldv_screenlicensewizardquestion</summary>
        public const string Question = "ldv_question";
        /// <summary>Type: Lookup, RequiredLevel: ApplicationRequired, Targets: ldv_screeninvestmentlicenserequest1</summary>
        public const string ScreenILRequest = "ldv_screenilrequest";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string statecodename = "statecodename";
        /// <summary>Type: State, RequiredLevel: SystemRequired, DisplayName: Status, OptionSetType: State</summary>
        public const string Status = "statecode";
        /// <summary>Type: Status, RequiredLevel: None, DisplayName: Status Reason, OptionSetType: Status</summary>
        public const string StatusReason = "statuscode";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string statuscodename = "statuscodename";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string Yes_No = "ldv_answer";

        #endregion Attributes

        #region OptionSets

        public enum Status_OptionSet
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
