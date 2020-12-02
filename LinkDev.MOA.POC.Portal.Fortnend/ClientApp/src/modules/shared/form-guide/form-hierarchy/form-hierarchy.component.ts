import { Component, Injectable, ViewChild, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FormHierarchy, FormHierarchyBase } from './form-hierarchy-model';

@Component({
  selector: 'app-side-stages',
  templateUrl: './form-hierarchy.component.html',
  styleUrls: ['./form-hierarchy.component.scss']
})
export class FormHierarchyComponent implements OnInit {
  @Input() structure: FormHierarchy[];
  @Input() activeFirstLevel: number;
  @Input() activeSecondLevel: number;
  @Output() onChange = new EventEmitter();

  formStructure: FormHierarchy[];
  parentNodes: FormHierarchy[];
  activeFirstLevelLabel: string;
  activeSecondLevelLabel: string;
  activeThirdLevel: number;
  activeThirdLevelIndex: number;
  isFormHierarchyOpened: boolean = false;

  constructor() {
  }
  ngOnInit() {
    this.formStructure = this.structure;
    this.parentNodes = [];
    this.mapFormStructure(this.structure, this.activeFirstLevel);
  }

  mapFormStructure = (level: FormHierarchy[], activeLevel: number) => {
    if (!level) return;
    for (let i = 0; i < level.length; i++) {
      // set active node
      level[i].expanded = level[i].index == activeLevel && level[i].type !== "section";
      // set active first node label for small devices
      this.activeFirstLevelLabel = level[i].expanded && level[i].type == "parent" ? level[i].label : this.activeFirstLevelLabel;
      // set active second node label for small devices 
      this.activeSecondLevelLabel = level[i].expanded && level[i].type == "child" ? level[i].label : this.activeSecondLevelLabel;
      // set disabled nodes
      level[i].disabled = !(level[i].index == activeLevel);
      // handle styling
      level[i].styleClass = `${level[i].type} ${level[i].expanded ? 'active-node' : ''} 
       ${i + 1 == level.length ? 'last-node' : ''} ${level[i].type == "section" && i == 0 ? 'active-node' : ''}`;
      // set another level of tree 
      this.mapFormStructure(level[i].children, this.activeSecondLevel)
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    // debugger;
    if ((changes.structure && changes.structure.firstChange) || (changes.activeFirstLevel && changes.activeFirstLevel.firstChange) || (changes.activeSecondLevel && changes.activeSecondLevel.firstChange))
      return;
    this.mapFormStructure(this.structure, this.activeFirstLevel);
  }
  handleParentNode = (node) => {
    if (node.index == this.activeFirstLevel)
      node.expanded = !node.expanded;
    else
      this.onChange.emit(node);
  }

  handleChildNode = (node) => {
    return;
  }

  nodeExpand = (event) => {
    // debugger;
    event.node.expanded = !event.node.expanded;
    this.onChange.emit(event.node);
  }

  nodeCollapse = (event) => {
    // debugger;
    if (event.node.index == this.activeSecondLevel)
      event.node.expanded = !event.node.expanded;

    return;
  }

  handleSectionNode = (node) => {
    // debugger;
    let previousSectionActiveNodeIndex = node.parent.children.findIndex(n => n.styleClass.indexOf("active-node") > -1);
    node.parent.children[previousSectionActiveNodeIndex].styleClass = "section";
    node.styleClass = "section active-node";
    window.location.hash = (node.data);
  }
}
