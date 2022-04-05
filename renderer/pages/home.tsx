import React, { useEffect } from 'react';
import Head from 'next/head';
import { io } from 'socket.io-client';

function Home()
{

  const [infoMode, setInfoMode] = React.useState(false);

  useEffect(() =>
  {

    const socket = io("http://localhost:5683");
  
    socket.on('connect', () => {
      console.log('Connected to backend');
    });

    socket.on("on_click", (data) => {
      // Get the element with the id of data
      const element = document.getElementById(`pad-${data.row}-${data.column}`);
      element.children[0].classList.add("bg-green-300");
      // wait for 1 second and remove the class
      setTimeout(() => {
        element.children[0].classList.remove("bg-green-300");
      }, 1000);

      if(infoMode)
      {
        
      }

    });

    socket.on("information_mode", (data) => {
      setInfoMode(data);
    });

  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Launchpad</title>
      </Head>
      <div>
        {/* Have a grid of 8x8 of cubes, with spacing between
          they will also be buttons and will be able to be clicked
          to change the color of the cube.

          we are also using tailwind
        */}
        {/* Center of screen */}
        <div className='flex flex-wrap justify-center items-center h-screen'>
          <div className="grid grid-cols-8">

            {Array(8).fill(0).map((_, k) => (
              <div key={k}>
                {Array(8).fill(0).map((_, i) => (
                  <div id={`pad-${k}-${i}`} className="m-1" key={i}>
                    <button className="bg-white hover:bg-yellow-200 text-white font-bold py-5 px-5 rounded">
                    </button>
                  </div>
                ))}
              </div>
            ))}

          </div>            
        </div>

      </div>
    </React.Fragment>
  );
}

export default Home;
