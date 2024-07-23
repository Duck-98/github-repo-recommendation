// ./lib/githubClient.js
import { Octokit } from '@octokit/rest';

export const createOctokitClient = (token : any) => {
  return new Octokit({
    auth: token,
  });
};
