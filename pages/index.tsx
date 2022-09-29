import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

// SSG Static site generator 静的生成、ビルドした時に既にデータを用意。読み込み早い。非同期通信にはしようできない。
// SSR server side props リクエストごとに生成。今回はこちらを使用。

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

// To use for SSR, should be outside of return
const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=1');
  const result = await res.json();
  //console.log(result[0]);
  return result[0];
};

// NextPage -> type, line it;s imported from next 
const Home: NextPage<IndexPageProps> = ({initialCatImageUrl}) => {

  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);

  const handleClick = async () => {
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
  };

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
};

// For SSR, server side rendering
// The cat image url will be returned. Inside of the generics
export const getServerSideProps: GetServerSideProps<IndexPageProps> =async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};

export default Home
