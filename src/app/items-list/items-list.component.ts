import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { map, take } from 'rxjs/operators';
import { ConfirmStatus } from '../confirm-modal/confirm-status.enum';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent {
  @Input()
  public items: string[] = [];

  @Output()
  public onDeleteItem: EventEmitter<string> = new EventEmitter();

  public bsModalRef: BsModalRef;

  public selectedForDelete: string[] = [];

  constructor(private modalService: BsModalService) {}

  confirmDelete(item: string): void {
    const initialState = { item };
    this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
      initialState,
    });

    this.bsModalRef.onHide
      .pipe(
        take(1),
        map((reason) => reason === ConfirmStatus.OK)
      )
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this.deleteItem(item);
        }
      });
  }

  toggleItem(item) {
    if (this.selectedForDelete.includes(item)) {
      this.selectedForDelete = this.selectedForDelete.filter(selected => selected !== item);
    } else {
      this.selectedForDelete.push(item);
    }
  }

  deleteSelected() {
    this.selectedForDelete.forEach(item => this.deleteItem(item));
    this.selectedForDelete = [];
  }

  private deleteItem(item: string): void {
    this.onDeleteItem.emit(item);
  }
}
