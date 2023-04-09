import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FormSubmissionService } from '../form-submission.service';

export type ModalFormValue = {
  name: string,
  color: string,
}

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private modal: NgbActiveModal,
              private readonly fb: FormBuilder,
              private readonly submissionService: FormSubmissionService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
    });

    this.submissionService.submissionErrors$.subscribe(value => {
      console.info("Value emitted from submissionStatus$, value was ", value);

      if (value === null) {
        // no errors so submission was valid, close modal
        console.info("No errors were emitted from the submissions status subject, closing modal");
        this.modal.close();
      } else {
        // mark fields with errors using form control API
        console.warn("Errors emitted from the submissions status subject, errors:");
        for (const field of value.invalidFields) {

          console.warn("Errors:", field);

          if (this.form.get(field) == null) {
            throw new Error(`Field ${field} was not present on Form!`);
          } else {
            this.form.get(field)?.setErrors({ apiValidationError: true });
          }
        }
      }
    });
  }

  getNameControl(): AbstractControl {
    return this.form.get('name')!;
  }

  getColorControl(): AbstractControl {
    return this.form.get('color')!;
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      console.info("Form was INVALID. Value was ", form.value);
      // mark as touched to trigger invalid states for all invalid fields
      this.form.markAsTouched();
      return;
    }
    
    console.info("Form was VALID. Value was ", form.value);
    this.submissionService.submitForm(form.value);
  }

  showErr(ctrl: AbstractControl): boolean {
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }

  getNameCtrl(): AbstractControl {
    return this.form.get('name')!;
  }

  getColorCtrl(): AbstractControl {
    return this.form.get('color')!;
  }
}
