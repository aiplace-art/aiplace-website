export type ServiceCategory = 'Web' | 'AI' | 'Business' | 'Blockchain';

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  image: string;
  thumbnail: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
    avatar?: string;
  };
  completionDate: string;
  duration: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'fintech-ai-platform',
    title: 'AI-Powered Financial Analytics Platform',
    client: 'FinanceFlow Corp',
    category: 'AI',
    shortDescription: 'Built an AI-driven platform that analyzes financial data and provides predictive insights for investment decisions.',
    fullDescription: 'Developed a comprehensive AI analytics platform that processes millions of financial transactions in real-time, providing actionable insights and predictive models for investment strategies.',
    image: '/images/portfolio/fintech-ai-full.jpg',
    thumbnail: '/images/portfolio/fintech-ai-thumb.jpg',
    challenge: 'FinanceFlow needed to process vast amounts of financial data in real-time and provide accurate predictive analytics to help investors make informed decisions. Their existing system was slow and couldn\'t handle the data volume.',
    solution: 'We developed a scalable AI platform using machine learning models for predictive analytics, integrated with real-time data processing pipelines. The system uses TensorFlow for ML models, Apache Kafka for streaming data, and React for an intuitive dashboard interface.',
    results: [
      'Reduced data processing time from hours to minutes',
      'Achieved 94% accuracy in market trend predictions',
      'Increased user engagement by 230%',
      'Processed over 10M transactions daily without performance degradation'
    ],
    metrics: [
      { label: 'Processing Speed', value: '98% faster' },
      { label: 'Prediction Accuracy', value: '94%' },
      { label: 'User Growth', value: '+230%' },
      { label: 'Daily Transactions', value: '10M+' }
    ],
    technologies: ['TensorFlow', 'Python', 'React', 'TypeScript', 'Apache Kafka', 'PostgreSQL', 'Docker', 'AWS'],
    testimonial: {
      quote: 'AiPlace transformed our data analytics capabilities. The AI platform they built has become essential to our operations and given us a significant competitive advantage.',
      author: 'Sarah Chen',
      position: 'CTO',
      company: 'FinanceFlow Corp'
    },
    completionDate: '2024-08',
    duration: '6 months',
    featured: true
  },
  {
    id: '2',
    slug: 'ecommerce-blockchain-marketplace',
    title: 'Decentralized E-Commerce Marketplace',
    client: 'MarketChain',
    category: 'Blockchain',
    shortDescription: 'Created a blockchain-based marketplace with smart contracts for secure, transparent peer-to-peer transactions.',
    fullDescription: 'Built a decentralized marketplace platform leveraging blockchain technology for secure transactions, smart contract-based escrow, and NFT integration for digital products.',
    image: '/images/portfolio/blockchain-marketplace-full.jpg',
    thumbnail: '/images/portfolio/blockchain-marketplace-thumb.jpg',
    challenge: 'MarketChain wanted to eliminate middlemen and reduce transaction fees while ensuring buyer and seller protection. Traditional platforms charged high fees and lacked transparency in dispute resolution.',
    solution: 'Implemented a Web3 marketplace using Ethereum smart contracts for automated escrow, integrated MetaMask for wallet connectivity, and built a React-based frontend with real-time blockchain event tracking. Included NFT minting and trading capabilities.',
    results: [
      'Reduced transaction fees by 85%',
      'Zero disputed transactions due to smart contract automation',
      'Onboarded 5,000+ users in first 3 months',
      'Processed $2M+ in transactions with complete transparency'
    ],
    metrics: [
      { label: 'Fee Reduction', value: '85%' },
      { label: 'Disputed Transactions', value: '0' },
      { label: 'Active Users', value: '5,000+' },
      { label: 'Transaction Volume', value: '$2M+' }
    ],
    technologies: ['Solidity', 'Ethereum', 'Web3.js', 'React', 'Next.js', 'IPFS', 'MetaMask', 'Hardhat'],
    testimonial: {
      quote: 'The blockchain marketplace exceeded our expectations. The smart contract implementation is flawless, and our users love the transparency and low fees.',
      author: 'Marcus Johnson',
      position: 'Founder & CEO',
      company: 'MarketChain'
    },
    completionDate: '2024-09',
    duration: '5 months',
    featured: true
  },
  {
    id: '3',
    slug: 'healthcare-management-system',
    title: 'Enterprise Healthcare Management System',
    client: 'MediCare Solutions',
    category: 'Web',
    shortDescription: 'Developed a comprehensive healthcare management platform for patient records, appointments, and billing.',
    fullDescription: 'Created a HIPAA-compliant healthcare platform that streamlines patient management, electronic health records, appointment scheduling, and integrated billing systems.',
    image: '/images/portfolio/healthcare-system-full.jpg',
    thumbnail: '/images/portfolio/healthcare-system-thumb.jpg',
    challenge: 'MediCare needed a unified system to replace multiple legacy applications that didn\'t communicate with each other. Data was siloed, and staff spent hours on manual data entry and coordination.',
    solution: 'Built a comprehensive web application with role-based access control, real-time synchronization across modules, automated billing integration, and a patient portal. Ensured full HIPAA compliance with end-to-end encryption and audit logging.',
    results: [
      'Reduced administrative time by 60%',
      'Eliminated data entry errors through automation',
      'Improved patient satisfaction scores by 45%',
      'Achieved 100% HIPAA compliance certification'
    ],
    metrics: [
      { label: 'Admin Time Saved', value: '60%' },
      { label: 'Data Entry Errors', value: '0%' },
      { label: 'Patient Satisfaction', value: '+45%' },
      { label: 'HIPAA Compliance', value: '100%' }
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'TypeScript', 'GraphQL'],
    testimonial: {
      quote: 'This system has revolutionized how we operate. Our staff is more efficient, patients are happier, and we\'re fully compliant with all regulations.',
      author: 'Dr. Emily Rodriguez',
      position: 'Chief Medical Officer',
      company: 'MediCare Solutions'
    },
    completionDate: '2024-07',
    duration: '8 months',
    featured: true
  },
  {
    id: '4',
    slug: 'retail-analytics-dashboard',
    title: 'AI-Powered Retail Analytics Dashboard',
    client: 'RetailPro Inc',
    category: 'AI',
    shortDescription: 'Built an intelligent analytics dashboard that predicts inventory needs and optimizes pricing strategies.',
    fullDescription: 'Developed an AI-driven analytics platform that combines sales data, customer behavior, and market trends to provide actionable insights for retail optimization.',
    image: '/images/portfolio/retail-analytics-full.jpg',
    thumbnail: '/images/portfolio/retail-analytics-thumb.jpg',
    challenge: 'RetailPro struggled with inventory management, leading to frequent stockouts and overstock situations. They needed predictive analytics to optimize inventory and pricing.',
    solution: 'Created a machine learning system that analyzes historical sales, seasonal trends, and external factors to predict demand. Integrated with their POS system for real-time data and built an intuitive dashboard for decision-makers.',
    results: [
      'Reduced stockouts by 78%',
      'Decreased excess inventory by 62%',
      'Increased profit margins by 23%',
      'Improved forecast accuracy to 91%'
    ],
    metrics: [
      { label: 'Stockout Reduction', value: '78%' },
      { label: 'Excess Inventory', value: '-62%' },
      { label: 'Profit Margin', value: '+23%' },
      { label: 'Forecast Accuracy', value: '91%' }
    ],
    technologies: ['Python', 'TensorFlow', 'React', 'D3.js', 'Node.js', 'MongoDB', 'AWS SageMaker'],
    testimonial: {
      quote: 'The predictive analytics have been game-changing. We\'re making smarter decisions and our bottom line has never looked better.',
      author: 'James Miller',
      position: 'VP of Operations',
      company: 'RetailPro Inc'
    },
    completionDate: '2024-06',
    duration: '4 months',
    featured: false
  },
  {
    id: '5',
    slug: 'startup-mvp-platform',
    title: 'SaaS MVP for Project Management',
    client: 'TaskFlow Startup',
    category: 'Business',
    shortDescription: 'Rapidly developed an MVP for a project management SaaS platform to validate market fit.',
    fullDescription: 'Built a minimum viable product for a modern project management platform with team collaboration, task tracking, and integrated communication tools.',
    image: '/images/portfolio/saas-mvp-full.jpg',
    thumbnail: '/images/portfolio/saas-mvp-thumb.jpg',
    challenge: 'TaskFlow needed to quickly validate their business idea with a functional MVP before their funding ran out. They had 8 weeks to launch and start acquiring users.',
    solution: 'Used agile development methodology to deliver a focused MVP with core features: task management, team collaboration, real-time updates, and basic analytics. Prioritized speed and user feedback integration.',
    results: [
      'Launched in 7 weeks, under deadline',
      'Acquired 500 beta users in first month',
      'Secured Series A funding based on MVP traction',
      'Achieved 87% user satisfaction rating'
    ],
    metrics: [
      { label: 'Launch Time', value: '7 weeks' },
      { label: 'Beta Users', value: '500+' },
      { label: 'Funding Secured', value: 'Series A' },
      { label: 'User Satisfaction', value: '87%' }
    ],
    technologies: ['React', 'Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    testimonial: {
      quote: 'AiPlace helped us validate our idea quickly and efficiently. The MVP they delivered was exactly what we needed to secure our next funding round.',
      author: 'Alex Thompson',
      position: 'Co-Founder',
      company: 'TaskFlow Startup'
    },
    completionDate: '2024-09',
    duration: '7 weeks',
    featured: false
  },
  {
    id: '6',
    slug: 'nft-gaming-platform',
    title: 'NFT-Based Gaming Platform',
    client: 'GameVerse Studios',
    category: 'Blockchain',
    shortDescription: 'Created a blockchain gaming platform with NFT collectibles and play-to-earn mechanics.',
    fullDescription: 'Developed a Web3 gaming ecosystem featuring NFT collectibles, marketplace, staking mechanisms, and play-to-earn functionality on the Polygon network.',
    image: '/images/portfolio/nft-gaming-full.jpg',
    thumbnail: '/images/portfolio/nft-gaming-thumb.jpg',
    challenge: 'GameVerse wanted to create an engaging blockchain game that wasn\'t just speculation. They needed true gaming value combined with NFT ownership and earning potential.',
    solution: 'Built a full-stack gaming platform with Unity integration, NFT minting and trading, token economics, and staking rewards. Optimized for low gas fees using Polygon and implemented anti-bot mechanisms.',
    results: [
      'Minted 10,000 NFTs, all sold in 3 hours',
      '15,000+ active monthly players',
      'Generated $5M in marketplace volume',
      'Maintained 99.9% uptime during peak traffic'
    ],
    metrics: [
      { label: 'NFT Sellout Time', value: '3 hours' },
      { label: 'Active Players', value: '15,000+' },
      { label: 'Marketplace Volume', value: '$5M' },
      { label: 'Uptime', value: '99.9%' }
    ],
    technologies: ['Solidity', 'Polygon', 'Unity', 'React', 'Web3.js', 'Node.js', 'IPFS', 'Moralis'],
    testimonial: {
      quote: 'The platform AiPlace built is incredible. Our players love it, and the blockchain integration is seamless. Best decision we made.',
      author: 'Sophia Martinez',
      position: 'Game Director',
      company: 'GameVerse Studios'
    },
    completionDate: '2024-08',
    duration: '6 months',
    featured: true
  },
  {
    id: '7',
    slug: 'ai-content-generator',
    title: 'AI Content Generation Platform',
    client: 'ContentCraft Media',
    category: 'AI',
    shortDescription: 'Developed an AI-powered platform for generating marketing content, blog posts, and social media copy.',
    fullDescription: 'Created an intelligent content generation system using advanced language models to produce high-quality, SEO-optimized content for various marketing channels.',
    image: '/images/portfolio/ai-content-full.jpg',
    thumbnail: '/images/portfolio/ai-content-thumb.jpg',
    challenge: 'ContentCraft\'s writers were overwhelmed with content demands from clients. They needed to scale content production while maintaining quality and brand voice consistency.',
    solution: 'Integrated GPT-4 API with custom fine-tuning for brand voices, built a collaborative editing interface, and added SEO optimization tools. Implemented workflow management for review and approval processes.',
    results: [
      'Increased content output by 400%',
      'Reduced production costs by 65%',
      'Maintained 92% client satisfaction',
      'Generated 50,000+ pieces of content'
    ],
    metrics: [
      { label: 'Content Output', value: '+400%' },
      { label: 'Cost Reduction', value: '65%' },
      { label: 'Client Satisfaction', value: '92%' },
      { label: 'Content Generated', value: '50,000+' }
    ],
    technologies: ['OpenAI API', 'React', 'Node.js', 'Python', 'MongoDB', 'Redis', 'TypeScript'],
    testimonial: {
      quote: 'This platform has transformed our business. We can now serve 5x more clients without sacrificing quality. Absolutely remarkable.',
      author: 'David Park',
      position: 'CEO',
      company: 'ContentCraft Media'
    },
    completionDate: '2024-07',
    duration: '5 months',
    featured: false
  },
  {
    id: '8',
    slug: 'enterprise-crm-system',
    title: 'Custom Enterprise CRM System',
    client: 'SalesForce Pro',
    category: 'Web',
    shortDescription: 'Built a tailored CRM system with advanced automation, reporting, and integration capabilities.',
    fullDescription: 'Developed a comprehensive CRM platform with sales pipeline management, customer analytics, email automation, and seamless integration with existing business tools.',
    image: '/images/portfolio/enterprise-crm-full.jpg',
    thumbnail: '/images/portfolio/enterprise-crm-thumb.jpg',
    challenge: 'SalesForce Pro outgrew their off-the-shelf CRM solution. They needed custom workflows, advanced reporting, and integrations that their current platform couldn\'t provide.',
    solution: 'Built a custom CRM from the ground up with modular architecture, API-first design for integrations, advanced analytics dashboard, and workflow automation engine. Migrated all data from legacy system with zero downtime.',
    results: [
      'Improved sales team productivity by 55%',
      'Reduced customer churn by 34%',
      'Automated 70% of repetitive tasks',
      'Achieved ROI in 8 months'
    ],
    metrics: [
      { label: 'Productivity Increase', value: '55%' },
      { label: 'Churn Reduction', value: '34%' },
      { label: 'Task Automation', value: '70%' },
      { label: 'ROI Timeline', value: '8 months' }
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'Redis', 'Docker', 'AWS', 'TypeScript'],
    testimonial: {
      quote: 'Our custom CRM has become our competitive advantage. The automation and insights have completely changed how our sales team operates.',
      author: 'Jennifer Liu',
      position: 'VP of Sales',
      company: 'SalesForce Pro'
    },
    completionDate: '2024-06',
    duration: '7 months',
    featured: false
  },
  {
    id: '9',
    slug: 'supply-chain-automation',
    title: 'AI-Driven Supply Chain Optimization',
    client: 'LogiTech Global',
    category: 'AI',
    shortDescription: 'Implemented AI algorithms to optimize logistics routes, inventory levels, and delivery schedules.',
    fullDescription: 'Created an intelligent supply chain management system that uses machine learning to predict demand, optimize routes, and automate procurement decisions.',
    image: '/images/portfolio/supply-chain-full.jpg',
    thumbnail: '/images/portfolio/supply-chain-thumb.jpg',
    challenge: 'LogiTech faced inefficiencies in their supply chain with delayed deliveries, excess inventory, and high logistics costs. Manual planning couldn\'t keep up with complexity.',
    solution: 'Developed ML models for demand forecasting, route optimization algorithms using reinforcement learning, and automated procurement triggers. Integrated with IoT sensors for real-time tracking.',
    results: [
      'Reduced delivery times by 42%',
      'Lowered logistics costs by 38%',
      'Decreased inventory holding costs by 51%',
      'Improved on-time delivery to 96%'
    ],
    metrics: [
      { label: 'Delivery Speed', value: '+42%' },
      { label: 'Cost Savings', value: '38%' },
      { label: 'Inventory Costs', value: '-51%' },
      { label: 'On-Time Delivery', value: '96%' }
    ],
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'IoT Integration'],
    testimonial: {
      quote: 'The AI optimization has revolutionized our operations. We\'re delivering faster and cheaper than ever before while keeping customers happier.',
      author: 'Robert Chang',
      position: 'COO',
      company: 'LogiTech Global'
    },
    completionDate: '2024-08',
    duration: '6 months',
    featured: false
  },
  {
    id: '10',
    slug: 'tokenized-real-estate',
    title: 'Tokenized Real Estate Investment Platform',
    client: 'PropertyChain',
    category: 'Blockchain',
    shortDescription: 'Built a blockchain platform for fractional real estate investment through tokenization.',
    fullDescription: 'Developed a regulatory-compliant platform that tokenizes real estate assets, enabling fractional ownership, trading, and dividend distribution via smart contracts.',
    image: '/images/portfolio/real-estate-token-full.jpg',
    thumbnail: '/images/portfolio/real-estate-token-thumb.jpg',
    challenge: 'PropertyChain wanted to democratize real estate investment by allowing fractional ownership, but needed to navigate complex regulatory requirements and ensure security.',
    solution: 'Created a security token platform with KYC/AML integration, smart contracts for dividend distribution, secondary market trading, and full regulatory compliance. Implemented multi-signature wallets and audit trails.',
    results: [
      'Tokenized $50M in real estate assets',
      'Enabled investments starting at $100',
      'Processed automated dividend distributions',
      'Achieved full SEC compliance'
    ],
    metrics: [
      { label: 'Assets Tokenized', value: '$50M' },
      { label: 'Minimum Investment', value: '$100' },
      { label: 'Investors Onboarded', value: '2,500+' },
      { label: 'Regulatory Compliance', value: '100%' }
    ],
    technologies: ['Solidity', 'Ethereum', 'React', 'Node.js', 'Web3.js', 'KYC API', 'AWS'],
    testimonial: {
      quote: 'AiPlace navigated the regulatory complexity brilliantly. Our platform is secure, compliant, and has opened real estate investment to thousands of new investors.',
      author: 'Michael Foster',
      position: 'Founder',
      company: 'PropertyChain'
    },
    completionDate: '2024-09',
    duration: '8 months',
    featured: false
  },
  {
    id: '11',
    slug: 'business-intelligence-platform',
    title: 'Business Intelligence & Analytics Platform',
    client: 'DataDrive Analytics',
    category: 'Business',
    shortDescription: 'Created a comprehensive BI platform with custom dashboards, automated reporting, and data visualization.',
    fullDescription: 'Developed an enterprise-grade business intelligence platform that aggregates data from multiple sources and provides real-time insights through customizable dashboards.',
    image: '/images/portfolio/bi-platform-full.jpg',
    thumbnail: '/images/portfolio/bi-platform-thumb.jpg',
    challenge: 'DataDrive\'s clients struggled with data scattered across multiple systems and no unified view of their business metrics. They needed a flexible, powerful BI solution.',
    solution: 'Built a data aggregation platform with connectors to 50+ data sources, real-time ETL pipelines, drag-and-drop dashboard builder, and automated report scheduling. Implemented role-based access and white-labeling.',
    results: [
      'Integrated 50+ data sources',
      'Reduced reporting time by 85%',
      'Increased data-driven decisions by 67%',
      'Served 200+ enterprise clients'
    ],
    metrics: [
      { label: 'Data Sources', value: '50+' },
      { label: 'Reporting Time', value: '-85%' },
      { label: 'Decision Improvement', value: '67%' },
      { label: 'Enterprise Clients', value: '200+' }
    ],
    technologies: ['React', 'D3.js', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'Apache Airflow', 'Docker'],
    testimonial: {
      quote: 'This BI platform has become our flagship product. Our clients love the flexibility and insights they get. Outstanding work by the AiPlace team.',
      author: 'Linda Washington',
      position: 'CEO',
      company: 'DataDrive Analytics'
    },
    completionDate: '2024-07',
    duration: '9 months',
    featured: false
  },
  {
    id: '12',
    slug: 'mobile-first-marketplace',
    title: 'Mobile-First Marketplace Application',
    client: 'LocalMarket Hub',
    category: 'Web',
    shortDescription: 'Developed a progressive web app for local marketplace with real-time chat and geolocation features.',
    fullDescription: 'Created a mobile-optimized marketplace PWA connecting local buyers and sellers with real-time messaging, location-based search, and integrated payment processing.',
    image: '/images/portfolio/mobile-marketplace-full.jpg',
    thumbnail: '/images/portfolio/mobile-marketplace-thumb.jpg',
    challenge: 'LocalMarket needed to compete with major marketplace apps while focusing on local communities. They required a fast, app-like experience without the cost of native development.',
    solution: 'Built a Progressive Web App with offline capabilities, push notifications, geolocation services, real-time WebSocket chat, and Stripe payment integration. Optimized for performance with service workers and lazy loading.',
    results: [
      'Achieved 95+ Lighthouse performance score',
      'Grew to 50,000+ active users',
      'Processed $3M in transactions',
      'Reduced bounce rate by 58%'
    ],
    metrics: [
      { label: 'Performance Score', value: '95+' },
      { label: 'Active Users', value: '50,000+' },
      { label: 'Transaction Volume', value: '$3M' },
      { label: 'Bounce Rate', value: '-58%' }
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'WebSocket', 'Stripe', 'Geolocation API', 'Service Workers', 'Vercel'],
    testimonial: {
      quote: 'The PWA approach was perfect for us. Users love the app-like experience, and we avoided the complexity and cost of building native apps.',
      author: 'Carlos Ramirez',
      position: 'Product Manager',
      company: 'LocalMarket Hub'
    },
    completionDate: '2024-08',
    duration: '5 months',
    featured: false
  }
];

export const categories: ServiceCategory[] = ['Web', 'AI', 'Business', 'Blockchain'];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getRelatedProjects(currentProject: Project, limit: number = 3): Project[] {
  return projects
    .filter(p => p.id !== currentProject.id && p.category === currentProject.category)
    .slice(0, limit);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}

export function getProjectsByCategory(category: ServiceCategory): Project[] {
  return projects.filter(p => p.category === category);
}
