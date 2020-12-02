import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Jodit } from '../../../../../../node_modules/jodit/build/jodit.min'




@Component({
  selector: 'rich-html',
  templateUrl: './rich-html.component.html',
 
  
})
export class RichHtmlComponent implements AfterViewInit, OnInit{

  value: string = '';

  @ViewChild('editor') editor:ElementRef;
  ngOnInit(): void {
    
  }

  handleEditor() {
    let editor = new Jodit(this.editor.nativeElement,
     {buttons: [
      'source', '|',
      'bold',
      'italic', '|',
      'ul',
      'ol', '|',
      'fontsize',
      'brush',
      'image',
      'table',
      'link', '|',
      'left',
      'center',
      'right',
      'justify', '|',
      'undo', 'redo', '|',
      'hr',
   
     
  ]},);
    editor.value = '<p>start</p>';
 }
  
  ngAfterViewInit() {
    this.handleEditor();
  }

  onchange(val) {
    console.log(val);
  }
}
