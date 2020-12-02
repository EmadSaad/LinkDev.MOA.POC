import { DependentField } from "./DependentField";
import { FileInfoModel } from "./FileInfoModel";

export interface DocumentSettingModel {
    Id: string;
    Name: string;
    Description: string;
    IsRequired: boolean;
    MinAllowedFiles: number;
    MaxAllowedFiles: number;
    AllowedSize: number;
    AllowedExtensions: string;
    SectionName: string;
    DependentFields: DependentField[];
    TemplateId: string;
    Files: FileInfoModel[];
    Errors: string[];
    IsVisible: boolean;
}
