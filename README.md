# Pizza Puzzle
By Yago López

## Demo
[https://pizza-puzzle-yago-lopez.firebaseapp.com/](https://pizza-puzzle-yago-lopez.firebaseapp.com/)

## Functionality

- The project uses [https://firebase.google.com](Firebase Database) as **persistance mechanism**

- Firebase is a **Realtime Database** based in WebSockets (It keeps a communication channel open between
 client and server, instead of the request/response HTTP protocol)
- Because of this you can open two different browser instances,
modify data in one of them and data will be broadcasted and synchronized with all clients in real-time

- When a user sing-up, he is persisted to the database and his likes counter is initialised to zero

- When a user clicks the **likes-pizza button** the counter is retrieved from de database, incremented and saved. The
changes are broadcasted to all clients connected to the app (similar to a chat client)

- **Authentication** and **Authorization** are cross-cutting concerns. They are implemented following the 
**High Order Component** pattern in functional programming.  They are in `WithAuthentication` and `WithAuthorization`
HOC components

- Due to time constrains and because in this case the global state of the app is a counter it has been taken the 
decision of not using Redux as global state manager. Therefore, the state is managed in each component.

- There are two types of validation:

  - **Validation in the client or browser** (in some simple cases like, empty fields, etc.)
  
  - **Validation in the backend**, provided by Firebase (Trying to register duplicated user, etc.)
  
- The application implements responsive design  

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed.
