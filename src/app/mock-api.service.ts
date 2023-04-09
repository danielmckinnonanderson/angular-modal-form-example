import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type ApiResponse = {
  status: number,
  body?: any
}

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  // Used to mock and send different responses based on how many request have been made
  private _timesCalled = 0;

  private apiResponse: Observable<ApiResponse> = new Observable((subscriber) => {
    if (this._timesCalled == 0) {
      setTimeout(() => {
        subscriber.next({
          status: 400,
          body: {
            message: "Field 'name' was invalid",
          }
        });
      }, 3000);
      this._timesCalled = this._timesCalled + 1;
    } else if (this._timesCalled == 1) {
      setTimeout(() => {
        subscriber.next({
          status: 200,
          body: {
            status: 'success'
          },
        });
      }, 3000);
      this._timesCalled = this._timesCalled + 1;
    } else if (this._timesCalled == 2 ) {
      setTimeout(() => {
        subscriber.next({
          status: 400,
          body: {
            message: "Field 'color' was invalid",
          }
        });
      }, 3000);
      this._timesCalled = this._timesCalled + 1;
    } else {
      setTimeout(() => {
        subscriber.next({
          status: 200,
          body: {
            status: 'success'
          },
        });
      }, 3000);
      this._timesCalled = this._timesCalled + 1;
    }
  });

  constructor() { }


  /**
  * Mocking API call.
  *
  * Form is fake-submitted here.
  * API will return either a 200 or a 400
  *
  */
  public request(body: any): Observable<ApiResponse> {
    return this.apiResponse;
  }
}
