import { Button, FormControl, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addWatch } from '../../action/IssueActions';
import { useGlobalContext } from '../../contextAPI/context';
import { useForm } from '../../hooks/useForm';

export default function CreateOrder () {
  const navigate = useNavigate();
  const { customer } = useGlobalContext();
  const { formData, handleInputChange, emptyForm } = useForm(
    {
      title: '',
      description: '',
      image: ''
    }
  );
  const { formData: introFormData, handleInputChange: handleIntroChange, emptyForm: emptyIntroForm } = useForm(
    {
      title: '',
      description: ''
    }
  );
  const { title: orderTitle, description: orderDescription } = introFormData;
  const [oTitle, setoTitle] = useState('');
  const [oDescription, setoDescription] = useState('');
  interface ArrayData {
    title : string;
    description : string;
    image : string;
  }
  const { title, description, image } = formData;
  const [input, setinput] = useState<ArrayData[]>([]);
  const [counter, setcounter] = useState(0);
  const parts = ['Order info', 'case', 'hands', 'dial', 'crystal', 'crown'];
  const onClick = () => {
    if (counter === 0) {
      setcounter(counter + 1);
      setoTitle(orderTitle);
      setoDescription(orderDescription);
    } else {
      setinput([...input, formData]);
      setcounter(counter + 1);
    }
  };
  const addOrder = async () => {
    const watchId = await addWatch({ customer: customer._id, title: oTitle, description: oDescription, watch: { case: input[0], hands: input[1], dial: input[2], crystal: input[3], crown: input[4] } });
    setinput([]);
    emptyIntroForm();
    setcounter(0);
    navigate('/orders');
  };
  useEffect(() => {
    if (!customer) {
      navigate('/');
    }
  }, []);

  return (
      <>

    <FormControl>
          <p style={{ color: 'blue' }}>{parts[counter]}</p>
          {counter === 0 && <>
          <TextField
            style={{ marginTop: '6px' }}
            className='my-2'
            id={ 'title-input-field'}
            name={ 'title'}
            variant={ 'outlined'}
            label={ 'Title'}
            value={ orderTitle}
            onChange={handleIntroChange}
          />
          <TextField
            style={{ marginTop: '6px' }}
            className='my-2'
            id={ 'description-input-field'}
            name={ 'description'}
            variant={ 'outlined'}
            label={ 'Description'}
            value={orderDescription}
            onChange={handleIntroChange}
          /> </> }
          {counter !== 0 && counter !== 6 && <>
          <TextField
            style={{ marginTop: '6px' }}
            className='my-2'
            id={ 'title-input-field'}
            name={ 'title'}
            variant={ 'outlined'}
            label={ 'Title'}
            value={ title}
            onChange={handleInputChange}
          />
          <TextField
            style={{ marginTop: '6px' }}
            className='my-2'
            id={ 'description-input-field'}
            name={ 'description'}
            variant={ 'outlined'}
            label={ 'Description'}
            value={description}
            onChange={handleInputChange}
            />
          <TextField
            style={{ marginTop: '6px' }}
            className='my-2'
            id={ 'image-input-field'}
            name={ 'image'}
            variant={ 'outlined'}
            label={ 'Image'}
            value={image}
            onChange={handleInputChange}
            />
            </>}
        {counter !== 6
          ? <Button
            style={{ marginTop: '6px' }}
            variant={ 'contained'}
            color={'primary'}
            onClick={ () => { onClick(); }}
        >NEXT</Button>
          : <Button
            style={{ marginTop: '6px' }}
            variant={ 'contained'}
            color={'primary'}
            onClick={ () => { addOrder(); }}
        >FINISH</Button>}
      </FormControl>
      </>
  );
}
