import React, { useState } from "react";

const Filtern = ({ itemList }) => {
  
  const [filteredList, setFilteredList] = useState(null);

  const filterBySearch = (event) => {
    const query = event.target.value.toLowerCase();
    const updatedList = itemList.filter((item)=> {
      // Concatenate the first name and last name with a space in between
      const fullname = `${item.first_name} ${item.last_name}`.toLowerCase();
      return fullname.includes(query);
    });
    if (query === "") {
      setFilteredList(null);
    } else {  
      setFilteredList(updatedList);
    }
  };
  

  return (
    <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto text-md">
      <div className="m-4 sm:m-6 md:m-8 lg:m-10 bg-blue-200 rounded-lg p-2">
        <div className="flex flex-col sm:flex-row justify-center items-center text-xl sm:text-2xl text-center m-2">
          <div className="mb-2 sm:mb-0 sm:mr-4 font-bold">Search:</div>
          <input
            onChange={filterBySearch}
            className="w-full sm:w-auto px-2 py-1 rounded border border-gray-300"
          />
        </div>
      </div>

      <div>
        <ol>
          {filteredList?.map((item) => (
            <li
              className="m-2 sm:m-6 md:m-8 lg:m-10  list-disc list-inside
              flex-col text-green-500 font-bold p-1
              bg-slate-200 roundedp flex justify-center items-center"
              key={item.id}
            >
               <span className="text-black mr-1">My Name is</span> {item.first_name} {item.last_name}
            </li>
          ))}
        </ol>
        {filteredList?.length === 0 && (
          <p className="m-4 sm:m-6 md:m-8 lg:m-10 bg-red-500 text-xl font-bold p-3 text-center">
            No record found
          </p>
        )}
      </div>
    </div>
  );
};

export default Filtern;
