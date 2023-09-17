import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom/";
import { app as firebaseApp } from "./firebase";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import "./index.css";
import App from "./App";
import Create from "./Create";
import Edit from "./Edit";
import ErrorNoNull from "./ErrorNoNull";
import { v4 as uuidv4 } from 'uuid';
import Filter from "./Components/Filter";

const db = getFirestore(firebaseApp);

const router = createBrowserRouter([
  // Load all documents from the 'bookmarks' collection
  {
    path: "/errornonull",
    element: <ErrorNoNull />,
  },
  {
    path: "/search",
    element: <Filter />,
  },
  {
    path: "/",
    element: <App />,
    loader: async () => {
      const collectionRef = collection(db, "bookmarks");
      const collectionSnap = await getDocs(collectionRef);
      // console.log(collectionSnap);
      const data = collectionSnap.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
          // we want to move the name and url in a upper level same as id, this is spread operator
          ...doc.data(),
        };
      });
      // console.log(data);
      return {
        data: data,
      };
    },
  },

  // save one document to the 'bookmarks' collection
  // db -> collection("bookmarks") -> Document -> data
  {
    path: "/create",
    element: <Create />, // no need to use loader here, rather we need to submit the form
    action: async ({ request }) => {
      try {

        // throw new Error("Simulated Firestore error"); // Simulate an error

        const recordId = uuidv4(); // generate the userId

        const formData = await request.formData();
        const name = formData.get("name");
        const url = formData.get("url");

        // Validate the form data
        if (!name || !url) {
          console.error("name and url are required");
          return redirect('/errornonull'); 
        }

        console.log(name, url);
        

        // Add the data to Firestore. Since you've already extracted name and url,
        // there's no need to spread formData again.
        
        const collectionRef = collection(db, "bookmarks");
        const docRef = await addDoc(collectionRef, {
          name: name,
          url: url,
          recordId: recordId,
        });

        console.log(docRef);
        return redirect("/");

      } catch (error) {
        console.error("Error adding document to Firestore:", error);
        return redirect("/create"); // Redirect back to the form in case of an error.
      }
    },
  },
  {
    // Edit page will use loader and form submission, at first, we need to load the data from firestore
    // and then edit it 
    path: "/edit/:id",
    element: <Edit />,
    loader: async () => {
      return {};
    },
    action: async ({ request, params }) => {
      return {};
   }
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);