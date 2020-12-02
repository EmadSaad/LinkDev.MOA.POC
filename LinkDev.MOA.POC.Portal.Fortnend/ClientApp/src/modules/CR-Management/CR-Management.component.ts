import { Component, OnInit } from '@angular/core';
import { FormHierarchyBase } from '../shared/form-guide/form-hierarchy/form-hierarchy-model';
import { NodeType } from '../shared/form-guide/form-hierarchy/node-type-enum';
import { debug } from 'util';

@Component({
  selector: 'app-CR-Management',
  templateUrl: './CR-Management.component.html',
  styleUrls: ['./CR-Management.component.css']
})
export class CRManagementComponent implements OnInit {

  constructor() { }

  Index1: boolean = true;
  Index2: boolean = false;
  Index3: boolean = false;
  Index4: boolean = false;
  Index5: boolean = false;

  CRName: string = "";
  CRNumber: string = "";
  CRCity: string = "";

  //Index6: boolean = false;
  activeFirstLevel: number = 1;
  ActiveLevelOne: number = 1;
  selectedNode: FormHierarchyBase;
  formStructure: FormHierarchyBase[] = [
    {
      "index": 1,
      "label": "CRManagement.CRDetails",
      "type": NodeType.Parent,
    },
    {
      "index": 2,
      "label": "CRManagement.CRInfo",
      "type": NodeType.Parent,
    },
    {
      "index":3,
      "label": "CRManagement.IndustrialLicenseInfo",
      "type": NodeType.Parent,
    },
    {
      "index": 4,
      "label": "CRManagement.ContactsAndRepresentative",
      "type": NodeType.Parent,
    },
    {
      "index":5,
      "label": "CRManagement.CRContractslist",
      "type": NodeType.Parent,
    },

  ];
  ngOnInit() {
  }
  onSelect = (node: FormHierarchyBase) => {
    this.selectedNode = node;
    this.activeFirstLevel = this.selectedNode.index;
  }
  GetCRName(e) {
    this.CRName = e;
  }
  GetCRNumber(e) {
    this.CRNumber = e;
  }
 GetCRCity(e) {
   this.CRCity = e;
  }
}
