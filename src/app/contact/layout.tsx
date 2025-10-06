import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | AiPlace',
  description: 'Ready to start your project? Contact AiPlace for web development, AI solutions, business applications, and blockchain development. We respond within 24 hours.',
  keywords: 'contact, get in touch, consultation, project inquiry, web development contact, AI solutions contact, blockchain development',
  openGraph: {
    title: 'Contact Us - Get in Touch | AiPlace',
    description: 'Ready to start your project? Contact AiPlace for expert web development, AI solutions, and blockchain development.',
    type: 'website',
    images: [
      {
        url: '/images/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact AiPlace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Get in Touch | AiPlace',
    description: 'Ready to start your project? Contact AiPlace for expert development services.',
    images: ['/images/contact-og.jpg'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
