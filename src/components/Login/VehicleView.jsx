import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CompleteVehicleForm from '../Forms/CompleteVehicleForm';

const VehicleView = () => {

  const { id } = useParams();
  const [data, setData] = useState({});
  const token = localStorage.getItem('token');

  axios.get(`http://server-env.eba-23ey8bmy.us-west-1.elasticbeanstalk.com/admin/requests/vehicles/${id}`,{
      headers: {
        "auth-token": token
      }
    }).then(res =>{
      setData(res.data);
    },rej => {
      console.log(rej);
    });
  return (
    <CompleteVehicleForm data={data}/>
  )
}

export default VehicleView