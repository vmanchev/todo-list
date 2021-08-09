import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private filteredValue: string;

  isValidTask(task: string): boolean {
    this.filteredValue = null;

    if (!task) {
      return false;
    }

    this.filteredValue = this.filter(task);

    return this.filteredValue.length > 0;
  }

  isInvalidForm(f: NgForm): boolean {
    return f.submitted && !!f.form.controls.todoItemModel?.invalid;
  }

  getValidValue(): string {
    return this.filteredValue;
  }

  private filter(task: string) {
    return task.trim();
  }
}
