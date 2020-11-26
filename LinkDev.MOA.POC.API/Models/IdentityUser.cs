using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace LinkDev.MOA.POC.API.Models
{

    public class ApplicationUser : IdentityUser
    {
        public string ModonHashedPassword { get; set; }
        public bool IsPasswordUpdated { get; set; }
        public bool IsMigratedUser { get; set; }
        public string ActivationToken { get; set; }
        public string CompleteProfileToken { get; set; }

        public ClaimsIdentity GenerateUserIdentity(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = manager.CreateIdentity(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }



    } 
}