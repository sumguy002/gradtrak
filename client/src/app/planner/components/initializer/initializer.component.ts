import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RequirementSet } from '../../models/requirement-set.model';
import { Semester } from '../../models/semester.model';
import { UserData } from '../../models/user-data.model';


@Component({
  selector: 'app-initializer',
  templateUrl: './initializer.component.html',
  styleUrls: ['./initializer.component.scss'],
})
export class InitializerComponent implements OnInit {
  @Output() initializeData: EventEmitter<UserData>;
  startYear: number;
  gradYear: number;
  summer: boolean;
  state: 'semesters' | 'goals';

  constructor() {
    this.initializeData = new EventEmitter<UserData>();
    this.state = 'semesters';
  }

  ngOnInit(): void {}

  next(): void {
    this.state = 'goals';
  }

  submit(reqSets: RequirementSet[]): void {
    const semesters: Semester[] = this.initializeSemesters(this.startYear, this.gradYear, this.summer);
    this.initializeData.emit(new UserData(semesters, reqSets));
  }

  initializeSemesters(startYear: number, gradYear: number, summer: boolean): Semester[] {
    const semesters: Semester[] = [];
    semesters.push(new Semester(`Fall ${startYear}`));
    for (let i: number = startYear + 1; i <= gradYear - 1; i++) {
      semesters.push(new Semester(`Spring ${i}`));
      if (summer) {
        semesters.push(new Semester(`Summer ${i}`));
      }
      semesters.push(new Semester(`Fall ${i}`));
    }
    semesters.push(new Semester(`Spring ${gradYear}`));
    return semesters;
  }
}