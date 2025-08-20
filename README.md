# OverlayWebsite

A powerful web overlay tool that allows you to modify website styling on-the-fly. Transform any website's appearance with custom fonts, themes, writing styles (funny, no jargon, clear instructions), and more!

## 🚀 Features

- **Dynamic Font Replacement**: Change fonts across any website with accessibility options
- **Theme Overlays**: Apply custom themes and color schemes including high contrast modes
- **Writing Style Transformation**: Convert content to different styles (funny, professional, simplified)
- **Real-time Live Preview**: See changes instantly as you apply them
- **Easy Configuration**: Simple JSON-based configuration system with import/export
- **Accessibility Features**: High contrast themes, dyslexia-friendly fonts, larger text options
- **Custom Color Picker**: Create personalized themes with custom colors
- **Keyboard Shortcuts**: Power user efficiency with hotkeys
- **Undo/Redo Functionality**: Track changes and revert when needed
- **Enhanced Notifications**: Better user feedback with smooth animations

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML/CSS (for customization)

## 🛠️ Quick Setup

### 1. Clone the Repository
```bash
git clone https://github.com/SuryaTeja-aiml/OverlayWebsite.git
cd OverlayWebsite
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```

### 4. Open in Browser
Navigate to `http://localhost:3000` to see the overlay tool in action.

## 🎯 Basic Usage

1. **Load the overlay**: Include the overlay script in your webpage or use the browser extension
2. **Configure styles**: Modify settings using the intuitive control panel
3. **Live Preview**: Enable live preview to see changes in real-time
4. **Apply changes**: Use the control panel or keyboard shortcuts (Alt+A) to apply settings
5. **Save preferences**: Export your configuration for future use (Alt+S)
6. **Accessibility**: Use high contrast themes and dyslexia-friendly fonts for better readability

### 🎮 Keyboard Shortcuts
- **Alt + A**: Apply overlay
- **Alt + R**: Reset to defaults  
- **Alt + S**: Save configuration
- **Ctrl + Z**: Undo last change

### ♿ Accessibility Features
- **High Contrast Theme**: Better visibility for users with visual impairments
- **Dyslexia-Friendly Font**: Specialized font with improved letter spacing
- **High Readability Font**: Clear, accessible font with better readability
- **Extended Font Size Range**: 75% to 200% for better accessibility
- **Reduced Motion**: Option to minimize animations for users with motion sensitivity

## 📁 Project Structure

```
OverlayWebsite/
├── README.md           # This file
├── package.json        # Project dependencies and scripts
├── index.html          # Main overlay interface
├── src/
│   ├── overlay.js      # Core overlay functionality
│   ├── overlay.css     # Overlay styles
│   └── config.json     # Default configuration
├── examples/           # Example configurations
└── docs/              # Additional documentation
```

## ⚙️ Configuration

### Basic Configuration
Create or modify `src/config.json` to customize the overlay:

```json
{
  "settings": {
    "writingStyle": "professional",
    "theme": "dark",
    "fontStyle": "dyslexia-friendly",
    "fontSize": 120,
    "livePreview": true,
    "highContrast": false,
    "reducedMotion": false,
    "customColors": {
      "background": "#ffffff",
      "text": "#000000", 
      "accent": "#007bff"
    }
  }
}
```

### Available Options

#### Themes
- `default`: No theme changes
- `dark`: Dark background with light text
- `light`: Light background with dark text  
- `colorful`: Vibrant gradient background
- `minimal`: Clean, minimal appearance
- `high-contrast`: High contrast for accessibility
- `sepia`: Warm, sepia-toned theme
- `night`: Dark theme optimized for low light
- `custom`: Use custom color picker

#### Font Styles  
- `default`: Keep original fonts
- `serif`: Traditional serif fonts (Georgia)
- `sans-serif`: Modern sans-serif fonts (Arial)
- `monospace`: Fixed-width fonts (Courier)
- `playful`: Fun, casual fonts (Comic Sans)
- `dyslexia-friendly`: Specialized font for dyslexia
- `readable`: High readability font (Verdana)

#### Accessibility Settings
- `livePreview`: Enable/disable real-time preview
- `highContrast`: Extra high contrast mode
- `reducedMotion`: Minimize animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

Found a bug or need help? Please [open an issue](https://github.com/SuryaTeja-aiml/OverlayWebsite/issues) on GitHub.

## 🌟 Roadmap

- [x] **Enhanced Accessibility Features** - High contrast themes, dyslexia-friendly fonts
- [x] **Custom Color Picker** - Create personalized themes
- [x] **Live Preview System** - Real-time changes without manual application
- [x] **Keyboard Shortcuts** - Power user efficiency features
- [x] **Undo/Redo Functionality** - Change history tracking
- [ ] **Browser Extension Support** - Chrome/Firefox extensions
- [ ] **Advanced Theme Editor** - Visual theme creation tool
- [ ] **AI-powered Content Transformation** - Smart content rewriting
- [ ] **Multi-language Support** - Internationalization
- [ ] **Performance Optimization** - Faster rendering and processing
- [ ] **Website-specific Presets** - Save configurations per domain
- [ ] **CSS Injection System** - Advanced custom styling
- [ ] **Mobile App** - Native mobile overlay application
