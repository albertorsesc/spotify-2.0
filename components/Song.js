import useSpotify from "../hooks/useSpotify";

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();
  const song = track.track;

  return (
    <div className="grid grid-cols-2">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img src={song.album.images[0].url} className='h-10 w-10 rounded-lg' />
        <div>
          <p>{song.artists[0].name}</p>
          <p></p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline-flex">{song.album.name}</p>
        <p>duration</p>
      </div>
    </div>
  );
};

export default Song;