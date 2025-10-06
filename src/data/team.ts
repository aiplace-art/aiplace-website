export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  expertise: string[]
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Sarah Chen',
    role: 'CEO & AI Solutions Architect',
    bio: 'Former AI research lead at a Fortune 500 company with 12+ years of experience in machine learning and natural language processing. Passionate about making AI accessible to businesses of all sizes.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    expertise: ['AI Strategy', 'Machine Learning', 'NLP', 'Business Development'],
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO & Full-Stack Architect',
    bio: 'Seasoned full-stack developer with expertise in modern web technologies and cloud infrastructure. Previously led engineering teams at tech startups through successful acquisitions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    expertise: ['Next.js', 'React', 'Node.js', 'Cloud Architecture'],
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Alex Nakamoto',
    role: 'Lead Blockchain Engineer',
    bio: 'Blockchain architect specializing in DeFi protocols and tokenomics design. Contributed to multiple successful token launches and has audited over 50 smart contracts.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    expertise: ['Smart Contracts', 'Solidity', 'Tokenomics', 'DeFi'],
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Jennifer Park',
    role: 'Head of Business Strategy',
    bio: 'MBA graduate with extensive experience in strategic planning and business development. Helped dozens of startups refine their business models and secure funding.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    expertise: ['Business Planning', 'Fundraising', 'Market Analysis', 'Growth Strategy'],
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'David Kim',
    role: 'Senior Software Engineer',
    bio: 'TypeScript expert and open-source contributor. Passionate about clean code, testing, and developer experience. Previously worked on large-scale applications serving millions of users.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    expertise: ['TypeScript', 'Testing', 'DevOps', 'Performance'],
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Emily Watson',
    role: 'AI Research Engineer',
    bio: 'PhD in Computer Science with focus on conversational AI. Specializes in building intelligent chatbots and natural language understanding systems that deliver real business value.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    expertise: ['Conversational AI', 'NLP', 'Deep Learning', 'Python'],
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  }
]

export const companyStats = [
  { label: 'Projects Completed', value: '150+' },
  { label: 'Clients Served', value: '80+' },
  { label: 'Team Members', value: '25+' },
  { label: 'Years of Experience', value: '50+' }
]

export const companyValues = [
  {
    title: 'Innovation First',
    description: 'We stay ahead of technology trends and bring cutting-edge solutions to every project.',
    icon: 'rocket'
  },
  {
    title: 'Client Success',
    description: 'Your success is our success. We partner with you to achieve measurable business outcomes.',
    icon: 'target'
  },
  {
    title: 'Quality & Excellence',
    description: 'We deliver production-ready code with comprehensive testing and documentation.',
    icon: 'star'
  },
  {
    title: 'Transparency',
    description: 'Clear communication, honest timelines, and no hidden costs. We build trust through openness.',
    icon: 'eye'
  }
]

export const techStack = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
  backend: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'],
  ai: ['OpenAI GPT', 'Claude', 'LangChain', 'TensorFlow', 'PyTorch'],
  blockchain: ['Solidity', 'Ethereum', 'Hardhat', 'Web3.js', 'IPFS'],
  cloud: ['AWS', 'Vercel', 'Docker', 'Kubernetes', 'Cloudflare']
}

export const processSteps = [
  {
    step: 1,
    title: 'Discovery & Planning',
    description: 'We start by understanding your business goals, challenges, and requirements through detailed consultations.'
  },
  {
    step: 2,
    title: 'Strategy & Design',
    description: 'Our team creates a comprehensive strategy and designs the architecture for your solution.'
  },
  {
    step: 3,
    title: 'Development & Testing',
    description: 'We build your solution using agile methodologies with continuous testing and quality assurance.'
  },
  {
    step: 4,
    title: 'Launch & Support',
    description: 'We deploy your solution and provide ongoing support, maintenance, and optimization.'
  }
]
