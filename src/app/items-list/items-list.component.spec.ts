import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { ConfirmStatus } from '../confirm-modal/confirm-status.enum';

import { ItemsListComponent } from './items-list.component';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let emitSpy;

  const bsModalServiceMock = jasmine.createSpyObj('BsModalService', ['show']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsListComponent],
      providers: [{ provide: BsModalService, useValue: bsModalServiceMock }],
    })
      .overrideComponent(ItemsListComponent, { set: { template: '' } })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    emitSpy = spyOn(component.onDeleteItem, 'emit');
    fixture.detectChanges();
  });

  describe('toggleItem', () => {
    it('should add selected item to the deletion list if item is not already included', () => {
      // ARRANGE
      component.selectedForDelete = ['test3', 'test4'];

      // ACT
      component.toggleItem('test5');

      // ASSERT
      expect(component.selectedForDelete).toEqual(['test3', 'test4', 'test5']);
    });

    it('should remove selected item from the deletion list if item is already included', () => {
      // ARRANGE
      component.selectedForDelete = ['test3', 'test4'];

      // ACT
      component.toggleItem('test4');

      // ASSERT
      expect(component.selectedForDelete).toEqual(['test3']);
    });
  });

  describe('deleteSelected', () => {
    it('should emit each item from deletion list via onDeleteItem', () => {
      // ARRANGE
      component.selectedForDelete = ['test3', 'test4'];
      emitSpy.calls.reset();

      // ACT
      component.deleteSelected();

      // ASSERT
      expect(emitSpy).toHaveBeenCalledTimes(2);
      expect(component.selectedForDelete.length).toBe(0);
    });
  });

  describe('confirmDelete', () => {
    it('should delete the selected item when OK button is clicked', () => {
      // ARRANGE
      emitSpy.calls.reset();
      const bsModalRef = {
        onHide: of(ConfirmStatus.OK),
      };
      bsModalServiceMock.show.and.returnValue(bsModalRef);

      // ACT
      component.confirmDelete('test10');

      // ASSERT
      expect(component.bsModalRef).toBeDefined();
      expect(emitSpy).toHaveBeenCalledWith('test10');
    });

    it('should not delete the selected item when CANCEL button is clicked', () => {
      // ARRANGE
      emitSpy.calls.reset();
      const bsModalRef = {
        onHide: of(ConfirmStatus.CANCEL),
      };
      bsModalServiceMock.show.and.returnValue(bsModalRef);

      // ACT
      component.confirmDelete('test10');

      // ASSERT
      expect(component.bsModalRef).toBeDefined();
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });
});
