using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Security;

namespace LinkDev.MOA.POC.API.Models
{
    // Models returned by AccountController actions.
    public class UserDto
    {
        public bool ChangePassword { get; set; }
        public string UserName { get; set; }
        [Required(ErrorMessageResourceType = typeof(Membership), ErrorMessageResourceName = "EmailRequired")]
        [Display(Name = "Email")]
        public string Email { get; set; }
        [Required(ErrorMessageResourceType = typeof(Membership), ErrorMessageResourceName = "FamilyNameRequired")]
        public string FamilyName { get; set; }
        [Required(ErrorMessageResourceType = typeof(Membership), ErrorMessageResourceName = "TitleRequired")]
        public string Title { get; set; }
        [Required(ErrorMessageResourceType = typeof(Membership), ErrorMessageResourceName = "FirstNameRequired")]
        public string FirstName { get; set; }
        [Required(ErrorMessageResourceType = typeof(Membership), ErrorMessageResourceName = "PhoneNumberRequired")]
        public string PhoneNumber { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
    public class ExternalLoginViewModel
    {
        public string Name { get; set; }

        public string Url { get; set; }

        public string State { get; set; }
    }

    public class ManageInfoViewModel
    {
        public string LocalLoginProvider { get; set; }

        public string Email { get; set; }

        public IEnumerable<UserLoginInfoViewModel> Logins { get; set; }

        public IEnumerable<ExternalLoginViewModel> ExternalLoginProviders { get; set; }
    }

    public class UserInfoViewModel
    {
        public string Email { get; set; }

        public bool HasRegistered { get; set; }

        public string LoginProvider { get; set; }
    }

    public class UserLoginInfoViewModel
    {
        public string LoginProvider { get; set; }

        public string ProviderKey { get; set; }
    }
}
