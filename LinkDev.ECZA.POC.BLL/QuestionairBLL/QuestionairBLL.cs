using LinkDev.ECZA.POC.BLL.CustomModels;
using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.QuestionairBLL
{
    public class QuestionairBLL:BaseBLL
    {
        public List<QuestionModel> GetQuestions()
        {
            // Instantiate QueryExpression query
            var query = new QueryExpression("ldv_screenlicensewizardquestion");
            query.TopCount = 50;

            // Add columns to query.ColumnSet
            query.ColumnSet.AddColumns("ldv_screenlicensewizardquestionid", "ldv_question");
            var CRMDesignConsultant = CRMAccess.RetrieveMultiple(query);
            List<QuestionModel> questions = CRMDesignConsultant.Entities.Select(x => CrmMapper.ConvertToT<QuestionModel>(x)).ToList();
            return questions;
        }
    }
}
