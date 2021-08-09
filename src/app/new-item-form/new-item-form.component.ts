import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.scss']
})
export class NewItemFormComponent {

  public todoItemModel: string;

  @Output()
  public onNewItem: EventEmitter<string> = new EventEmitter();

  constructor(
    private validationService: ValidationService,
  ) {}

  handleFormSubmit(form: NgForm) {
    if (this.validationService.isValidTask(this.todoItemModel)){
      this.onNewItem.emit(this.validationService.getValidValue());
      form.resetForm();
    }
  }

  isInvalidForm(form: NgForm): boolean {
    return this.validationService.isInvalidForm(form);
  }

}
