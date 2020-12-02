import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StageItemModel } from '../Interfaces/stage-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {

  @Input() Stages: StageItemModel[];
  @Input() ActiveLevelOneIndex: number;
  @Input() ActiveLevelTwoIndex: number;
  @Output() LevelOneClick : EventEmitter<any> = new EventEmitter();
  @Output() LevelTwoClick : EventEmitter<any> = new EventEmitter();
  constructor(public router: Router) { }

  ngOnInit() {
  }

  LevelOneClickFun(levelOneToBeActivated: number)
  {
    this.LevelOneClick.emit({levelOneToBeActivated: levelOneToBeActivated});
  }

  LevelTwoClickFun(levelTwoToBeActivated: number)
  {
    if(levelTwoToBeActivated < this.ActiveLevelTwoIndex)
      this.LevelTwoClick.emit({levelTwoToBeActivated: levelTwoToBeActivated});
  }

}
