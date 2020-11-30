using LinkDev.MOA.POC.Portal.BLL.CustomModels;
using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMConnector;
using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace LinkDev.MOA.POC.Portal.BLL.Documents
{
	public class DocumentsBLL
	{
		public SaveDocumentFilesResult UploadFiles(List<FileInfoModel> files)
		{
			var savingResult = SaveDocumentFiles(files);

			

			return savingResult;
		}

		public SaveDocumentFilesResult SaveDocumentFiles(List<FileInfoModel> files)
		{
			string validationError;

			if (IsValidFiles(files, out validationError))
			{
				List<FileInfoModel> Files = new List<FileInfoModel>();
				foreach (var file in files)
				{
					var DoucmentId = AttachFilesToDocuments(file.Content, file.FileName);
					Files.Add(new FileInfoModel
					{
						Content = file.Content,
						ContentType = file.ContentType,
						FileExtension = file.FileExtension,
						FileName = file.FileName,
						FileId = DoucmentId,
						IsDeleted = false,
						IsNewlyCreated = true
					});
				}
				return new SaveDocumentFilesResult()
				{
					Result = true,
					Files = Files
				};
			}

			return new SaveDocumentFilesResult() { Error = validationError, Result = false };
		}

		public bool IsValidFiles(List<FileInfoModel> files, out string error)
		{
			//extension
			string documentSetting = "PDF,XLSX,XLS,DOCX,PNG,DOC,JPG,JPEG";
			var allowedExtensions = documentSetting.Split(',').ToList();

			if (files.Select(f => f.FileExtension).Where(ex => !allowedExtensions.Any(a => ex.ToLower().Trim() == a.ToLower().Trim())).Count() != 0)
			{
				error = "نوع هذا الملف غير مسموح به";
				return false;
			}




			error = string.Empty;
			return true;
		}
		public string AttachFilesToDocuments(byte[] filebytes, string FileName)
		{
			Entity Document = new Entity("ldv_documents");
			Document["subject"] = FileName;
			Guid DocumentId = CRMConnector.CRMAccess.Create(Document);
			string mimeType = MimeMapping.GetMimeMapping(FileName);
			string encodedData = System.Convert.ToBase64String(filebytes);
			Entity AnnotationEntityObject = new Entity("annotation");
			AnnotationEntityObject.Attributes["objectid"] = new EntityReference("ldv_documents", DocumentId);
			AnnotationEntityObject.Attributes["subject"] = FileName;
			AnnotationEntityObject.Attributes["documentbody"] = encodedData;
			// Set the type of attachment
			AnnotationEntityObject.Attributes["mimetype"] = mimeType;
			// Set the File Name
			AnnotationEntityObject.Attributes["filename"] = FileName;

			var FileId = CRMConnector.CRMAccess.Create(AnnotationEntityObject);

			return DocumentId.ToString();
		}
	}
}
