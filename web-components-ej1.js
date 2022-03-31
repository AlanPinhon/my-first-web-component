class Avatar extends HTMLElement {
    constructor(){
        super();

        let sizeAvatar = this.getAttribute('size');
        (sizeAvatar) ? this.size = this.sizeAvatar : this.size = 'default';

        this.attachShadow({mode:'open'});
    }

    static get observedAttributes(){
        return['size','shape'];
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            ${this.AvatarTemplate()}
        `;
    }

    get shape (){
        return this.hasAttribute('shape');
    }

    set shape (value) {
        if(value){
            this.setAttribute('shape', '');
            this.shadowRoot.querySelector('div').classList.add('square');
        } else {
            this.removeAttribute('shape');
            this.shadowRoot.querySelector('div').classList.remove('square');
        }
    }

    AvatarTemplate(){

        let shapeClass = `${this.size} `;
        
        if(this.shape){
            shapeClass += 'square';
        }

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

            <div class="${shapeClass}">
                
                <slot></slot>
            </div>
        `   
    }


    attributeChangedCallback(name, oldVal, newVal){
        if(name === 'size' && oldVal !== newVal){
            this.size = newVal;
            this.shadowRoot.innerHTML = `${this.AvatarTemplate()}`
        }
    }
};

customElements.define('avatar-icon', Avatar);