// *********************************************************************
// Created by : Latebound Constants Generator 1.2021.1.2 for XrmToolBox
// Author     : Jonas Rapp https://jonasr.app/
// GitHub     : https://github.com/rappen/LCG-UDG/
// Source Org : https://org0b3142d0.crm.dynamics.com
// Filename   : C:\Users\emad.beshai\Desktop\DesignConsultant.cs
// Created    : 2021-06-06 02:47:29
// *********************************************************************

namespace LinkDev.ECZA.POC.Models
{
    /// <summary>DisplayName: Design Consultant, OwnershipType: UserOwned, IntroducedVersion: 1.0</summary>
    public static class DesignConsultant
    {
        public const string EntityName = "ldv_designconsultant";
        public const string EntityCollectionName = "ldv_designconsultants";

        #region Attributes

        /// <summary>Type: Uniqueidentifier, RequiredLevel: SystemRequired</summary>
        public const string PrimaryKey = "ldv_designconsultantid";
        /// <summary>Type: String, RequiredLevel: ApplicationRequired, MaxLength: 100, Format: Text</summary>
        public const string PrimaryName = "ldv_name";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: systemuser</summary>
        public const string CreatedBy = "createdby";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string CreatedOn = "createdon";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string HasViolation = "ldv_hasviolation";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_hasviolationname = "ldv_hasviolationname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_providedservicesname = "ldv_providedservicesname";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string ldv_verifiedname = "ldv_verifiedname";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: systemuser</summary>
        public const string ModifiedBy = "modifiedby";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string ModifiedOn = "modifiedon";
        /// <summary>Type: Owner, RequiredLevel: SystemRequired, Targets: systemuser,team</summary>
        public const string Owner = "ownerid";
        /// <summary>Type: Virtual, RequiredLevel: None, DisplayName: Provided Services, OptionSetType: Picklist</summary>
        public const string ProvidedServices = "ldv_providedservices";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string statecodename = "statecodename";
        /// <summary>Type: State, RequiredLevel: SystemRequired, DisplayName: Status, OptionSetType: State</summary>
        public const string Status = "statecode";
        /// <summary>Type: Status, RequiredLevel: None, DisplayName: Status Reason, OptionSetType: Status</summary>
        public const string StatusReason = "statuscode";
        /// <summary>Type: Virtual (Logical), RequiredLevel: None</summary>
        public const string statuscodename = "statuscodename";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string Verified = "ldv_verified";

        #endregion Attributes

        #region OptionSets

        public enum ProvidedServices_OptionSet
        {
            InfrastructurePermits = 100000000,
            ScreenInvestmentLicenses = 100000001
        }
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
