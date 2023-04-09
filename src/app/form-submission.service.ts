import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalFormValue } from './modal-form/modal-form.component';

@Injectable({
  providedIn: 'root'
})
export class FormSubmissionService {

  /* 
  * First subject is basically a stream of form submissions
  * These values have passed whatever form validation there was
  * In our example, there will be one subscriber on the parent component
  *   which will simulate sending the value in an API request
  * <strong>TLDR Modal (form data) --one way communication--> parent component </strong>
  */
  public readonly submissions$: Subject<ModalFormValue> = new Subject();


  // Second subject is intended to be used to send errors that came from
  //   the API request back to the modal form for display
  // <strong>TLDR parent component (API form errors) --one way communication--> Modal component </strong>
  public readonly submissionErrors$: Subject<{ invalidFields: string[] } | null> = new Subject();

  constructor() { }

  submitForm(value: ModalFormValue) {
    this.submissions$.next(value);
  }

  updateSubmissionErrors(errors: { invalidFields: string[] } | null) {
    this.submissionErrors$.next(errors);
  }
}
