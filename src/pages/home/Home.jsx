import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'

const Home = () => {
  return (
    <>
      <span className="landing-page">Need a loan? Sign up for one now!</span>
      <div className="signup-btn">
        <Link to='/signup' className="link">
          <button>GET YOUR LOAN NOW!</button>
        </Link>
      </div>
    </>
  )
}

export default Home