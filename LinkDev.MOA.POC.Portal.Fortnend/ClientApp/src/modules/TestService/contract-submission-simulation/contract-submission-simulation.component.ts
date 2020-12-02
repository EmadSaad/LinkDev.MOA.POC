import { Component, OnInit, ViewChild } from '@angular/core';
import { SimulationModel } from '../Interfaces/simulation-model';
import { StageItemModel } from '../Interfaces/stage-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contract-submission-simulation',
  templateUrl: './contract-submission-simulation.component.html',
  styleUrls: ['./contract-submission-simulation.component.css']
})
export class ContractSubmissionSimulationComponent implements OnInit {

  Model: SimulationModel = {FirstName:"first", LastName:"last"};
  stages: StageItemModel[] = [
    {Index:1,HashLinkKey:"",IsValid:false,TextKey:"Request Details",Childs:[
      {Index: 1, IsValid: false, TextKey:"First Stage", HashLinkKey:"", Childs:[{Index: 1, IsValid: false, TextKey: "Request base info", HashLinkKey:"testhash", Childs:[]}]},
      {Index: 2, IsValid: false, TextKey:"Second Stage", HashLinkKey:"", Childs:[{Index: 1, IsValid: false, TextKey: "Industry purpose", HashLinkKey:"", Childs:[]}]}

    ]},
    {Index:2,HashLinkKey:"",IsValid:false,TextKey:"Pricing",Childs:[]},
  ]
  ActiveLevelOne: number=1;
  ActiveLevelTwo: number=1;
  submitText: string = "Next";
  @ViewChild('firstNameForm') public firstNameForm: NgForm;
  @ViewChild('lastNameForm') public lastNameForm: NgForm;
  constructor() { }

  ngOnInit() {
  }

  levelOneClick(event)
  {
    debugger;
    this.ActiveLevelOne = event.levelOneToBeActivated;
  }

  levelTwoClick(event)
  {
    debugger;
    this.ActiveLevelTwo = event.levelTwoToBeActivated;
  }
  Next()
  {
    debugger;
    if(this.ActiveLevelOne === 1 && this.ActiveLevelTwo === 1)
    {
      if(this.firstNameForm.valid)
        this.ActiveLevelTwo = 2
    }
    if(this.ActiveLevelOne === 1 && this.ActiveLevelTwo === 2)
    {
      if(this.lastNameForm.valid)
      {
        this.ActiveLevelOne = 2;
        this.ActiveLevelTwo = 1;
      }
    }
  }

  Previous()
  {
    if(this.ActiveLevelTwo > 1)
      this.ActiveLevelTwo--;
  }

}
