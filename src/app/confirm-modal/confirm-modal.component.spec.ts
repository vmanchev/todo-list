import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ConfirmModalComponent } from './confirm-modal.component';
import { ConfirmStatus } from './confirm-status.enum';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  const bsModalRefMock = jasmine.createSpyObj('BsModalRef', ['hide']);
  const bsModalServiceMock = jasmine.createSpyObj('BsModalService', [
    'setDismissReason',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmModalComponent],
      providers: [
        { provide: BsModalRef, useValue: bsModalRefMock },
        { provide: BsModalService, useValue: bsModalServiceMock },
      ],
    })
      .overrideComponent(ConfirmModalComponent, { set: { template: '' } })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ok', () => {
    beforeEach(() => component.ok());

    it('should set dismiss reason to OK', () => {
      expect(bsModalServiceMock.setDismissReason).toHaveBeenCalledWith(
        ConfirmStatus.OK
      );
    });

    it('should call hide method', () => {
      expect(bsModalRefMock.hide).toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    beforeEach(() => component.cancel());

    it('should set dismiss reason to CANCEL', () => {
      expect(bsModalServiceMock.setDismissReason).toHaveBeenCalledWith(
        ConfirmStatus.CANCEL
      );
    });

    it('should call hide method', () => {
      expect(bsModalRefMock.hide).toHaveBeenCalled();
    });
  });
});
