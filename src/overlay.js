/**
 * OverlayWebsite - Core JavaScript functionality
 * Handles dynamic styling and content transformation
 */

class OverlayWebsite {
    constructor() {
        this.config = {
            fonts: {
                default: 'inherit',
                serif: 'Georgia, "Times New Roman", serif',
                'sans-serif': '"Helvetica Neue", Arial, sans-serif',
                monospace: '"Courier New", Consolas, monospace',
                playful: '"Comic Sans MS", cursive',
                'dyslexia-friendly': '"OpenDyslexic", Arial, sans-serif',
                readable: 'Verdana, Tahoma, sans-serif'
            },
            themes: {
                default: '',
                dark: 'theme-dark',
                light: 'theme-light',
                colorful: 'theme-colorful',
                minimal: 'theme-minimal',
                'high-contrast': 'theme-high-contrast',
                sepia: 'theme-sepia',
                night: 'theme-night',
                custom: 'theme-custom'
            },
            writingStyles: {
                default: 'Keep the original text style',
                funny: 'Make it humorous and engaging',
                professional: 'Use formal, business-appropriate language',
                simple: 'Remove jargon and simplify complex terms',
                detailed: 'Add comprehensive explanations and clear step-by-step instructions'
            }
        };
        
        this.currentSettings = {
            writingStyle: 'default',
            theme: 'default',
            fontStyle: 'default',
            fontSize: 100,
            livePreview: true,
            highContrast: false,
            reducedMotion: false,
            customColors: {
                background: '#ffffff',
                text: '#000000',
                accent: '#007bff'
            }
        };

        this.history = [];
        this.maxHistorySize = 10;

        this.init();
    }

    init() {
        this.bindEvents();
        this.bindKeyboardShortcuts();
        this.loadSavedConfig();
        this.updatePreview();
        this.saveToHistory();
    }

    bindEvents() {
        // Writing style change
        const writingStyleSelect = document.getElementById('writingStyle');
        if (writingStyleSelect) {
            writingStyleSelect.addEventListener('change', (e) => {
                this.saveToHistory();
                this.currentSettings.writingStyle = e.target.value;
                if (this.currentSettings.livePreview) {
                    this.updatePreview();
                }
            });
        }

        // Theme change
        const themeSelect = document.getElementById('theme');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.saveToHistory();
                this.currentSettings.theme = e.target.value;
                this.toggleCustomColorPicker(e.target.value === 'custom');
                if (this.currentSettings.livePreview) {
                    this.applyTheme(e.target.value);
                    this.updatePreview();
                }
            });
        }

        // Font style change
        const fontStyleSelect = document.getElementById('fontStyle');
        if (fontStyleSelect) {
            fontStyleSelect.addEventListener('change', (e) => {
                this.saveToHistory();
                this.currentSettings.fontStyle = e.target.value;
                if (this.currentSettings.livePreview) {
                    this.applyFontStyle(e.target.value);
                    this.updatePreview();
                }
            });
        }

        // Font size change
        const fontSizeRange = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');
        if (fontSizeRange && fontSizeValue) {
            fontSizeRange.addEventListener('input', (e) => {
                this.currentSettings.fontSize = e.target.value;
                fontSizeValue.textContent = e.target.value + '%';
                if (this.currentSettings.livePreview) {
                    this.applyFontSize(e.target.value);
                    this.updatePreview();
                }
            });
        }

        // Settings checkboxes
        const livePreviewCheckbox = document.getElementById('livePreview');
        if (livePreviewCheckbox) {
            livePreviewCheckbox.addEventListener('change', (e) => {
                this.currentSettings.livePreview = e.target.checked;
                if (e.target.checked) {
                    this.applyAllOverlays();
                    this.showNotification('Live preview enabled', 'success');
                } else {
                    this.showNotification('Live preview disabled. Use Apply button to see changes.', 'info');
                }
            });
        }

        const highContrastCheckbox = document.getElementById('highContrast');
        if (highContrastCheckbox) {
            highContrastCheckbox.addEventListener('change', (e) => {
                this.saveToHistory();
                this.currentSettings.highContrast = e.target.checked;
                this.applyHighContrast(e.target.checked);
                this.showNotification(`High contrast ${e.target.checked ? 'enabled' : 'disabled'}`, 'success');
            });
        }

        const reducedMotionCheckbox = document.getElementById('reducedMotion');
        if (reducedMotionCheckbox) {
            reducedMotionCheckbox.addEventListener('change', (e) => {
                this.saveToHistory();
                this.currentSettings.reducedMotion = e.target.checked;
                this.applyReducedMotion(e.target.checked);
                this.showNotification(`Reduced motion ${e.target.checked ? 'enabled' : 'disabled'}`, 'success');
            });
        }

        // Custom color pickers
        ['bgColor', 'textColor', 'accentColor'].forEach(colorId => {
            const colorInput = document.getElementById(colorId);
            if (colorInput) {
                colorInput.addEventListener('change', (e) => {
                    this.saveToHistory();
                    const colorType = colorId.replace('Color', '');
                    this.currentSettings.customColors[colorType === 'bg' ? 'background' : colorType === 'text' ? 'text' : 'accent'] = e.target.value;
                    if (this.currentSettings.livePreview && this.currentSettings.theme === 'custom') {
                        this.applyCustomTheme();
                    }
                });
            }
        });

        // Apply overlay button
        const applyBtn = document.getElementById('applyOverlay');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.applyAllOverlays();
                this.showNotification('Overlay applied successfully!', 'success');
            });
        }

        // Reset overlay button
        const resetBtn = document.getElementById('resetOverlay');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.saveToHistory();
                this.resetOverlays();
                this.showNotification('Overlay reset to defaults', 'info');
            });
        }

        // Save config button
        const saveBtn = document.getElementById('saveConfig');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveConfig();
                this.showNotification('Configuration saved!', 'success');
            });
        }

        // Undo button
        const undoBtn = document.getElementById('undoAction');
        if (undoBtn) {
            undoBtn.addEventListener('click', () => {
                this.undoLastAction();
            });
        }
    }

    applyTheme(theme) {
        const previewArea = document.getElementById('previewArea');
        if (!previewArea) return;

        // Remove existing theme classes
        Object.values(this.config.themes).forEach(themeClass => {
            if (themeClass) previewArea.classList.remove(themeClass);
        });

        // Apply new theme
        if (theme !== 'default' && this.config.themes[theme]) {
            previewArea.classList.add(this.config.themes[theme]);
        }

        // Handle custom theme
        if (theme === 'custom') {
            this.applyCustomTheme();
        }
    }

    applyFontStyle(fontStyle) {
        const previewArea = document.getElementById('previewArea');
        if (!previewArea) return;

        // Remove existing font classes
        previewArea.classList.remove('font-serif', 'font-sans-serif', 'font-monospace', 'font-playful', 'font-dyslexia-friendly', 'font-readable');

        // Apply new font style
        if (fontStyle !== 'default') {
            previewArea.classList.add(`font-${fontStyle}`);
        }
    }

    applyFontSize(size) {
        const previewArea = document.getElementById('previewArea');
        if (!previewArea) return;

        previewArea.style.fontSize = `${size}%`;
    }

    updatePreview() {
        const previewArea = document.getElementById('previewArea');
        if (!previewArea) return;

        // Update preview content based on writing style
        const writingStyle = this.currentSettings.writingStyle;
        const content = this.getContentForWritingStyle(writingStyle);
        
        // Update the preview area while preserving structure
        const h3 = previewArea.querySelector('h3');
        const p = previewArea.querySelector('p');
        const ul = previewArea.querySelector('ul');

        if (h3) h3.textContent = content.title;
        if (p) p.textContent = content.description;
        if (ul) {
            const listItems = ul.querySelectorAll('li');
            content.features.forEach((feature, index) => {
                if (listItems[index]) {
                    listItems[index].textContent = feature;
                }
            });
        }
    }

    getContentForWritingStyle(style) {
        const contentVariations = {
            default: {
                title: 'Sample Content',
                description: 'This is a sample paragraph to demonstrate how the overlay affects text styling. You can see changes in font, theme, and writing style here.',
                features: [
                    'Feature 1: Dynamic font changes',
                    'Feature 2: Theme modifications', 
                    'Feature 3: Writing style transformation'
                ]
            },
            funny: {
                title: '🎭 Sample Content (Now with 100% more fun!)',
                description: 'Behold! This magical paragraph shows you how our awesome overlay makes boring websites suddenly interesting. It\'s like giving your text a personality makeover!',
                features: [
                    '✨ Feature 1: Fonts that actually look good (shocking!)',
                    '🎨 Feature 2: Themes that don\'t hurt your eyes',
                    '🚀 Feature 3: Writing that doesn\'t put you to sleep'
                ]
            },
            professional: {
                title: 'Technical Demonstration Content',
                description: 'This paragraph serves as a comprehensive demonstration of the overlay system\'s capabilities in modifying textual presentation and stylistic elements across web interfaces.',
                features: [
                    'Core Feature 1: Advanced typography management system',
                    'Core Feature 2: Comprehensive theme application framework',
                    'Core Feature 3: Dynamic content transformation engine'
                ]
            },
            simple: {
                title: 'Easy Example',
                description: 'This text shows how the overlay changes how websites look. You can change fonts, colors, and how text is written.',
                features: [
                    'Change fonts easily',
                    'Pick different colors and themes',
                    'Make text easier to read'
                ]
            },
            detailed: {
                title: 'Comprehensive Sample Content with Step-by-Step Guide',
                description: 'This detailed paragraph demonstrates the complete functionality of the overlay system. Step 1: Select your preferences from the control panel. Step 2: Watch the preview update in real-time. Step 3: Apply changes to see the full effect.',
                features: [
                    'Feature 1: Dynamic font changes - Choose from serif, sans-serif, monospace, or playful fonts with real-time preview',
                    'Feature 2: Theme modifications - Apply dark, light, colorful, or minimal themes with instant visual feedback',
                    'Feature 3: Writing style transformation - Convert content between professional, funny, simple, or detailed styles'
                ]
            }
        };

        return contentVariations[style] || contentVariations.default;
    }

    applyAllOverlays() {
        this.applyTheme(this.currentSettings.theme);
        this.applyFontStyle(this.currentSettings.fontStyle);
        this.applyFontSize(this.currentSettings.fontSize);
        this.updatePreview();
    }

    resetOverlays() {
        // Reset settings to defaults
        this.currentSettings = {
            writingStyle: 'default',
            theme: 'default',
            fontStyle: 'default',
            fontSize: 100
        };

        // Reset UI controls
        const writingStyleSelect = document.getElementById('writingStyle');
        const themeSelect = document.getElementById('theme');
        const fontStyleSelect = document.getElementById('fontStyle');
        const fontSizeRange = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');

        if (writingStyleSelect) writingStyleSelect.value = 'default';
        if (themeSelect) themeSelect.value = 'default';
        if (fontStyleSelect) fontStyleSelect.value = 'default';
        if (fontSizeRange) fontSizeRange.value = 100;
        if (fontSizeValue) fontSizeValue.textContent = '100%';

        // Reset preview area
        this.applyAllOverlays();
    }

    saveConfig() {
        const config = {
            settings: this.currentSettings,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('overlayWebsiteConfig', JSON.stringify(config));

        // Also create downloadable JSON
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'overlay-config.json';
        link.click();
        URL.revokeObjectURL(url);
    }

    loadSavedConfig() {
        const saved = localStorage.getItem('overlayWebsiteConfig');
        if (saved) {
            try {
                const config = JSON.parse(saved);
                this.currentSettings = { ...this.currentSettings, ...config.settings };
                this.updateUIFromSettings();
            } catch (e) {
                console.warn('Failed to load saved configuration:', e);
            }
        }
    }

    updateUIFromSettings() {
        const writingStyleSelect = document.getElementById('writingStyle');
        const themeSelect = document.getElementById('theme');
        const fontStyleSelect = document.getElementById('fontStyle');
        const fontSizeRange = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');
        const livePreviewCheckbox = document.getElementById('livePreview');
        const highContrastCheckbox = document.getElementById('highContrast');
        const reducedMotionCheckbox = document.getElementById('reducedMotion');

        if (writingStyleSelect) writingStyleSelect.value = this.currentSettings.writingStyle;
        if (themeSelect) themeSelect.value = this.currentSettings.theme;
        if (fontStyleSelect) fontStyleSelect.value = this.currentSettings.fontStyle;
        if (fontSizeRange) fontSizeRange.value = this.currentSettings.fontSize;
        if (fontSizeValue) fontSizeValue.textContent = this.currentSettings.fontSize + '%';
        if (livePreviewCheckbox) livePreviewCheckbox.checked = this.currentSettings.livePreview;
        if (highContrastCheckbox) highContrastCheckbox.checked = this.currentSettings.highContrast;
        if (reducedMotionCheckbox) reducedMotionCheckbox.checked = this.currentSettings.reducedMotion;

        // Update custom color picker visibility
        this.toggleCustomColorPicker(this.currentSettings.theme === 'custom');

        // Update custom color values
        const bgColorInput = document.getElementById('bgColor');
        const textColorInput = document.getElementById('textColor');
        const accentColorInput = document.getElementById('accentColor');
        if (bgColorInput) bgColorInput.value = this.currentSettings.customColors.background;
        if (textColorInput) textColorInput.value = this.currentSettings.customColors.text;
        if (accentColorInput) accentColorInput.value = this.currentSettings.customColors.accent;

        this.applyAllOverlays();
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        container.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // New methods for enhanced functionality
    saveToHistory() {
        const currentState = JSON.parse(JSON.stringify(this.currentSettings));
        this.history.push(currentState);
        
        if (this.history.length > this.maxHistorySize) {
            this.history.shift();
        }

        // Update undo button state
        const undoBtn = document.getElementById('undoAction');
        if (undoBtn) {
            undoBtn.disabled = this.history.length <= 1;
        }
    }

    undoLastAction() {
        if (this.history.length > 1) {
            this.history.pop(); // Remove current state
            const previousState = this.history[this.history.length - 1];
            this.currentSettings = JSON.parse(JSON.stringify(previousState));
            this.updateUIFromSettings();
            this.showNotification('Changes undone', 'info');
        }
    }

    toggleCustomColorPicker(show) {
        const colorPicker = document.getElementById('customColorPicker');
        if (colorPicker) {
            colorPicker.style.display = show ? 'block' : 'none';
        }
    }

    applyCustomTheme() {
        const previewArea = document.getElementById('previewArea');
        if (!previewArea) return;

        const { background, text, accent } = this.currentSettings.customColors;
        previewArea.style.setProperty('background-color', background, 'important');
        previewArea.style.setProperty('color', text, 'important');
        previewArea.style.setProperty('border-color', accent, 'important');
    }

    applyHighContrast(enabled) {
        const previewArea = document.getElementById('previewArea');
        if (!previewArea) return;

        if (enabled) {
            previewArea.classList.add('high-contrast-mode');
        } else {
            previewArea.classList.remove('high-contrast-mode');
        }
    }

    applyReducedMotion(enabled) {
        const previewArea = document.getElementById('previewArea');
        if (!previewArea) return;

        if (enabled) {
            previewArea.classList.add('reduced-motion');
        } else {
            previewArea.classList.remove('reduced-motion');
        }
    }

    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + A: Apply overlay
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                this.applyAllOverlays();
                this.showNotification('Overlay applied via keyboard shortcut', 'success');
            }
            
            // Alt + R: Reset overlay
            if (e.altKey && e.key === 'r') {
                e.preventDefault();
                this.resetOverlays();
                this.showNotification('Overlay reset via keyboard shortcut', 'info');
            }
            
            // Alt + S: Save config
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                this.saveConfig();
            }
            
            // Ctrl + Z: Undo
            if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                this.undoLastAction();
            }
        });
    }
}

// Initialize the overlay system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.overlayWebsite = new OverlayWebsite();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OverlayWebsite;
}