import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
  'user-top-read',
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-read-playback-position',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-modify-playback-state',
  'user-follow-read',
  'user-follow-modify',
].join(',');

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };
