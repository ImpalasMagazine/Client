import { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import axios from 'axios';
import CarLoad from '../Animations/CarLoad';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom'

const EditItem = () => {

  const { id } = useParams();
  const [form, setForm] = useState({});
  const [loaded, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://server-env.eba-23ey8bmy.us-west-1.elasticbeanstalk.com/admin/items/${id}`, {
        headers: {
            'auth-token': localStorage.getItem("token")
        }
    })
    .then(res => {
        setForm(res.data[0]);
        setLoading(false);
    }, err => {
        setLoading(false);
        console.log(err);
    })
  },[id]);

  const handleSubmit = (e) => {
    setLoading(true);

    axios.post(`http://server-env.eba-23ey8bmy.us-west-1.elasticbeanstalk.com/admin/items/edit/${id}`, form, {
        headers: {
            'auth-token':localStorage.getItem("token")
        }
    })
    .then(res => {
      setLoading(false);
      toast("Success. Item has been updated.", {
        draggable: true,
        position: toast.POSITION.TOP_LEFT
      });
    }, err => {
      toast("Error. Item could not be updated.", {
        draggable: true,
        position: toast.POSITION.TOP_LEFT
      });
      setLoading(false);
    });
}

  const handleChange = (e) => {
    e.preventDefault();
    if(e.target.name === 'img')
      setForm({...form, [e.target.name]:e.target.files[0]});
    else
      setForm({...form,[e.target.name]:e.target.value});
  }
  if(loaded) return <CarLoad/>
  return (
    <form onSubmit = {handleSubmit} className='form-page'>
        <Navbar/>
        <ToastContainer/>
        <div className='form-section'>
          <h1>Add Items To Shop</h1>
          <h2>Item Details</h2>
          <div className='input-row'>
            <input value = {form.title} onChange = {handleChange} type="text" name="title" placeholder="Name" required/>
            <input value = {form.price} onChange = {handleChange} type = "number" name="price" placeholder="Price" required/>
          </div>
          <div className='input-row center'>
            <input onChange = {handleChange} accept="image/png, image/jpeg" name="img" type="file"/>
            <input value = {form.stock} className = "sm" onChange = {handleChange} name="stock" type = "number" placeholder='In Stock'/>
            <button className='add'>Add</button>
          </div>
        </div>
    </form>
  )
}

export default EditItem