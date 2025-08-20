# OverlayWebsite Documentation

## Table of Contents
1. [Getting Started](#getting-started)
2. [Configuration](#configuration)
3. [API Reference](#api-reference)
4. [Examples](#examples)
5. [Troubleshooting](#troubleshooting)

## Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SuryaTeja-aiml/OverlayWebsite.git
   cd OverlayWebsite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### First Steps

1. **Explore the Interface**: The main page shows a control panel and preview area
2. **Try Different Settings**: Change writing styles, themes, and fonts to see real-time previews
3. **Use Accessibility Features**: Test high contrast themes and dyslexia-friendly fonts
4. **Apply Changes**: Click "Apply Overlay" or use Alt+A to activate your settings  
5. **Save Configuration**: Use "Save Config" or Alt+S to download your custom setup
6. **Try Keyboard Shortcuts**: Use Alt+R to reset, Ctrl+Z to undo changes

### New Features Guide

#### Custom Color Picker
1. Select "Custom" from the Theme dropdown
2. Use the color pickers to choose background, text, and accent colors
3. Changes apply instantly with live preview enabled

#### Accessibility Features
- **High Contrast Theme**: Select "High Contrast (A11y)" for better visibility
- **Dyslexia-Friendly Font**: Choose "Dyslexia Friendly" from font styles
- **Extra High Contrast**: Enable in Settings for additional contrast boost
- **Reduced Motion**: Enable to minimize animations for motion sensitivity

#### Keyboard Shortcuts
- **Alt + A**: Apply current overlay settings
- **Alt + R**: Reset all settings to defaults
- **Alt + S**: Save configuration to file
- **Ctrl + Z**: Undo last change (up to 10 changes tracked)

#### Live Preview System
- Toggle "Live Preview" in Settings to enable/disable real-time changes
- When enabled, changes apply automatically as you modify settings
- When disabled, use the Apply button to see changes

## Configuration

### config.json Structure

```json
{
  "settings": {
    "writingStyle": "professional",
    "theme": "dark",
    "fontStyle": "serif",
    "fontSize": 110
  }
}
```

### Available Options

#### Writing Styles
- `default`: Keep original text style
- `funny`: Add humor and personality
- `professional`: Formal business language
- `simple`: Remove jargon, simplify terms
- `detailed`: Add comprehensive explanations

#### Themes
- `default`: No theme changes
- `dark`: Dark background with light text
- `light`: Light background with dark text
- `colorful`: Vibrant gradient background
- `minimal`: Clean, minimal appearance
- `high-contrast`: High contrast mode for accessibility
- `sepia`: Warm, sepia-toned theme
- `night`: Dark theme optimized for low light
- `custom`: Use custom color picker to create personalized themes

#### Font Styles
- `default`: Keep original fonts
- `serif`: Traditional serif fonts (Georgia)
- `sans-serif`: Modern sans-serif fonts (Arial)
- `monospace`: Fixed-width fonts (Courier)
- `playful`: Fun, casual fonts (Comic Sans)
- `dyslexia-friendly`: Specialized font for dyslexia with improved spacing
- `readable`: High readability font (Verdana) with enhanced clarity

#### Font Size
- Range: 75% to 200% of original size (extended for accessibility)
- Default: 100%

#### Accessibility Options
- `livePreview`: Enable/disable real-time preview
- `highContrast`: Extra high contrast mode for visual impairments
- `reducedMotion`: Minimize animations for motion sensitivity

## API Reference

### OverlayWebsite Class

#### Constructor
```javascript
const overlay = new OverlayWebsite();
```

#### Methods

##### `applyTheme(theme)`
Apply a specific theme to the preview area.
```javascript
overlay.applyTheme('dark');
```

##### `applyFontStyle(fontStyle)`
Apply a specific font style.
```javascript
overlay.applyFontStyle('serif');
```

##### `applyFontSize(size)`
Set font size percentage.
```javascript
overlay.applyFontSize(120);
```

##### `saveConfig()`
Save current configuration to localStorage and download as JSON.
```javascript
overlay.saveConfig();
```

##### `resetOverlays()`
Reset all settings to defaults.
```javascript
overlay.resetOverlays();
```

##### `undoLastAction()`
Undo the last change made to settings.
```javascript
overlay.undoLastAction();
```

##### `applyCustomTheme()`
Apply custom color theme from color picker.
```javascript
overlay.applyCustomTheme();
```

##### `applyHighContrast(enabled)`
Enable/disable high contrast mode.
```javascript
overlay.applyHighContrast(true);
```

##### `applyReducedMotion(enabled)`
Enable/disable reduced motion mode.
```javascript
overlay.applyReducedMotion(true);
```

##### `saveToHistory()`
Save current state to undo history.
```javascript
overlay.saveToHistory();
```

##### `toggleCustomColorPicker(show)`
Show/hide custom color picker interface.
```javascript
overlay.toggleCustomColorPicker(true);
```

## Examples

### Example 1: Professional Setup
```json
{
  "settings": {
    "writingStyle": "professional",
    "theme": "dark",
    "fontStyle": "serif",
    "fontSize": 110
  }
}
```

### Example 2: Fun Setup
```json
{
  "settings": {
    "writingStyle": "funny",
    "theme": "colorful",
    "fontStyle": "playful",
    "fontSize": 120
  }
}
```

### Example 3: Accessibility Setup
```json
{
  "settings": {
    "writingStyle": "simple",
    "theme": "minimal",
    "fontStyle": "sans-serif",
    "fontSize": 130
  }
}
```

## Browser Integration

### As a Bookmarklet
Create a bookmarklet to use OverlayWebsite on any webpage:

```javascript
javascript:(function(){
  var script = document.createElement('script');
  script.src = 'https://yourdomain.com/src/overlay.js';
  document.head.appendChild(script);
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://yourdomain.com/src/overlay.css';
  document.head.appendChild(css);
})();
```

### As a Browser Extension
The codebase can be adapted for browser extensions by:
1. Creating a manifest.json
2. Adding content scripts
3. Implementing popup interface

## Troubleshooting

### Common Issues

#### "Cannot read property of undefined"
- **Cause**: DOM elements not found
- **Solution**: Ensure HTML elements have correct IDs

#### Styles not applying
- **Cause**: CSS conflicts
- **Solution**: Use `!important` declarations or increase specificity

#### Configuration not saving
- **Cause**: localStorage permissions
- **Solution**: Check browser privacy settings

#### Preview not updating
- **Cause**: Event listeners not bound
- **Solution**: Verify DOM is loaded before initialization

### Debug Mode

Enable debug mode by adding to your config:
```json
{
  "debug": true
}
```

This will log all operations to the browser console.

### Performance Tips

1. **Minimize DOM queries**: Cache element references
2. **Debounce rapid changes**: Use setTimeout for frequent updates
3. **Optimize CSS**: Use efficient selectors
4. **Lazy load**: Only apply changes when needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Update documentation for new features
- Test across different browsers
- Ensure accessibility compliance

## License

MIT License - see [LICENSE](../LICENSE) file for details.