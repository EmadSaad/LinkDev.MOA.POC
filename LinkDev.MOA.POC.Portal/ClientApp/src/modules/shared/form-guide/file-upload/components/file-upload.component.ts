import { Component, OnInit, OnChanges, Input, EventEmitter, Output, forwardRef, SimpleChanges, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IAppConfig } from '../../config/app-config.model';
import { AppConfig } from '../../config/app-config.service';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { FileInfoModel } from 'src/modules/shared/Documents/Interfaces/FileInfoModel';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';
import { ApiGenericResponse, ResponseCode } from 'src/modules/shared/Models/api-generic-response';
import { Guid } from 'guid-typescript';
import { ConfigService } from 'src/modules/shared/Services/Config-Service/config-service.service';

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
})
export class FileUploadComponent  implements OnInit, OnDestroy {
    @Input() documentSetting: DocumentSettingModel;
    @Input() folderName: string;
    @Input() IsReadOnly: boolean = false;
    public apiUrl: string = ConfigService.APIURL;
    isLoaded:boolean = false;

    constructor(public translate: TranslateService, public api: APIService) {
        //this.appSettings = AppConfig.settings;
    }

    ngOnInit() {
    }
    ngOnDestroy()
    {
        if(!this.documentSetting.IsVisible)
            this.documentSetting.Files = [];
        this.documentSetting.IsVisible = false;
    }

    handleFile(files) {
        if(!files || files.length === 0)return;
        debugger;
        this.documentSetting.Errors=[];
        this.isLoaded = true;
        for (let i = 0; i < files.length; i++) {
            debugger;
            var currentFile = (<File>files[i]);
            
            if (this.documentSetting.Files && this.documentSetting.Files.find(x => x.FileName.toLocaleLowerCase().trim() === currentFile.name.split('.')[0].toLocaleLowerCase().trim() && x.IsDeleted === false)) {
              this.documentSetting.Errors.push('Documents.ValidationFileAlreadyUploaded');
              this.isLoaded = false;
              return;
            }
            if ((currentFile.size/1024) > this.documentSetting.AllowedSize) {
                this.documentSetting.Errors.push('Documents.ValidationFileSize');
                this.isLoaded = false;
                return;
            }
            if(!this.documentSetting.AllowedExtensions.toLocaleLowerCase().trim().includes(currentFile.name.split(".")[currentFile.name.split(".").length-1].toLocaleLowerCase().trim()))
            {
                this.documentSetting.Errors.push('Documents.ValidationAllowedExtenstions');
                this.isLoaded = false;
                return;
            }
        }

        if(this.documentSetting.Files && this.documentSetting.Files.filter(x => x.IsDeleted === false).length + files.length > this.documentSetting.MaxAllowedFiles)
        {
            this.documentSetting.Errors.push("Documents.ValidationNumberOfFiles");
            this.isLoaded = false;
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          let fileToUpload = <File>files[i];

          formData.append('file' + i, fileToUpload, fileToUpload.name);
          
        }
        this.api.PostFile<ApiGenericResponse<FileInfoModel[]>>(`api/documents/upload?folderName=${this.folderName}&documentSettingId=${this.documentSetting.Id}`,formData)
            .subscribe(res =>{
                if(res.ResponseCode == ResponseCode.Success)
                {
                    if(!this.documentSetting.Files)
                        this.documentSetting.Files = [];
                    res.Content.forEach(x => {
                        this.documentSetting.Files.push(x);
                    })
                }
                else
                {
                    this.documentSetting.Errors.push(res.FriendlyResponseMessage);
                    this.isLoaded = false;
                }
            },
            err => {
                this.documentSetting.Errors.push(err.error.FriendlyResponseMessage);
                this.isLoaded = false;
            }
            )

    }

    DeleteFile(id: string)
    {
        if(this.documentSetting.Files)
        {
            var deletedFile = this.documentSetting.Files.find(x => x.FileId == id);
            deletedFile.IsDeleted = true;
            deletedFile.IsNewlyCreated = false;
            this.isLoaded = false;
        }
    }
    FilesToShow(): FileInfoModel[]
    {
        if(this.documentSetting.Files)
            return this.documentSetting.Files.filter(x => x.IsDeleted == false);
        return[];
    }

}
