export interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  open_issues_count: number
  forks_count: number
  language: string | null
  owner: GithubOwner
  pushed_at: string
}

export interface GithubSearchResponse {
  total_count: number
  items: GithubRepo[]
}

export interface GithubOwner {
  login: string
  avatar_url: string
}

