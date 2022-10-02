import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { shuffle } from 'lodash';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
  const { data: session } = useSession();
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(gradientColors).pop());
  }, []);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">

        <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img src={session?.user.image ?? 'https://avatars.githubusercontent.com/u/22654040?s=400&u=b4c45a0a60117314537fa0ef7aec04e2038e07da&v=4'}
            className='rounded-full w-10 h-10'
            alt="" />
        <h2 className="text-white">{session?.user.name}</h2>
        <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        <h2 className="text-white">Center</h2>
      </section>
    </div>
  );
}

export default Center;