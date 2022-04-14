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
                    margin: 0;
                    color: #fff;
                    background-color: #aaa;
                    border-radius: 50%;
                    align-items: center;
                    justify-content: center;
                    background-image: url("${this.src || this.icon}");
                    background-size: ${(this.src) ? 'cover' : '40%'};
                    background-repeat: no-repeat;
                    background-position: center;
                    position: relative;
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
        this.shadowRoot.innerHTML = this.AvatarTemplate();
    }
};

class Badge extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = this.BadgeTemplate();
    }

    static get observedAttributes(){
        return['dot', 'count'];
    }

    BadgeTemplate(){
        const count = this.getAttribute('count');
        const dot = this.getAttribute('dot');
            
        if(!dot && !count) return '<slot></slot>';

        if(dot) this.removeAttribute('count');
        
        return `
            <style>
                #container{
                    display: inline-block;
                    position: relative;
                }
                .dot{
                    display: flex;
                    position: absolute;
                    background-color: #f00;
                    width: ${(count) ? '1.25rem' : '.4rem'};
                    height: ${(count) ? '1.25rem' : '.4rem'};
                    border: 1px solid #fff;
                    border-radius: 50%;
                    top: ${(count) ? '-.5rem' : '-.2rem'};
                    right: ${(count) ? '-.5rem' : '-.2rem'};
                    z-index: 100;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-size: .8rem;
                }
            </style>
            <span id="container">
                <span class="dot">${(count > 99) ? '+99' : count || ''}</span>
                <slot></slot>
            </span>
        `
    }

    attributeChangedCallback(name, oldVal, newVal){       
        this.shadowRoot.innerHTML = this.BadgeTemplate()
    }
}

customElements.define('badge-notification', Badge);
customElements.define('avatar-icon', Avatar);