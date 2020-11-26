import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { DocumentSettingModel } from 'src/modules/shared/Documents/Interfaces/DocumentSettingModel';
import { TestServiceModel } from '../Interfaces/test-service-model';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';

@Component({
  selector: 'app-test-service',
  templateUrl: './test-service.component.html',
  styleUrls: ['./test-service.component.css']
})
export class TestServiceComponent implements OnInit {
  showAttachments: boolean = false;
  name: string;
  model: TestServiceModel={};

  constructor(public api: APIService) { }

  ngOnInit() {
    var headers = new HttpHeaders({
      'Accept-Language': "en"
    });
    this.api.Get<ApiGenericResponse<DocumentSettingModel[]>>("api/Documents/GetServiceDocumentSettings?serviceSettingId=F38BBEC4-7246-EA11-A9B4-000D3A46F0D9&stageId=&regardingId=3A445B61-E02B-EA11-A992-000D3A46F0D9").subscribe(  
    res => {
        this.model.documents = res.Content;
      }
    );
  }
  Show()
  {
    this.showAttachments = !this.showAttachments;
  }
  Submit()
  {
    debugger;
    this.api.Post("api/Demo/SubmitTest",this.model).subscribe()
    {
      res => {
        debugger;
      }
    }
  }

}
