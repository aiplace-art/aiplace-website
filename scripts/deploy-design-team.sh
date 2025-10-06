#!/bin/bash

# AiPlace Design Team Deployment Script
# This script coordinates the design team using Claude Flow swarm

set -e

echo "🎨 AiPlace Design Team Deployment"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Initialize swarm with hierarchical topology (best for design teams)
echo -e "${BLUE}📋 Initializing design swarm...${NC}"
npx claude-flow@alpha swarm init \
  --topology hierarchical \
  --max-agents 6 \
  --description "Professional design team for AiPlace website"

echo ""
echo -e "${GREEN}✓ Design swarm initialized${NC}"
echo ""

# Spawn design team agents
echo -e "${BLUE}👥 Spawning design team members...${NC}"
echo ""

echo "1. UI Designer - Visual design system"
npx claude-flow@alpha agent spawn \
  --type coder \
  --role ui-designer \
  --description "UI Designer specializing in visual design systems and component libraries"

echo "2. UX Designer - User experience optimization"
npx claude-flow@alpha agent spawn \
  --type researcher \
  --role ux-designer \
  --description "UX Designer focusing on user flows and usability"

echo "3. Brand Designer - Brand identity integration"
npx claude-flow@alpha agent spawn \
  --type coder \
  --role brand-designer \
  --description "Brand Designer ensuring visual consistency with logo"

echo "4. Motion Designer - Animations and interactions"
npx claude-flow@alpha agent spawn \
  --type coder \
  --role motion-designer \
  --description "Motion Designer creating engaging animations"

echo "5. Web Designer - Page layouts and structure"
npx claude-flow@alpha agent spawn \
  --type system-architect \
  --role web-designer \
  --description "Web Designer crafting responsive page layouts"

echo "6. Design Reviewer - Quality assurance"
npx claude-flow@alpha agent spawn \
  --type reviewer \
  --role design-reviewer \
  --description "Design Quality Reviewer ensuring excellence"

echo ""
echo -e "${GREEN}✓ Design team spawned (6 members)${NC}"
echo ""

# Show swarm status
echo -e "${PURPLE}📊 Design Team Status:${NC}"
npx claude-flow@alpha swarm status

echo ""
echo -e "${GREEN}✓ Design team ready for deployment!${NC}"
echo ""
echo "Next steps:"
echo "  1. Run design tasks with: npx claude-flow@alpha task orchestrate"
echo "  2. Monitor progress: npx claude-flow@alpha agent metrics"
echo "  3. Check swarm status: npx claude-flow@alpha swarm status"
echo ""
