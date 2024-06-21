class WebswingToolTipElement extends HTMLElement  {

    _text;
    _wsStyle;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div[part=root] {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                }
            </style>
            <div part="root"><slot></slot></div>
        `;
    }

    __getRootElement() {
        return this.shadowRoot.querySelector('div[part=root]');
    }

    get text() {
        return this._text;
    }
    
    set text(val) {
        this._text = val;
        this.shadowRoot.querySelector('slot').textContent = this._text;
    }
    
    get wsStyle() {
        return this._wsStyle;
    }

    set wsStyle(val) {
        this._wsStyle = val;
        this.__getRootElement().style.cssText = val || "";
    }
}

customElements.define('webswing-tooltip', WebswingToolTipElement);