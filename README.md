# Purpose

This simple application demonstrates how to use Redux toolkit ExtraReducer with TypeScript.

This application has two components.

- PetInput component has a form for pet record. When clicked submit button, this posts it to REST server using Axios, then update state of Redux store using basic reduer.
- PetList component shows a list of pets in store. When this component mounts, this gets data from REST server and update Redux store using extra reducer.

If PetInput component add a pet, list of pet in PetList component will be updated automatically using Redux.

# Redux-toolkit Tutorials

https://redux-toolkit.js.org/tutorials/overview

# Online IDE
https://codesandbox.io/s/typescriptreactreduxtoolkitextrareducerssample-56cdy

# Module Versions

- typescript 4.1.2
- react 17.0.2
- @types/react 17.0.0
- redux 4.0.5
- react-redux 7.2.3
- @types/react-redux 7.1.16
- @reduxjs/toolkit 1.5.1
- axios 0.21.1
