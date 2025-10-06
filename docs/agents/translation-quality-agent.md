# Translation Quality Monitor Agent

## Overview

**Agent Name**: Translation Quality Monitor
**Purpose**: Ensure accurate, natural Russian translations that maintain AiPlace brand voice
**Version**: 1.0.0
**Last Updated**: 2025-10-06

## Agent Specifications

### Primary Responsibilities

#### 1. Translation Review
Review all Russian translations for:
- **Grammatical Correctness**: Proper Russian grammar, syntax, and spelling
- **Natural Flow**: Idiomatic expressions and readable text
- **Technical Term Accuracy**: Correct translation of AI/tech terminology
- **Brand Voice Consistency**: Maintain AiPlace's professional yet approachable tone
- **Cultural Appropriateness**: Ensure culturally relevant and sensitive content

#### 2. Quality Metrics Monitoring
- **Completeness**: Verify all JSON keys have Russian translations
- **Consistency**: Ensure same terms translated uniformly across the platform
- **Length Parity**: Check Russian text length is appropriate for UI constraints
- **Contextual Accuracy**: Validate translations fit the context and user flow

#### 3. Feedback & Recommendations
- Better word choices for technical and marketing terms
- More natural phrasing suggestions
- Technical terminology standardization
- Marketing appeal enhancement
- UI/UX text optimization

#### 4. Validation Rules
- No machine-translation artifacts (awkward phrasing, literal translations)
- Proper Russian grammar and syntax
- Appropriate formality level (вы vs. ты)
- Clear and compelling call-to-actions
- Consistent punctuation and formatting

## Quality Checklist

### Pre-Deployment Validation
- [ ] All JSON keys have Russian translations
- [ ] Grammar and spelling are correct
- [ ] Technical terms are properly translated
- [ ] Marketing copy is compelling in Russian
- [ ] UI text fits within design constraints
- [ ] Brand voice is maintained across all content
- [ ] No placeholder or English text remains
- [ ] Special characters and encoding are correct
- [ ] Date/time formats follow Russian conventions
- [ ] Currency and number formats are localized

### Continuous Monitoring
- [ ] User feedback on translation quality
- [ ] A/B test results for marketing copy
- [ ] Bounce rates on Russian pages
- [ ] Support ticket analysis for confusion
- [ ] Competitor translation benchmarking

## Technical Implementation

### Hook Integration

The agent integrates with Claude-Flow hooks for automated quality checks:

```bash
# Pre-task hook: Load translation context
npx claude-flow@alpha hooks pre-task \
  --description "Translation quality review for Russian locale" \
  --agent "translation-quality-monitor"

# Session restore: Load previous translation decisions
npx claude-flow@alpha hooks session-restore \
  --session-id "translation-qa-session" \
  --memory-key "translations/russian/decisions"

# Post-edit hook: Validate translation after changes
npx claude-flow@alpha hooks post-edit \
  --file "locales/ru.json" \
  --memory-key "translations/russian/audit"

# Notify: Alert team of quality issues
npx claude-flow@alpha hooks notify \
  --message "Translation quality review completed" \
  --severity "info"

# Post-task hook: Store validation results
npx claude-flow@alpha hooks post-task \
  --task-id "translation-qa" \
  --results "quality-report.json"

# Session end: Export metrics
npx claude-flow@alpha hooks session-end \
  --export-metrics true \
  --session-id "translation-qa-session"
```

### Validation Script

The agent uses automated validation scripts (see `/scripts/translation-quality-validator.js`).

## Translation Quality Standards

### Grammar & Syntax
- **Case Agreement**: Proper use of Russian cases (именительный, родительный, etc.)
- **Gender Agreement**: Adjectives and verbs agree with noun gender
- **Aspect Usage**: Correct perfective/imperfective verb aspects
- **Word Order**: Natural Russian word order (not English-influenced)

### Technical Terminology
| English | Russian | Notes |
|---------|---------|-------|
| AI | ИИ | Standard abbreviation |
| Machine Learning | Машинное обучение | Full term preferred |
| Neural Network | Нейронная сеть | Not "нейросеть" in formal context |
| API | API | Keep as Latin acronym |
| Cloud | Облако | Translate, well-understood |
| Dashboard | Панель управления | Translate for clarity |
| Workflow | Рабочий процесс | Translate fully |

### Brand Voice Guidelines

**AiPlace Russian Voice**:
- **Tone**: Professional but approachable
- **Formality**: Use "вы" (formal you) for user-facing content
- **Style**: Clear, concise, action-oriented
- **Avoid**: Overly technical jargon, literal translations, Anglicisms

**Good Examples**:
- ✅ "Создайте AI-агента за минуты" (Create an AI agent in minutes)
- ✅ "Начать работу" (Get started)
- ✅ "Ваши проекты" (Your projects)

**Bad Examples**:
- ❌ "Креатить AI-агента быстро" (Using "креатить" - Anglicism)
- ❌ "Стартовать" (Using "стартовать" instead of proper Russian)
- ❌ "Твои проекты" (Informal "ты" in professional context)

### UI Constraints

- **Button Text**: Maximum 20 characters
- **Headings**: Maximum 50 characters
- **Tooltips**: Maximum 100 characters
- **Error Messages**: Maximum 200 characters
- **Form Labels**: Maximum 30 characters

Russian text typically runs 10-15% longer than English. Plan accordingly.

## Validation Workflow

### Automated Checks (Pre-Commit)
1. **JSON Validity**: Ensure proper JSON structure
2. **Key Coverage**: All English keys have Russian equivalents
3. **Character Encoding**: UTF-8 validation
4. **Length Constraints**: Check UI text length limits
5. **Placeholder Detection**: Find untranslated strings

### Manual Review (Weekly)
1. **Contextual Accuracy**: Review translations in UI context
2. **User Feedback**: Analyze support tickets and user comments
3. **Competitor Analysis**: Benchmark against Russian AI platforms
4. **Native Speaker Review**: Monthly review by Russian linguist
5. **A/B Testing**: Test marketing copy variants

### Quality Metrics

**Target Scores**:
- Grammar Accuracy: 99%+
- Consistency Score: 95%+
- User Satisfaction: 4.5/5+
- Bounce Rate: <5% for Russian pages
- Support Tickets (translation-related): <2% of total

## Integration with Development Workflow

### Git Hooks
```bash
# Pre-commit: Run validation
.git/hooks/pre-commit:
  node scripts/translation-quality-validator.js

# Pre-push: Full quality check
.git/hooks/pre-push:
  npm run translation:validate
```

### CI/CD Pipeline
```yaml
# .github/workflows/translation-qa.yml
- name: Translation Quality Check
  run: |
    npm run translation:validate
    npm run translation:metrics
```

### Memory Integration
Store translation decisions for consistency:
```bash
# Store terminology decision
npx claude-flow@alpha memory store \
  --key "translations/russian/terms/workflow" \
  --value "рабочий процесс" \
  --metadata "Preferred over 'рабочий поток'"

# Retrieve for consistency
npx claude-flow@alpha memory retrieve \
  --key "translations/russian/terms/*"
```

## Escalation Protocol

### Minor Issues (Auto-Fix)
- Spelling errors
- Punctuation inconsistencies
- Formatting issues
- → Automated correction + log

### Medium Issues (Review Required)
- Grammar errors
- Awkward phrasing
- Length constraint violations
- → Flag for developer review

### Major Issues (Block Deployment)
- Missing translations
- Incorrect technical terms
- Brand voice violations
- Cultural insensitivity
- → Prevent merge, require manual fix

## Continuous Improvement

### Learning Loop
1. **Collect**: User feedback, support tickets, analytics
2. **Analyze**: Identify patterns in translation issues
3. **Update**: Refine terminology and guidelines
4. **Train**: Update validation rules and neural patterns
5. **Monitor**: Track improvement metrics

### Neural Pattern Training
```bash
# Train on successful translations
npx claude-flow@alpha hooks neural-train \
  --pattern "russian-translation-quality" \
  --data "translation-history.json"

# Apply learned patterns
npx claude-flow@alpha hooks neural-apply \
  --pattern "russian-translation-quality" \
  --file "locales/ru.json"
```

## Resources

### External Tools
- **Grammar Check**: https://languagetool.org/ru
- **Dictionary**: https://dic.academic.ru/
- **Style Guide**: Russian Typographic Traditions
- **AI Terms**: Russian AI/ML terminology database

### Team Contacts
- **Lead Linguist**: [Contact for complex questions]
- **Product Manager**: [For brand voice decisions]
- **Development Lead**: [For technical constraints]

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-10-06 | Initial agent specification |

---

**Maintained by**: AiPlace Translation Quality Team
**Review Cycle**: Monthly
**Next Review**: 2025-11-06
