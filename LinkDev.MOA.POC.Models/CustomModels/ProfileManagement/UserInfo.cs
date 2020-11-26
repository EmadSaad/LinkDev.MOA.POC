using LinkDev.MOA.POC.Common.Core.Helpers.CRMMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Models.CustomModels.ProfileManagement
{
	public class UserInfo
	{
		public enum Ldv_typeofidentity_OptionSet
		{
			National_ID = 1,
			Residency = 2,
			Passport = 3,
			GCC = 4
		}
		public Guid Id { get; set; }
		public string FullName { get; set; }
		public string FirstName { get; set; }
		public string SecondName { get; set; }
		public string ThirdName { get; set; }
		public string FourthName { get; set; }
		public string IdentityTypeId { get; set; }
		public string IdentityNumber { get; set; }
		public string IdentityIssueDate { get; set; }
		public string Fax { get; set; }
		public bool Verified { get; set; }
		public string Password { get; set; }
		public string Email { get; set; }
		public string UserName { get; set; }
		public string MobileNumber { get; set; }
		public string PhoneNumber { get; set; }
		public Guid CrId { get; set; }
		public Guid CRRelationId { get; set; }
		public bool Authorized { get; set; }
		public bool IsUpdated { get; set; }
		public bool IsDeleted { get; set; }
		public bool IsResponseFailed { get; set; }
		public string ResponseMsg { get; set; }
		public bool IsAdded { get; set; }
		public int Index { get; set; }
		public bool Existing { get; set; }

		public int? IdentityExpiryDateInhijriDays { get; set; }
		public int? IdentityExpiryDateInhijriMonth { get; set; }
		public int? IdentityExpiryDateInhijriYear { get; set; }

		public DateModel IdentityExpiryDateinhijri
		{
			get
			{
				if (IdentityExpiryDateInhijriDays != null && IdentityExpiryDateInhijriMonth != null && IdentityExpiryDateInhijriYear != null)
					return new DateModel() { year = (int)IdentityExpiryDateInhijriYear, month = (int)IdentityExpiryDateInhijriMonth, day = (int)IdentityExpiryDateInhijriDays };
				else
					return null;
			}
			set
			{
				if (value != null)
				{
					IdentityExpiryDateInhijriDays = value.day;
					IdentityExpiryDateInhijriMonth = value.month;
					IdentityExpiryDateInhijriYear = value.year;
				}
			}
		}


		public string CompleteProfileURL { get; set; }
		public bool isCreateUser { get; set; }
		public bool isUpdateUser { get; set; }

		public bool isSubmiited { get; set; }

		public bool IsCROwner { get; set; }


	}
}
