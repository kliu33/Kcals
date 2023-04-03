import './Splash.css'
import logo from '../../imgs/logo.jpg'
import tesla from '../../imgs/tesla.png'
import amazon from '../../imgs/amazon.png'
import cfa from '../../imgs/cfa.png'
import bloomberg from '../../imgs/bloomberg.png'
import etsy from '../../imgs/etsy.png'
import apple from '../../imgs/apple.png'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import SplashVideo from '../SplashVideo/SplashVideo';
import Vid1 from '../Videos/Vid1'
import Vid2 from '../Videos/Vid2'
import Vid3 from '../Videos/Vid3'

function Splash() {
    return (
    <>
      <div id='top-splash'>
        <div id="nav">
            <img src={logo} alt="" id="logo" />
            <a href="https://github.com/kliu33/Kcals" target="_blank" class="nav-link">GitHub</a>
            <a href="https://www.linkedin.com/in/kevin-liu-3a5b96158/" target="_blank" class="nav-link">LinkedIn</a>
            <a href="https://www.linkedin.com/in/kevin-liu-3a5b96158/" target="_blank" class="nav-link">AngelList</a>
            <NavLink to="login" id="navlink"> Sign In</NavLink> 
            <NavLink to="signup" id="navlink"> Create an account</NavLink> 
        </div>
        <div className='under-nav'>
          <div className='top-text'>
            <h1 className='head-text'> Unlock your <span className='text-yellow'>productivity potential </span></h1>
            <p>
              Connect the right people, find anything you need and automate the rest. That's work in Kcals, your productivity platform.
            </p>
            <p> Kcals is free to try for as long as you'd like</p>
          </div>
          <div className="video-background">
              <SplashVideo />
          </div>
        </div>
      </div>
      <div id='cascade'>
        <h2 className='trust'> TRUSTED BY COMPANIES ALL OVER THE WORLD</h2>
        <div className='companies'>
          <img id="logo" src={tesla}/>
          <img id="logo" src={amazon}/>
          <img id="logo" src={cfa}/>
          <img id="logo" src={bloomberg}/>
          <img id="logo" src={apple}/>
          <img id="logo" src={etsy}/>
        </div>
        <div className='info-container'>
          <div className='info-div'>
            <div className="info-vid">
                <Vid1 />
            </div>
          </div>
          <div className='info-div'>
            <div className="info-vid">
                <Vid3 />
            </div>
          </div>
          <div className='info-div'>
            <div className="info-vid">
                <Vid2 />
            </div>
          </div>
        </div>
      </div>
    </>
    );
  }
  
  export default Splash;

  