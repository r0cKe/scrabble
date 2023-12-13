import { fetchAllProjects, fetchCategoryProjects } from "./lib/actions";
import { ProjectInterface } from "@/common.types";
import ProjectCard from "./ui/projectCard";
import Categories from "./ui/categories";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

type Props = {
  searchParams: {
    category?: string;
  };
};

export default async function Home({ searchParams: { category } }: Props) {
  const data = (await (category
    ? fetchCategoryProjects(category)
    : fetchAllProjects())) as ProjectSearch;
    
  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">
          No projects found, Go create some first.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard key={node?.id} {...node} />
        ))}
      </section>
    </section>
  );
}
