import { Component, OnInit, EventEmitter, Output, Input, OnChanges, NgZone, forwardRef } from '@angular/core';
import { AttachmentService } from '../services/attachment.service';
import { TranslateService } from '@ngx-translate/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'adahi-attachment',
    templateUrl: './attachment.component.html',
})
export class AttachmentComponent implements OnInit {

    file: File;

    @Input() allowedTypes: string;

    @Input() canDelete: boolean = true;
    @Input() canUpload: boolean = true;

    @Input() downloadUrl: string;

    @Input() fileName: string = null;

    @Output() fileChanged = new EventEmitter<File>();

    @Output() deleteFile = new EventEmitter<any>();

    @Input() IsRequired: boolean = false;

    get value(): any {
        if (this.file || this.fileName) {
            return this.fileName || this.file.name;
        } else {
            return null;
        }
    };

    set value(val) {
        this.fileName = val;
    }

    constructor(private attachmentService: AttachmentService, translateService: TranslateService,
        ngZone: NgZone) {
    }

    ngOnInit(): void {
    }

    download(e) {
        e.preventDefault();
        this.attachmentService.download(this.downloadUrl).subscribe(res => {
            this.downloadFile(res);
        });
    }

    public validate() {
        if (this.file == null) {
            if (this.fileName == null) {
                return {
                    errors: {
                        required: true
                    }
                };
            }
        } else {
            return null;
        }
    }

    onFileChanged(file) {
        this.file = file;
        this.fileName = null;
        this.downloadUrl = null;
        this.fileChanged.emit(file);
    }

    downloadFile(data: any) {
        var fileName = this.fileName;
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(data, fileName);
        }
        else {
            var link = document.createElement('a');
            link.setAttribute("type", "hidden");
            link.download = fileName;
            link.href = window.URL.createObjectURL(data);
            document.body.appendChild(link);
            link.click();
        }
    }

    onDeleteFile(e) {
        e.preventDefault();
        this.fileName = null;
        this.downloadUrl = null;
        this.deleteFile.emit();
    }
}
