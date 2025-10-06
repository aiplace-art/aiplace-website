# Portfolio & Contact Pages Documentation

## Overview

This guide explains the portfolio and contact pages implementation for the AiPlace website, including features, customization, and integration.

## Files Created

### Portfolio Pages
- `/src/app/portfolio/page.tsx` - Main portfolio listing with filtering and sorting
- `/src/app/portfolio/[slug]/page.tsx` - Dynamic case study detail pages
- `/src/app/portfolio/layout.tsx` - SEO metadata for portfolio section
- `/src/data/portfolio.ts` - Portfolio data structure and sample projects

### Contact Page
- `/src/app/contact/page.tsx` - Contact form and information
- `/src/app/contact/layout.tsx` - SEO metadata for contact page
- `/src/app/api/contact/route.ts` - API endpoint for form submission

## Features

### Portfolio Listing Page (`/portfolio`)

**Filtering & Sorting**
- Filter by category: All, Web, AI, Business, Blockchain
- Sort by: Most Recent, Featured First, Category
- Real-time filtering with smooth animations
- Results counter

**Project Cards**
- Project image/thumbnail (placeholder gradient)
- Category badge with color coding
- Client name and completion date
- Short description
- Key metrics (top 2)
- Technologies used (top 3 + count)
- Featured badge for highlighted projects
- Hover effects and animations

**Responsive Design**
- Mobile: 1 column grid
- Tablet: 2 column grid
- Desktop: 3 column grid
- Sticky filter bar on scroll

### Case Study Page (`/portfolio/[slug]`)

**Dynamic Routing**
- SEO-optimized metadata per project
- 404 handling for invalid slugs
- Breadcrumb navigation

**Content Sections**
1. **Hero Section**
   - Project title and category
   - Client, duration, completion date
   - Full description
   - Key metrics (4 metrics in grid)

2. **Project Image**
   - Large hero image (placeholder)
   - Full-width responsive container

3. **Challenge/Solution/Results**
   - Structured storytelling format
   - Icon indicators for each section
   - Highlighted content boxes

4. **Technologies**
   - Technology badges
   - Hover effects

5. **Client Testimonial**
   - Quote with attribution
   - Company and position
   - Gradient background matching category

6. **Related Projects**
   - 3 projects from same category
   - Quick navigation cards

7. **CTA Section**
   - Call-to-action for similar projects
   - Links to contact and portfolio

### Contact Page (`/contact`)

**Contact Form**
- React Hook Form + Zod validation
- Required fields: name, email, service, message
- Optional fields: phone, company, budget, timeline
- Real-time validation with error messages
- Loading states during submission
- Success/error feedback

**Form Fields**
- Name (required, 2-100 characters)
- Email (required, valid email)
- Phone (optional)
- Company (optional)
- Service selection (6 options)
- Budget range (5 ranges + not sure)
- Timeline (5 options)
- Project details (required, 10-1000 characters)

**Contact Information**
- Email, phone, office address
- Clickable contact methods
- Office hours display
- Social media links (LinkedIn, Twitter, GitHub)
- Interactive map placeholder

**Additional Features**
- FAQ section
- Consultation booking CTA
- Response time expectations (24 hours)
- Responsive 2-column layout (form + info)

## Data Structure

### Project Interface

```typescript
interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: 'Web' | 'AI' | 'Business' | 'Blockchain';
  shortDescription: string;
  fullDescription: string;
  image: string;
  thumbnail: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string; }[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
    avatar?: string;
  };
  completionDate: string; // YYYY-MM
  duration: string;
  featured: boolean;
}
```

## Customization Guide

### Adding New Projects

Edit `/src/data/portfolio.ts`:

```typescript
const newProject: Project = {
  id: '13',
  slug: 'my-project-slug',
  title: 'My Project Title',
  client: 'Client Name',
  category: 'Web', // or 'AI', 'Business', 'Blockchain'
  shortDescription: 'Brief one-liner...',
  fullDescription: 'Detailed description...',
  image: '/images/portfolio/my-project-full.jpg',
  thumbnail: '/images/portfolio/my-project-thumb.jpg',
  challenge: 'The problem we solved...',
  solution: 'How we solved it...',
  results: [
    'Result 1',
    'Result 2',
    'Result 3',
  ],
  metrics: [
    { label: 'Metric Name', value: '100%' },
    { label: 'Another Metric', value: '5x' },
  ],
  technologies: ['React', 'Node.js', 'PostgreSQL'],
  testimonial: {
    quote: 'Great work!',
    author: 'John Doe',
    position: 'CEO',
    company: 'Company Inc',
  },
  completionDate: '2024-10',
  duration: '6 months',
  featured: true,
};

// Add to projects array
export const projects: Project[] = [
  // ... existing projects,
  newProject,
];
```

### Customizing Colors

Category colors are defined in the component. To change:

```typescript
const getCategoryColor = (category: ServiceCategory) => {
  const colors = {
    Web: 'from-blue-600 to-blue-700',      // Change these
    AI: 'from-purple-600 to-purple-700',
    Business: 'from-green-600 to-green-700',
    Blockchain: 'from-orange-600 to-orange-700',
  };
  return colors[category];
};
```

### Updating Contact Information

Edit `/src/app/contact/page.tsx`:

```typescript
const contactMethods = [
  {
    title: 'Email',
    value: 'your-email@domain.com',    // Update here
    link: 'mailto:your-email@domain.com',
  },
  {
    title: 'Phone',
    value: '+1 (555) 123-4567',        // Update here
    link: 'tel:+15551234567',
  },
  {
    title: 'Office',
    value: 'Your Address',              // Update here
    link: 'https://maps.google.com/?q=Your+Address',
  },
];
```

### Configuring Email Service

Edit `/src/app/api/contact/route.ts` to integrate your email service:

**Example with SendGrid:**
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  const validatedData = contactFormSchema.parse(await request.json());

  await sgMail.send({
    to: 'hello@aiplace.com',
    from: 'noreply@aiplace.com',
    subject: `New Contact Form: ${validatedData.service}`,
    text: `
      Name: ${validatedData.name}
      Email: ${validatedData.email}
      Service: ${validatedData.service}
      Message: ${validatedData.message}
    `,
  });

  return NextResponse.json({ success: true });
}
```

**Example with Resend:**
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const validatedData = contactFormSchema.parse(await request.json());

  await resend.emails.send({
    from: 'noreply@aiplace.com',
    to: 'hello@aiplace.com',
    subject: `New Contact Form: ${validatedData.service}`,
    html: `<p>New contact form submission from ${validatedData.name}</p>`,
  });

  return NextResponse.json({ success: true });
}
```

## SEO Optimization

### Metadata Configuration

Both sections have optimized metadata:

**Portfolio:**
- Title: "Portfolio - Success Stories & Case Studies | AiPlace"
- Description: Highlights project variety and results
- OpenGraph and Twitter cards configured
- Dynamic metadata per project

**Contact:**
- Title: "Contact Us - Get in Touch | AiPlace"
- Description: Emphasizes response time and services
- OpenGraph and Twitter cards configured

### Improving SEO Further

1. **Add Structured Data (JSON-LD)**
   ```typescript
   // In portfolio/[slug]/page.tsx
   const structuredData = {
     "@context": "https://schema.org",
     "@type": "CreativeWork",
     "name": project.title,
     "description": project.shortDescription,
     "author": {
       "@type": "Organization",
       "name": "AiPlace"
     }
   };
   ```

2. **Add Sitemap Entries**
   ```typescript
   // In app/sitemap.ts
   const portfolioUrls = projects.map(project => ({
     url: `https://aiplace.com/portfolio/${project.slug}`,
     lastModified: new Date(project.completionDate),
   }));
   ```

3. **Add Canonical URLs**
   Already configured in metadata

## Performance Optimizations

### Current Optimizations
- Framer Motion animations are optimized
- AnimatePresence for smooth transitions
- Lazy loading ready for images (add next/image)
- Memoized filtering and sorting

### Recommended Additions

1. **Image Optimization**
   ```typescript
   import Image from 'next/image';

   <Image
     src={project.image}
     alt={project.title}
     width={1200}
     height={600}
     priority={project.featured}
   />
   ```

2. **Lazy Load Portfolio Grid**
   ```typescript
   import dynamic from 'next/dynamic';

   const PortfolioGrid = dynamic(() => import('@/components/PortfolioGrid'), {
     loading: () => <LoadingSkeleton />,
   });
   ```

## Testing

### Manual Testing Checklist

**Portfolio Page:**
- [ ] All category filters work correctly
- [ ] Sorting options work correctly
- [ ] Project cards display all information
- [ ] Links navigate to correct case studies
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Animations are smooth
- [ ] Empty state shows when no results

**Case Study Page:**
- [ ] All project data displays correctly
- [ ] Breadcrumb navigation works
- [ ] Related projects appear
- [ ] Testimonial displays when available
- [ ] CTA buttons work
- [ ] Responsive design works
- [ ] 404 page for invalid slugs

**Contact Page:**
- [ ] Form validation works for all fields
- [ ] Required fields show errors when empty
- [ ] Email validation works
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Error message appears on failure
- [ ] Loading state shows during submission
- [ ] Contact information is correct
- [ ] Social links work
- [ ] Responsive design works

### Automated Testing

```typescript
// Example test for portfolio filtering
describe('Portfolio Page', () => {
  it('filters projects by category', () => {
    render(<PortfolioPage />);

    fireEvent.click(screen.getByText('AI'));

    const projectCards = screen.getAllByRole('link');
    projectCards.forEach(card => {
      expect(card).toHaveTextContent('AI');
    });
  });
});

// Example test for contact form
describe('Contact Form', () => {
  it('validates required fields', async () => {
    render(<ContactPage />);

    fireEvent.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
    });
  });
});
```

## Deployment Checklist

Before deploying:

1. [ ] Replace placeholder images with real images
2. [ ] Configure email service in API route
3. [ ] Update contact information (email, phone, address)
4. [ ] Update social media links
5. [ ] Add Google Maps integration (optional)
6. [ ] Test form submission in production
7. [ ] Verify all project slugs are unique
8. [ ] Check SEO metadata
9. [ ] Test on multiple devices
10. [ ] Run Lighthouse audit

## Future Enhancements

1. **Analytics Integration**
   - Track portfolio views
   - Track form submissions
   - Monitor conversion rates

2. **CMS Integration**
   - Move project data to headless CMS
   - Enable non-technical content updates

3. **Advanced Filtering**
   - Filter by technology
   - Filter by industry
   - Search functionality

4. **Enhanced Contact Form**
   - File upload for project briefs
   - Calendar integration for booking
   - Live chat integration

5. **Portfolio Enhancements**
   - Video case studies
   - Interactive demos
   - Client logos carousel

## Support

For questions or issues, contact the development team or refer to the main project documentation.
