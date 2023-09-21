import React from "react";
import { Link, Form, useActionData } from "react-router-dom";

const Signup = () => {
  const actionData = useActionData(); // validate the password, but email duplication will be handled by Firebase

  return (
    <div className="m-12 bg-blue-800 max-w-3xl rounded-lg mx-auto p-2 text-white">
      <div className="flex justify-between items-center">
        <Link to="/">Back</Link>
        <h1 className="text-2xl font-bold text-center">Sign-up</h1>
        <div></div>
      </div>

      <Form
        method="post"
        action="/signup"
        className="flex flex-col gap-2 mt-2 text-xl rounded p-4 bg-white text-blue-900"
      >
        {actionData?.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{actionData.error}</span>
          </div>
        )}
        <label htmlFor="email">Email</label>
        <input
          className="border rounded border-gray-400 outline-none focus:border-blue-800 px-2 py-1"
          type="email"
          name="email"
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="border rounded border-gray-400 outline-none focus:border-blue-800 px-2 py-1"
          type="password"
          name="password"
          id="password"
        />
        <label htmlFor="password_confirmation">Confirm Password</label>
        <input
          className="border  rounded border-gray-400 outline-none focus:border-blue-800 px-2 py-1"
          type="password"
          name="password_confirmation"
          id="password_confirmation"
        />
        <button className="block bg-blue-800 text-white py-2 rounded mt-4 hover:bg-blue-900">
          Sign-up
        </button>
      </Form>
    </div>
  );
};
export default Signup;
