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
3. **Apply Changes**: Click "Apply Overlay" to activate your settings
4. **Save Configuration**: Use "Save Config" to download your custom setup

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

#### Font Styles
- `default`: Keep original fonts
- `serif`: Traditional serif fonts (Georgia)
- `sans-serif`: Modern sans-serif fonts (Arial)
- `monospace`: Fixed-width fonts (Courier)
- `playful`: Fun, casual fonts (Comic Sans)

#### Font Size
- Range: 80% to 150% of original size
- Default: 100%

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