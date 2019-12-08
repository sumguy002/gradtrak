import { Component, Input, OnInit } from '@angular/core';
import { RequirementSet } from '../requirement-set';

@Component({
  selector: 'app-requirement-set',
  templateUrl: './requirement-set.component.html',
  styleUrls: ['./requirement-set.component.css']
})
export class RequirementSetComponent implements OnInit {
  @Input() requirementSet: RequirementSet;

  constructor() { }

  ngOnInit() {
  }

}
