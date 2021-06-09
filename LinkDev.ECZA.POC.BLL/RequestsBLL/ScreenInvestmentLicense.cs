using LinkDev.ECZA.POC.BLL.CustomModels;
using LinkDev.ECZA.POC.Models;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;

namespace LinkDev.ECZA.POC.BLL.RequestsBLL
{
    public class ScreenInvestmentLicenseBLL:BaseBLL
    {
        public ApplicationPostModel PostScreenInvestmentLicense(EServiceModel<ScreenInvestmentLicenseModel> eServiceModel)
        {
            Entity ScreenInvestmentLicense = new Entity(ScreenInvestmentLicenseRequest.EntityName);

            //ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.Applicant] = new EntityReference("contact", Guid.Parse(WebConfigurationManager.AppSettings["ContactId"]));
            ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.IndividualApplicant] = new EntityReference("contact", Guid.Parse(WebConfigurationManager.AppSettings["ContactId"]));
            ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.ArabicName] = eServiceModel.Request.ArabicName;
            ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.EnglishName] = eServiceModel.Request.EnglishName;
            if(eServiceModel.Request.StartDate!=null)
            ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.StartDate] =new DateTime( eServiceModel.Request.StartDate.year, eServiceModel.Request.StartDate.month, eServiceModel.Request.StartDate.day);
            if(eServiceModel.Request.EndDate!=null)
            ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.EndDate] = new DateTime(eServiceModel.Request.EndDate.year, eServiceModel.Request.EndDate.month, eServiceModel.Request.EndDate.day);
            //ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.EntityCategory] = eServiceModel.Request.EntityCategory;
            ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.TargetCity] = eServiceModel.Request.TargetCity;
            ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.SubCity] = eServiceModel.Request.SubCity;
            //ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.InvestmentLicenseType] = eServiceModel.Request.InvestmentType;
            ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.Tickersymbol] = eServiceModel.Request.Tickersymbol;
            ScreenInvestmentLicense[ScreenInvestmentLicenseRequest.EntityName_] = eServiceModel.Request.EntityName;
            Guid ScreenInvestmentLicenseId = Guid.Empty;
            if (string.IsNullOrEmpty(eServiceModel.Request.Id))
                ScreenInvestmentLicenseId = CRMAccess.Create(ScreenInvestmentLicense);
            else
            {
                ScreenInvestmentLicenseId = Guid.Parse(eServiceModel.Request.Id);
                ScreenInvestmentLicense.Id = ScreenInvestmentLicenseId;
                CRMAccess.Update(ScreenInvestmentLicense);
            }
            var request = new ExecuteMultipleRequest()
            {
                Requests = new OrganizationRequestCollection(),
                Settings = new ExecuteMultipleSettings
                {
                    ContinueOnError = false,
                    ReturnResponses = true
                }
            };

            foreach(var answer in eServiceModel.Request.QuestionairAnswers)
            {
                Entity AnswerEntity = new Entity(ScreenLicenseWizardAnswers.EntityName);
                AnswerEntity[ScreenLicenseWizardAnswers.Question] = new EntityReference("ldv_screenlicensewizardquestion", Guid.Parse(answer.QuestionId));
                AnswerEntity[ScreenLicenseWizardAnswers.ScreenILRequest] = new EntityReference(ScreenInvestmentLicenseRequest.EntityName, ScreenInvestmentLicenseId);
                AnswerEntity[ScreenLicenseWizardAnswers.Yes_No] = answer.Answer;
                CRMAccess.Create(AnswerEntity);
            }
            foreach (var document in eServiceModel.Documents)
            {
                foreach (var file in document.Files)
                {
                    Entity documentActivity = new Entity("ldv_documents", Guid.Parse(file.FileId));
                    documentActivity["regardingobjectid"] = new EntityReference(InfrastructurePermitIssuanceRequest.EntityName, ScreenInvestmentLicenseId);


                    var createRequest = new UpdateRequest()
                    {
                        Target = documentActivity
                    };
                    request.Requests.Add(createRequest);
                }

            }
            var response = (ExecuteMultipleResponse)CRMAccess.Execute(request);
            var InfrastructurePermitAttr = CRMAccess.Retrieve(ScreenInvestmentLicenseRequest.EntityName, ScreenInvestmentLicenseId, new ColumnSet(ScreenInvestmentLicenseRequest.PrimaryName));
            var InfrastructurePermitNumber = string.Empty;
            if (InfrastructurePermitAttr.Attributes.Contains(ScreenInvestmentLicenseRequest.PrimaryName))
                InfrastructurePermitNumber = InfrastructurePermitAttr[ScreenInvestmentLicenseRequest.PrimaryName].ToString();
            return new ApplicationPostModel
            {
                RequestId = ScreenInvestmentLicenseId,
                RequestNumber = InfrastructurePermitNumber
            };

        }
    }
}
