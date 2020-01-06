import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RequirementSet } from 'models/requirement-set.model';
import { RequirementService } from 'services/requirement.service';

@Component({
  selector: 'app-goal-selector',
  templateUrl: './goal-selector.component.html',
  styleUrls: ['./goal-selector.component.css'],
})
export class GoalSelectorComponent implements OnInit {
  @Output() selectGoals: EventEmitter<RequirementSet[]>;

  requirementSets: RequirementSet[];

  searchPrompt: string = '';

  searchedMajors: RequirementSet[]; // feels like a lot of repeated code but again doesn't warrant a new component :(
  searchedMinors: RequirementSet[];
  searchedOthers: RequirementSet[];

  selectedSearchedMajor: RequirementSet;
  selectedSearchedMinor: RequirementSet;
  selectedSearchedOther: RequirementSet;

  chosenMajors: RequirementSet[];
  chosenMinors: RequirementSet[];
  chosenOthers: RequirementSet[];

  selectedChosenMajor: RequirementSet;
  selectedChosenMinor: RequirementSet;
  selectedChosenOther: RequirementSet;

  constructor(private requirementService: RequirementService) {}

  ngOnInit(): void {
    this.requirementService.getRequirements().subscribe((requirementSets: RequirementSet[]) => {
      this.requirementSets = requirementSets;
    });

    this.updateGoalSearch();
  }

  updateGoalSearch(): void {
    /*
     * idle thought, but why nt just maje a Goal class that interits RequirementSet?
     * maybe even a major and minot class that inherits from Goal. IsInstance makes
     * sense that way.
     */
    this.searchedMajors = this.requirementSets.filter(
      (potentialMajor: RequirementSet) =>
        potentialMajor.type === 'major' && this.searchFunction(this.searchPrompt, potentialMajor)
    );
    this.searchedMinors = this.requirementSets.filter(
      (potentialMinor: RequirementSet) =>
        potentialMinor.type === 'minor' && this.searchFunction(this.searchPrompt, potentialMinor)
    );
    this.searchedOthers = this.requirementSets.filter(
      (potentialOther: RequirementSet) =>
        potentialOther.type === 'other' && this.searchFunction(this.searchPrompt, potentialOther)
    );
    // might make more sense to do the major minor sorting onInit only once and store it
  }

  private searchFunction(prompt: string, goal: RequirementSet): boolean {
    return goal
      ? goal.id.includes(prompt) || goal.name.includes(prompt) || this.searchFunction(prompt, goal.parent)
      : false;
  }
}
