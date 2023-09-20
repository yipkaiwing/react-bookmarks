import React from "react";
import { Form, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

const Edit = () => {
  // const loaderData = useLoaderData();
  const { id, data } = useLoaderData();

  // State Management as we want to updae the new value of the input field
  const [name, setName] = useState(data.name);
  const [url, setUrl] = useState(data.url);
  const [confirmDelete, setConfirmDelete] = useState(false); // false means it will never execute the code inside the block

  useEffect(() => {
    setName(data.name);
    setUrl(data.url);
    // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    setConfirmDelete(true);
  };

  // console.log('loaderData',  loaderData);
  // console.log('id',id, 'data.name', data.name);

  return (
    <div className="m-12 bg-blue-800 max-w-3xl rounded-lg mx-auto p-2 text-white">
      <h1 className="text-2xl font-bold text-center">Edit Bookmark</h1>

      <div className="flex flex-col space-y-2 mt-2 bg-white rounded text-blue-800 p-4 text-xl">
        <Form action={`/edit/${id}`} method="post" className="flex flex-col">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="border rounded border-gray-400 outline-none focus:border-blue-800 px-2 py-1 mb-4"
            name="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <label htmlFor="url">URL:</label>
          <input
            type="text"
            className="border rounded border-gray-400 outline-none focus:border-blue-800 px-2 py-1"
            name="url"
            id="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />

          <button
            type="submit"
            className="block bg-blue-800 text-white py-2 rounded mt-4 hover:bg-blue-900"
          >
            Update
          </button>
        </Form>
      </div>

      <Form action={`/delete/${id}`} method="post">
        <button className="inline-block mt-2" onClick={handleDelete}>
          Delete?
        </button>

        {/* false && means it will never execute the code inside the block */}

        {confirmDelete && (
          <button type="submit" className="inline-block mt-2 ml-2">
            Confirm Delete
          </button>
        )}
      </Form>
    </div>
  );
};

export default Edit;
