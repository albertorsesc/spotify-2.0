import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { signOut } from "next-auth/react";

import { shuffle } from 'lodash';

import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdStateAtom, playlistStateAtom } from '../atoms/playlist.atom';

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useSpotify from "../hooks/useSpotify.hook";

import Songs from '../components/Songs';

const gradientColors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

const Center = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdStateAtom);
  const [playlist, setPlaylist] = useRecoilState(playlistStateAtom);

  useEffect(() => {
    setColor(shuffle(gradientColors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then(data => {
        setPlaylist(data.body);
    }).catch(error => console.log('spotifyApi.getPlaylist', error));
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">

      <header className="absolute top-5 right-8">

        <div onClick={signOut} className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img src={session?.user.image ?? 'https://avatars.githubusercontent.com/u/22654040?s=400&u=b4c45a0a60117314537fa0ef7aec04e2038e07da&v=4'}
            className='rounded-full w-10 h-10 object-cover'
            alt="" />
        <h2 className="text-white">{session?.user.name}</h2>
        <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        <img src={playlist?.images?.[0]?.url} className='h-44 w-44 shadow-2xl' />

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>

    </div>
  );
}

export default Center;