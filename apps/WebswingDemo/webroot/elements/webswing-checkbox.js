class WebswingCheckBoxElement extends HTMLElement  {

    _eventsManager;
    _text;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const S4 = () => { return Math.floor(Math.random() * 0x10000).toString(16); };
        const id = S4() + S4();

        this.shadowRoot.innerHTML = `
            <style>
                div[part=root] {
                    position: absolute;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            </style>
            <div part="root">
                <input type="checkbox" part="checkbox" id="${id}" />
                <label for="${id}" part="label"></label>
            </div>
        `;
    }
    
    __getRootElement() {
        return this.shadowRoot.querySelector('div[part=root]');
    }

    getInput() {
        return this.shadowRoot.querySelector('input[part=checkbox]');
    }
    
    getLabel() {
        return this.shadowRoot.querySelector('label[part=label]');
    }

    focus(options) {
        this.getInput().focus(options);
    }

    connectedCallback() {
        this.changeListener = (event) => this.changeHandler(event);
        this.getInput().addEventListener('change', this.changeListener);
    }

    disconnectedCallback() {
        this.getInput().removeEventListener('change', this.changeListener);
    }

    changeHandler(evt) {
        if (this._eventsManager == null) {
            return;
        }
        
        this._eventsManager.performAction({
            actionName: 'change',
            data: this.getInput().checked + "",
            windowId: parseInt(this.getAttribute("data-id") || ""),
        });
    }

    get eventsManager() {
        return this._eventsManager;
    }

    set eventsManager(val) {
        this._eventsManager = val;
    }

    get selected() {
        return this.getInput().checked;
    }

    set selected(val) {
        this.getInput().checked = val === 'true' || val === true;
    }

    get text() {
        return this._text;
    }
    
    set text(val) {
        this._text = val;
        this.getLabel().textContent = this._text;
    }
    
    get disabled() {
        return this.getInput().disabled;
    }

    set disabled(val) {
        this.getInput().disabled = val === "true";
    }

}

customElements.define('webswing-checkbox', WebswingCheckBoxElement);