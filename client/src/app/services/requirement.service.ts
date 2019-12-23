import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { RequirementSet } from 'models/requirement-set.model';
import { CourseRequirement } from 'models/requirements/course-requirement.model';
import { TagRequirement } from 'models/requirements/tag-requirement.model';
import { CourseService } from 'services/course.service';

@Injectable({
  providedIn: 'root',
})
export class RequirementService {
  DUMMY_REQUIREMENT_DATA: object = {
    uc: {
      id: 'uc',
      name: 'University of California',
      parentId: null,
      requirementCategories: [
        {
          id: 'uc',
          name: 'UC Requirements',
          requirements: [
            {
              id: 'elwr',
              name: 'Entry-Level Writing',
            },
            {
              id: 'ah',
              name: 'American History',
            },
            {
              id: 'ai',
              name: 'American Instutions',
            },
          ],
        },
      ],
    },
    ucb: {
      id: 'ucb',
      name: 'UC Berkeley',
      parentId: 'uc',
      requirementCategories: [
        {
          id: 'ac',
          name: 'American Cultures',
          requirements: [
            {
              id: 'ac',
              name: 'American Cultures',
            },
          ],
        },
      ],
    },
    coe: {
      id: 'coe',
      name: 'College of Engineering',
      parentId: 'ucb',
      requirementCategories: [
        {
          id: 'coe-hss',
          name: 'Humanities and Social Sciences',
          requirements: [
            {
              id: 'coe-r1a',
              name: 'R&C Part A',
            },
            {
              id: 'coe-r1b',
              name: 'R&C Part B',
            },
            // TODO Add multi-course-style requirements
            {
              id: 'coe-hss1',
              name: 'H/SS',
            },
            {
              id: 'coe-hss2',
              name: 'H/SS',
            },
            {
              id: 'coe-hss-u1',
              name: 'H/SS Upper Division',
            },
            {
              id: 'coe-hss-u2',
              name: 'H/SS Upper Division',
            },
          ],
        },
      ],
    },
    ls: {
      id: 'ls',
      name: 'College of Letters and Sciences',
      parentId: 'ucb',
      requirementCategories: [
        {
          id: 'ls-essential',
          name: 'Essential Skills',
          requirements: [
            {
              id: 'ls-r1a',
              name: 'R&C Part A',
            },
            {
              id: 'ls-r1b',
              name: 'R&C Part B',
            },
            {
              id: 'ls-quant',
              name: 'Quantitative Reasoning',
            },
            {
              id: 'ls-lang',
              name: 'Foreign Language',
            },
          ],
        },
        {
          id: 'ls-breadth',
          name: 'Breadth Requirements',
          requirements: [
            {
              id: 'ls-arts',
              name: 'Arts and Literature',
            },
            {
              id: 'ls-bio',
              name: 'Biological Science',
            },
            {
              id: 'ls-hist',
              name: 'Historical Studies',
            },
            {
              id: 'ls-inter',
              name: 'International Studies',
            },
            {
              id: 'ls-philo',
              name: 'Philosophy and Values',
            },
            {
              id: 'ls-phys',
              name: 'Physical Science',
            },
            {
              id: 'ls-socio',
              name: 'Social and Behavioral Science',
            },
          ],
        },
      ],
    },
    eecs: {
      id: 'eecs',
      name: 'EECS Major',
      parentId: 'coe',
      requirementCategories: [
        {
          id: 'eecs-math',
          name: 'Math',
          requirements: [
            {
              id: 'math1a',
              name: 'MATH 1A',
              courseId: 'math1a',
            },
            {
              id: 'math1b',
              name: 'MATH 1B',
              courseId: 'math1b',
            },
            {
              id: 'compsci70',
              name: 'COMPSCI 70',
              courseId: 'compsci70',
            },
          ],
        },
        {
          id: 'eecs-physics',
          name: 'Physics',
          requirements: [
            {
              id: 'physics7a',
              name: 'PHYSICS 7A',
              courseId: 'physics7a',
            },
            {
              id: 'physics7b',
              name: 'PHYSICS 7B',
              courseId: 'physics7b',
            },
          ],
        },
        {
          id: 'eecs-lower-div',
          name: 'Lower Division',
          requirements: [
            {
              id: 'compsci61a',
              name: 'COMPSCI 61A',
              courseId: 'compsci61a',
            },
            {
              id: 'compsci61b',
              name: 'COMPSCI 61B',
              courseId: 'compsci61b',
            },
            {
              id: 'compsci61c',
              name: 'COMPSCI 61C',
              courseId: 'compsci61c',
            },
            {
              id: 'eecs16a',
              name: 'EECS 16A',
              courseId: 'eecs16a',
            },
            {
              id: 'eecs16b',
              name: 'EECS 16B',
              courseId: 'eecs16b',
            },
          ],
        },
        {
          id: 'eecs-upper-div',
          name: 'Upper Division',
          requirements: [
            // TODO Add unit-style requirements
            {
              id: 'eecs-upper-1',
              name: 'Upper Division',
            },
            {
              id: 'eecs-upper-2',
              name: 'Upper Division',
            },
            {
              id: 'eecs-upper-3',
              name: 'Upper Division',
            },
            {
              id: 'eecs-upper-4',
              name: 'Upper Division',
            },
            {
              id: 'eecs-upper-5',
              name: 'Upper Division',
            },
          ],
        },
        {
          id: 'eecs-ethics',
          name: 'Ethics',
          requirements: [
            {
              id: 'compsci195',
              name: 'COMPSCI 195',
              courseId: 'compsci195',
            },
          ],
        },
      ],
    },
    ling: {
      id: 'linguis',
      name: 'Linguistics Major',
      parentId: 'ls',
      requirementCategories: [
        {
          id: 'linguis100',
          name: 'LINUIGS 100',
          requirements: [
            {
              id: 'linguis100',
              name: 'LINGUIS 100',
              courseId: 'linguis100',
            },
          ],
        },
        {
          id: 'linguis-core',
          name: 'Core',
          requirements: [
            // TODO Add N of set of requirements
            {
              id: 'linguis110',
              name: 'LINGUIS 110',
              courseId: 'linguis110',
            },
            {
              id: 'linguis111',
              name: 'LINGUIS 111',
              courseId: 'linguis111',
            },
            {
              id: 'linguis115',
              name: 'LINGUIS 115',
              courseId: 'linguis115',
            },
            {
              id: 'linguis120',
              name: 'LINGUIS 120',
              courseId: 'linguis120',
            },
            {
              id: 'linguis130',
              name: 'LINGUIS 130',
              courseId: 'linguis130',
            },
          ],
        },
        {
          id: 'linguis-electives',
          name: 'Electives',
          requirements: [
            // TODO Add unit-style requirements
            {
              id: 'linguis-elective-1',
              name: 'Elective 1',
            },
            {
              id: 'linguis-elective-2',
              name: 'Elective 2',
            },
            {
              id: 'linguis-elective-3',
              name: 'Elective 3',
            },
          ],
        },
      ],
    },
  };

  constructor(private courseService: CourseService) {}

  getRequirements(): Observable<RequirementSet[]> {
    return of(this.DUMMY_REQUIREMENT_DATA).pipe(flatMap((data) => this.prepareData(data)));
  }

  prepareData(data: object): Observable<RequirementSet[]> {
    return this.courseService.getCourses().pipe(
      map((courses) => {
        // Build object with course.id as keys and course as values
        const coursesObj = courses.reduce((obj, course) => {
          const nextObj = { ...obj };
          nextObj[course.id] = course;
          return nextObj;
        }, {});

        // Instantiate requirement types and link courseIds to Course objects
        return Object.values(data).map((rawSet) => {
          const requirementSet = { ...rawSet };

          requirementSet.parent = requirementSet.parentId ? data[requirementSet.parentId] : null;
          delete requirementSet.parentId;

          requirementSet.requirementCategories = requirementSet.requirementCategories.map((rawCategory) => {
            const requirementCategory = { ...rawCategory };

            requirementCategory.requirements = requirementCategory.requirements.map((rawReq) => {
              const requirement = { ...rawReq };

              if (requirement.courseId) {
                requirement.course = coursesObj[requirement.courseId];
                delete requirement.courseId;
                return new CourseRequirement(requirement);
              }
              if (requirement.tag) {
                return new TagRequirement(requirement);
              }
              return requirement;
            });

            return requirementCategory;
          });

          return requirementSet;
        });
      })
    );
  }
}
