import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    })
      .overrideComponent(AppComponent, { set: { template: '' } })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('addNewItem', () => {
    it('should add new item at the end of items list', () => {
      // ARRANGE
      component.todoListItems = ['test3'];

      // ACT
      component.addNewItem('test4');

      // ASSERT
      expect(component.todoListItems).toEqual(['test3', 'test4']);
    });
  });

  describe('deleteTodoItem', () => {
    it('should remove selected item from items list', () => {
      // ARRANGE
      component.todoListItems = ['test3', 'test4', 'test5'];

      // ACT
      component.deleteTodoItem('test4');

      // ASSERT
      expect(component.todoListItems).toEqual(['test3', 'test5']);
    });
  });
});
