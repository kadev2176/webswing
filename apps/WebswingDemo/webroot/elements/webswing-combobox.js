class WebswingComboBoxElement extends HTMLElement  {

    _eventsManager;
    _selectedIndex;
    _items;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                select[part=root] {
                    position: absolute;
                }
            </style>
            <select part="root"></select>
        `;
    }
    
    __getRootElement() {
        return this.shadowRoot.querySelector('select[part=root]');
    }

    focus(options) {
        this.__getRootElement().focus(options);
    }

    connectedCallback() {
        this.changeListener = (event) => this.changeHandler(event);
        this.__getRootElement().addEventListener('change', this.changeListener);
        this.render();
    }

    disconnectedCallback() {
        this.__getRootElement().removeEventListener('change', this.changeListener);
    }

    render() {
        const select = this.__getRootElement();
        while (select.options.length > 0) {
            select.remove(0);
        }
        if (this._items != null && Array.isArray(this._items)) {
            for (let i = 0; i < this._items.length; i++) {
                const item = this._items[i];
                const option = document.createElement("option");
                option.text = item;
                option.selected = i == this._selectedIndex;
                select.appendChild(option);
            }
        }
    }

    changeHandler(evt) {
        if (this._eventsManager == null) {
            return;
        }
        
        this._selectedIndex = this.__getRootElement().selectedIndex;

        this._eventsManager.performAction({
            actionName: 'change',
            data: this.__getRootElement().selectedIndex + "",
            windowId: parseInt(this.getAttribute("data-id") || ""),
        });
    }

    get eventsManager() {
        return this._eventsManager;
    }

    set eventsManager(val) {
        this._eventsManager = val;
    }

    get selectedIndex() {
        return this._selectedIndex;
    }

    set selectedIndex(val) {
        this._selectedIndex = val == null ? 0 : parseInt(val, 10);
    }
    
    get items() {
        return this._items;
    }

    set items(val) {
        if (val != null && val.length > 0) {
            this._items = JSON.parse(val);
        }
    }

    get disabled() {
        return this.__getRootElement().disabled;
    }

    set disabled(val) {
        this.__getRootElement().disabled = val === "true";
    }

    __shouldRender() {
        this.render();
    }

}

customElements.define('webswing-combobox', WebswingComboBoxElement);