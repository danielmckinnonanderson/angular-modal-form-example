import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormSubmissionService } from './form-submission.service';
import { MockApiService } from './mock-api.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private readonly modalService: ModalService,
              private readonly submissionService: FormSubmissionService,
              private readonly api: MockApiService) {}

  ngOnInit(): void {
    this.submissionService.submissions$.subscribe(value => {

      // when the submissions subject emits a new value
      // we request our api

      this.api.request(value).subscribe((result) => {
        switch (result.status) {
          // send null because there are no errors
          case 200: {
            this.submissionService.updateSubmissionErrors(null);
            this.showSuccessModal();
            break;
          }

          // send errors
          case 400: {
            const invalidFields = this.parseMessageIntoArray(result.body.message);

            this.submissionService.updateSubmissionErrors({ invalidFields: invalidFields });
            this.showErrorModal(invalidFields);
            break;
          }

          // this will never happen :)
          default: throw new Error("Literally how");
        }
      });
    });
  }

  openModal() {
    this.modalService.spawnFormModal();
  }


  private parseMessageIntoArray(message: string): string[] {
    let invalidFields: string[] = [];

    message.includes("name") ? invalidFields.push('name') : undefined;
    message.includes("color") ? invalidFields.push('color') : undefined;

    return invalidFields;
  }

  private showErrorModal(invalidFields: string[]) {
    this.modalService.spawnStatusModal('error', invalidFields);
  }

  private showSuccessModal() {
    this.modalService.spawnStatusModal('success');
  }
}
