import React, { useState, useEffect } from 'react';
import { fetchOrder } from '../../action/IssueActions';
import { Table, TableBody, TableCell, TableHead, TableRow, Grid } from '@material-ui/core';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAll } from '../../store/issuesReducer';

interface SingleOrderProps {
  id: string
}
const SingleOrder:React.FC<SingleOrderProps> = (props:SingleOrderProps) => {
  const { id } = props;
  const appDispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  // const [issues, setIssues] = useState<issue[]>([]);
  const issues = useAppSelector((state) => state.issuesReducer.issues);
  const [order, setorder] = useState<any>({});
  useEffect(() => {
    // fetchOrder('62735c31ef840725e831fb0a').then(issues => appDispatch(fetchAll(issues)));
    fetchOrder(id).then((order) => setorder(order));
  }, []);
  return (
    <div>
      {order && <Grid style={{ borderBottomColor: 'black', borderBottomWidth: '2px', borderBottomStyle: 'double' }} container spacing={3}>
            <Grid xs={6} justifyContent='flex-start' item>
              <h3 style={{ textAlign: 'start' }}>Order title</h3>
              <h3 style={{ textAlign: 'start' }}>Order description</h3>
            </Grid>
            <Grid xs={6} item>
              <h3 style={{ textAlign: 'start' }}>{order.title}</h3>
              <h3 style={{ textAlign: 'start' }}>{order.description}</h3>
            </Grid>
      </Grid>}
      <h2>Case</h2>
      {order && <Grid style={{ borderBottomColor: 'black', borderBottomWidth: '2px', borderBottomStyle: 'double' }}container spacing={3}>
            <Grid xs={6} justifyContent='flex-start' item>
              <h4 style={{ textAlign: 'start' }}>title</h4>
              <h4 style={{ textAlign: 'start' }}>description</h4>
            </Grid>
            <Grid xs={6} item>
              <h4 style={{ textAlign: 'start' }}>{order.watch?.case?.title}</h4>
              <h4 style={{ textAlign: 'start' }}>{order.watch?.case?.description}</h4>
            </Grid>
      </Grid>}
      <h2>Hands</h2>
      {order && <Grid style={{ borderBottomColor: 'black', borderBottomWidth: '2px', borderBottomStyle: 'double' }}container spacing={3}>
            <Grid xs={6} justifyContent='flex-start' item>
              <h4 style={{ textAlign: 'start' }}>title</h4>
              <h4 style={{ textAlign: 'start' }}>description</h4>
            </Grid>
            <Grid xs={6} item>
              <h4 style={{ textAlign: 'start' }}>{order.watch?.hands?.title}</h4>
              <h4 style={{ textAlign: 'start' }}>{order.watch?.hands?.description}</h4>
            </Grid>
      </Grid>}
      <h2>Dial</h2>
      {order && <Grid style={{ borderBottomColor: 'black', borderBottomWidth: '2px', borderBottomStyle: 'double' }}container spacing={3}>
            <Grid xs={6} justifyContent='flex-start' item>
              <h4 style={{ textAlign: 'start' }}>title</h4>
              <h4 style={{ textAlign: 'start' }}>description</h4>
            </Grid>
            <Grid xs={6} item>
              <h4 style={{ textAlign: 'start' }}>{order.watch?.dial?.title}</h4>
              <h4 style={{ textAlign: 'start' }}>{order.watch?.dial?.description}</h4>
            </Grid>
      </Grid>}
      <h2>Crystal</h2>
      {order && <Grid style={{ borderBottomColor: 'black', borderBottomWidth: '2px', borderBottomStyle: 'double' }}container spacing={3}>
            <Grid xs={6} justifyContent='flex-start' item>
              <h4 style={{ textAlign: 'start' }}>title</h4>
              <h4 style={{ textAlign: 'start' }}>description</h4>
            </Grid>
            <Grid xs={6} item>
              <h4 style={{ textAlign: 'start' }}>{order.watch?.crystal?.title}</h4>
              <h4 style={{ textAlign: 'start' }}>{order.watch?.crystal?.description}</h4>
            </Grid>
      </Grid>}
      <h2>Crown</h2>
      {order && <Grid style={{ borderBottomColor: 'black', borderBottomWidth: '2px', borderBottomStyle: 'double' }}container spacing={3}>
            <Grid xs={6} justifyContent='flex-start' item>
              <h4 style={{ textAlign: 'start' }}>title</h4>
              <h4 style={{ textAlign: 'start' }}>description</h4>
            </Grid>
            <Grid xs={6} item>
              <h3 style={{ textAlign: 'start' }}>{order.watch?.crown?.title}</h3>
              <h3 style={{ textAlign: 'start' }}>{order.watch?.crown?.description}</h3>
            </Grid>
      </Grid>}
      {order?.partsCompleted?.[0] && <Grid style={{ borderBottomColor: 'black', borderBottomWidth: '2px', borderBottomStyle: 'double' }}container spacing={3}>
            <Grid xs={6} justifyContent='flex-start' item>
              <h4 style={{ textAlign: 'start' }}>Parts completed</h4>
            </Grid>
            <Grid xs={6} item>
              {order.partsCompleted?.map((p:any) => {
                return (<h4 key={p}>{p}</h4>);
              })}
            </Grid>
      </Grid>}
      {order && <Grid style={{ borderBottomColor: 'black', borderBottomWidth: '2px', borderBottomStyle: 'double' }}container spacing={3}>
            <Grid xs={6} justifyContent='flex-start' item>
              <h4 style={{ textAlign: 'start' }}>State</h4>
            </Grid>
            <Grid xs={6} item>
              <h4>{order.state}</h4>
            </Grid>
      </Grid>}
      {order?.artificers && <Grid style={{ borderBottomColor: 'black', borderBottomWidth: '2px', borderBottomStyle: 'double' }}container spacing={3}>
            <Grid xs={3} justifyContent='flex-start' item>
              <h4 style={{ textAlign: 'start' }}>Parts Artificers Info</h4>
            </Grid>
            <Grid xs={9} item>
              {
                order?.artificers.map((a:any) => {
                  return (
                    <Grid key={a._id} style={{ borderBottomColor: 'black', borderBottomWidth: '2px', borderBottomStyle: 'double' }}container spacing={3}>
                                        <Grid xs={6} justifyContent='flex-start' item>
                                          <h4 style={{ textAlign: 'start' }}>part</h4>
                                          <h4 style={{ textAlign: 'start' }}>Artificer</h4>
                                          <h4 style={{ textAlign: 'start' }}>Notes</h4>
                                        </Grid>
                                        <Grid xs={6} item>
                                          <h5>{a.part}</h5>
                                          <h5>{a.artificer.name}</h5>
                                          {
                                            a.notes?.map((n:any) => {
                                              return (<Grid key={n._id} style={{ borderBottomColor: 'black', borderBottomWidth: '2px', borderBottomStyle: 'double' }}container spacing={3}>
                                                            <Grid xs={6} justifyContent='flex-start' item>
                                                              <h4 style={{ textAlign: 'start' }}>message</h4>
                                                              <h4 style={{ textAlign: 'start' }}>description</h4>
                                                              <h4 style={{ textAlign: 'start' }}>image</h4>
                                                            </Grid>
                                                            <Grid xs={6} item>
                                                              <div key={n._id}>
                                                                <p>{n.message}</p>
                                                                <p>{n.description}</p>
                                                                <img src={n.image} alt={n.image}></img>
                                                              </div>
                                                            </Grid>
                                                      </Grid>
                                              );
                                            })
                                          }
                                        </Grid>
                                  </Grid>
                  );
                })
              }
            </Grid>
      </Grid>}
    </div>
  );
};
export default SingleOrder;
