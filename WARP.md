# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Development Commands

### Development Server
```bash
# Start the Next.js development server with Turbopack
npm run dev

# Start the Genkit development server for AI flows
npm run genkit:dev

# Start Genkit with file watching
npm run genkit:watch
```

### Building and Production
```bash
# Build the application for production
npm run build

# Start the production server
npm start

# Type checking
npm run typecheck
```

### Code Quality
```bash
# Run ESLint
npm run lint
```

### Firebase Functions
```bash
# Navigate to Firebase functions directory
cd src/firebase/functions

# Build Firebase functions
npm run build

# Serve functions locally
npm run serve

# Deploy functions to Firebase
npm run deploy

# View function logs
npm run logs
```

## Architecture Overview

### Technology Stack
- **Frontend**: Next.js 15 with React 18, TypeScript
- **UI Components**: Radix UI with Tailwind CSS and Shadcn/UI
- **AI Integration**: Google Genkit with Gemini models
- **Backend**: Firebase (Firestore, Cloud Functions, Authentication, Storage)
- **Styling**: Tailwind CSS with custom design system
- **External Integration**: Google Sheets API for data synchronization

### Project Structure

#### Core Directories
- `src/app/` - Next.js app router pages and layouts
  - `(main)/` - Main application layout with header and bottom navigation
  - `login/` - Authentication pages
- `src/components/` - React components
  - `ui/` - Shadcn/UI components
  - `admin/` - Administrative components (event forms, poster generator)
- `src/ai/` - AI/ML functionality using Google Genkit
  - `flows/` - AI workflow definitions
- `src/firebase/` - Firebase configuration and Cloud Functions
  - `functions/` - Cloud Functions for backend logic

#### Key Components
- **Mobile-First Design**: Application is built as a mobile web app with max-width container
- **Theme Support**: Dark/light mode with next-themes
- **Authentication**: Firebase Auth with localStorage session persistence
- **AI-Powered Features**: Event poster generation using Imagen model

### Application Flow
1. **Splash Screen**: Initial loading screen that checks authentication state
2. **Authentication**: Login flow with Firebase Auth
3. **Main App**: Mobile-optimized layout with header and bottom navigation
4. **Admin Features**: Event management and AI poster generation

### Firebase Integration

#### Cloud Functions
- **Resident Management**: Automatic Google Sheets synchronization
  - `onResidentCreate`: Adds new residents to Google Sheets
  - `onResidentUpdate`: Updates existing resident data in sheets
- **Environment Variables Required**:
  - `GOOGLE_SHEET_ID`
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`  
  - `GOOGLE_PRIVATE_KEY`

#### Frontend Configuration
Firebase client configuration uses environment variables:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### AI Capabilities

#### Google Genkit Integration
- **Primary Model**: `googleai/gemini-2.5-flash`
- **Image Generation**: `googleai/imagen-4.0-fast-generate-001` for poster creation
- **Flow-Based Architecture**: AI workflows are defined as flows with input/output schemas
- **Server Actions**: AI functions run as Next.js server actions

#### Event Poster Generation
- Input: Event title and description
- Output: AI-generated poster as data URI
- Features: Download functionality, visual preview

### Development Notes

#### Path Aliases
- `@/*` maps to `./src/*` for clean imports

#### Styling System
- Custom color palette with CSS variables
- Sidebar-specific color tokens
- Animation utilities for accordion and other interactions
- Custom fonts: Inter (headlines), Nunito (body), monospace (code)

#### Mobile-Optimized Layout
- Fixed header and bottom navigation
- Content area with padding to avoid overlap
- Maximum width container with shadows for desktop viewing

#### Component Patterns
- Extensive use of Radix UI primitives
- Class Variance Authority (CVA) for component variants
- Tailwind Merge for class conflict resolution
- React Hook Form with Zod validation