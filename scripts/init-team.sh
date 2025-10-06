#!/bin/bash

# Скрипт инициализации команды разработки сайтов
# Website Development Team Initialization Script

echo "🚀 Инициализация команды профессионалов по созданию сайтов..."
echo ""

# Проверка наличия Claude Flow
if ! command -v npx &> /dev/null; then
    echo "❌ npx не найден. Установите Node.js"
    exit 1
fi

echo "📦 Проверка Claude Flow..."
npx claude-flow@alpha --version 2>/dev/null || {
    echo "⚡ Установка Claude Flow..."
    npm install -g claude-flow@alpha
}

echo ""
echo "🎯 Инициализация Swarm с иерархической топологией..."
npx claude-flow@alpha swarm init --topology hierarchical --max-agents 8

echo ""
echo "👥 Активация команды из 8 специалистов:"
echo "   1️⃣  Project Manager (Оркестратор)"
echo "   2️⃣  UI/UX Designer"
echo "   3️⃣  Frontend Developer"
echo "   4️⃣  Backend Developer"
echo "   5️⃣  Full-Stack Developer"
echo "   6️⃣  DevOps Engineer"
echo "   7️⃣  QA Engineer"
echo "   8️⃣  SEO Specialist"

echo ""
echo "📋 Создание первоначального сеанса..."
npx claude-flow@alpha hooks session-restore --session-id "website-team-$(date +%Y%m%d)"

echo ""
echo "✅ Команда готова к работе!"
echo ""
echo "📚 Документация:"
echo "   - Структура команды: docs/team-structure.md"
echo "   - Руководство по workflow: docs/workflow-guide.md"
echo "   - Конфигурация: config/orchestrator.json"
echo ""
echo "🎯 Следующие шаги:"
echo "   1. Изучите документацию команды"
echo "   2. Запустите агентов для вашего проекта"
echo "   3. Используйте npx claude-flow@alpha swarm status для мониторинга"
echo ""
echo "💡 Пример запуска проекта:"
echo "   Task('PM', 'Plan new website project', 'task-orchestrator')"
echo "   Task('Designer', 'Create design system', 'researcher')"
echo "   Task('Frontend', 'Setup React project', 'coder')"
echo ""
