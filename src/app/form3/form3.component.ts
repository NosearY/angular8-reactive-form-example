import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.scss']
})
export class Form3Component implements OnInit {

  @Input()
  childGroups: string[] = [];

  constructor(public controlContainer: ControlContainer) {

  }

  ngOnInit() {
    console.log(this.controlContainer.control);
  }



}
