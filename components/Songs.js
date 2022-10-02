import { useRecoilValue } from 'recoil';
import { playlistStateAtom } from "../atoms/playlist.atom";

import Song from '../components/Song';

const Songs = () => {
  const playlist = useRecoilValue(playlistStateAtom)
  return (
    <div className='text-white px-8 flex flex-col space-y-1 pb-28'>
      {
        playlist?.tracks.items.map((track, index) => (
          <Song key={index} track={track} order={index}  />
        ))
      }
    </div>
  );
}

export default Songs;