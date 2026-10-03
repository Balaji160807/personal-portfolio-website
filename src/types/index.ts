export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tags: string[];
  featured: boolean;
  architectureFlow?: {
    step: string;
    label: string;
    sublabel?: string;
  }[];
  caseStudy: {
    problem: string;
    goal: string;
    architectureOverview: string;
    technologies: string[];
    implementation: string[];
    engineeringChallenges: string[];
    outcome: string;
    status: string;
    codeAvailable: boolean;
    demoAvailable: boolean;
  };
}

export interface SkillCategory {
  id: string;
  number: string;
  category: string;
  description: string;
  tags: string[];
  iconName: string;
  coreCapabilities: string[];
}

export interface Achievement {
  id: string;
  number: string;
  title: string;
  category: string;
  organization: string;
  location: string;
  description: string;
  badge?: string;
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  score?: string;
  highlight?: string;
}

export interface CloudThought {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  keyPoints: string[];
}
