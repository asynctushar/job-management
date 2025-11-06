# Welcome to Poster App 👋

This is an Expo application built as part of the Realtime Job Management System.
It is used as:

- Provider App → receives & accepts jobs

-------------------------------------------------
ENVIRONMENT SETUP
-------------------------------------------------

Create a file named:

.env

Add:
```bash
EXPO_PUBLIC_API_BASE_URL=http://YOUR_LOCAL_IP:4000
```

Example:
```bash
EXPO_PUBLIC_API_BASE_URL=http://192.168.42.159:4000
```

Find your LAN IP using:

Windows:
```bash
ipconfig
```

macOS / Linux:
```bash
ifconfig
```

A .env.example file is included:
```bash
EXPO_PUBLIC_API_BASE_URL=http://192.168.0.10:4000
```
-------------------------------------------------
INSTALLATION
-------------------------------------------------

Install dependencies:
```bash
npm install
```

Start the app:
```bash
npx expo start
```

You can open the app in:
- Expo Go
- iOS Simulator
- Android Emulator
- Development Build

-------------------------------------------------
PROJECT STRUCTURE
-------------------------------------------------

This project uses file-based routing inside the "app" folder.

-------------------------------------------------
RESET TO BLANK PROJECT
-------------------------------------------------
```bash
npm run reset-project
```

-------------------------------------------------
LEARN MORE
-------------------------------------------------

Expo Docs:
https://docs.expo.dev

Expo Router:
https://docs.expo.dev/router/introduction

Discord:
https://chat.expo.dev
