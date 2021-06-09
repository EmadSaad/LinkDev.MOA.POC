using LinkDev.ECZA.POC.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.CustomModels
{
    public class QuestionModel
    {
        [CrmFieldLogicalNameAttribute("ldv_question")]
        public string QuestionBody { get; set; }
        [CrmFieldLogicalNameAttribute("ldv_screenlicensewizardquestionid")]
        public string QuestionId { get; set; }
        public bool Answer { get; set; }

    }
}
