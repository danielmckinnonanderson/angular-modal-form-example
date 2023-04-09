# Sharing Data from Modal Form Submission in Angular

### The Problem
We are building an Angular web app which leverages the [ng-bootstrap library to create instances of modals](https://ng-bootstrap.github.io/#/components/modal/examples).
Throughout our application, we largely have components which do not directly modify app state, and instead emit events.
While this event-centric approach has been beneficial throughout the more straight-forward components of the app, it is problematic when the event needs to be emitted from a modal component.
Since the modal is spawned from a service class, its parent is not the component on which the service class is injected and thus cannot cleanly handle an event emitted from a modal.
Moreover, our modal contains a form which we want to submit using our API, without having the form component actually posses an instance of our API service  (since we want to centralize where in our app our API requests are taking place).
Our API contains some server-side validation that our `FormGroup` validators do not account for, inherent to the design of our front-end.
When we receive these server side errors, we want to make sure that the form modal stays open in the same state as it was during submission, so that the user can pick up right where they left off and fix the fields determined to be invalid. We also want to briefly show an error modal.
If the form was submitted successfully, we want to briefly show a success modal and close the form modal.

### The Solution

One option is to use a service class to hold the submitted form value as an optional object.
However, I am extremely wary of storing state directly in a service class.
That can get messy real quick.

So, we can get around this by using an Observable on the service class to abstract it.

We implement two Subjects: One for storing _submitted form values_, and one for _form submission errors_.
The first one emits a new value every time a valid form on the modal is submitted.
The modal does not close, it stays open and just emits its value from the submissions Subject.

The parent component, which is subscribed to the submissions Subject, then fires a (mocked) API request to simulate submitting the form to our back-end.
Sometimes, our fake API will return a 400, which represents that some sort of third-party submission validation encountered an issue with our data that our form validation could not have accounted for. Our form was not submitted, and we must address the errors first.

If a 400 is returned, the parent component will display an 'error' modal and emit a new `errors` object from the submission errors Subject.
The form modal will stay open, and since it is subscribed to the submission errors Subject, it will read the errors and add errors to those fields.

If a 200 is returned, the parent component will display a 'success' modal and close the form modal.

### Running this example

This project was built using Angular version `15.2.6` & Node version `18.15.0`.

To run the project, install dependencies using `npm ci` & then run with `npm run start`.

When you first submit the form, you will receive an error on the 'name' field from our mock API.
The third submission will receive an error on the 'color' field from our mock API.
All other submissions will receive 200's and resolve successfully.
