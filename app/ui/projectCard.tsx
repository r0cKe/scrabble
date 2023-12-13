import { EyeIcon, HeartIcon } from "@heroicons/react/24/solid";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "../lib/session";
import LikeProject from "./likeProject";

type Props = {
  id: string;
  image: string;
  title: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
};

const ProjectCard: NextPage<Props> = async ({
  id,
  image,
  title,
  createdBy,
}) => {
  const session = await getCurrentUser();
  const { id: userId, avatarUrl, email, name } = createdBy;

  let likes = Math.floor(Math.random() * 10000);
  let views = String(
    (Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k"
  );

  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          alt={title}
          width={414}
          height={314}
          className="w-full h-full object-cover rounded-2xl"
        />

        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              alt={name}
              className="rounded-full"
            />
            <p>{name}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <LikeProject userId={session?.user.id} projectId={id} />
            <p className="text-sm">{likes}</p>
          </div>
          <div className="flexCenter gap-2">
            <EyeIcon className="w-4 h-4 text-slate-500" />
            <p className="text-sm">{views}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
