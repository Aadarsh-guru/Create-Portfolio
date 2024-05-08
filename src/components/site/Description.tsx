"use client";
import { useState } from "react";

const Description = ({ description }: { description: string }) => {

  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);

  return (
    <p className="text-sm lg:hidden dark:text-gray-100 mt-5">
      {showFullDescription ? description : description.slice(0, description.length / 3)}
      {!showFullDescription && (
        <button onClick={() => setShowFullDescription(true)} className="text-gray-500 mx-1 hover:underline">Read More...</button>
      )}
    </p>
  );
};

export default Description;