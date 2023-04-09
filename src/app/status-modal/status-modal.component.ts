import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent {
  @Input() status!: "success" | "error";
  @Input() invalidFields?: string[];

  constructor(private modal: NgbActiveModal) {}
}
