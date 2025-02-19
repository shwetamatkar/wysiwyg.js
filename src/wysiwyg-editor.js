(($, window, document) => {
    'use strict';

    /** Utility Functions **/

    const HSVtoRGB = (h, s, v) => {
        let r, g, b, i = Math.floor(h * 6),
            f = h * 6 - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return `#${[r, g, b].map(x => ('0' + Math.floor(x * 255).toString(16)).slice(-2)).join('')}`;
    };

    const htmlEncode = str => str.replace(/[&<>"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
    }[tag]));

    /** Editor Class **/
    class WysiwygEditor {
        constructor($textarea, options) {
            this.$textarea = $textarea;
            this.options = options;
            this.init();
        }

        init() {
            this.createEditor();
            this.bindEvents();
        }

        createEditor() {
            this.$container = $('<div>', { class: 'wysiwyg-container' }).insertAfter(this.$textarea);
            this.$textarea.wrap(this.$container);

            this.$editor = $('<div>', { class: 'wysiwyg-editor', contentEditable: true })
                .html(this.$textarea.val())
                .insertAfter(this.$textarea);

            this.$toolbar = $('<div>', { class: 'wysiwyg-toolbar' }).prependTo(this.$container);
            this.createToolbar();
        }

        createToolbar() {
            const buttons = this.options.buttons || [
                { name: 'bold', command: 'bold', icon: '<b>B</b>' },
                { name: 'italic', command: 'italic', icon: '<i>I</i>' },
                { name: 'underline', command: 'underline', icon: '<u>U</u>' },
                { name: 'link', action: this.insertLink.bind(this), icon: '🔗' }
            ];

            buttons.forEach(btn => {
                const $button = $('<button>', {
                    html: btn.icon,
                    class: `wysiwyg-btn wysiwyg-btn-${btn.name}`,
                    click: () => btn.command ? this.execCommand(btn.command) : btn.action()
                });
                this.$toolbar.append($button);
            });
        }

        bindEvents() {
            this.$editor.on('input', () => this.syncTextarea());
        }

        execCommand(command) {
            document.execCommand(command, false, null);
            this.syncTextarea();
        }

        insertLink() {
            const url = prompt("Enter URL:");
            if (url) this.execCommand('createLink', url);
        }

        syncTextarea() {
            this.$textarea.val(this.$editor.html());
        }
    }

    /** jQuery Plugin **/
    $.fn.wysiwyg = function (options) {
        return this.each(function () {
            const $this = $(this);
            if (!$this.data('wysiwyg')) {
                $this.data('wysiwyg', new WysiwygEditor($this, options));
            }
        });
    };

})(jQuery, window, document);
