import { GraphQLClient } from "graphql-request";
import {
  allProjectsQuery,
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  deleteUserById,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
  updateProjectMutation,
} from "../../garphQL";
import { ProjectForm } from "@/common.types";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "merekotoandarlelo";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables = { input: { name, email, avatarUrl } };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const deleteUser = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(deleteUserById, { id });
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const updateProject = async (
  form: ProjectForm,
  id: string,
  token: string
) => {
  function isBase64DataURl(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURl(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(updatedForm.image);

    if (imageUrl.url) {
      updatedForm = { ...form, image: imageUrl.url };
    }
  }

  const variables = {
    id,
    input: updatedForm,
  };

  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(updateProjectMutation, variables);
};

export const fetchAllProjects = async (endCursor?: string) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(allProjectsQuery, { endCursor });
};

export const fetchCategoryProjects = async (
  category?: string,
  endCursor?: string
) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(projectsQuery, { category, endCursor });
};

export const getProjectDetails = async (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = async (userId: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id: userId, last });
};

export const deleteProjectWithId = async (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(deleteProjectMutation, { id });
};

// Like Funcationality

// export const likeProject = async (
//   userId: string,
//   projectId: string,
//   token: string
// ) => {
//   client.setHeader("Authorization", `Bearer ${token}`);

//   return makeGraphQLRequest(updateUserMutation, {
//     id: userId,
//     input: {
//       likedProjects: projectId,
//     },
//   });
// };

// export const dislikeProject = async (
//   userId: string,
//   projectId: string,
//   token: string
// ) => {
//   client.setHeader("Authorization", `Bearer ${token}`);

//   return makeGraphQLRequest(userDislikeMutation, {
//     id: userId,
//     projectId,
//   });
// };
