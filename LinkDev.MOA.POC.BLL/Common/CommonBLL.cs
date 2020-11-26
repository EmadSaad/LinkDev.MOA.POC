using LinkDev.MOA.POC.BLL.Base;
using LinkDev.MOA.POC.Models.CustomModels.ProfileManagement;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.BLL.Common
{
    public class CommonBLL : BaseBLL
    {
        //get the user guid if this email existing on CRM
        public EntityReference GetUserIdByEmail(string Email)
        {
            Guid UserGuid = new Guid();
            EntityReference User = new EntityReference();
            QueryExpression Contact_Record = new QueryExpression("contact");
            Contact_Record.ColumnSet = new ColumnSet("contactid");
            Contact_Record.Criteria.AddCondition("emailaddress1", ConditionOperator.Equal, Email);
            var Retrieved_Contact = CRMAccess.RetrieveMultiple(Contact_Record);
            if (Retrieved_Contact.Entities.Count > 0)
                UserGuid = (Guid)Retrieved_Contact.Entities[0].Attributes["contactid"];
            else
                UserGuid = Guid.Empty;

            EntityReference User_ = new EntityReference
            {
                Id = UserGuid,
                LogicalName = "contact"
            };
            return User_;
        }

        public UserInfo DecodeSummaryResponse(string Summary_Response)
        {
            UserInfo user_Object = new UserInfo();
            //code here to decode the summary response
            if (Summary_Response != null)
            {

            }
            return user_Object;
        }

        public int GetOptionsSetValueForLabel(IOrganizationService service, string entityName, string attributeName, string selectedLabel)
        {

            RetrieveAttributeRequest retrieveAttributeRequest = new
            RetrieveAttributeRequest
            {
                EntityLogicalName = entityName,
                LogicalName = attributeName,
                RetrieveAsIfPublished = true
            };
            // Execute the request.
            RetrieveAttributeResponse retrieveAttributeResponse = (RetrieveAttributeResponse)service.Execute(retrieveAttributeRequest);
            // Access the retrieved attribute.
            Microsoft.Xrm.Sdk.Metadata.PicklistAttributeMetadata retrievedPicklistAttributeMetadata = (Microsoft.Xrm.Sdk.Metadata.PicklistAttributeMetadata)
            retrieveAttributeResponse.AttributeMetadata;// Get the current options list for the retrieved attribute.
            OptionMetadata[] optionList = retrievedPicklistAttributeMetadata.OptionSet.Options.ToArray();
            int selectedOptionValue = 0;
            foreach (OptionMetadata oMD in optionList)
            {
                if (oMD.Label.LocalizedLabels[0].Label.ToString().ToLower() == selectedLabel.ToLower())
                {
                    selectedOptionValue = oMD.Value.Value;
                    break;
                }
            }
            return selectedOptionValue;
        }

        public UserInfo GetUserInfo(string Email)
        {
            UserInfo User = new UserInfo();

            QueryExpression Contact_Record = new QueryExpression("contact");
            Contact_Record.ColumnSet = new ColumnSet("contactid");
            Contact_Record.Criteria.AddCondition("emailaddress1", ConditionOperator.Equal, Email);
            var Retrieved_Contact = CRMAccess.RetrieveMultiple(Contact_Record);
            if (Retrieved_Contact.Entities.Count > 0)
            {
                Entity ContactEntity = Retrieved_Contact.Entities[0];
                User.Id = ContactEntity.GetAttributeValue<Guid>("contactid");
                User.Email = Email;
                User.FirstName = ContactEntity.Contains("firstname") ? ContactEntity.GetAttributeValue<string>("firstname") : string.Empty;
                User.SecondName = ContactEntity.Contains("ldv_secondname") ? ContactEntity.GetAttributeValue<string>("ldv_secondname") : string.Empty;
                User.ThirdName = ContactEntity.Contains("ldv_thirdname") ? ContactEntity.GetAttributeValue<string>("ldv_thirdname") : string.Empty;
                User.FullName = ContactEntity.Contains("PrimaryName") ? ContactEntity.GetAttributeValue<string>("PrimaryName") : string.Empty;
                User.Fax = ContactEntity.Contains("fax") ? ContactEntity.GetAttributeValue<string>("fax") : string.Empty;
                User.IdentityNumber = ContactEntity.Contains("ldv_identitynumber") ? ContactEntity.GetAttributeValue<string>("ldv_identitynumber") : string.Empty;
            }

            return User;
        }
        public Entity GetContactbyID(string CRMUserid)
        {
            Guid userID = new Guid(CRMUserid);
            //return CRMAccess.Retrieve("contact", userID, new ColumnSet("emailaddress1", "ldv_verified"));
            return CRMAccess.Retrieve("contact", userID, new ColumnSet(true));
        }

        public Entity GetContactbyEmail(string Email)
        {
            Entity User = new Entity();
            User.Id = Guid.Empty;

            QueryExpression Contact_Record = new QueryExpression("contact");
            Contact_Record.ColumnSet = new ColumnSet("contactid");
            Contact_Record.Criteria.AddCondition("emailaddress1", ConditionOperator.Equal, Email);
            var Retrieved_Contact = CRMAccess.RetrieveMultiple(Contact_Record);
            if (Retrieved_Contact.Entities.Count > 0)
                User = Retrieved_Contact.Entities.ToList().FirstOrDefault();

            return User;
        }

        public bool AnotherContactbyEmailandID(string Email, string IdentityNumber)
        {
            Entity User = new Entity();
            User.Id = Guid.Empty;

            QueryExpression Contact_Record = new QueryExpression("contact");
            Contact_Record.ColumnSet = new ColumnSet("contactid", "ldv_identitynumber");
            Contact_Record.Criteria.AddCondition("emailaddress1", ConditionOperator.Equal, Email);
            var Retrieved_Contact = CRMAccess.RetrieveMultiple(Contact_Record);
            if (Retrieved_Contact.Entities.Count > 0)
            {
                User = Retrieved_Contact.Entities.ToList().FirstOrDefault();
                if (User.Attributes.Contains("ldv_identitynumber"))
                {
                    string IdentityNumber_ = User.GetAttributeValue<string>("ldv_identitynumber");
                    if (IdentityNumber != IdentityNumber_)
                        return true;
                }
            }

            return false;
        }
    }
}
