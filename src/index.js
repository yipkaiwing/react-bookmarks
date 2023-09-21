import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom/";
import { app as firebaseApp, auth } from "./firebase";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import "./index.css";
import App from "./App";
import Create from "./Create";
import Edit from "./Edit";
import ErrorNoNull from "./ErrorNoNull";
import { v4 as uuidv4 } from "uuid";
import Filter1 from "./Components/Filter";
import Signup from "./Signup";
import Login from "./Login";
import Protected from "./Components/Protected"; //protect create, edit, delete pages
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

const db = getFirestore(firebaseApp);

const router = createBrowserRouter([
  // Load all documents from the 'bookmarks' collection
  {
    path: "/errornonull",
    element: <ErrorNoNull />,
  },
  {
    path: "/search",
    element: <Filter1 />,
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

      // Create the promise by myself as we wait for for the user account authentication to complete
      let user = null;

      try {
        user = await new Promise((resolve, reject) => {
          onAuthStateChanged(auth, (user) => {
            resolve(user);
          });
        });
        console.log("user", user);
      } catch (error) {
        console.error(error);
      }

      return {
        data: data,
        user: user,
      };
    },
  },

  // Protect create, edit, delete pages
  {
    path: "/",
    element: <Protected />,
    loader: async () => {

      let user = null;

      try {
        user = await new Promise((resolve, reject) => {
          onAuthStateChanged(auth, (user) => {
            resolve(user);
          });
        });
        console.log("user", user);
      } catch (error) {
        console.error(error);
      }

      return {
        user: user,
      };
    },
    
    children: [
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
              return redirect("/errornonull");
            }
    
            console.log(name, url);
    
            // Add the data to Firestore. Since you've already extracted name and url,
            // there's no need to spread formData again.
    
            const collectionRef = collection(db, "bookmarks");
            await addDoc(collectionRef, {
              name: name,
              url: url,
              recordId: recordId,
            });
    
            // console.log(docRef);
            return redirect("/");
          } catch (error) {
            console.error("Error adding document to Firestore:", error);
            return redirect("/create"); // Redirect back to the form in case of an error.
          }
        },
      },
      
      // Edit page will use loader and form submission, at first, we need to load the data from firestore
      // and then edit it
      {
        path: "/edit/:id",
        element: <Edit />,
        loader: async ({ params }) => {
          const id = params.id;
          const docRef = doc(db, "bookmarks", id);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
    
          return {
            id: id,
            data: data,
          };
        },
        action: async ({ request, params }) => {
          const id = params.id;
          const formData = await request.formData();
          const name = formData.get("name");
          const url = formData.get("url");
    
          const docRef = doc(db, "bookmarks", id);
          await updateDoc(docRef, {
            name: name,
            url: url,
          });
    
          return redirect("/");
        },
      },
    
      // Delete one document from the 'bookmarks' collection
      {
        path: "/delete/:id",
        action: async ({ params }) => {
          const id = params.id;
          const docRef = doc(db, "bookmarks", id);
          await deleteDoc(docRef);
          return redirect("/");
        },
      },
    ],
  },

  // Singup Page
  {
    path: "/signup",
    element: <Signup />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const email = formData.get("email");
      const password = formData.get("password");
      const password_confirmation = formData.get("password_confirmation");

      if (password.length < 6) {
        return {
          error: "Password must be at least 6 characters",
        };
      }

      if (password !== password_confirmation) {
        return {
          error: "Passwords do not match",
        };
      }

      // Register the user with Firebase
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(`userCredential`, userCredential);
      } catch (error) {
        return {
          error: error.message,
        };
      }

      return redirect("/");
    },
  },
  {
    // Logout page
    path: "/logout",
    loader: async () => {
      await auth.signOut();
      return redirect("/");
    },
  },

  // Login page
  {
    path: "/login",
    element: <Login />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const email = formData.get("email");
      const password = formData.get("password");

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(`userCredential`, userCredential);
      } catch (error) {
        return {
          error: error.message,
        };
      }

      return redirect("/");
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
