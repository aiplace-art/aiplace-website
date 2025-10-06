import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - Success Stories & Case Studies | AiPlace',
  description: 'Explore our portfolio of successful web development, AI solutions, business applications, and blockchain projects. See real results from our client partnerships.',
  keywords: 'portfolio, case studies, web development projects, AI solutions, blockchain development, business applications, success stories',
  openGraph: {
    title: 'Portfolio - Success Stories & Case Studies | AiPlace',
    description: 'Explore our portfolio of successful web development, AI solutions, business applications, and blockchain projects.',
    type: 'website',
    images: [
      {
        url: '/images/portfolio-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AiPlace Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Success Stories & Case Studies | AiPlace',
    description: 'Explore our portfolio of successful projects across web development, AI, and blockchain.',
    images: ['/images/portfolio-og.jpg'],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
