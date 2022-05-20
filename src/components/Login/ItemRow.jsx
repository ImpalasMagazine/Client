import { Link } from 'react-router-dom';

const ItemRow = ({item, handleDelete}) => {

  return (
    <div className='request row'>
          <h2>{item.title}</h2>
          <h2>{item.price}</h2>
          <h2>{item._id}</h2>
          <div className='status-container'>
            <button onClick={() => handleDelete(item)} className="view">Delete</button>
            <Link to = {`/admin/items/edit/${item._id}`} className="view">Edit</Link>
          </div>
      </div>
  )
}

export default ItemRow