# 🚀 Volt-Vision Mobile App - Getting Started Guide

## 📱 Project Overview

This is your Volt-Vision mobile application built with:
- **Nx** - Monorepo framework
- **React Native** - Mobile framework
- **Expo Go** - Development and deployment platform
- **TypeScript** - Type-safe JavaScript

## 🎯 Quick Start

### 1. Start Development Server

```powershell
# Navigate to workspace
cd E:\Projects\ev\Volt-Vision-\y

# Start Expo development server
npx nx start mobile
```

### 2. Test on Your Phone

1. **Install Expo Go** on your mobile device:
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Scan QR Code**:
   - iOS: Use Camera app
   - Android: Use Expo Go app scanner

3. **App will load** on your device!

## 📋 Available Commands

### Development
```powershell
npx nx start mobile          # Start development server
npx nx run-ios mobile        # Run on iOS simulator (Mac only)
npx nx run-android mobile    # Run on Android emulator
```

### Building & Testing
```powershell
npx nx build mobile          # Build the app
npx nx export mobile         # Export for production
npx nx prebuild mobile       # Generate native projects
```

### Utilities
```powershell
npx nx graph                 # View project dependency graph
npx nx show project mobile   # Show project details
```

## 📁 Project Structure

```
y/
├── apps/
│   ├── mobile/              # Your Expo React Native app
│   │   ├── src/
│   │   │   └── app/
│   │   │       └── App.tsx  # Main app component
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── app.json         # Expo configuration
│   │   └── package.json
│   └── mobile-e2e/          # E2E tests
├── tools/                   # Build scripts
├── nx.json                  # Nx configuration
├── package.json             # Root dependencies
└── tsconfig.base.json       # TypeScript configuration
```

## 🛠️ Next Steps

### 1. Create Shared Libraries

Generate a UI library:
```powershell
npx nx g @nx/react-native:lib ui
```

Generate a data access library:
```powershell
npx nx g @nx/react-native:lib data-access
```

### 2. Add Components

Create a component in the UI library:
```powershell
npx nx g @nx/react-native:component button --project=ui --export
```

### 3. Set Up for Volt-Vision

Your app will need:
- **Authentication** - User login/signup
- **Maps Integration** - Google Maps for charging stations
- **Payment Processing** - For charging payments
- **Real-time Updates** - Station availability

## 📚 Recommended Structure for Volt-Vision

```
y/
├── apps/
│   ├── mobile-user/         # User app (find & use chargers)
│   ├── mobile-owner/        # Owner app (manage stations)
│   └── web-dashboard/       # Admin web panel
├── libs/
│   ├── shared/
│   │   ├── ui/             # Shared UI components
│   │   ├── data-access/    # API calls & state
│   │   ├── auth/           # Authentication logic
│   │   ├── maps/           # Maps integration
│   │   ├── payment/        # Payment processing
│   │   └── types/          # TypeScript interfaces
│   └── mobile/
│       ├── features/       # Mobile-specific features
│       └── components/     # Mobile-specific components
```

## 🔧 Configuration Files

### app.json
Configure your Expo app settings (name, icon, splash screen, etc.)

### nx.json
Configure Nx workspace settings and task pipelines

### tsconfig.base.json
Configure TypeScript compiler options and path mappings

## 📖 Learning Resources

- [Nx Documentation](https://nx.dev)
- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)

## 🐛 Troubleshooting

### Disk Space Issues
If you encounter `ENOSPC` errors:
```powershell
npm cache clean --force
npm config set cache "E:\npm-cache" --global
```

### Metro Bundler Issues
If the bundler fails to start:
```powershell
npx nx reset
npx nx start mobile
```

### Expo Go Connection Issues
- Ensure phone and computer are on the same network
- Disable VPN if active
- Try tunnel mode: `npx nx start mobile --tunnel`

## 🎨 Customizing Your App

1. **Change App Name**: Edit `apps/mobile/app.json`
2. **Add Icon**: Replace `apps/mobile/assets/icon.png`
3. **Add Splash Screen**: Replace `apps/mobile/assets/splash.png`
4. **Update Colors**: Edit `apps/mobile/src/app/App.tsx` styles

## 🚀 Building for Production

### Create Development Build
```powershell
npx nx build mobile --platform ios
npx nx build mobile --platform android
```

### Submit to App Stores
```powershell
npx nx submit mobile --platform ios
npx nx submit mobile --platform android
```

## 💡 Tips

1. **Use Nx Console**: Install the Nx Console extension for VS Code for a visual interface
2. **Hot Reload**: Changes auto-refresh in Expo Go
3. **Debug**: Shake device to open developer menu
4. **Performance**: Use React DevTools and Flipper for debugging

## 📞 Need Help?

- [Nx Community Slack](https://go.nx.dev/community)
- [Expo Discord](https://chat.expo.dev)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nx)

---

**Happy Coding! 🎉**
