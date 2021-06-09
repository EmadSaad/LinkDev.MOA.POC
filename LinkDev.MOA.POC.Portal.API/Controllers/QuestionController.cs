using LinkDev.ECZA.POC.BLL.CustomModels;
using LinkDev.ECZA.POC.BLL.QuestionairBLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LinkDev.MOA.POC.Portal.API.Controllers
{
    [RoutePrefix("api/Questions")]
    public class QuestionController : ApiController
    {
        private readonly QuestionairBLL _questionsBll;
        public QuestionController()
        {
            _questionsBll = new QuestionairBLL();

        }


        [HttpGet]
        [Route("GetQuestions")]
        public List<QuestionModel> GetQuestions()
        {
            var result =
                _questionsBll.GetQuestions();

            return result;
        }
    }
}
