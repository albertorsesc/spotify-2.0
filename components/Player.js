import {
  ArrowsRightLeftIcon,
  ArrowUturnLeftIcon,
  SpeakerWaveIcon as SpeakerWaveOutlineIcon
} from '@heroicons/react/24/outline';
import { BackwardIcon, ForwardIcon, PauseCircleIcon, PlayCircleIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';

import { debounce } from 'lodash';


import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { currentTrackIdStateAtom, isPlayingStateAtom } from "../atoms/song.atom";
import useSongInfo from "../hooks/useSongInfo.hook";
import useSpotify from "../hooks/useSpotify.hook";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdStateAtom);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingStateAtom);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        console.log('Now playing: ', data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then(data => {
          setIsPlaying(data.body?.is_playing);
        })
      })
    }
  };

  const handleTogglePlayer = () => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    })
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce(() => {
      spotifyApi.setVolume(volume).catch(error => {});
    }, 500, [])
  );

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img src={songInfo?.album?.images?.[0]?.url}
          className='hidden md:inline h-10 w-10' />

          <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0]?.name}</p>
          </div>
      </div>

      {/* Center */}
      <div className='flex items-center justify-evenly'>
        <ArrowsRightLeftIcon className='button' />
        <BackwardIcon onClick={() => spotifyApi.skipToPrevious()} className='button' />

        {
          isPlaying ? (
            <PauseCircleIcon onClick={handleTogglePlayer} className='button w-10 h-10' />
          ) : (
            <PlayCircleIcon onClick={handleTogglePlayer} className='button w-10 h-10' />
          )
        }

        <ForwardIcon onClick={() => spotifyApi.skipToNext()} className='button' />
        <ArrowUturnLeftIcon className='button' />
      </div>

      {/* Right */}
      <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
        <SpeakerWaveOutlineIcon onClick={() => volume > 0 && setVolume(volume - 10)} className='button' />
        <input type='range' onChange={e => setVolume(Number(e.target.value))} className='w-14 md:w-28' value={volume} min={0} max={100} />
        <SpeakerWaveIcon onClick={() => volume < 100 && setVolume(volume + 10)} className='button' />
      </div>
    </div>
  )
};

export default Player;