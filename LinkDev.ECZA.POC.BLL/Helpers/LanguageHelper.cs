﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LinkDev.ECZA.POC.BLL.Helpers
{
	public class LanguageHelper
	{
		public static bool IsArabic { get { return Thread.CurrentThread.CurrentCulture.Name.ToLower().Trim() == "ar-sa"; } }
	}
}