# Login Screen

This is a custom login screen for the Volt Vision mobile application.

## Features

- Email/Phone input field
- Password input field with show/hide toggle
- Remember me switch
- Forgot password link
- Sign in button
- Social login options (Facebook & Google)
- Bottom navigation bar with 5 tabs (Home, Map, Session, AI, Profile)

## Styling

The login screen uses a dark theme with the following color scheme:
- Background: `#0F1C2E` (dark blue)
- Input fields: `#1E3A47` (teal-gray)
- Primary button: `#40E0D0` (turquoise)
- Text: White and gray variants

## Usage

The login screen is currently set as the main screen in `App.tsx`. To use it:

```tsx
import LoginScreen from '../screens/LoginScreen';

export const App = () => {
  return <LoginScreen />;
};
```

## TODO

The following features need to be implemented:

1. **Authentication Logic**
   - Connect email/password login to backend API
   - Implement Facebook OAuth integration
   - Implement Google OAuth integration
   - Add form validation
   - Handle loading states
   - Display error messages

2. **Navigation**
   - Set up React Navigation
   - Connect bottom navigation tabs to actual screens
   - Implement back button functionality
   - Navigate to home screen after successful login

3. **State Management**
   - Consider using Context API or Redux for auth state
   - Persist "Remember me" preference
   - Store authentication tokens securely

4. **Additional Features**
   - Add password recovery flow
   - Add sign up screen
   - Add biometric authentication (Face ID/Touch ID)
   - Add animations and transitions

## File Structure

```
apps/mobile/src/
├── app/
│   └── App.tsx              # Main app entry point
└── screens/
    ├── LoginScreen.tsx      # Login screen component
    └── index.ts             # Screen exports
```
