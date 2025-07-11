# 🥗 NutriMind - AI-Powered Nutrition & Social Media App

A modern mobile application that combines AI-powered personalized nutrition tracking with social media features. Built with React Native and Expo, featuring a clean, Gen-Z friendly design.

## ✨ Features

### 🍽️ Meal Tracking & AI Analysis
- **Camera Scanning**: Scan food with your camera to get instant nutrition information
- **AI-Powered Suggestions**: Get personalized nutrition recommendations based on your meals and goals
- **Smart Meal Logging**: Add meals via text or image with automatic nutrition detection
- **Comprehensive Nutrition Data**: Track calories, protein, carbs, fat, fiber, and more

### 📱 Social Features
- **Feed**: Share your meals with the community
- **Engagement**: Like, comment, and share meal posts
- **Hashtags**: Discover content through tags like #HealthyEating, #PostWorkout, #Vegan
- **User Profiles**: Follow other users and build your nutrition community
- **Achievements**: Unlock badges for consistency and goal achievement

### 🎯 Goal Setting & Progress
- **Personal Goals**: Set custom nutrition targets (protein, calories, water intake, etc.)
- **Progress Tracking**: Visual progress bars and statistics
- **Streak Tracking**: Maintain daily logging streaks
- **Smart Notifications**: Reminders and encouragement to stay on track

### 🤖 AI Coach
- **Personalized Insights**: AI analyzes your eating patterns and provides actionable advice
- **Meal Timing**: Suggestions for optimal meal timing around workouts
- **Macro Balancing**: Recommendations to balance your macronutrients
- **Lifestyle Integration**: Advice based on your activity level and goals

## 🏗️ Architecture

### Navigation Structure
- **Feed**: Main social feed with meal posts
- **Scan**: Camera interface for food scanning
- **Add Meal**: Form to manually add meals with photos
- **AI Tips**: Personalized suggestions and goal tracking
- **Profile**: User profile with achievements and meal history

### Key Components
- **MealCard**: Reusable component for displaying meal posts
- **NutritionProgress**: Progress tracking for nutrition goals
- **CustomButton**: Consistent button styling throughout the app
- **Camera Integration**: Expo Camera for meal scanning

## 🛠️ Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based routing
- **Expo Camera**: Camera functionality
- **Expo Image Picker**: Photo selection
- **Linear Gradient**: Beautiful gradient backgrounds
- **React Native Vector Icons**: Consistent iconography

## 🚀 Getting Started

### Prerequisites
- Node.js (14 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NutriMind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app
   - Or press `i` for iOS simulator
   - Or press `a` for Android emulator

## 📱 App Structure

```
app/
├── (tabs)/
│   ├── index.tsx           # Main feed screen
│   ├── scan.tsx            # Camera scanning screen
│   ├── add-meal.tsx        # Add meal form
│   ├── suggestions.tsx     # AI suggestions & goals
│   └── profile.tsx         # User profile
├── _layout.tsx             # Root layout
└── +not-found.tsx          # 404 page

components/
├── ui/                     # UI components
├── MealCard.tsx           # Meal post component
├── NutritionProgress.tsx  # Progress tracking
└── CustomButton.tsx       # Button component

constants/
└── Colors.ts              # App color scheme
```

## 🎨 Design System

### Color Palette
- **Primary**: #FF6B6B (Coral Pink)
- **Secondary**: #4ECDC4 (Turquoise)
- **Accent**: #45B7D1 (Sky Blue)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)

### Typography
- **Headers**: Bold, large text for navigation and titles
- **Body**: Regular weight for descriptions and content
- **Captions**: Smaller text for metadata and secondary info

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with rounded corners
- **Progress Bars**: Colorful indicators for goal tracking
- **Badges**: Pill-shaped elements for tags and achievements

## 🔐 Permissions

The app requires the following permissions:
- **Camera**: To scan food items
- **Photo Library**: To select meal photos
- **Notifications**: For reminders and achievements (optional)

## 🚧 Future Enhancements

- **Real AI Integration**: Connect to nutrition APIs for accurate food recognition
- **Barcode Scanning**: Scan packaged foods for nutrition info
- **Meal Planning**: AI-generated meal plans based on goals
- **Community Challenges**: Group challenges and competitions
- **Nutrition Education**: Tips and articles about healthy eating
- **Integration with Fitness Apps**: Connect with Apple Health, Google Fit
- **Recipe Sharing**: Share and discover healthy recipes
- **Nutritionist Chat**: Connect with certified nutritionists

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern fitness and nutrition apps
- Expo team for the excellent development platform
- React Native community for the robust ecosystem
- Unsplash for beautiful food photography used in mockups

---

Built with ❤️ using React Native and Expo
