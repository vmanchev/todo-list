import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { ValidationService } from '../validation.service';

import { NewItemFormComponent } from './new-item-form.component';

describe('NewItemFormComponent', () => {
  let component: NewItemFormComponent;
  let fixture: ComponentFixture<NewItemFormComponent>;
  let emitSpy;
  let form = jasmine.createSpyObj('NgForm', ['resetForm']);

  const validationServiceMock = jasmine.createSpyObj(ValidationService, [
    'isValidTask',
    'isInvalidForm',
    'getValidValue',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewItemFormComponent],
      providers: [
        { provide: ValidationService, useValue: validationServiceMock },
      ],
    })
      .overrideComponent(NewItemFormComponent, { set: { template: '' } })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemFormComponent);
    component = fixture.componentInstance;
    emitSpy = spyOn(component.onNewItem, 'emit');
    fixture.detectChanges();
  });

  describe('isInvalidForm', () => {
    it('should return false when validationService.isInvalidForm returns false', () => {
      // ARRANGE
      validationServiceMock.isInvalidForm.and.returnValue(false);

      // ASSERT
      expect(component.isInvalidForm(form)).toBeFalse();
    });

    it('should return true when validationService.isInvalidForm returns true', () => {
      // ARRANGE
      validationServiceMock.isInvalidForm.and.returnValue(true);

      // ASSERT
      expect(component.isInvalidForm(form)).toBeTrue();
    });
  });

  describe('handleFormSubmit', () => {
    describe('when task is invalid', () => {
      beforeEach(() => {
        // ARRANGE
        validationServiceMock.isValidTask.and.returnValue(false);
        emitSpy.calls.reset();
        form.resetForm.calls.reset();

        // ACT
        component.handleFormSubmit(form);
      });

      it('should do nothing when task is invalid', () => {
        // ASSERT
        expect(emitSpy).not.toHaveBeenCalled();
        expect(form.resetForm).not.toHaveBeenCalled();
      });
    });

    describe('when task is valid', () => {
      beforeEach(() => {
        // ARRANGE
        validationServiceMock.isValidTask.and.returnValue(true);
        validationServiceMock.getValidValue.and.returnValue('test4');
        emitSpy.calls.reset();
        form.resetForm.calls.reset();

        // ACT
        component.handleFormSubmit(form);
      });

      it('should emit valid value', () => {
        expect(emitSpy).toHaveBeenCalledWith('test4');
      });

      it('should reset the form', () => {
        expect(form.resetForm).toHaveBeenCalled();
      });
    });
  });
});
