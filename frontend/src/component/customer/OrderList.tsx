import React, { useEffect, useState } from 'react';
import { fetchAllOrders, fetchOrders } from '../../action/IssueActions';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAll } from '../../store/issuesReducer';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../contextAPI/context';

const OrderList:React.FC = () => {
  const { customer, manager } = useGlobalContext();
  const navigate = useNavigate();
  const appDispatch = useDispatch<AppDispatch>();
  const [orders, setorders] = useState([]);

  useEffect(() => {
    if (!customer && !manager) {
      navigate('/');
    }

    const fetch = async () => {
      if (customer) {
        setorders(await fetchOrders(customer._id));
      } else if (manager) {
        setorders(await fetchAllOrders());
      }
    };
    fetch();
    // fetchorders().then((orders) => setorders(orders));
  }, []);

  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>state</TableCell>
            {/* <TableCell>watch</TableCell> */}
            <TableCell>customer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            orders?.map((order:{_id:string, title:string, description:string, state:string, watch:{title:string}, customer:{name:string}}, index) => {
              return (
                  <TableRow key={index}>
                    <TableCell><Link to={`/order/${order._id}`}>{order._id}</Link></TableCell>
                    <TableCell>{order.title}</TableCell>
                    <TableCell>{order.description}</TableCell>
                    <TableCell>{order.state}</TableCell>
                    {/* <TableCell>{order.watch?.title}</TableCell> */}
                    <TableCell>{order.customer?.name}</TableCell>
                  </TableRow>
              );
            })
          }

        </TableBody>
      </Table>
  );
};

export default OrderList;
