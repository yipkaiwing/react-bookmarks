import { useLoaderData, Outlet } from "react-router-dom";

import React from 'react'

const Protected = () => {

  const { user } = useLoaderData();
  return user ? <Outlet /> : <div>Access Denied</div>


}

export default Protected;