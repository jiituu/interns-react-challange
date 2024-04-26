import React from 'react';
import './homePage.css';
import ActorCard from './ActorCard';
import { useEffect, useState } from 'react';

function HomePage() {
  return (
    <div className='home-container'>
      <div className='home-header '>
      <div className='banner-container'>
        <img src='https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg' alt='Banner' className='banner-image' />
      </div>
        <h1>LIST OF ACTORS</h1>
      </div>

      <ActorCard/>

    </div>
  );
}

export default HomePage;
