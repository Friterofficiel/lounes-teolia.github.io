import React from 'react';

const AboutComp: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className=" md:w-1/3 ml-9">
          <img src="/assets/harryAbout.png" alt="Poudlard" className="rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2 md:ml-8 mt-8 md:mt-0">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-600">À propos de Poudlard</h2>
          <p className="mt-4 text-lg text-gray-700">
            Poudlard est une école de sorcellerie où les jeunes sorciers et sorcières viennent apprendre la magie. Fondée il y a plus de mille ans par quatre des plus grands sorciers et sorcières de l'époque, Poudlard est un lieu rempli de mystères, d'aventures et de découvertes.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Les élèves de Poudlard sont répartis dans quatre maisons : Gryffondor, Poufsouffle, Serdaigle et Serpentard, chacune ayant ses propres caractéristiques et valeurs. Les professeurs sont des experts dans leurs domaines et enseignent des matières telles que les potions, la défense contre les forces du mal, la métamorphose et bien plus encore.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Poudlard est bien plus qu'une école, c'est une seconde maison pour ses élèves. Avec son château majestueux, ses vastes terrains et ses nombreuses créatures magiques, Poudlard offre une expérience unique et inoubliable à tous ceux qui y viennent.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutComp;
