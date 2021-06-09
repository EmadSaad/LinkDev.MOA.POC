using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper;
using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using LinkDev.ECZA.POC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.CustomModels
{
    [CrmEntityLogicalNameAttribute(ScreenInvestmentLicenseRequest.EntityName)]
    public class ScreenInvestmentLicenseModel
    {
        [CrmFieldLogicalNameAttribute(ScreenInvestmentLicenseRequest.PrimaryKey)]
        public string Id { get; set; }
        [CrmFieldLogicalNameAttribute(ScreenInvestmentLicenseRequest.ArabicName)]
        public string ArabicName { get; set; }
        [CrmFieldLogicalNameAttribute(ScreenInvestmentLicenseRequest.EnglishName)]
        public string EnglishName { get; set; }
        [CrmFieldLogicalNameAttribute(ScreenInvestmentLicenseRequest.StartDate)]
        public DateModel StartDate { get; set; }
        [CrmFieldLogicalNameAttribute(ScreenInvestmentLicenseRequest.EndDate)]
        public DateModel EndDate { get; set; }
        [CrmFieldLogicalNameAttribute(ScreenInvestmentLicenseRequest.EntityCategory)]
        public string  EntityCategory { get; set; }
        [CrmFieldLogicalNameAttribute(ScreenInvestmentLicenseRequest.TargetCity)]
        public string TargetCity { get; set; }
        [CrmFieldLogicalNameAttribute(ScreenInvestmentLicenseRequest.SubCity)]
        public string SubCity { get; set; }
        [CrmFieldLogicalNameAttribute(ScreenInvestmentLicenseRequest.InvestmentType)]
        public string InvestmentType { get; set; }
        [CrmFieldLogicalNameAttribute(ScreenInvestmentLicenseRequest.Tickersymbol)]
        public string Tickersymbol { get; set; }
        [CrmFieldLogicalNameAttribute(ScreenInvestmentLicenseRequest.EntityName_)]
        public string EntityName { get; set; }
        public List<QuestionModel> QuestionairAnswers { get; set; }
    }
}
