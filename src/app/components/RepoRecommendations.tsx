import { createOctokitClient } from "@/lib/githubClient";

interface RepoRecommendationsProps {
  token: string;
}

const RepoRecommendations = async ({ token }: RepoRecommendationsProps) => {
  const octokit = createOctokitClient(token);
  const response = await octokit.search.repos({
    q: "stars:>10000",
    sort: "stars",
    order: "desc",
    per_page: 10,
  });

  const repos = response.data.items;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold my-8">Recommended Repositories</h2>
      <ul className="list-disc">
        {repos.map((repo: any) => {
          console.log(repo);
          return (
            <li key={repo.id} className="mb-4">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary"
              >
                {repo.name}
              </a>
              <p>{repo.description}</p>
              {repo.stargazers_count}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RepoRecommendations;
