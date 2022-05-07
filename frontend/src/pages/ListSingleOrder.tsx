import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import SingleOrder from '../component/customer/SingleOrder';
import Navigation from '../component/common/Navigation';
import { useLocation } from 'react-router-dom';
const ListSingleOrder:React.FC = () => {
  const location = useLocation();
  // useEffect(() => {
  //   console.log();
  // });
  return (
      <div>
        <Navigation />
        <SingleOrder id={location.pathname.split('/')[2]}/>
      </div>

  );
};

export default ListSingleOrder;
