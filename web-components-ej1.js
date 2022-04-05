class Avatar extends HTMLElement {
    constructor(){
        super();

        this.size = 'default';
        this.shape = null;
        this.src = '';
        this.icon = '';
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = this.AvatarTemplate();
    }

    static get observedAttributes(){
        return['size', 'shape', 'src', 'icon'];
    }

    AvatarTemplate(){

        return `
            <style>
                div{
                    display: flex;
                    margin: 1rem;
                    color: #fff;
                    background-color: #aaa;
                    border-radius: 50%;
                    align-items: center;
                    justify-content: center;
                    background-image: url("${this.src || this.icon}");
                    background-size: ${(this.src) ? 'cover' : '40%'};
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .default{
                    width: 3rem;
                    height: 3rem;
                    font-size: 1rem;
                }
                .large{
                    width: 5rem;
                    height: 5rem;
                    font-size: 1.5rem;
                }
                .small{
                    width: 2rem;
                    height: 2rem;
                    font-size: .75rem;
                }
                .square{
                    border-radius: 10%;
                }
                .avatar-icon{
                    width: 2rem;
                    
                    background-repeat: no-repeat;
                }
            </style>

            <div class="${this.size} ${this.shape || ''}">
                <slot></slot>
            </div>
        `  
    }


    attributeChangedCallback(name, oldVal, newVal){
        this[name] = newVal;       
        this.shadowRoot.innerHTML = `${this.AvatarTemplate()}`
    }
};

class Badge extends HTMLElement{
    constructor(){
        super();

        this.dot = null;

        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = this.BadgeTemplate();
    }

    static get observedAttributes(){
        return['dot'];
    }

    BadgeTemplate(){
        return `
            <style>
                .dot{
                    width: .5rem;
                    height: .5rem;
                    border: 1px solid #fff;
                    border-radius: 50%;
                    background-color: #f00;
                }
            </style>
            <div class="${this.dot || ''}"></div>
        `
    }

    attributeChangedCallback(name, oldVal, newVal){
        this[name] = newVal;       
        this.shadowRoot.innerHTML = `${this.BadgeTemplate()}`
    }
}

customElements.define('badge-notification', Badge);
customElements.define('avatar-icon', Avatar);