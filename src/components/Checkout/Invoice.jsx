import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import CarLoad from '../Animations/CarLoad';
import { toast } from "react-toastify";

const Invoice = () => {

  const { id } = useParams();
  const [request, setRequest] = useState();

  useEffect(() => {
    if(request) return;
    axios.get(`http://server-env.eba-23ey8bmy.us-west-1.elasticbeanstalk.com/invoice/${id}`)
    .then(res => {
        setRequest(res.data);
    }, rej => console.log(rej));
  }, [id,request]);

  const handleToken = (token,addresses) => {
    const price = request.invoice;
    axios.post(`http://server-env.eba-23ey8bmy.us-west-1.elasticbeanstalk.com/invoice/${id}`, {price, token})
    .then(res => {
        console.log(res);
        if(res.data === "success"){
            toast("Payment received", {
                position: toast.POSITION.TOP_LEFT,
                type: "success",
            })
        }
    }, rej => console.log(rej));
  }

  if(!request) return <CarLoad/>
  return (
    <div className = "form-page full">
        <div className='form-section'>
            <h1>Complete Registration</h1>
            <p>This is the final step to registration. After completing the payment for this 
                invoice, your registration will be complete. If your invoice is 0, feel free to 
                ignore this step.
            </p>
            <h2>Invoice Amount</h2>
            <input className = "lg" type="number" value = {request.invoice} required disabled/>
            <StripeCheckout
              stripeKey='pk_test_51Kt7tlBUdDJl779XcABkEEie7phKsa0C4wHQrzX1Dmpxj4o4lE0NG9ARl58rV3k7hizlX4TF12h5HqDgzxSvzsP300gzLJw1Z3'
              token={handleToken}
              billingAddress
              shippingAddress
              amount = {request.invoice*100}
            />
        </div>
    </div>
  )
}

export default Invoice