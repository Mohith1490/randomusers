import React from "react";
import Image from "next/image";

interface CardProps {
  firstname: string;
  lastname: string;
  gender: string;
  mobileno: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ firstname, lastname, gender, mobileno, image }) => {
  return (
    <div className="w-full max-w-[400px] border-2 border-black rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-lg">
      <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-black rounded-2xl overflow-hidden">
        <Image src={image} alt="Profile" width="100" height="100" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-xl font-bold">{firstname} {lastname}</h2>
        <h3 className="text-lg text-gray-500 capitalize">{gender}</h3>
        <h3 className="text-lg mt-2">{mobileno}</h3>
      </div>
    </div>
  );
};

export default Card;
