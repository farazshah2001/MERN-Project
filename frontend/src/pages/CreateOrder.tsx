import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Navigation from '../component/common/Navigation';
import { useForm } from '../hooks/useForm';
import CreateOrderC from '../component/customer/CreateOrder';
import { useGlobalContext } from '../contextAPI/context';
const CreateOrder:React.FC = () => {
  const { customer } = useGlobalContext();
  useEffect(() => {
    console.log('custmoer : ', customer);
  });
  return (
      <div>
           <Navigation />
          <CreateOrderC />
      </div>

  );
};

export default CreateOrder;
