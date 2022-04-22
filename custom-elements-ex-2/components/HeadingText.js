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
                .title{
                    font-size: 1.1rem;
                    color: #888;
                    margin: 0;
                }
                .info-text{
                    font-size: 2.38rem;
                    color: #2c2e31;
                    margin: .31rem;
                }
            </style>

            <p class="${this.getAttribute('type')}">
                <slot></slot>
            </p>
            
        `;
    }
};