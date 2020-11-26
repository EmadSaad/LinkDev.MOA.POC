export enum RegistrationStatus
    {
        Success = 1,
        DuplicateEmail = 2,
        InvalidRecaptchaToken = 3,
        EmailExistButNotActivated = 4,
        Failed = 5,
        AccountLocked = 6
    }