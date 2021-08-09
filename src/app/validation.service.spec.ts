import { TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;
  let formMock = {
    submitted: false,
    form: {
      controls: {},
    },
  } as any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationService);
  });

  describe('isInvalidForm', () => {
    it('should return true when form is submitted and todoItemModel is invalid', () => {
      formMock.submitted = true;
      formMock.form.controls = {
        todoItemModel: {
          invalid: true,
        },
      };
      expect(service.isInvalidForm(formMock)).toBeTrue();
    });

    it('should return false when form is submitted and todoItemModel is valid', () => {
      formMock.form.controls = {
        todoItemModel: {
          invalid: false,
        },
      };
      expect(service.isInvalidForm(formMock)).toBeFalse();
    });
  });

  describe('isValidTask', () => {
    it('should return false when falsy value is provided', () => {
      expect(service.isValidTask(null)).toBeFalse();
      expect(service.isValidTask(undefined)).toBeFalse();
    });

    it('should return false when provided value cosists of spaces', () => {
      expect(service.isValidTask('    ')).toBeFalse();
    });

    it('should return false when provided value is empty string', () => {
      expect(service.isValidTask('')).toBeFalse();
    });

    it('should return true when provided value is non-empty string', () => {
      expect(service.isValidTask('test4')).toBeTrue();
    });
  });

  describe('getValidValue', () => {
    it('should return null when value is invalid', () => {
      // ARRANGE
      service.isValidTask('');

      // ASSERT
      expect(service.getValidValue()).toBeNull();
    });

    it('should return filtered value when value is valid', () => {
      // ARRANGE
      service.isValidTask('   test45  ');

      // ASSERT
      expect(service.getValidValue()).toBe('test45');
    });
  });
});
