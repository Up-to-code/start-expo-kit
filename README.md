# Start Expo Kit

A modern Expo app with Better Auth integration, connected to the [start-kit](https://github.com/Up-to-code/start-kit) Next.js backend.

## Get started

- 🔐 **Complete Authentication System**
  - Email/password authentication
  - Social authentication (Google, etc.)
  - Protected routes with auto-redirect
  - Session management with SecureStore
- 🎨 **Organized Structure**
  - Route groups: `(auth)` and `(home)`
  - Custom hooks: `useAuth`, `useSession`
  - Reusable auth components
  - Clean folder organization
- 🚀 **Modern Stack**
  - Expo Router for file-based routing
  - Better Auth for authentication
  - TypeScript for type safety
  - React Native with Expo

## 📋 Prerequisites

- Node.js 18+ or Bun
- MongoDB database (configured in start-kit backend)
- [Start-kit backend](https://github.com/Up-to-code/start-kit) running

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
bun install
# or
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root:

```bash
EXPO_PUBLIC_AUTH_URL=http://localhost:3000
```

For physical devices, use your computer's local IP:
```bash
EXPO_PUBLIC_AUTH_URL=http://192.168.1.100:3000
```

### 3. Configure Start-Kit Backend

See [SETUP.md](./SETUP.md) for detailed backend configuration instructions.

### 4. Start the App

```bash
bun start
# or
npm start
```

Then:
- Press `a` for Android
- Press `i` for iOS
- Press `w` for web
- Scan QR code for Expo Go

## 📁 Project Structure

```
app/
├── (auth)/              # Authentication screens
│   ├── sign-in.tsx
│   ├── sign-up.tsx
│   └── social-sign-in.tsx
├── (home)/              # Protected screens
│   ├── index.tsx
│   └── profile.tsx
└── _layout.tsx

lib/
├── auth/
│   └── client.ts        # Auth client config
└── utils.ts

hooks/
├── use-auth.ts          # Auth operations
└── use-session.ts       # Session management

components/
└── auth/
    ├── auth-wrapper.tsx  # Route protection
    └── auth-form.tsx     # Reusable form
```

## 🔑 Authentication

### Using the Auth Hook

```typescript
import { useAuth } from "@/hooks/use-auth";

function MyComponent() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();

  if (!isAuthenticated) {
    return <Text>Please sign in</Text>;
  }

  return <Text>Welcome, {user?.name}!</Text>;
}
```

### Using the Session Hook

```typescript
import { useSession } from "@/hooks/use-session";

function MyComponent() {
  const { session, user, isPending } = useSession();

  if (isPending) return <Text>Loading...</Text>;

  return <Text>Email: {user?.email}</Text>;
}
```

### Protected Routes

Routes in `(home)` are automatically protected. The `AuthWrapper` component handles redirects based on authentication status.

## 📚 Documentation

- [SETUP.md](./SETUP.md) - Complete setup guide
- [Better Auth Docs](https://www.better-auth.com/docs)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)

## 🐛 Troubleshooting

See [SETUP.md](./SETUP.md) for troubleshooting guide.

## 📝 Scripts

```bash
bun start          # Start Expo dev server
bun android        # Start on Android
bun ios            # Start on iOS
bun web            # Start on web
bun lint           # Run ESLint
```

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

---

Built with ❤️ using Expo and Better Auth
