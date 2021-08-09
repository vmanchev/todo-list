import { Component, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmStatus } from './confirm-status.enum';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input()
  public item: string;

  constructor(
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) {}

  ok(): void {
    this.bsModalService.setDismissReason(ConfirmStatus.OK);
    this.bsModalRef.hide();
  }

  cancel(): void {
    this.bsModalService.setDismissReason(ConfirmStatus.CANCEL);
    this.bsModalRef.hide();
  }
}
