import { Operator } from "../Enums/Operator.enum";

export interface DependentField {
    PortalFieldName: string;
    Value: string;
    Operator: Operator;
}
