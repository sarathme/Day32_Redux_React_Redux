# Redux Toolkit and React redux

## Redux

Redux is a global state management tool where multiple states of the application
is managed in a centralized place.

## Redux Toolkit

Redux Toolkit is an enhanced way to write redux logics where it forces
developers to write opnionated code which are best practices as boiler plate
code.

### Installing the package

```sh
npm install @redux/toolkit
```

### Slices

1. They call a group of application states as slices.

2. We can create a slice by calling the createSlice function provided by the
   @redux/toolkit package.

```js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((cartItem) => {
        if (action.payload.id === cartItem.id) {
          cartItem.quantity = action.payload.quantity;
        }
        return cartItem;
      });
    },
    deleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
    },
  },
});

export const { updateQuantity, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
```

3. The createSlice function accepts an object of options which consists of a
   name property for the name of the state. A reducers object which contains the
   reducer functions and an initialState property which holds the initial values
   of the state slice.

4. There are also many options but these properties are mostly used.

5. The reducer functions is place where the actions (state is manipulated).

6. Unlike Context API the redux internally uses a package called Immer which
   enable us to perform mutations in state variables which is available in
   Context API (we need to return a brand new state object).

7. We can create multiple state slices for a single feature in the application.

8. The createSlice function returns a slice object which contains the action
   creator function and the root redducer which we export as shown in above code
   snippet.

### Redux Store

1. All the slices created by createSlice function is connected to a store by the
   configureStore function provided by the @redux/toolkit package.

```js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
```

2. The configureStore function accepts an object with the property reducer which
   is an object contains various root reducers of the create slices.

3. The configureStore function returns a store object where we can access the
   dispatch function.

## React Redux

The react-redux is apackage used to connect the redux store with our react
application.

### Installing the react-redux package

```sh
npm install react-redux
```

### Providing the store

We provide the redux store by wrapping the whole App component with the Provider
component provide by the react-redux package.

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";

import { store } from "./store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

The Provider component accepts a prop called store where the value is the store
created using configureStore function by redux toolkit.

### Consuming the Store

Inorder to consume the state variables of a slices of store reac-redux package
provides us with a custom hook called useSelector()

```js
import { useSelector } from "react-redux";

const { cartItems } = useSelector((state) => state.cart);
```

The useSelector hook accepts a function as argument which has the state anthe
function we can get access to state variable of each slices.

### Dispatching actions

Redux Toolkit automatically creates action creators which we exported from the
state slices object [&#128279;](#slices).

To dispatch an action from the react component react-redux provides us with
custom hook called useDispatch which returns a dispatch function.

```js
import { useDispatch } from "react-redux";

// Inside react component
const dispatch = useDispatch();

// Generally inside an event listner function.
dispatch(updateQuantity(payload));
```
