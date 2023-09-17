import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Filter from "./Components/Filter";
// import itemList from "./itemList";

const App = () => {
  const { data } = useLoaderData();

  return (
    <>
      <div className="m-4 sm:m-6 md:m-8 lg:m-10 xl:m-12 bg-blue-800 rounded-lg p-3 text-white">
        <div className="flex justify-between items-center">
          <div className="flex-1 text-left ml-5">
            <Link to="/search">Search</Link>
          </div>

          <h1 className="text-2xl font-bold text-center flex-1">Bookmarks</h1>

          <div className="flex-1 text-right mr-5">
            <Link to="/create">Create</Link>
          </div>
        </div>

        <ul className="m-4 sm:m-6 md:m-8 lg:m-10 flex flex-col space-y-2 mt-2 bg-white rounded text-blue-800 p-4 text-xl">
          {data &&
            data.map((bookmark) => {
              return (
                <li className="flex items-center" key={bookmark.recordId}>
                  <a
                    href={bookmark.url}
                    className="underline block p-1 hover:bg-yellow-200 hover:text-blue-900 rounded flex-1"
                  >
                    <div className="flex gap-3">
                      {bookmark.name} 
                      <span className="hidden md:flex">{bookmark.url}</span>
                    </div>
                  </a>
                  <Link to={`/edit/${bookmark.id}`} className="text-sm ml-2">
                    <span className="md:text-2xl">Edit</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="flex">
        <Filter itemList={data} />
      </div>
    </>
  );
};

export default App;
