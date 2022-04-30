// SPOTIFY API
const spotify_key = 'ed34d83b4b5e420d8b0543289968aab1'
const spotify_secret = '3cca77fa9a81439e996c069d3492d4f1'
const spotify_token_endpoint = 'https://accounts.spotify.com/api/token'
const spotify_endpoint = 'https://api.spotify.com/v1/playlists/2e3dcRuo9uDH6qD3NOGKAL?si=97b259b00b1744e4?limit=8'

let playlist = [];

fetch(spotify_token_endpoint, {
    method: 'Post',
    body: 'grant_type=client_credentials',
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Authorization" : 'Basic ' + btoa(spotify_key+':'+spotify_secret)
    }
}).then(r => r.json(), onError).then(getPlaylist);

function getPlaylist(token){
        const randomOffset = Math.floor(Math.random() * 100);
        const queries = ["Skateboarding", "Snowboarding", "Surf", "Wakeboarding", "Kitesurfing"];
        const div_playlists = ["#primo", "#secondo", "#terzo", "#quarto", "#quinto"];
        
        for(let i=0; i<5; i++)
        {
            fetch("https://api.spotify.com/v1/search?q=" + queries[i] + "&type=playlist&limit=1&&offset=" + randomOffset,
                {
                    method: 'GET',
                    headers:{
                        'Authorization': 'Bearer ' + token.access_token
                    }
                }
            )
            .then(r => r.json(), onError)
            .then(data => {
                console.log(data);
                console.log(data.playlists.items[0].name);
                const img = document.querySelector(div_playlists[i]+' img');
                img.src=data.playlists.items[0].images[0].url;
                
                const name = document.querySelector(div_playlists[i]+' p');
                name.textContent = data.playlists.items[0].name;

                const link = document.querySelector(div_playlists[i]+ ' a');
                link.href=data.playlists.items[0].external_urls.spotify;      
            });
        }
}

//WEATHER_API
weather_key = 'd5c2677b2c31421b893124809223004';
weather_url = 'http://api.weatherapi.com/v1/';

const div_cities = ["#first", "#second", "#third", "#fourth", "#fifth"];
const cities = ["Catania", "Linguaglossa", "Agrigento", "Augusta", "Marsala"];

for(let i=0; i<5; i++)
{
    const div_weather = document.querySelector(div_cities[i]);
    fetch(weather_url+'current.json?key='+weather_key+'&q='+ cities[i] +'&lang=it').then(onSuccessWeather, onError).then(json =>{
        const img = div_weather.querySelector('img');
        const city_location = div_weather.querySelector('#city');
        const weather_info = div_weather.querySelector('#weather_condition');
        city_location.textContent = json.location.name;
        weather_info.textContent = json.current.condition.text + ', ' + json.current.temp_c + '°C';
        img.src = 'http:'+json.current.condition.icon;
    });
}

function onSuccessWeather(response){
    return response.json();
}

function onError(error){
    console.log('Errore: ' + error);
}

