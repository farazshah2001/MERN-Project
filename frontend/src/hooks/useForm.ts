import { useState } from 'react';

export const useForm = (initialState:any) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e:any) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const emptyForm = () => {
    setFormData(initialState);
  };
  const setFormElement = (element:any, value:any) => {
    setFormData({ ...formData, [element]: value });
  };
  return { formData, handleInputChange, emptyForm, setFormElement };
};
