((window, document) => {
    'use strict';

    /** Utility Functions **/

        // Debounce function to limit the rate of execution
    const debounce = (callback, delay, immediate = false) => {
            let timeout;
            return (...args) => {
                if (timeout) {
                    if (!immediate) return;
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => callback(...args), delay);
            };
        };

    // Utility for adding/removing events
    const handleEvent = (element, type, handler, action = 'add') => {
        if (element) {
            const method = action === 'add' ? 'addEventListener' : 'removeEventListener';
            element[method]?.(type, handler, false);
        }
    };

    // Fire a custom event
    const fireEvent = (element, type) => {
        const event = new Event(type, { bubbles: true, cancelable: true });
        element.dispatchEvent(event);
    };

    // Prevent default action and stop propagation
    const cancelEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Check if an element is within another
    const isOrContainsNode = (parent, child) => {
        return parent.contains(child);
    };

    // Save & restore selection
    const saveSelection = () => {
        const sel = window.getSelection();
        return sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
    };

    const restoreSelection = (savedRange) => {
        if (savedRange) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(savedRange);
        }
    };

    // Get bounding rectangle of selection
    const getSelectionRect = () => {
        const sel = window.getSelection();
        if (!sel.rangeCount) return null;
        const range = sel.getRangeAt(0);
        return range.getBoundingClientRect();
    };

    // Get selected text/html
    const getSelectionHtml = () => {
        const sel = window.getSelection();
        if (!sel.rangeCount) return '';
        const div = document.createElement('div');
        for (let i = 0; i < sel.rangeCount; i++) {
            div.appendChild(sel.getRangeAt(i).cloneContents());
        }
        return div.innerHTML;
    };

    // Insert HTML at cursor position
    const insertHtmlAtCaret = (html) => {
        const sel = window.getSelection();
        if (!sel.rangeCount) return;
        const range = sel.getRangeAt(0);
        range.deleteContents();

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const frag = document.createDocumentFragment();

        while (tempDiv.firstChild) {
            frag.appendChild(tempDiv.firstChild);
        }
        range.insertNode(frag);
    };

    /** WYSIWYG Editor Class **/

    class WYSIWYG {
        constructor({ element, onChange }) {
            this.element = typeof element === 'string' ? document.getElementById(element) : element;
            this.onChange = onChange;
            this.savedSelection = null;
            this.init();
        }

        init() {
            this.element.setAttribute('contentEditable', 'true');
            this.addEventListeners();
        }

        addEventListeners() {
            handleEvent(this.element, 'input', debounce(() => this.handleChange(), 200));
            handleEvent(this.element, 'keydown', (e) => this.handleKeyDown(e));
            handleEvent(this.element, 'mouseup', debounce(() => this.handleSelection(), 50));
        }

        handleChange() {
            if (this.onChange) this.onChange(this.getHTML());
        }

        handleKeyDown(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                document.execCommand('insertParagraph', false, null);
                e.preventDefault();
            }
        }

        handleSelection() {
            this.savedSelection = saveSelection();
        }

        getHTML() {
            return this.element.innerHTML;
        }

        setHTML(html) {
            this.element.innerHTML = html;
            this.handleChange();
        }

        getSelectedHTML() {
            return getSelectionHtml();
        }

        execCommand(command, value = null) {
            document.execCommand(command, false, value);
            this.handleChange();
        }

        bold() {
            this.execCommand('bold');
        }

        italic() {
            this.execCommand('italic');
        }

        underline() {
            this.execCommand('underline');
        }

        insertLink(url) {
            this.execCommand('createLink', url);
        }

        insertImage(url) {
            this.execCommand('insertImage', url);
        }

        insertHTML(html) {
            insertHtmlAtCaret(html);
            this.handleChange();
        }

        close() {
            this.element.removeAttribute('contentEditable');
            handleEvent(this.element, 'input', this.handleChange, 'remove');
            handleEvent(this.element, 'keydown', this.handleKeyDown, 'remove');
            handleEvent(this.element, 'mouseup', this.handleSelection, 'remove');
        }
    }

    // Expose WYSIWYG as a global variable
    window.WYSIWYG = WYSIWYG;

})(window, document);
