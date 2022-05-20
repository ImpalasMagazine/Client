import {useState} from 'react';
import { Navbar } from '../exports';
import { Link } from 'react-router-dom';
import Event from '../../assets/Event.png';
import Event2 from "../../assets/Event2.png";
import left from "../../assets/leftbutton.png";
import right from "../../assets/rightbutton.png";
import instagram from '../../assets/instagram.png';
import fb from '../../assets/facebook.png';
import img1 from '../../assets/gallery/23477E86-.jpg';
import img2 from '../../assets/gallery/c2dcaab1-a149-4da2-b760-aa959c5d48a4.jpg';
import img3 from '../../assets/gallery/FB_IMG_1599928298475.jpg';
import img4 from '../../assets/gallery/FB_IMG_1652634689902.jpg';
import img5 from '../../assets/gallery/IMG_3658.jpg';
import img6 from '../../assets/gallery/IMG_3765.JPG';
import img7 from '../../assets/gallery/IMG_3768.jpg';
import img8 from '../../assets/gallery/IMG_3793 2.jpg';
import img9 from '../../assets/gallery/IMG_20200828_104035_371.jpg';
import img11 from '../../assets/gallery/IMG_20220425_151902_589.jpg';
import img12 from '../../assets/gallery/IMG_20220425_184109_234.jpg';

const Home = () => {

  const [frame, setFrame] = useState(0);
  const images = [Event,Event2];
  const galleryImages = [img9, img2, img3, img11, img5, img6, img7, img8, img1, img4, img12];

  const frameUp = () => {
    frame === images.length - 1 ? setFrame(0) : setFrame(frame+1);
  }
  const frameDown = () => {
    frame === 0 ? setFrame(images.length - 1) : setFrame(frame-1);
  }

  return (
    <div className='home'>
      <Navbar/>
      <div className = "main">
        <a className = "gallery-link" href = "#gallery"><p>Visit Our Gallery</p></a>
        <div className = "img-container">
            <img src={images[frame]} alt=""/>
            <div className = "carousel-controls">
              <div className = "carousel-obj">
                <a href="https://www.instagram.com/impalasmagazine/?hl=en"><img src = {instagram} alt = ""/></a>
                <a href="https://www.facebook.com/ImpalasMag"><img src = {fb} alt = ""/></a>
              </div>
              <div className = "carousel-obj"> 
                <img onClick = {frameDown} src={left} alt=""/> 
                <img onClick = {frameUp} src={right} alt=""/> 
              </div>
            </div>
        </div>
        <div className = "details">
            <h3>Upcoming Events</h3>
            <h1>The Best of the West Lowrider Tour</h1>
            <h3>Join us on July 17th at Cow Palace Arena.</h3>
            <h3>2600 Geneva Avenue, Daly City</h3>
            <h3>CA, 94014</h3>
            <div className = "buttons">
              <Link className = "link" to="/register-vehicle">Vehicles</Link>
              <Link className = "link" to="/register-vendor">Vendors</Link>
              {/*<Link className = "link" to="/register-model">Models</Link>*/}
            </div>
        </div>
      </div>
      <div id="about">
        <h1>About Us</h1>
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap 
        into electronic typesetting, remaining essentially unchanged. It was 
        popularised in the 1960s with the release of Letraset sheets containing Lorem 
        Ipsum passages, and more recently with desktop publishing software like Aldus 
        PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text 
        of the printing and typesetting industry. Lorem Ipsum has been the industry's 
        standard dummy text ever since the 1500s,when an unknown printer took a galley
        of type and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining essentially 
        unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem 
        Ipsum passages, and more recently with desktop publishing software like Aldus 
        PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
      <h1>Gallery</h1>
      <div id="gallery">
          {galleryImages.map(i => 
            <img src = {i} alt=""/>  
          )}
      </div>
    </div>
  )
}

export default Home