// *********************************************************************
// Created by : Latebound Constants Generator 1.2020.2.1 for XrmToolBox
// Author     : Jonas Rapp https://twitter.com/rappen
// GitHub     : https://github.com/rappen/LCG-UDG
// Source Org : https://presales.crm4.dynamics.com/
// Filename   : C:\Users\Emad.Beshai\Desktop\incident.cs
// Created    : 2020-12-01 12:32:48
// *********************************************************************
namespace LinkDev.MOA.POC.CRMModel.Incident
{
    /// <summary>DisplayName: Case, OwnershipType: UserOwned, IntroducedVersion: 5.0.0.0</summary>
    public static class incident
    {
        public const string EntityName = "incident";
        public const string EntityCollectionName = "incidents";

        #region Attributes

        /// <summary>Type: Uniqueidentifier, RequiredLevel: SystemRequired</summary>
        public const string PrimaryKey = "incidentid";
        /// <summary>Type: String, RequiredLevel: ApplicationRequired, MaxLength: 200, Format: Text</summary>
        public const string PrimaryName = "title";
        /// <summary>Type: Uniqueidentifier, RequiredLevel: None</summary>
        public const string stageid = "stageid";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 1250, Format: Text</summary>
        public const string traversedpath = "traversedpath";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string activitiescomplete = "activitiescomplete";
        /// <summary>Type: Integer, RequiredLevel: None, MinValue: 0, MaxValue: 1000000000</summary>
        public const string actualserviceunits = "actualserviceunits";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: ldv_arrivingport</summary>
        public const string ldv_arrivingport = "ldv_arrivingport";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: account</summary>
        public const string ldv_availablepharmacy = "ldv_availablepharmacy";
        /// <summary>Type: Integer, RequiredLevel: None, MinValue: 0, MaxValue: 1000000000</summary>
        public const string billedserviceunits = "billedserviceunits";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string blockedprofile = "blockedprofile";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ticketnumber = "ticketnumber";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Case Stage, OptionSetType: Picklist, DefaultFormValue: 1</summary>
        public const string incidentstagecode = "incidentstagecode";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Case Type, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string casetypecode = "casetypecode";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Case Type, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_casetype = "ldv_casetype";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Case Type, OptionSetType: Picklist, DefaultFormValue: 2</summary>
        public const string new_casetype = "new_casetype";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Case Type., OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_moacasetype = "ldv_moacasetype";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Change Appointment Type, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_changeappointmenttype = "ldv_changeappointmenttype";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string checkemail = "checkemail";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string ldv_checkstock = "ldv_checkstock";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: incident</summary>
        public const string ldv_childcase = "ldv_childcase";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: account</summary>
        public const string ldv_clinic = "ldv_clinic";
        /// <summary>Type: Memo, RequiredLevel: None, MaxLength: 2000</summary>
        public const string ldv_comment = "ldv_comment";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Complete Check Available Appointments Task, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_completecheckavailableappointmentstask = "ldv_completecheckavailableappointmentstask";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string ldv_completephonecalltask = "ldv_completephonecalltask";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string ldv_completesecondphonecalltask = "ldv_completesecondphonecalltask";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: contact</summary>
        public const string primarycontactid = "primarycontactid";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Contact Patient Relevant, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_contactpatientrelevant = "ldv_contactpatientrelevant";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: contract</summary>
        public const string contractid = "contractid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: contractdetail</summary>
        public const string contractdetailid = "contractdetailid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: systemuser</summary>
        public const string createdby = "createdby";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: externalparty</summary>
        public const string createdbyexternalparty = "createdbyexternalparty";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string adx_createdbyipaddress = "adx_createdbyipaddress";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string adx_createdbyusername = "adx_createdbyusername";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string createdon = "createdon";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: transactioncurrency</summary>
        public const string transactioncurrencyid = "transactioncurrencyid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: serviceappointment</summary>
        public const string ldv_currentappointment = "ldv_currentappointment";
        /// <summary>Type: Customer, RequiredLevel: SystemRequired, Targets: account,contact</summary>
        public const string customerid = "customerid";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Customer Area, OptionSetType: Picklist, DefaultFormValue: 100000000</summary>
        public const string new_customerarea = "new_customerarea";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string customercontacted = "customercontacted";
        /// <summary>Type: EntityName, RequiredLevel: ApplicationRequired</summary>
        public const string customeridtype = "customeridtype";
        /// <summary>Type: String, RequiredLevel: ApplicationRequired, MaxLength: 160, Format: Text</summary>
        public const string customeridname = "customeridname";
        /// <summary>Type: String, RequiredLevel: ApplicationRequired, MaxLength: 450, Format: Text</summary>
        public const string customeridyominame = "customeridyominame";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: True</summary>
        public const string decremententitlementterm = "decremententitlementterm";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string isdecrementing = "isdecrementing";
        /// <summary>Type: Memo, RequiredLevel: None, MaxLength: 2000</summary>
        public const string description = "description";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: contact</summary>
        public const string ldv_doctor = "ldv_doctor";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Email</summary>
        public const string emailaddress = "emailaddress";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: entitlement</summary>
        public const string entitlementid = "entitlementid";
        /// <summary>Type: Uniqueidentifier, RequiredLevel: None</summary>
        public const string entityimageid = "entityimageid";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string escalatedon = "escalatedon";
        /// <summary>Type: Decimal, RequiredLevel: None, MinValue: 0,0000000001, MaxValue: 100000000000, Precision: 10</summary>
        public const string exchangerate = "exchangerate";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: incident</summary>
        public const string existingcase = "existingcase";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string ldv_exportername = "ldv_exportername";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: ldv_country</summary>
        public const string ldv_exportingcountry = "ldv_exportingcountry";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string responseby = "responseby";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: slakpiinstance</summary>
        public const string firstresponsebykpiid = "firstresponsebykpiid";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string firstresponsesent = "firstresponsesent";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: First Response SLA Status, OptionSetType: Picklist, DefaultFormValue: 1</summary>
        public const string firstresponseslastatus = "firstresponseslastatus";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateOnly, DateTimeBehavior: UserLocal</summary>
        public const string followupby = "followupby";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string followuptaskcreated = "followuptaskcreated";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: msdyn_functionallocation</summary>
        public const string msdyn_functionallocation = "msdyn_functionallocation";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: account</summary>
        public const string ldv_hospital = "ldv_hospital";
        /// <summary>Type: Lookup, RequiredLevel: Recommended, Targets: account</summary>
        public const string ldv_icudepartment = "ldv_icudepartment";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: product</summary>
        public const string ldv_importedproduct = "ldv_importedproduct";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: account</summary>
        public const string ldv_importercompany = "ldv_importercompany";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: msdyn_incidenttype</summary>
        public const string msdyn_incidenttype = "msdyn_incidenttype";
        /// <summary>Type: Double, RequiredLevel: None, MinValue: 0, MaxValue: 1000000000, Precision: 2</summary>
        public const string influencescore = "influencescore";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Initial Appointment, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_initialappointment = "ldv_initialappointment";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Initial Approval, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_initialapproval = "ldv_initialapproval";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string merged = "merged";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: msdyn_iotalert</summary>
        public const string msdyn_iotalert = "msdyn_iotalert";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string isescalated = "isescalated";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string ldv_ismedicationdelivered = "ldv_ismedicationdelivered";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: kbarticle</summary>
        public const string kbarticleid = "kbarticleid";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateOnly, DateTimeBehavior: UserLocal</summary>
        public const string ldv_lastcalldate = "ldv_lastcalldate";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string lastonholdtime = "lastonholdtime";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: sla</summary>
        public const string slainvokedid = "slainvokedid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: ldv_country</summary>
        public const string ldv_madeincountry = "ldv_madeincountry";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Manager Approval, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_managerapproval = "ldv_managerapproval";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: incident</summary>
        public const string masterid = "masterid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: product</summary>
        public const string ldv_medication = "ldv_medication";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateOnly, DateTimeBehavior: UserLocal</summary>
        public const string ldv_medicationavailableon = "ldv_medicationavailableon";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: externalparty</summary>
        public const string modifiedbyexternalparty = "modifiedbyexternalparty";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: systemuser</summary>
        public const string modifiedby = "modifiedby";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string adx_modifiedbyipaddress = "adx_modifiedbyipaddress";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string adx_modifiedbyusername = "adx_modifiedbyusername";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string modifiedon = "modifiedon";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: serviceappointment</summary>
        public const string ldv_newappointment = "ldv_newappointment";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string ldv_newappointmentfrom = "ldv_newappointmentfrom";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: New Appointment Resolution, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_newappointmentresolution = "ldv_newappointmentresolution";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string ldv_newappointmentto = "ldv_newappointmentto";
        /// <summary>Type: DateTime, RequiredLevel: Recommended, Format: DateOnly, DateTimeBehavior: UserLocal</summary>
        public const string ldv_nextdosagedate = "ldv_nextdosagedate";
        /// <summary>Type: Integer, RequiredLevel: None, MinValue: -2147483648, MaxValue: 2147483647</summary>
        public const string onholdtime = "onholdtime";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Case Origin, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string caseorigincode = "caseorigincode";
        /// <summary>Type: Owner, RequiredLevel: SystemRequired, Targets: systemuser,team</summary>
        public const string ownerid = "ownerid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: incident</summary>
        public const string parentcaseid = "parentcaseid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: account</summary>
        public const string msa_partnerid = "msa_partnerid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: contact</summary>
        public const string msa_partnercontactid = "msa_partnercontactid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: contact</summary>
        public const string ldv_patient = "ldv_patient";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Payment Status, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_paymentstatus = "ldv_paymentstatus";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: account</summary>
        public const string ldv_pharmacy = "ldv_pharmacy";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateOnly, DateTimeBehavior: UserLocal</summary>
        public const string ldv_preferreddate = "ldv_preferreddate";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Priority, OptionSetType: Picklist, DefaultFormValue: 2</summary>
        public const string prioritycode = "prioritycode";
        /// <summary>Type: Uniqueidentifier, RequiredLevel: None</summary>
        public const string processid = "processid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: product</summary>
        public const string productid = "productid";
        /// <summary>Type: Decimal, RequiredLevel: None, MinValue: -100000000000, MaxValue: 100000000000, Precision: 2</summary>
        public const string ldv_quantity = "ldv_quantity";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Post Message type, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string messagetypecode = "messagetypecode";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: contact</summary>
        public const string ldv_relative = "ldv_relative";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: ldv_requeststatus</summary>
        public const string ldv_requeststatus = "ldv_requeststatus";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Resolution, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_lackmedicationresolution = "ldv_lackmedicationresolution";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Resolution, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_resolution = "ldv_resolution";
        /// <summary>Type: DateTime, RequiredLevel: None, Format: DateAndTime, DateTimeBehavior: UserLocal</summary>
        public const string resolveby = "resolveby";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: slakpiinstance</summary>
        public const string resolvebykpiid = "resolvebykpiid";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: ResolveBy SLA Status, OptionSetType: Picklist, DefaultFormValue: 1</summary>
        public const string resolvebyslastatus = "resolvebyslastatus";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: contact</summary>
        public const string responsiblecontactid = "responsiblecontactid";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: True</summary>
        public const string routecase = "routecase";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Satisfaction, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string customersatisfactioncode = "customersatisfactioncode";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Sent Survey, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_sentsurvey = "ldv_sentsurvey";
        /// <summary>Type: Double, RequiredLevel: None, MinValue: -100000000000, MaxValue: 100000000000, Precision: 2</summary>
        public const string sentimentvalue = "sentimentvalue";
        /// <summary>Type: String, RequiredLevel: None, MaxLength: 100, Format: Text</summary>
        public const string productserialnumber = "productserialnumber";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Service Level, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string contractservicelevelcode = "contractservicelevelcode";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Service Stage, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string servicestage = "servicestage";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Severity, OptionSetType: Picklist, DefaultFormValue: 1</summary>
        public const string severitycode = "severitycode";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: sla</summary>
        public const string slaid = "slaid";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: socialprofile</summary>
        public const string socialprofileid = "socialprofileid";
        /// <summary>Type: State, RequiredLevel: SystemRequired, DisplayName: Status, OptionSetType: State</summary>
        public const string statecode = "statecode";
        /// <summary>Type: Status, RequiredLevel: None, DisplayName: Status Reason, OptionSetType: Status</summary>
        public const string statuscode = "statuscode";
        /// <summary>Type: Lookup, RequiredLevel: None, Targets: subject</summary>
        public const string subjectid = "subjectid";
        /// <summary>Type: Picklist, RequiredLevel: None, DisplayName: Time Slots Status, OptionSetType: Picklist, DefaultFormValue: -1</summary>
        public const string ldv_timeslotsstatus = "ldv_timeslotsstatus";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 2, CalculationOf: ldv_totalprice</summary>
        public const string ldv_totalprice_base = "ldv_totalprice_base";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 2</summary>
        public const string ldv_totalprice = "ldv_totalprice";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 4, CalculationOf: ldv_unitprice</summary>
        public const string ldv_unitprice_base = "ldv_unitprice_base";
        /// <summary>Type: Money, RequiredLevel: None, MinValue: -922337203685477, MaxValue: 922337203685477, Precision: 4</summary>
        public const string ldv_unitprice = "ldv_unitprice";
        /// <summary>Type: Boolean, RequiredLevel: None, True: 1, False: 0, DefaultValue: False</summary>
        public const string new_reviewed = "new_reviewed";

        #endregion Attributes

        #region OptionSets

        public enum incidentstagecode_OptionSet
        {
            DefaultValue = 1
        }
        public enum casetypecode_OptionSet
        {
            Question = 1,
            Problem = 2,
            Request = 3
        }
        public enum ldv_casetype_OptionSet
        {
            LackofMedicationRequest = 1,
            CheckICUpatientstatus = 2,
            Changeappointmentrequest = 3
        }
        public enum new_casetype_OptionSet
        {
            Complaint = 1,
            Suggestion = 753240001,
            Inquiry = 4,
            Request = 2
        }
        public enum ldv_moacasetype_OptionSet
        {
            ImportingPermissionRequest = 1
        }
        public enum ldv_changeappointmenttype_OptionSet
        {
            Clinic = 1,
            Hospital = 2
        }
        public enum ldv_completecheckavailableappointmentstask_OptionSet
        {
            Completed = 1,
            NotCompleted = 2
        }
        public enum ldv_contactpatientrelevant_OptionSet
        {
            StatusConfirmed = 1,
            NotReachable = 2
        }
        public enum new_customerarea_OptionSet
        {
            Cairo = 100000000,
            Giza = 100000001,
            Alexandria = 100000002,
            Sohag = 100000003,
            Beheira = 100000004,
            Asuit = 100000005,
            Menya = 100000006
        }
        public enum customeridtype_OptionSet
        {
        }
        public enum firstresponseslastatus_OptionSet
        {
            InProgress = 1,
            NearingNoncompliance = 2,
            Succeeded = 3,
            Noncompliant = 4
        }
        public enum ldv_initialappointment_OptionSet
        {
            Auto = 1,
            BasedOnTheChoicesAbove = 2
        }
        public enum ldv_initialapproval_OptionSet
        {
            Approved = 1,
            Reject = 3
        }
        public enum ldv_managerapproval_OptionSet
        {
            Approve = 1,
            Reject = 3
        }
        public enum ldv_newappointmentresolution_OptionSet
        {
            Theproposedappointment = 1,
            Therearenoappointments = 2
        }
        public enum caseorigincode_OptionSet
        {
            Phone = 1,
            Email = 2,
            Web = 3,
            Facebook = 2483,
            Twitter = 3986,
            IoT = 700610000,
            Chat = 6
        }
        public enum ldv_paymentstatus_OptionSet
        {
            PaymentDone = 1,
            PaymentReject = 2
        }
        public enum prioritycode_OptionSet
        {
            High = 1,
            Normal = 2,
            Low = 3
        }
        public enum messagetypecode_OptionSet
        {
            PublicMessage = 0,
            PrivateMessage = 1
        }
        public enum ldv_lackmedicationresolution_OptionSet
        {
            AvailableOnDate = 1,
            AvailableatOtherPharmacy = 2,
            GeneralLack = 3
        }
        public enum ldv_resolution_OptionSet
        {
            Resolved = 1,
            NotResolved = 2
        }
        public enum resolvebyslastatus_OptionSet
        {
            InProgress = 1,
            NearingNoncompliance = 2,
            Succeeded = 3,
            Noncompliant = 4
        }
        public enum customersatisfactioncode_OptionSet
        {
            VerySatisfied = 5,
            Satisfied = 4,
            Neutral = 3,
            Dissatisfied = 2,
            VeryDissatisfied = 1
        }
        public enum ldv_sentsurvey_OptionSet
        {
            Sent = 1,
            NotSent = 2
        }
        public enum contractservicelevelcode_OptionSet
        {
            Gold = 1,
            Silver = 2,
            Bronze = 3
        }
        public enum servicestage_OptionSet
        {
            Identify = 0,
            Research = 1,
            Resolve = 2
        }
        public enum severitycode_OptionSet
        {
            DefaultValue = 1
        }
        public enum statecode_OptionSet
        {
            Active = 0,
            Resolved = 1,
            Cancelled = 2
        }
        public enum statuscode_OptionSet
        {
            InProgress = 1,
            OnHold = 2,
            WaitingforDetails = 3,
            Researching = 4,
            WaitingPayment = 753240000,
            WaitingPaymentApproval = 753240003,
            ProblemSolved = 5,
            InformationProvided = 1000,
            RequestCompleted = 753240001,
            RequestRejected = 753240004,
            Cancelled = 6,
            Merged = 2000,
           
        }
        public enum ldv_timeslotsstatus_OptionSet
        {
            Available = 1,
            NotAvailable = 2
        }

        #endregion OptionSets
    }
}
