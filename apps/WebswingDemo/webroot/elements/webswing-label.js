class WebswingLabelElement extends HTMLElement  {

    _text;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                span[part=root] {
                    position: absolute;
                }
            </style>
            <span part="root"><slot></slot></span>
        `;
    }

    __getRootElement() {
        return this.shadowRoot.querySelector('span[part=root]');
    }

    get text() {
        return this._text;
    }
    
    set text(val) {
        this._text = val;
        this.shadowRoot.querySelector('slot').textContent = this._text;
    }

}

customElements.define('webswing-label', WebswingLabelElement);