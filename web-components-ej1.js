class Avatar extends HTMLElement {
    constructor(){
        super();

        this.size = 'default';
        this.shape = null;
        this.src = null;
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = this.AvatarTemplate();
    }

    static get observedAttributes(){
        return['size', 'shape'];
    }

    AvatarTemplate(){
        return `
            <style>
                div{
                    display: inline-block;
                    margin: .5rem;
                    color: #fff;
                    text-align: center;
                    background-color: #aaa;
                    border-radius: 50%;
                }
                .default{
                    width: 3rem;
                    height: 3rem;
                    line-height: 3rem;
                    font-size: 1rem;
                }
                .large{
                    width: 5rem;
                    height: 5rem;
                    line-height: 5rem;
                    font-size: 1.5rem;
                }
                .small{
                    width: 2rem;
                    height: 2rem;
                    line-height: 2rem;
                    font-size: .75rem;
                }
                .square{
                    border-radius: 5%;
                }
            </style>

            <div class="${this.size} ${this.shape || '' } ${this.src || '' }">
                
                <slot></slot>
            </div>
        `  
    }


    attributeChangedCallback(name, oldVal, newVal){
        this[name] = newVal;
        this.shadowRoot.innerHTML = `${this.AvatarTemplate()}`
    }
};

customElements.define('avatar-icon', Avatar);