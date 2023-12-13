"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const LikeProject = ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) => {
  const [liked, setLiked] = useState<boolean>(false);

  const handleLike = async () => {
    setLiked(!liked);
  };

  return (
    <>
      <HeartIcon
        className={`w-4 h-4  ${
          liked ? "text-red-500" : "text-slate-500"
        } cursor-pointer transition-transform duration-300 active:scale-125`}
        onClick={handleLike}
      />
    </>
  );
};

export default LikeProject;
