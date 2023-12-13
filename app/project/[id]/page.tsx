import { getProjectDetails, getUserProjects } from "@/app/lib/actions";
import { getCurrentUser } from "@/app/lib/session";
import Modal from "@/app/ui/modal";
import ProjectActions from "@/app/ui/projectActions";
import { ProjectInterface, UserProfile } from "@/common.types";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";

type Props = {
  params: {
    id: string;
  };
};

const Project = async ({ params: { id } }: Props) => {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };
  const project = result?.project;

  if (!project) {
    return <p>Failed to get project details</p>;
  }

  // User projects
  const userProjectsResult = (await getUserProjects(
    project?.createdBy?.id
  )) as {
    user?: UserProfile;
  };
  const userProjects = userProjectsResult?.user?.projects?.edges;

  const renderLink = () => `/profile/${project?.createdBy?.id}`;

  return (
    <Modal>
      <section className="w-full flexBetween mb-12">
        <div className="flexStart gap-6">
          <Link href={renderLink()}>
            <Image
              src={project?.createdBy.avatarUrl}
              alt={project?.createdBy.name}
              width={48}
              height={48}
            />
          </Link>
          <div>
            <p className="font-bold">{project?.title}</p>
            <div className="flexStart gap-2">
              <p className="text-sm text-secondary">
                {project?.createdBy.name}
              </p>
              <div className="w-1 h-1 bg-secondaryBg rounded-full" />
              <p className="text-sm text-primary-purple font-semibold">
                {project?.category}
              </p>
            </div>
          </div>
        </div>

        {session?.user?.id === project?.createdBy?.id && (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions projectId={project?.id} />
          </div>
        )}
      </section>

      <section className="mt-14 mb-20">
        <Image
          src={`${project?.image}`}
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <p>{project?.description}</p>
      <section className="flexStart gap-5 mt-2">
        <div className="flexStart gap-2 text-primary-purple underline">
          <FaGithub className="w-5 h-5 text-secondary" />
          <Link href={project?.githubUrl} target="_blank" rel="noreferrer">
            Github
          </Link>
        </div>
        <div className="w-1 h-1 bg-secondaryBg rounded-full" />
        <div className="flexStart gap-2 text-primary-purple underline">
          <IoIosRocket className="w-5 h-5 text-secondary" />
          <Link href={project?.liveSiteUrl} target="_blank" rel="noreferrer">
            Live Site
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={project?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <div className="w-full flexBetween mt-20 mb-10">
        <p className="font-bold">More by {project?.createdBy?.name}</p>
        <Link
          href={renderLink()}
          className="text-sm text-primary-purple cursor-pointer"
        >
          View All
        </Link>
      </div>

      {/* User Projects */}
      <section className="projects-grid">
        {userProjects?.map(({ node }) => {
          if (node?.id === id) return;
          return (
            <div
              className="flexCenter flex-col rounded-2xl drop-shadow-card"
              key={node?.id}
            >
              <Link
                href={`/project/${node?.id}`}
                className="flexCenter group relative w-full h-full"
              >
                <Image
                  src={node?.image}
                  alt={node?.title}
                  width={414}
                  height={314}
                  className="w-full h-full object-cover rounded-2xl"
                />

                <div className="hidden group-hover:flex profile_card-title">
                  <p className="w-full">{node?.title}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </Modal>
  );
};

export default Project;
