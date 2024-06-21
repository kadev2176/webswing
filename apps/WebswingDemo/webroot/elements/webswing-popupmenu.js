class WebswingPopupMenuElement extends HTMLElement  {

    _wsStyle;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div[part=root] {
                    box-sizing: border-box;
                }
            </style>
            <div part="root"><slot></slot></div>
        `;
    }

    __getRootElement() {
        return this.shadowRoot.querySelector('div[part=root]');
    }
    
    get wsStyle() {
        return this._wsStyle;
    }

    set wsStyle(val) {
        this._wsStyle = val;
        this.__getRootElement().style.cssText = val || "";
    }
}

customElements.define('webswing-popupmenu', WebswingPopupMenuElement);