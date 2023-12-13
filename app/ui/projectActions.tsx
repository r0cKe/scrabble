"use client";

import {
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { deleteProjectWithId, fetchToken } from "../lib/actions";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

const ProjectActions = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { token } = await fetchToken();
      await deleteProjectWithId(projectId, token);
      router.push("/");
    } catch (error) {
      console.log("Error deleting project", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn bg-secondaryBg"
      >
        <PencilSquareIcon className="w-4 h-4" />
      </Link>
      <button
        className="flexCenter delete-action_btn bg-gray-100 text-secondaryBg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <ArrowPathIcon className="w-4 h-4 animate-spin" />
        ) : (
          <TrashIcon className="w-4 h-4" />
        )}
      </button>
    </>
  );
};

export default ProjectActions;
