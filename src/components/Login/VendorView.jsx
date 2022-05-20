import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CompleteVendorForm from "../Forms/CompleteVendorForm"
const VendorView = () => {

  const { id } = useParams();
  const [data, setData] = useState({});
  const token = localStorage.getItem('token');

  axios.get(`http://server-env.eba-23ey8bmy.us-west-1.elasticbeanstalk.com/admin/requests/vendors/${id}`,{
      headers: {
        "auth-token": token
      }
    }).then(res =>{
      setData(res.data);
    },rej => {
      console.log(rej);
    });

  return (
    <div>
      <CompleteVendorForm form={data}/>
    </div>
  )
}

export default VendorView