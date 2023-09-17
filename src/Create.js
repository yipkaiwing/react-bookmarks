import React from "react";
import { Form } from "react-router-dom";


const Create = () => {
  return (
    <div className="m-12 bg-blue-800 max-w-3xl rounded-lg mx-auto p-2 text-white">
      <h1 className="text-2xl font-bold text-center">Create Bookmark</h1>

      <div className="flex flex-col space-y-2 mt-2 bg-white rounded text-blue-800 p-4 text-xl">
        <Form
          action="/create"
          method="post"
          className="flex flex-col"
        >
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="border rounded border-gray-400 outline-none focus:border-blue-800 px-2 py-1 mb-4"
            name="name"
            id="name"
          />

          <label htmlFor="url">URL:</label>
          <input
            type="text"
            className="border rounded border-gray-400 outline-none focus:border-blue-800 px-2 py-1"
            name="url"
            id="url"
          />

          <button
            type="submit"
            className="block bg-blue-800 text-white py-2 rounded mt-4 hover:bg-blue-900"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Create;
