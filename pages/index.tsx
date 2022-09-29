import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'


interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

// NextPage -> type, line it;s imported from next 
const Home: NextPage = () => {

  const [catImageUrl, setCatImageUrl] = useState('');

  const fetchCatImage = async (): Promise<SearchCatImage> => {
    const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=1');
    const result = await res.json();
    //console.log(result[0]);
    return result[0];
  };

  const handleClick = async () => {
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
    }}>
      <h1>Cat images</h1>
      <img src={catImageUrl} width={500} height={'auto'} />
      <button onClick={handleClick}>Cat</button>
    </div>
  )
}

export default Home
