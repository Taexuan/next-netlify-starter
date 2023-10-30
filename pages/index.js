import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import React, { useState } from 'react';

export default function Home() {
  const [imageSource, setImageSource] = useState('https://cdn.myanimelist.net/images/characters/4/201257.jpg');
  const [charName, setName] = useState('Haruka Niimi');
  const [anime, setAnime] = useState('Test');

  const callAPI = async () => {
		try {
			const res = await fetch(
				`https://api.jikan.moe/v4/random/characters`
			);
			const data = await res.json();
			console.log(data.data);
      setImageSource(data.data.images.jpg.image_url);
      setName(data.data.name);
      animeById(data.data.mal_id);
		} catch (err) {
			console.log(err);
		}
	};

  const animeById = async (id) => {
		try {
			const res = await fetch(
				`https://api.jikan.moe/v4/characters/${id}/anime`
			);
			const data = await res.json();
			console.log(data.data);
      setAnime(data.data[0].anime.title);
		} catch (err) {
			console.log(err);
		}
	};


  return (
    <div className="container">
      <Head>
        <title>Waifu Gatcha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <button onClick={callAPI}>Make API call</button>
        <p>{charName} - {anime}</p>
        <div className='image'>
        <img src={imageSource} alt="Picture of the author"/>
        </div>
      </main>

      <Footer />
    </div>
  )
}
