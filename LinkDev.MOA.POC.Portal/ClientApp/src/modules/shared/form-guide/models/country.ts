export class LookupItem
{
    id: number;
    displayName : string;
    uniqueKey : string;
}

export class Country extends LookupItem
{
    additionalColumns = { displayOrder : 0 }
}
