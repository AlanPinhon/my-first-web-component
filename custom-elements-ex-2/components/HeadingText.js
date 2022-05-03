export class HeadingText extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = this.HeadingTemplate();
    }

    static get observedAttributes(){
        return ['type'];
    }

    HeadingTemplate(){
        return `
            <style>
            h1{
                font-family: system-ui;
                font-weight: 700;
                color: #2c2e31;
                margin: 0;
            }

            h2{
                font-family: system-ui;
                font-weight: 500;
                color: #2c2e31;
                margin: 0;
            }

            h3{
                font-family: system-ui;
                font-weight: 400;
                color: #888;
                margin: 0;
            }
            </style>

            <h${this.getAttribute('type')}>
                <slot></slot>
            </h${this.getAttribute('type')}>
            
        `;
    }
};