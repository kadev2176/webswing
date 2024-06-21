class WebswingTextAreaElement extends HTMLElement {

    _eventsManager;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                textarea[part=root] {
                    position: absolute;
                    box-sizing: border-box;
	                resize: none;
                }
            </style>
            <textarea part="root"></textarea>
        `;
    }

    __getRootElement() {
        return this.shadowRoot.querySelector('textarea[part=root]');
    }

    focus(options) {
        this.__getRootElement().focus(options);
    }

    connectedCallback() {
        this.__getRootElement().addEventListener('input', (evt) => this.inputHandler(evt));
    }
    
    disconnectedCallback() {
        this.__getRootElement().removeEventListener('input', (evt) => this.inputHandler(evt));
    }

    inputHandler(_evt) {
        if (this._eventsManager == null) {
            return;
        }

        this._eventsManager.performAction({
            actionName: 'input',
            data: this.__getRootElement().value,
            windowId: parseInt(this.getAttribute("data-id") || ""),
        });
    }
    
    get eventsManager() {
        return this._eventsManager;
    }

    set eventsManager(val) {
        this._eventsManager = val;
    }

    get value() {
        return this.__getRootElement().value;
    }

    set value(val) {
        this.__getRootElement().value = val == null ? "" : val;
    }

    get disabled() {
        return this.__getRootElement().disabled;
    }

    set disabled(val) {
        this.__getRootElement().disabled = val === "true";
    }

    get readOnly() {
        return this.__getRootElement().readOnly;
    }

    set readOnly(val) {
        this.__getRootElement().readOnly = val === "true";
    }
    
}

customElements.define('webswing-textarea', WebswingTextAreaElement);