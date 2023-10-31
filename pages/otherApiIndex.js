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


    const [imageSource, setImageSource] = useState('https://s4.anilist.co/file/anilistcdn/character/large/b176754-Ya46QWtQuXzQ.png');
  const [charName, setName] = useState('Frieren');
  const [anime, setAnime] = useState('Sousou no Frieren');
  const [variables, setVar] = useState({id: Math.floor(Math.random() * 187472)});

  var query = `
  query ($id: Int) {
    Character(id: $id) {
      id
      name {
        full
      }
      gender
      image {
        large
      }
      media(sort: ID) {
        edges {
          node {
            id
            title {
              romaji
              english
            }
          }
        }
      }
    }
  }
  `;

function callAPI() {
  setVar({id: Math.floor(Math.random() * 187472)});
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
  console.log(data);
    setImageSource(data.data.Character.image.large);
    setName(data.data.Character.name.full);
    setAnime(data.data.Character.media.edges[0].node.title.romaji);
}

function handleError(error) {
    console.log('Error, check console');
    console.error(error);
}