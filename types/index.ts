export type ProjectCategory = "Web" | "Mobile" | "Python" | "Java" | "Games" | "APIs";
export type ProjectStatus = "featured" | "ui-only" | "experimental" | "archived" | "fork";

export interface SocialLink { label: string; href: string; }
export interface Profile { name: string; title: string; supportingTitle: string; statement: string; education: string; institution: string; }
export interface Project {
  slug: string; name: string; description: string; longDescription: string;
  category: ProjectCategory[]; technologies: string[]; language: string;
  repo: string; live?: string; status?: ProjectStatus; featured?: boolean;
  features: string[]; approach?: string; updatedFallback: string;
}
export interface GitHubRepoMeta { name: string; stars: number; forks: number; updatedAt: string; language: string | null; htmlUrl: string; }
export interface GitHubProfile { publicRepos: number; followers: number; repos: GitHubRepoMeta[]; languages: Record<string, number>; }
export interface Skill { name: string; category: "Languages" | "Frontend" | "Backend" | "Mobile" | "Databases" | "Tools"; color: string; icon: string; }
