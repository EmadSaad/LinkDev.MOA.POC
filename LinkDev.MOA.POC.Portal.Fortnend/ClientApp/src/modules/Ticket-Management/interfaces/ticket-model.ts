export class TicketModel {
    hasReply: boolean = false;

    Id: string;
    Title: string;
    TicketNumber: string;
    Description: string;
    DivisionType: string;
    Division: string;
    Subdivision: string;
    IncidentCategory: string;
    CaseType: string;
    CaseTypeName: string;
    CaseTypeNameArabic: string;
    RatingScore: number;
    RatingComment: string;
    Origin: string;
    Statifaction: string;
    NoteTitle?: string;
    Note?: string;
    NoteId?: string;
    PartnerType: string;
    Status: number;
    StatusName: string;
    StatusNameArabic: string;
    CreatedOn: string;
    ContactId: string;
    Contacts: string[];
    CRId:string;
    CRName:string;
    IsTicketHasPreviousDocument:boolean;
    isPreviousTicketDocReadOnly: boolean;
    IsTicketHasAttachmentDocument:boolean;
    caseAttachment?: any;
}