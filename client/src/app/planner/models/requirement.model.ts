import { Course } from './course.model';

/**
 * The Requirement class represents a single requirement that can be fulfilled by taking certain {@link Course}s and is
 * either fulfilled or unfulfilled based on the input {@link Course}s.
 */
export abstract class Requirement {
  id: string;
  name: string;

  constructor(obj: object) {
    Object.assign(this, obj);
  }

  /* Requirement.fromProto is currently RequirementCategory.reqFromProto to
   * avoid circular dependencies. */

  isFulfilled(courses: Course[], override: Set<string>): boolean {
    if (override && override.has(this.id)) {
      return true;
    }
    return this.isFulfilledWith(courses, override);
  }

  getAnnotation(): string {
    return null;
  }

  abstract toString(): string;

  protected abstract isFulfilledWith(courses: Course[], override: Set<string>): boolean;
}
