using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Common.Core.Helpers.CRMMapper
{
	public class DateModel
	{
		public DateModel() { }
		public DateModel(DateTime date)
		{
			if (date != DateTime.MinValue)
			{
				this.year = date.Year;
				this.month = date.Month;
				this.day = date.Day;
			}
		}
		public int year { get; set; }
		public int month { get; set; }
		public int day { get; set; }

		public DateTime GetDateTime()
		{
			return new DateTime(year, month, day);
		}
	}
}
