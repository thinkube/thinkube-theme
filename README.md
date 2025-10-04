# Thinkube Theme

Official light and dark themes for Thinkube platform featuring the signature teal brand colors.

## Preview

Clean, professional themes designed for optimal readability with Thinkube's brand identity.

- **Thinkube Light** - Crisp light theme with teal accents
- **Thinkube Dark** - Modern dark theme with teal highlights

### Color Palette

- **Primary Teal**: `#006680` - Main accent color for keywords, selections, and UI elements
- **Light Teal**: `#0088aa` / `#22d3ee` - Secondary accent for functions and operators
- **Orange Accent**: `#FF6B35` - For numbers and badges
- **Light Theme**: White background with subtle grays
- **Dark Theme**: Dark background (`#252f3a`) with rich contrast

## Features

- Clean, minimal design focused on code readability
- Teal-based color scheme matching Thinkube brand
- Optimized contrast for extended coding sessions
- Semantic syntax highlighting
- Consistent UI theming across all panels

## Installation

### For Code-Server

1. Copy the extension to your code-server extensions directory:
   ```bash
   cp -r thinkube-theme ~/.local/share/code-server/extensions/
   ```

2. Restart code-server

3. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)

4. Type "Color Theme" and select either:
   - **Thinkube Light** for light theme
   - **Thinkube Dark** for dark theme

### For VS Code

1. Package the extension:
   ```bash
   npm install -g @vscode/vsce
   vsce package
   ```

2. Install the `.vsix` file:
   - Open VS Code
   - Go to Extensions
   - Click "..." menu → "Install from VSIX"
   - Select the generated `.vsix` file

## Syntax Highlighting

- **Keywords**: Teal, bold
- **Strings**: Green
- **Numbers**: Orange
- **Comments**: Gray, italic
- **Functions**: Light teal
- **Classes**: Yellow/amber, bold

## UI Elements

- **Status Bar**: Teal background with white text
- **Activity Bar**: Light teal background
- **Editor**: White background with teal accents
- **Sidebar**: Light gray background
- **Tabs**: Active tabs highlighted with teal border

## Development

Built for the Thinkube platform - a home-based Kubernetes development environment designed for AI applications.

## License

Apache-2.0

## Feedback

Issues and suggestions: https://github.com/thinkube/thinkube-theme/issues
