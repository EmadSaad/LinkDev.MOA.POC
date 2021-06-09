using LinkDev.ECZA.POC.BLL.CustomModels;
using LinkDev.ECZA.POC.BLL.Documents;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace LinkDev.MOA.POC.Portal.API.Controllers.Documents
{
	
	[RoutePrefix("api/payment")]
	public class PaymentController : ApiController
	{
		private DocumentsBLL _documentsBll;
		public PaymentController()
		{
			_documentsBll = new DocumentsBLL();

		}

		[HttpPost]
		[Route("upload")]
		public ApiGenericResponse<List<FileInfoModel>> Upload(string folderName, Guid documentSettingId, Guid? fileLocationId = null)
		{
			List<FileInfoModel> files = new List<FileInfoModel>();
			for (int i = 0; i < HttpContext.Current.Request.Files.Keys.Count; i++)
			{
				var currentKey = HttpContext.Current.Request.Files.Keys[i];
				var filesCollection = HttpContext.Current.Request.Files[currentKey];
				var array = ReadFully(filesCollection.InputStream);
				var fileCollectionNameArr = filesCollection.FileName.Split('.');
				files.Add(new FileInfoModel()
				{
					Content = array,
					FileExtension = fileCollectionNameArr[fileCollectionNameArr.Length - 1],
					FileName = filesCollection.FileName,
					ContentType = filesCollection.ContentType,
					IsNewlyCreated = true,
					IsDeleted = false
				});
			}

			var result = _documentsBll.UploadPayment(files, documentSettingId);
			if (result.Result == true)
				return OkSuccessful<List<FileInfoModel>>(result.Files);

			return ErrorResponse<List<FileInfoModel>>(result.Error);

		}


		#region Helpers
		private static byte[] ReadFully(Stream input)
		{
			var buffer = new byte[16 * 1024];
			using (var ms = new MemoryStream())
			{
				int read;
				while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
				{
					ms.Write(buffer, 0, read);
				}
				return ms.ToArray();
			}
		}

		protected internal ApiGenericResponse<T> OkSuccessful<T>(T content, string friendlyResponseMessage = null)
		{
			return new ApiGenericResponse<T>() { ResponseCode = ResponseCode.Success, Content = content, FriendlyResponseMessage = friendlyResponseMessage };
		}
		protected internal ApiGenericResponse<T> ErrorResponse<T>(string friendlyMessage)
		{
			return new ApiGenericResponse<T>() { ResponseCode = ResponseCode.Error, FriendlyResponseMessage = friendlyMessage };
		}
		#endregion
	}

}