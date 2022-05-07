import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import OrderList from '../component/customer/OrderList';
import Navigation from '../component/common/Navigation';

const Orders:React.FC = () => {
  useEffect(() => {
    console.log('orderlist');
  });

  return (
      <div>
        <Navigation />
        <OrderList />
      </div>

  );
};

export default Orders;
