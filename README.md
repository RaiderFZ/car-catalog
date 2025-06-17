# 🚗 Автокаталог (Next.js + TypeScript + App Router)

Тестовое задание: отобразить каталог автомобилей с сортировкой и пагинацией, используя Next.js и API.

## ✨ Стек

- ✅ [Next.js 14](https://nextjs.org/) (App Router)
- ✅ TypeScript
- ✅ CSS Modules (адаптивная верстка)
- ✅ SSR (серверный рендеринг)
- ✅ `URLSearchParams` для работы с query-параметрами
- ✅ Компонентный подход (Pagination, SortSelect, CarCard)

---

## 📸 Функциональность

- 📄 Список автомобилей (12 на странице)
- 🔢 Пагинация с синхронизацией через URL (`?page=2`)
- 🧭 Сортировка по цене (возрастание/убывание)
- 🖼️ Карточка: фото, марка, папка, цена
- 📱 Полностью адаптивный интерфейс (>360px)
- 🔄 Загрузка через `loading.tsx` + спиннер
- 🛑 Обработка ошибок и отсутствие данных (`error.tsx`, `not-found.tsx`)

---

## 🔗 Демо

🌐 [Посмотреть приложение на Vercel](https://your-deploy.vercel.app)

---

## 🚀 Запуск проекта локально

```bash
# Установка зависимостей
npm install

# Запуск в dev-режиме
npm run dev

🗂️ Структура проекта

app/
  cars/
    components/
      CarCard.tsx
      SortSelect.tsx
      Pagination.tsx
      ...
    page.tsx
    error.tsx
    not-found.tsx
    loading.tsx
lib/
  api.ts            # Вызов API
  utils.ts          # Работа с параметрами
