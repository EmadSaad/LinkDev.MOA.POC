export interface StageItemModel {
    Index?: number,
    TextKey?: string,
    IsValid?: boolean,
    HashLinkKey?: string,
    ItemType?: ItemType
    Childs?: StageItemModel[]
}

export enum ItemType{
    Parent = 1,
    Stage = 2,
    Section = 3
}


