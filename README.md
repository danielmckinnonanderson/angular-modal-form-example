# Sharing Data from Modal Form Submission in Angular

### The Problem
At work, we have an Angular web app which leverages the [ng-bootstrap]() library to create instances of modals.
Throughout our application, we largely have components which do not directly modify app state, and instead emit events.
While this event-centric approach has been beneficial throughout the more straight-forward components of the app, it is problematic when the event needs to be emitted from a modal component.
Since the modal is spawned from a service class, its parent is not the component on which the service class is injected and thus cannot cleanly handle an event emitted from a modal.

### The Solution
One option is to use a service class to hold the submitted form value.
However, I am extremely wary of storing state directly in a service class.
So, we can get around this by using an Observable on the service class to abstract it.
