import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
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
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div>
      {/* Left */}
      <div>
        <img src={songInfo?.album?.images?.[0]?.url}
          className='hidden md:inline h-10 w-10' />
      </div>
    </div>
  )
};

export default Player;