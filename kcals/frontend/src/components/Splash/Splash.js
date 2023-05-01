import './Splash.css'
import logo from '../../imgs/logo.png'
import tesla from '../../imgs/tesla.png'
import amazon from '../../imgs/amazon.png'
import cfa from '../../imgs/cfa.png'
import bloomberg from '../../imgs/bloomberg.png'
import etsy from '../../imgs/etsy.png'
import apple from '../../imgs/apple.png'
import { NavLink, Redirect } from 'react-router-dom/cjs/react-router-dom';
import SplashVideo from '../SplashVideo/SplashVideo';
import Vid1 from '../Videos/Vid1'
import Vid2 from '../Videos/Vid2'
import Vid3 from '../Videos/Vid3'
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

function Splash() {

  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  if (sessionUser) return <Redirect to="/channels/1" />;

  const handleDemo = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({email: "demo@user.io", password: "password"}))
  }

    return (
    <>
      <div id="nav">
        <div id="left-links">
          <img src={logo} alt="" id="logo" />
          <a href="https://github.com/kliu33/Kcals" target="_blank" className="nav-link">GitHub</a>
          <a href="https://www.linkedin.com/in/kevin-liu-3a5b96158/" target="_blank" className="nav-link">LinkedIn</a>
          <a href="https://wellfound.com/u/kevin-liu-149" target="_blank" className="nav-link">AngelList</a>
        </div>
        <div id="right-links">
          <NavLink to="login" className="nav-link"> Sign In</NavLink> 
          <NavLink to="signup" className="nav-link"> Create an account</NavLink> 
          <button onClick={handleDemo} className='demo-button'> Try a demo </button>
        </div>
      </div>
      <div id='top-splash'>
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
          <div className='info-div wrap'>
            <div className="info-vid">
                <Vid1 />
            </div>
            <div className='text-block'>
              <h1 className='info-title'> Real-time communication and collaboration </h1>
              <p>  Kcals provides users with a powerful platform for real-time communication and collaboration, enabling teams to work together more efficiently and effectively. With channels and direct messaging, users can stay connected and up-to-date on their projects and tasks, no matter where they are located.</p>
            </div>
          </div>
          <div className='info-div wrap'>
          <div className='text-block'>
              <h1 className='info-title'> Centralized organization and file sharing </h1>
              <p>  By centralizing communication and file sharing in a single platform, Kcals makes it easier for teams to stay organized and productive. Users can easily find and access the files and messages they need, and can collaborate on documents and projects in real-time, reducing the need for email and other communication tools.</p>
            </div>
            <div className="info-vid">
                <Vid3 />
            </div>
          </div>
          <div className='info-div wrap'>
            <div className="info-vid">
                <Vid2 />
            </div>
            <div className='text-block'> 
              <h1 className='info-title'> Customizable and scalable </h1>
              <p> Kcals can be customized and adapted to meet the specific needs of any organization, with integrations and add-ons for a wide range of tools and services. Additionally, it can be scaled to accommodate teams of any size, making it a versatile and powerful communication and collaboration platform for organizations of all types and sizes.</p>
            </div>
          </div>
        </div>
      </div>
        <div className='howto-container'>
          <h1 className='try'> Try out Kcals today</h1>
          <div className='instructions'>
            <div className='instruction-div'>
              <span className='num'> 1 </span>
              <h2 className='instruction-head'>
                Sign Up
              </h2>
              <p>
                <NavLink to="signup" id="navlink"> Create an account</NavLink>  Signing up for Kcals is free and easy.
              </p>
            </div>
            <div className='instruction-div'>
              <span className='num'> 2 </span>
              <h2 className='instruction-head'>
                Invite your coworkers
              </h2>
              <p>
                Invite your coworkers to create their own Kcals account.
              </p>
            </div>
            <div className='instruction-div'>
              <span className='num'> 3 </span>
              <h2 className='instruction-head'>
                Start a channel
              </h2>
              <p>
                Create a channel for your team and start chatting!
              </p>
            </div>
          </div>
        </div>
    </>
    );
  }
  
  export default Splash;

  