import { DateTime } from "src/modules/shared/form-guide/models/date-time";
import { AnswerssModel } from "./Answers";
import { QuestionsModel } from "./QuestionModel";

export class ScreenInvestmentLicenseModel{
    Id?: string;
    ArabicName?: string;
    EnglishName?: string;
    StartDate?: DateTime;
    EndDate?: DateTime;
    EntityCategory?: string;
    TargetCity?: string;
    SubCity?: string;
    InvestmentType?: string;
    Tickersymbol?: string;
    EntityName?:string;
   QuestionairAnswers?:QuestionsModel[];

}