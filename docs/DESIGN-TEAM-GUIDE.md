# AiPlace Design Team Guide 🎨

## Overview

Professional design team using Claude Flow swarm coordination to create stunning, conversion-focused websites.

## Team Structure

### 6 Specialized Designers

1. **UI Designer** (`ui-designer`)
   - Visual design system
   - Component library
   - Color palette & typography
   - Icon design
   - **Agent**: `coder`

2. **UX Designer** (`ux-designer`)
   - User flow analysis
   - Information architecture
   - Usability optimization
   - Accessibility
   - **Agent**: `researcher`

3. **Brand Designer** (`brand-designer`)
   - Brand identity integration
   - Logo placement
   - Visual consistency
   - Brand voice
   - **Agent**: `coder`

4. **Motion Designer** (`motion-designer`)
   - Animations & transitions
   - Micro-interactions
   - Loading states
   - Scroll effects
   - **Agent**: `coder`

5. **Web Designer** (`web-designer`)
   - Page layouts
   - Grid systems
   - Responsive design
   - Cross-browser compatibility
   - **Agent**: `system-architect`

6. **Design Reviewer** (`design-reviewer`)
   - Quality assurance
   - Consistency checking
   - Accessibility audit
   - Performance review
   - **Agent**: `reviewer`

## Quick Start

### Deploy Design Team

```bash
# Run deployment script
./scripts/deploy-design-team.sh

# Or manually
npx claude-flow@alpha swarm init --topology hierarchical --max-agents 6
```

### Execute Design Tasks

```bash
# Orchestrate design workflow
npx claude-flow@alpha task orchestrate \
  --task "Redesign AiPlace homepage with modern UI" \
  --assign-to ui-designer,web-designer

# Monitor progress
npx claude-flow@alpha swarm status
npx claude-flow@alpha agent metrics
```

## Design Workflow

### Phase 1: Research & Analysis
**Agents**: UX Designer

Tasks:
- Analyze current design
- Identify pain points
- Research competitors
- Define user personas
- Create user flows

### Phase 2: Design System
**Agents**: UI Designer, Brand Designer

Tasks:
- Create color palette from logo
- Define typography scale
- Design component library
- Establish spacing system
- Create icon set

### Phase 3: Page Design
**Agents**: Web Designer, UI Designer

Tasks:
- Design homepage layout
- Create service pages
- Design portfolio section
- Build contact forms
- Create about page

### Phase 4: Motion & Interaction
**Agents**: Motion Designer

Tasks:
- Add page transitions
- Create hover effects
- Design loading states
- Implement scroll animations
- Add micro-interactions

### Phase 5: Review & Refine
**Agents**: Design Reviewer

Tasks:
- Conduct design audit
- Check accessibility
- Test responsiveness
- Validate performance
- Gather feedback

## Design Principles

### Visual Design
- Clean and modern aesthetics
- Consistent visual language
- Proper whitespace usage
- Clear visual hierarchy
- Professional typography

### User Experience
- User-centered design
- Intuitive navigation
- Fast load times
- Mobile-first approach
- Accessibility (WCAG AA)

### Brand Alignment
- Logo as focal point
- Brand color consistency
- Voice and tone alignment
- Trust and credibility
- Professional appearance

### Technical Excellence
- Performance optimization
- Cross-browser compatibility
- Responsive on all devices
- SEO-friendly markup
- Progressive enhancement

## AiPlace Project Specifics

### Brand Colors (from logo)
```css
Primary:   #3B82F6 (Blue)
Secondary: #06B6D4 (Cyan)
Accent 1:  #9333EA (Purple)
Accent 2:  #EC4899 (Pink)
Text:      #1E293B (Navy)
Background: #FFFFFF (White)
```

### Target Pages
1. Homepage (Hero, Services, Portfolio, Contact)
2. Service Pages (4 pages)
3. Portfolio + Case Studies
4. About Page
5. Blog
6. Contact Page

### Required Features
- AI chatbot widget
- Contact forms
- Newsletter signup
- Social media integration
- Responsive navigation

## Quality Metrics

### Visual
- Consistency: 100%
- Brand Alignment: Perfect match
- Modern Aesthetic: Contemporary patterns

### UX
- Navigation Clarity: Intuitive
- Load Time: < 2s
- Mobile Usability: Touch-optimized
- Accessibility: WCAG AA

### Technical
- Lighthouse Score: > 90
- Responsiveness: All breakpoints
- Browser Support: Modern browsers
- Performance: Optimized assets

## Commands Reference

### Swarm Management
```bash
# Initialize design swarm
npx claude-flow@alpha swarm init --topology hierarchical --max-agents 6

# Check swarm status
npx claude-flow@alpha swarm status

# View agent list
npx claude-flow@alpha agent list
```

### Task Orchestration
```bash
# Assign design task
npx claude-flow@alpha task orchestrate \
  --task "Create design system" \
  --assign-to ui-designer

# Check task status
npx claude-flow@alpha task status

# Get task results
npx claude-flow@alpha task results
```

### Agent Metrics
```bash
# View all agent metrics
npx claude-flow@alpha agent metrics

# View specific agent
npx claude-flow@alpha agent metrics --agent ui-designer
```

## Best Practices

1. **Always start with UX Designer** - Understand user needs first
2. **Establish design system early** - Consistency from the start
3. **Review frequently** - Regular quality checks
4. **Test on real devices** - Don't rely on simulators
5. **Measure performance** - Design for speed
6. **Get feedback** - Iterate based on user input

## Example Workflows

### Homepage Redesign
```bash
# 1. UX Research
npx claude-flow@alpha task orchestrate \
  --task "Analyze homepage user flow and create wireframes" \
  --assign-to ux-designer

# 2. Visual Design
npx claude-flow@alpha task orchestrate \
  --task "Design homepage hero section with logo integration" \
  --assign-to ui-designer,brand-designer

# 3. Implementation
npx claude-flow@alpha task orchestrate \
  --task "Build responsive homepage layout" \
  --assign-to web-designer

# 4. Animation
npx claude-flow@alpha task orchestrate \
  --task "Add scroll animations and hover effects" \
  --assign-to motion-designer

# 5. Review
npx claude-flow@alpha task orchestrate \
  --task "Conduct accessibility and performance audit" \
  --assign-to design-reviewer
```

## Troubleshooting

### Design doesn't match brand
→ Involve brand-designer early in process

### Poor mobile experience
→ Use mobile-first approach with web-designer

### Slow performance
→ Consult design-reviewer for optimization

### Inconsistent components
→ Review design system with ui-designer

## Support

- **Config**: `/config/design-team.json`
- **Deployment**: `./scripts/deploy-design-team.sh`
- **Documentation**: This file

---

**Ready to create amazing designs! 🚀**
