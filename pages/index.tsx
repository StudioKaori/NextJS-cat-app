import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// NextPage -> type, line it;s imported from next 
const Home: NextPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
    }}>
      <h1>Cat images</h1>
      <img src='https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg' width={500} height={'auto'} />
      <button>Cat</button>
    </div>
  )
}

export default Home
