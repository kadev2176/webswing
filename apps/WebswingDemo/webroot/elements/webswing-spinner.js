class WebswingSpinnerElement extends HTMLElement {

    _disabled;
    _eventsManager;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div[part=root] {
                    position: absolute;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                }
                div[part=buttons] {
                    border-width: 1px 1px 1px 0;
                    display: flex;
                    border-color: black;
                    border-style: solid;
                    flex-direction: column;
                }
                input[part=input] {
                    min-width: 0;
                }
                div[part=arrow-up], div[part=arrow-down] {
                    background: #fafafa;
                    padding: 4px;
                    min-height: 0;
                    display: flex;
                    flex-grow: 1;
                    align-items: center;
                }
                .arrow {
                    border-style: solid;
                    border-color: black;
                    border-width: 0 2px 2px 0;
                    display: inline-block;
                    padding: 2px;
                }
                .arrow:hover {
                    border-color: #787878;
                }
                .arrow.up {
                    transform: rotate(-135deg);
                }
                .arrow.down {
                    transform: rotate(45deg);
                }
            </style>
            <div part="root">
                <input part="input">
                <div part="buttons">
                    <div part="arrow-up"><i class="arrow up"></i></div>
                    <div part="arrow-down"><i class="arrow down"></i></div>
                </div>
            </div>
        `;
    }

    __getRootElement() {
        return this.shadowRoot.querySelector('div[part=root]');
    }
    
    getInputElement() {
        return this.shadowRoot.querySelector('input[part=input]');
    }

    getArrowUpElement() {
        return this.shadowRoot.querySelector('div[part=arrow-up]');
    }

    getArrowDownElement() {
        return this.shadowRoot.querySelector('div[part=arrow-down]');
    }

    focus(options) {
        this.getInputElement().focus(options);
    }

    connectedCallback() {
        this.getInputElement().addEventListener('input', (evt) => this.inputHandler(evt));
        this.getInputElement().addEventListener('keyup', (evt) => this.keyupHandler(evt));
        this.getInputElement().addEventListener('blur', (evt) => this.blurHandler(evt));
        this.getArrowUpElement().addEventListener('click', (evt) => this.clickHandler(evt));
        this.getArrowDownElement().addEventListener('click', (evt) => this.clickHandler(evt));
    }
    
    disconnectedCallback() {
        this.getInputElement().removeEventListener('input', (evt) => this.inputHandler(evt));
        this.getInputElement().removeEventListener('keyup', (evt) => this.keyupHandler(evt));
        this.getInputElement().removeEventListener('blur', (evt) => this.blurHandler(evt));
        this.getArrowUpElement().removeEventListener('click', (evt) => this.clickHandler(evt));
        this.getArrowDownElement().removeEventListener('click', (evt) => this.clickHandler(evt));
    }

    blurHandler(_evt) {
        if (this._eventsManager == null) {
            return;
        }

        if (this._disabled) {
            return;
        }
        
        this._eventsManager.performAction({
            actionName: 'commit',
            data: this.getInputElement().value,
            windowId: parseInt(this.getAttribute("data-id") || ""),
        });
    }

    inputHandler(_evt) {
        if (this._eventsManager == null) {
            return;
        }

        if (this._disabled) {
            return;
        }

        this._eventsManager.performAction({
            actionName: 'input',
            data: this.getInputElement().value,
            windowId: parseInt(this.getAttribute("data-id") || ""),
        });
    }
    
    keyupHandler(evt) {
        if (this._eventsManager == null) {
            return;
        }

        if (this._disabled) {
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
            data: this.getInputElement().value,
            windowId: parseInt(this.getAttribute("data-id") || ""),
        });
    }
    
    clickHandler(evt) {
        if (this._eventsManager == null) {
            return;
        }

        if (this._disabled) {
            return;
        }
        
        let actionName;
        if (evt.target.closest('div[part=arrow-up]')) {
            actionName = 'spinUp';
        }
        if (evt.target.closest('div[part=arrow-down]')) {
            actionName = 'spinDown';
        }
        if (actionName == null) {
            return;
        }

        this._eventsManager.performAction({
            actionName,
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
        return this.getInputElement().value;
    }

    set value(val) {
        this.getInputElement().value = val == null ? "" : val;
    }

    get disabled() {
        return this._disabled;
    }

    set disabled(val) {
        this._disabled = val === "true";
        this.getInputElement().disabled = this._disabled;
    }

}

customElements.define('webswing-spinner', WebswingSpinnerElement);