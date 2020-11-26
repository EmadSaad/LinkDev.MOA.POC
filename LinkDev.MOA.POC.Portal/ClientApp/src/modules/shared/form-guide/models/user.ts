import { UserType } from '../enums/UserType';

export class User {
    id:string;
    email: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    address: string;
    countryId: number;
    channelId: number;
    languageId: number;
    userType: UserType;
    active: boolean;
}