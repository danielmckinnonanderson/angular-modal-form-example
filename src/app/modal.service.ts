import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { StatusModalComponent } from './status-modal/status-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private readonly ngbModalService: NgbModal) { }

  spawnFormModal() {
    const modal = this.ngbModalService.open(ModalFormComponent, {});
  }

  spawnStatusModal(status: "success" | "error", invalidFields?: string[]) {
    const modal = this.ngbModalService.open(StatusModalComponent, {});

    modal.componentInstance.status = status;
    modal.componentInstance.invalidFields = invalidFields;

    setTimeout(() => { modal.close() }, 2000);
  }
}
