import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <main>
      <h1>Juego elegante</h1>
      <canvas id="canvas" />
    </main>
  )
}

export default Home
