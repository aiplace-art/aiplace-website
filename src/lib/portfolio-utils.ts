/**
 * Portfolio Utility Functions
 * Helper functions for portfolio data management and transformations
 */

import { Project, ServiceCategory } from '@/data/portfolio';

/**
 * Generate a URL-safe slug from a project title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString + '-01'); // Add day since we only have YYYY-MM
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Get category color classes for badges and backgrounds
 */
export function getCategoryColors(category: ServiceCategory) {
  const colorMap = {
    Web: {
      badge: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      gradient: 'from-blue-600 to-blue-700',
      light: 'bg-blue-50 border-blue-200',
      text: 'text-blue-600',
    },
    AI: {
      badge: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      gradient: 'from-purple-600 to-purple-700',
      light: 'bg-purple-50 border-purple-200',
      text: 'text-purple-600',
    },
    Business: {
      badge: 'bg-green-500/10 text-green-600 border-green-500/20',
      gradient: 'from-green-600 to-green-700',
      light: 'bg-green-50 border-green-200',
      text: 'text-green-600',
    },
    Blockchain: {
      badge: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      gradient: 'from-orange-600 to-orange-700',
      light: 'bg-orange-50 border-orange-200',
      text: 'text-orange-600',
    },
  };

  return colorMap[category];
}

/**
 * Calculate project statistics
 */
export function getProjectStats(projects: Project[]) {
  return {
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    byCategory: {
      Web: projects.filter(p => p.category === 'Web').length,
      AI: projects.filter(p => p.category === 'AI').length,
      Business: projects.filter(p => p.category === 'Business').length,
      Blockchain: projects.filter(p => p.category === 'Blockchain').length,
    },
  };
}

/**
 * Search projects by title, client, or description
 */
export function searchProjects(projects: Project[], query: string): Project[] {
  const lowerQuery = query.toLowerCase();
  return projects.filter(
    p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.client.toLowerCase().includes(lowerQuery) ||
      p.shortDescription.toLowerCase().includes(lowerQuery) ||
      p.fullDescription.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Filter projects by technology
 */
export function filterByTechnology(projects: Project[], technology: string): Project[] {
  const lowerTech = technology.toLowerCase();
  return projects.filter(p =>
    p.technologies.some(tech => tech.toLowerCase().includes(lowerTech))
  );
}

/**
 * Get all unique technologies across projects
 */
export function getAllTechnologies(projects: Project[]): string[] {
  const techSet = new Set<string>();
  projects.forEach(p => {
    p.technologies.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet).sort();
}

/**
 * Get projects completed in a specific year
 */
export function getProjectsByYear(projects: Project[], year: number): Project[] {
  return projects.filter(p => {
    const projectYear = new Date(p.completionDate + '-01').getFullYear();
    return projectYear === year;
  });
}

/**
 * Get all unique years from projects
 */
export function getProjectYears(projects: Project[]): number[] {
  const years = new Set<number>();
  projects.forEach(p => {
    const year = new Date(p.completionDate + '-01').getFullYear();
    years.add(year);
  });
  return Array.from(years).sort((a, b) => b - a);
}

/**
 * Validate project data structure
 */
export function validateProject(project: Partial<Project>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!project.title || project.title.length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  if (!project.client || project.client.length < 2) {
    errors.push('Client name must be at least 2 characters');
  }

  if (!project.category || !['Web', 'AI', 'Business', 'Blockchain'].includes(project.category)) {
    errors.push('Category must be Web, AI, Business, or Blockchain');
  }

  if (!project.shortDescription || project.shortDescription.length < 10) {
    errors.push('Short description must be at least 10 characters');
  }

  if (!project.fullDescription || project.fullDescription.length < 20) {
    errors.push('Full description must be at least 20 characters');
  }

  if (!project.technologies || project.technologies.length === 0) {
    errors.push('At least one technology must be specified');
  }

  if (!project.metrics || project.metrics.length === 0) {
    errors.push('At least one metric must be provided');
  }

  if (!project.completionDate || !/^\d{4}-\d{2}$/.test(project.completionDate)) {
    errors.push('Completion date must be in YYYY-MM format');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate project card metadata for SEO
 */
export function generateProjectMetadata(project: Project) {
  return {
    title: `${project.title} - Case Study | AiPlace`,
    description: project.shortDescription,
    keywords: [
      project.category.toLowerCase(),
      ...project.technologies.map(t => t.toLowerCase()),
      'case study',
      'portfolio',
    ].join(', '),
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: 'article',
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

/**
 * Calculate average metrics across projects
 */
export function calculateAverageMetrics(projects: Project[]): Record<string, string> {
  const allMetrics: Record<string, number[]> = {};

  projects.forEach(project => {
    project.metrics.forEach(metric => {
      const numericValue = parseFloat(metric.value.replace(/[^0-9.-]/g, ''));
      if (!isNaN(numericValue)) {
        if (!allMetrics[metric.label]) {
          allMetrics[metric.label] = [];
        }
        allMetrics[metric.label].push(numericValue);
      }
    });
  });

  const averages: Record<string, string> = {};
  Object.entries(allMetrics).forEach(([label, values]) => {
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    averages[label] = `${avg.toFixed(1)}%`;
  });

  return averages;
}

/**
 * Get project completion timeline
 */
export function getProjectTimeline(projects: Project[]): { month: string; count: number }[] {
  const timeline: Record<string, number> = {};

  projects.forEach(project => {
    const month = project.completionDate;
    timeline[month] = (timeline[month] || 0) + 1;
  });

  return Object.entries(timeline)
    .map(([month, count]) => ({
      month: formatDate(month),
      count,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * Export project data as JSON
 */
export function exportProjectsAsJSON(projects: Project[]): string {
  return JSON.stringify(projects, null, 2);
}

/**
 * Generate portfolio summary statistics
 */
export function generatePortfolioSummary(projects: Project[]) {
  const stats = getProjectStats(projects);
  const technologies = getAllTechnologies(projects);
  const years = getProjectYears(projects);

  return {
    totalProjects: stats.total,
    featuredProjects: stats.featured,
    categoriesServed: Object.keys(stats.byCategory).length,
    projectsByCategory: stats.byCategory,
    totalTechnologies: technologies.length,
    popularTechnologies: technologies.slice(0, 10),
    yearsActive: years.length,
    activeYears: years,
    averageProjectsPerYear: stats.total / years.length,
    projectsWithTestimonials: projects.filter(p => p.testimonial).length,
  };
}
