# 🛍️ Scandiweb Junior Developer Test – Frontend

This is the frontend part of the **Scandiweb Junior Developer Test** – a shopping website where users can browse products by category, view product details, add items to their cart (based on selected variations), and place an order.

This frontend app consumes a GraphQL API and is built with **React**, **Vite**, **Tailwind CSS**, and **TypeScript**.

---

## 🚀 Features

- 🗂️ Category-based product browsing
- 🔍 Product details page with attribute selection
- 🛒 Cart functionality with product variations
- 💸 Order placement (checkout)
- ⚡ Fast and lightweight with Vite

> **Note:** Product CRUD operations (create, update, delete) are not supported, as they were not part of the test requirements. Only placing an order is available via mutation.

---

## ⚙️ Tech Stack

- **React 19** + **Vite**
- **TypeScript**
- **GraphQL** via `@apollo/client`
- **Tailwind CSS** with Typography plugin
- **Zustand** for state management
- **React Router v7**
- **Lucide React** for icons
- `interweave` for rendering HTML safely
- `striptags` for content cleanup

---

## 🧩 Folder Structure

```
src/
├── apollo/         # Apollo Client setup
├── assets/         # Static assets (images, icons, etc.)
├── components/     # Reusable components
├── graphql/        # Queries & mutations
├── pages/          # Application pages
├── routes/         # Route definitions
├── store/          # Zustand store
├── types/          # TypeScript types
└── utils/          # Utility functions
```

Route definitions are managed in `src/routes/index.ts` like so:

```ts
export const routes = {
  home: "/",
  productShow: (id: string) => `/products/${id}`,
  category: (name: string) => `/${name}`,
};
```

---

## 📦 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/lukabuts/scandiweb-test-task-frontend.git
cd scandiweb-test-task-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and fill in your backend GraphQL API URL:

```
VITE_API_URL=https://your-api-endpoint.com
```

4. **Start the development server**

```bash
npm run dev
```

## 👨‍💻 Author

**Luka Butskhrikidze**