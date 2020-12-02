export class LookupItem
{
    id: number;
    displayName : string;
    uniqueKey : string;
}

export class Channel extends LookupItem
{
    additionalColumns = {isEnabled : 'True'  }
}