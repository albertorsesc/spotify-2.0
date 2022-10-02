import { useRecoilState } from 'recoil';
import { currentTrackIdStateAtom, isPlayingStateAtom } from '../atoms/song.atom';
import useSpotify from "../hooks/useSpotify.hook";

import millisecondsToMinutesAndSeconds from '../lib/time';

const Song = ({ order, track }) => {
  const song = track.track;
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdStateAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingStateAtom);

  const playSong = () => {
    setCurrentTrackId(song.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [song.uri],
    });
  };

  return (
    <div onClick={playSong} className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img src={song.album.images[0].url} className='h-10 w-10 rounded-lg' />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{song.name}</p>
          <p className="w-40">{song.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline-flex ">{song.album.name}</p>
        <p>{millisecondsToMinutesAndSeconds(song.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;