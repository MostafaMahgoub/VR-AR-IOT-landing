# AR-VR-IOT

A modern web application built with Next.js, React, and TypeScript, featuring a beautiful UI powered by Tailwind CSS and ShadCN UI components.

## 🚀 Features

- Modern and responsive user interface
- Type-safe development with TypeScript
- Component-based architecture
- Form handling with React Hook Form and Zod validation
- Beautiful animations and transitions
- Carousel functionality with Embla Carousel
- Accessible UI components with ShadCN UI

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: 
  - ShadCN UI (Dialog, Label, Select, Slot)
  - Custom components with class-variance-authority
- **Form Handling**: 
  - React Hook Form
  - Zod for validation
- **Animations**: 
  - Motion
  - Tailwind CSS Animate
- **Icons**: Lucide React
- **Carousel**: Embla Carousel

## 📁 Project Structure

```
gas-tech/
├── src/
│   ├── app/           # Next.js app directory (pages and layouts)
│   ├── components/    # Reusable React components
│   └── lib/          # Utility functions and shared logic
├── public/           # Static assets
├── .next/           # Next.js build output
└── configuration files
    ├── tailwind.config.ts    # Tailwind CSS configuration
    ├── tsconfig.json         # TypeScript configuration
    ├── next.config.mjs       # Next.js configuration
    └── postcss.config.mjs    # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd gas-tech
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🎨 UI Components

The project uses a combination of ShadCN UI primitives and custom components:

- Dialog components for modal windows
- Label components for form inputs
- Select components for dropdown menus
- Slot components for component composition

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling with custom configuration in `tailwind.config.ts`. It includes:
- Custom color schemes
- Animation utilities
- Responsive design utilities

### TypeScript
TypeScript configuration is set up in `tsconfig.json` with strict type checking and modern JavaScript features enabled.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

