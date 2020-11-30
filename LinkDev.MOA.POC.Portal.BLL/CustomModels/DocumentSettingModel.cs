using LinkDev.MOA.POC.Portal.BLL.Helpers.CRMMapper.CRMMapperAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LinkDev.MOA.POC.Portal.BLL.CustomModels
{

	public class DocumentSettingModel
	{
		
		public Guid Id { get; set; }
		public string Name { get; set; }
		
		public string NameAr { get; set; }
		public string NameEn { get; set; }
		public string Description { get; set; }
		public string DescriptionAr { get; set; }
		public string DescriptionEn { get; set; }
		public bool IsRequired { get; set; }
		public int MinAllowedFiles { get; set; }
		public int MaxAllowedFiles { get; set; }
		public int AllowedSize { get; set; }
		public string SectionName { get; set; }
		public string AllowedExtensions { get; set; }
		public string LaserficheTemplate { get; set; }
		public string TemplateId { get; set; }
		public List<DependentField> DependentFields { get; set; }
		public List<FileInfoModel> Files { get; set; }

		public DocumentSettingModel()
		{
			DependentFields = new List<DependentField>();
			Files = new List<FileInfoModel>();
		}
	}
}
