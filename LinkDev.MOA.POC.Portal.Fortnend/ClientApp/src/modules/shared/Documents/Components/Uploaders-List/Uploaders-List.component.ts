import { Component, OnInit, Input } from '@angular/core';
import { DocumentSettingModel } from '../../Interfaces/DocumentSettingModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiGenericResponse } from 'src/modules/shared/Models/api-generic-response';
import { Operator } from '../../Enums/Operator.enum';

@Component({
  selector: 'app-Uploaders-List',
  templateUrl: './Uploaders-List.component.html',
  styleUrls: ['./Uploaders-List.component.css']
})
export class UploadersListComponent implements OnInit {
  @Input() uploaders: DocumentSettingModel[] = [];
  @Input() form: any;
  @Input() folderName: string;
  @Input() IsReadOnly: boolean;
  @Input() SectionName: string;
  @Input() IsLiveChanges: boolean;


  uploadersToShow: DocumentSettingModel[];


  constructor(public http: HttpClient) { }

  ngOnInit() {
    // if(this.IsLiveChanges)
    //   this.form.valueChanges.subscribe(x => {this.FillUploadersToShow();})
    this.initialize();
  }

  // ngOnChanges(changes)
  // {
  //   debugger;
    
  // }
  ngDoCheck()
  {
    if(this.IsLiveChanges)
      this.initialize();
  }
  initialize()
  {
    this.FillUploadersToShow();
  }
  FillUploadersToShow()
  {
    this.uploadersToShow = [];
    for(let i=0 ; i<this.GetMyUploaders().length; i++)
    {
      var currentUploader = this.GetMyUploaders()[i];
      if(currentUploader.DependentFields && currentUploader.DependentFields.length > 0)
      {
        var willBeVisible = false;
        for (let j = 0; j < currentUploader.DependentFields.length; j++) {
          var currentDependentField = currentUploader.DependentFields[j];
          switch(currentDependentField.Operator)
          {
            case Operator.equal:
              if (this.form.controls[currentDependentField.PortalFieldName].value === currentDependentField.Value)
                willBeVisible = true;
              else
                willBeVisible = false;
              break;

            case Operator.greaterThan:
              if (this.form.controls[currentDependentField.PortalFieldName].value > currentDependentField.Value)
                willBeVisible = true;
              else
                willBeVisible = false;
              break;

            case Operator.lessThan:
              if (this.form.controls[currentDependentField.PortalFieldName].value < currentDependentField.Value)
                willBeVisible = true;
              else
                willBeVisible = false;
              break;

          }
        }
        if(willBeVisible)
        {
          currentUploader.IsVisible = true;
          this.uploadersToShow.push(currentUploader);
        }
        else{
          currentUploader.IsVisible = false;
        }
      }
      else
      {
        currentUploader.IsVisible = true;
        this.uploadersToShow.push(currentUploader);
      }

    }
  }

  GetMyUploaders(): DocumentSettingModel[]
  {
    if(this.uploaders)
    {
      if(this.SectionName)
        return this.uploaders.filter(x => x.SectionName && x.SectionName.toLocaleLowerCase().trim() === this.SectionName.toLocaleLowerCase().trim())
      return this.uploaders.filter(x => !x.SectionName);
    }
    return[];
  }

}
