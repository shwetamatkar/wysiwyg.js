# WYSIWYG Editor (Refactored & Optimized)

## Overview
This repository contains a **modernized and optimized WYSIWYG (What You See Is What You Get) editor** written in JavaScript and jQuery. The refactored version implements best practices, improves performance, and enhances maintainability while keeping the core functionality intact.

## Features
✅ **Modern ES6+ Syntax**: Uses `const`, `let`, arrow functions, and classes.  
✅ **Modular Design**: Implements an encapsulated `WysiwygEditor` class for better reusability.  
✅ **Optimized Event Handling**: Uses delegated event listeners to improve performance.  
✅ **Improved Toolbar Handling**: Dynamically generates toolbar buttons for flexibility.  
✅ **Reduced DOM Manipulations**: Uses efficient methods like `.insertAfter()` and `.prependTo()`.  
✅ **Extensible & Configurable**: Allows custom buttons, event handling, and toolbar modifications.

---

## Installation
### Option 1: Download and Include
Download the files and include them in your project:
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="wysiwyg-editor.js"></script>
<link rel="stylesheet" href="wysiwyg-editor.css">
```

### Option 2: Use via CDN
Coming soon...

---

## Usage
### Basic Initialization
```javascript
$(document).ready(function() {
    $('textarea').wysiwyg();
});
```

### Advanced Configuration
You can pass options to customize the editor, such as adding custom toolbar buttons.
```javascript
$('textarea').wysiwyg({
    buttons: [
        { name: 'bold', command: 'bold', icon: '<b>B</b>' },
        { name: 'italic', command: 'italic', icon: '<i>I</i>' },
        { name: 'underline', command: 'underline', icon: '<u>U</u>' },
        { name: 'link', action: () => alert("Insert link clicked!"), icon: '🔗' }
    ]
});
```

---

## API Methods
The WYSIWYG editor provides several public methods:
```javascript
const editor = $('textarea').data('wysiwyg');
editor.execCommand('bold'); // Applies bold formatting
editor.insertLink('https://example.com'); // Inserts a hyperlink
editor.syncTextarea(); // Syncs content to the underlying textarea
```

---

## Improvements Over Previous Version
The original code contained legacy practices and unnecessary complexity. Below are the key enhancements:

### 🔹 **Code Quality Enhancements**
- Replaced `var` with `let` and `const`.
- Used modern ES6+ syntax (arrow functions, template literals, destructuring).
- Moved logic into a structured `class` instead of procedural functions.
- Eliminated redundant `if-else` statements.

### 🔹 **Performance Optimizations**
- Improved event delegation to prevent excessive bindings.
- Reduced unnecessary DOM interactions for better efficiency.
- Removed outdated and unsupported IE-specific code.

### 🔹 **Better Readability & Maintainability**
- Modularized logic into distinct functions and a class.
- Used consistent indentation and naming conventions.
- Added proper comments and documentation.

### 🔹 **Extensibility & Customization**
- Made the toolbar dynamically configurable.
- Added a clean API for extending functionality.
- Enabled easy integration with existing projects.

---

## Contributing
Contributions are welcome! Feel free to submit an issue or a pull request.

---

## License
This project is licensed under the MIT License.

---

## Credits
- **Original Code Reference**: https://github.com/jkso/wysiwyg.js .
- **Refactored By**: **Shweta Matkar** https://github.com/shwetamatkar

---

## Contact
For questions or feedback, reach out via [GitHub Issues](https://github.com/shwetamatkar/wysiwyg.js/issues).

