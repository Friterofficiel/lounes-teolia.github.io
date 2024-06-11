import React from 'react';
import HarryAbout from '../assets/harryAbout.png'
import '../App.css'
const AboutComp: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className=" md:w-1/3 ml-9">
          <img src={HarryAbout} alt="Poudlard" className="rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0">
          <div className='flex flex-col items-center justify-center mb-20'>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 harry-potter-font mb-5">About Hogwarts</h2>
            <hr className='border-1 border-zinc-950  w-64' />
          </div>
          <p className="mt-4  text-gray-700 harry-potter-font text-2xl">
          Hogwarts is a school of witchcraft where young wizards and witches come to learn magic. Founded over a thousand years ago by four of the greatest wizards and witches of the time, Hogwarts is a place filled with mystery, adventure and discovery.
          </p>
          <p className="mt-4  text-gray-700 harry-potter-font text-2xl">
          Hogwarts students are divided into four houses: Gryffindor, Hufflepuff, Ravenclaw and Slytherin, each with their own characteristics and values. The teachers are experts in their fields and teach subjects such as Potions, Defense Against the Dark Arts, Transfiguration, and much more.
          </p>
          <p className="mt-4  text-gray-700 harry-potter-font text-2xl">
          Hogwarts is much more than a school, it is a second home for its students. With its majestic castle, vast grounds and many magical creatures, Hogwarts offers a unique and unforgettable experience to all who come.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutComp;
