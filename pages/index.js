import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import React, { useState } from 'react';
import prisma from '@contexts/prisma';

export async function getStaticProps(context) {
  const data = await prisma.user.findMany();

  const users = data.map((user) => ({
    ...user,
    id: user.id.toString(),
  }));

  return {
    props: { users },
  };
}

export default function Home({users}) {
  const [imageSource, setImageSource] = useState('https://s4.anilist.co/file/anilistcdn/character/large/b176754-Ya46QWtQuXzQ.png');
  const [charName, setName] = useState('Frieren');
  const [anime, setAnime] = useState('Sousou no Frieren');
  //max ammount of animes: https://anilist.co/graphiql?query=%7B%0A%20%20SiteStatistics%20%7B%0A%20%20%20%20characters(sort%3A%20COUNT_DESC)%20%7B%0A%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20count%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A
  const maxAnime = 139989;
  const [random, setR] = useState(Math.ceil(Math.random()*maxAnime));
  const [variables, setVar] = useState({page: Math.ceil(random/50)});
  const [rai, setRa] = useState(random % 50);

  var query = `
  query ($page: Int){
    Page(page: $page) {
      characters {
        name {
          full
        }
        siteUrl
        image {
          large
        }
        gender
        media(sort: ID) {
          edges {
            node {
              title {
                romaji
              }
            }
          }
        }
      }
    }
  }
  `;

function callAPI() {
  setR(Math.ceil(Math.random()*maxAnime));
  setVar({page: Math.ceil(random/50)});
  setRa(random % 50);
  fetch(url, options).then(handleResponse)
  .then(handleData)
  .catch(handleError)
}

var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };


function handleResponse(response) {
    return response.json().then(function (json) {   
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {  
  let result = data.data.Page.characters.reduce(function (r, a) {
    r[a.gender] = r[a.gender] || [];
    r[a.gender].push(a);
    return r;
}, Object.create(null));1
    if (result.Female) {
      let randomIndex = Math.ceil(Math.random()*result.Female.length-1);
      setName(result.Female[randomIndex].name.full);
      setAnime(result.Female[randomIndex].media.edges[0].node.title.romaji);
      setImageSource(result.Female[randomIndex].image.large);
    } else {
      let randomIndex = Math.ceil(Math.random()*result.null.length-1);
      setName(result.null[randomIndex].name.full);
      setAnime(result.null[randomIndex].media.edges[0].node.title.romaji);
      setImageSource(result.null[randomIndex].image.large);
      alert("You didn't role a female, unlucky :)");
    }
}

function handleError(error) {
    console.log('Error, check console');
    console.error(error);
}

  return (
    <div className="container">
      <Head>
        <title>Waifu Gatcha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          {users.map((user) => (
            <p>{user.name}</p>
          ))}
        </div>
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
