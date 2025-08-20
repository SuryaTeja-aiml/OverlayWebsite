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
                playful: '"Comic Sans MS", cursive'
            },
            themes: {
                default: '',
                dark: 'theme-dark',
                light: 'theme-light',
                colorful: 'theme-colorful',
                minimal: 'theme-minimal'
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
            fontSize: 100
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedConfig();
        this.updatePreview();
    }

    bindEvents() {
        // Writing style change
        const writingStyleSelect = document.getElementById('writingStyle');
        if (writingStyleSelect) {
            writingStyleSelect.addEventListener('change', (e) => {
                this.currentSettings.writingStyle = e.target.value;
                this.updatePreview();
            });
        }

        // Theme change
        const themeSelect = document.getElementById('theme');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.currentSettings.theme = e.target.value;
                this.applyTheme(e.target.value);
                this.updatePreview();
            });
        }

        // Font style change
        const fontStyleSelect = document.getElementById('fontStyle');
        if (fontStyleSelect) {
            fontStyleSelect.addEventListener('change', (e) => {
                this.currentSettings.fontStyle = e.target.value;
                this.applyFontStyle(e.target.value);
                this.updatePreview();
            });
        }

        // Font size change
        const fontSizeRange = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');
        if (fontSizeRange && fontSizeValue) {
            fontSizeRange.addEventListener('input', (e) => {
                this.currentSettings.fontSize = e.target.value;
                fontSizeValue.textContent = e.target.value + '%';
                this.applyFontSize(e.target.value);
                this.updatePreview();
            });
        }

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
    }

    applyFontStyle(fontStyle) {
        const previewArea = document.getElementById('previewArea');
        if (!previewArea) return;

        // Remove existing font classes
        previewArea.classList.remove('font-serif', 'font-sans-serif', 'font-monospace', 'font-playful');

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

        if (writingStyleSelect) writingStyleSelect.value = this.currentSettings.writingStyle;
        if (themeSelect) themeSelect.value = this.currentSettings.theme;
        if (fontStyleSelect) fontStyleSelect.value = this.currentSettings.fontStyle;
        if (fontSizeRange) fontSizeRange.value = this.currentSettings.fontSize;
        if (fontSizeValue) fontSizeValue.textContent = this.currentSettings.fontSize + '%';

        this.applyAllOverlays();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
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