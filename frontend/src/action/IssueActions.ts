import axios from 'axios';
import { issue } from '../types/Issue';

export const addWatch = async (req :any) => {
  console.log(req);
  const resp = await axios.post('http://localhost:3001/watch/addOrder', req);
  if (resp.status === 200) {
    console.log('Success');
  } else {
    console.log('Problem');
  }
  return resp.data;
};
export const addOrder = async ({ order }:any) => {
  const resp = await axios.post('http://localhost:3001/orders/add', order);
  if (resp.status === 200) {
    console.log('Success');
  } else {
    console.log('Problem');
  }
  return resp.data;
};
export const loginCustomer = async (customer :any) => {
  console.log(customer);
  const resp = await axios.post('http://localhost:3001/customers/login', customer);
  if (resp.status === 200) {
    console.log('Success');
  } else {
    console.log('Problem');
  }
  console.log('res data', resp.data);
  return resp.data;
};
export const loginManager = async (manager :any) => {
  console.log(manager);
  const resp = await axios.post('http://localhost:3001/managers/login', manager);
  if (resp.status === 200) {
    console.log('Success');
  } else {
    console.log('Problem');
  }
  console.log('res data', resp.data);
  return resp.data;
};
export const signupCustomer = async (customer :any) => {
  const resp = await axios.post('http://localhost:3001/customers/add', customer);
  if (resp.status === 200) {
    console.log('Success');
  } else {
    console.log('Problem');
  }
  return resp.data;
};

export const fetchOrders = async (customerId:string) => {
  const resp = await axios.get(`http://localhost:3001/orders/customer/${customerId}`);
  if (resp.status === 200) {
    console.log({ data: resp.data });
  } else {
    console.error({ error: resp.data });
  }
  return resp.data;
};
export const fetchAllOrders = async () => {
  const resp = await axios.get('http://localhost:3001/orders/');
  if (resp.status === 200) {
    console.log({ data: resp.data });
  } else {
    console.error({ error: resp.data });
  }
  console.log('resp.data: ', resp.data);
  return resp.data;
};
export const fetchOrder = async (Id:string) => {
  const resp = await axios.get(`http://localhost:3001/orders/${Id}`);
  if (resp.status === 200) {
    console.log({ data: resp.data });
  } else {
    console.error({ error: resp.data });
  }
  return resp.data;
};
