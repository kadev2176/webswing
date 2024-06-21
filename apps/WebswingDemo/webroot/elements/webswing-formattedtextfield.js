class WebswingFormattedTextFieldElement extends HTMLElement {

    _eventsManager;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                input[part=root] {
                    position: absolute;
                    box-sizing: border-box;
                }
            </style>
            <input part="root">
        `;
    }

    __getRootElement() {
        return this.shadowRoot.querySelector('input[part=root]');
    }

    focus(options) {
        this.__getRootElement().focus(options);
    }

    connectedCallback() {
        this.__getRootElement().addEventListener('input', (evt) => this.inputHandler(evt));
        this.__getRootElement().addEventListener('keyup', (evt) => this.keyupHandler(evt));
    }
    
    disconnectedCallback() {
        this.__getRootElement().removeEventListener('input', (evt) => this.inputHandler(evt));
        this.__getRootElement().removeEventListener('keyup', (evt) => this.keyupHandler(evt));
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

    keyupHandler(evt) {
        if (this._eventsManager == null) {
            return;
        }
        
        let actionName;
        if (evt.key === 'Enter') {
            actionName = "commit";
        } else if (evt.key === 'Escape') {
            actionName = "cancel";
        }
        if (actionName == null) {
            return;
        }
        
        this._eventsManager.performAction({
            actionName,
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

customElements.define('webswing-formattedtextfield', WebswingFormattedTextFieldElement);