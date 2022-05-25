import { useState, useEffect } from 'react';
import { Navbar } from '../exports';
import left from "../../assets/leftbutton.png";
import right from "../../assets/rightbutton.png";
import instagram from '../../assets/instagram.png';
import fb from '../../assets/facebook.png';
import axios from 'axios';
import CarLoad from '../Animations/CarLoad';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shop = ({cart, setCart, items, setItems,clothing,setClothing}) => {

  const [frame, setFrame] = useState(0);
  const [cFrame,setCFrame] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [qty, setQty] = useState(1);
  const [cQty,setCQty] = useState(1);
  const values = [1,2,3,4,5,6,7,8,9,10];

  const [images, setImages] = useState({});
  const [clothingImages, setClothingImages] = useState({});
  const newQty = (e) => {
    e.preventDefault();
    setQty(e.target.value);
  }
  const newQtyClothing = (e) => {
    e.preventDefault();
    setCQty(e.target.value);
  }
  useEffect(() => {
    axios.get("https://temp-impalas-server.herokuapp.com/items")
    .then(res => {
      setItems(res.data.filter(item => !item.clothing));
      setClothing(res.data.filter(item => item.clothing));
    },err => console.log(err));
  },[items,images, setItems])

  useEffect(() => {
    if(images.length === items.length) return;
    items.forEach(item => {
      if(!item.clothing){
      axios.get(`https://temp-impalas-server.herokuapp.com/images/${item.img}`)
        .then(res => {
          if(!images.hasOwnProperty(item._id)) setImages({...images,[item._id]:res.data})
          setLoaded(true);
        }, rej => {console.log(rej)});
      }
    })
  },[items,images, setItems])

  useEffect(() => {
    if(clothingImages.length === clothing.length) return;
    clothing.forEach(item => {
      if(item.clothing){
      axios.get(`https://temp-impalas-server.herokuapp.com/images/${item.img}`)
        .then(res => {
          if(!clothingImages.hasOwnProperty(item._id)) setClothingImages({...clothingImages,[item._id]:res.data})
          setLoaded(true);
        }, rej => {console.log(rej)});
      }
    })
  },[clothing,clothingImages,setClothing])

  const frameUp = () => {
    frame === items.length - 1 ? setFrame(0) : setFrame(frame+1);
  }
  const frameDown = () => {
    frame === 0 ? setFrame(items.length - 1) : setFrame(frame-1);
  }

  const cFrameUp = () => {
    cFrame === clothing.length - 1 ? setCFrame(0) : setCFrame(cFrame+1);
  }
  const cFrameDown = () => {
    cFrame === 0 ? setCFrame(clothing.length - 1) : setCFrame(cFrame-1);
  }

  const addToCart = (e) => {
    e.preventDefault();
    if(items[frame].stock < qty){
      toast("There are not enough items in stock right now. Please try again later.",
      {
        position: toast.POSITION.TOP_LEFT,
        draggable: false
      });
      return;
    }
    if(cart.hasOwnProperty(items[frame]._id)){
      setCart({...cart,[items[frame]._id]:cart[items[frame]._id]+parseInt(qty,10)});
    }
    else {
      setCart({...cart,[items[frame]._id]:parseInt(qty,10)});
    }
    toast("Item has been added to cart", {
      position: toast.POSITION.TOP_LEFT,
      draggable: false
    });
    localStorage.setItem('cart',cart);
  };

  const addToCartClothes = (e) => {
    e.preventDefault();
    if(clothing[cFrame].stock < cQty){
      toast("There are not enough items in stock right now. Please try again later.",
      {
        position: toast.POSITION.TOP_LEFT,
        draggable: false
      });
      return;
    }
    if(cart.hasOwnProperty(clothing[cFrame]._id)){
      setCart({...cart,[clothing[cFrame]._id]:cart[clothing[cFrame]._id]+parseInt(cQty,10)});
    }
    else {
      setCart({...cart,[clothing[cFrame]._id]:parseInt(cQty,10)});
    }
    toast("Item has been added to cart", {
      position: toast.POSITION.TOP_LEFT,
      draggable: false
    });
    localStorage.setItem('cart',cart);
  };

  if(!loaded || items.length === 0) return <CarLoad/>
  return (
    <div className='shop'>
      <Navbar/>
      <ToastContainer/>
      <div className='main'>
        <div className='col-1'>
          <div className='carousel'>
            <img src={`data:image/png;base64,${images[items[frame]._id]}`} alt=""/>
            <div className='controls'>
              <div>
                <img src={instagram} alt=""/>
                <img src={fb} alt=""/>
              </div>
              <div>
                <img src={left} onClick = {frameDown} alt=""/>
                <img src={right} onClick = {frameUp} alt=""/>
              </div>
            </div>
          </div>
        </div>
        <div className='col-2'>
          <h3>Magazines</h3>
          <h1>${items[frame].price}.00</h1>
          <h2>{items[frame].title}</h2>
          <div className='options'>
            <div className='select-container'>
              <select onChange = {newQty} name = 'qty' className='qty'>
                {values.map(value => <option value={value}>{value}</option>)}
              </select>
            </div>
            <button onClick = {addToCart} className='add'>Add to Cart</button>
          </div>
          <h3>In Stock: {items[frame].stock}</h3>
        </div>
        <div className='col-1'>
          <div className='carousel'>
            <img src={`data:image/png;base64,${clothingImages[clothing[cFrame]._id]}`} alt=""/>
            <div className='controls'>
              <div>
                <img src={instagram} alt=""/>
                <img src={fb} alt=""/>
              </div>
              <div>
                <img src={left} onClick = {cFrameDown} alt=""/>
                <img src={right} onClick = {cFrameUp} alt=""/>
              </div>
            </div>
          </div>
        </div>
        <div className='col-2'>
          <h3>Clothes</h3>
          <h1>${clothing[cFrame].price}.00</h1>
          <h2>{clothing[cFrame].title}</h2>
          <div className='options'>
            <div className='select-container'>
              <select onChange = {newQtyClothing} name = 'qty' className='qty'>
                {values.map(value => <option value={value}>{value}</option>)}
              </select>
            </div>
            <button onClick = {addToCartClothes} className='add'>Add to Cart</button>
          </div>
          <h3>In Stock: {clothing[cFrame].stock}</h3>
        </div>
      </div>
    </div>
  )
}

export default Shop