import { TreeNode } from 'primeng/api';
import { NodeType } from './node-type-enum';


export class FormHierarchyBase implements TreeNode {
    index: number;
    label: string;//display
    data?: string;
    type: NodeType;
    children?: FormHierarchyBase[];
}

export class FormHierarchy extends FormHierarchyBase {
    icon?: any;
    expandedIcon?: any;
    collapsedIcon?: any;
    leaf?: boolean;
    expanded?: boolean;
    parent?: FormHierarchy;
    partialSelected?: boolean;
    styleClass?: string;
    draggable?: boolean;
    droppable?: boolean;
    selectable?: boolean;
    key?: string;
    disabled?: boolean;
}

//   export class FormHierarchy implements TreeNode{

//   }


