class Avatar extends HTMLElement {
    constructor(){
        super();
        Recuerda que el constructor es para setear valores iniciales
        Si bien esto funciona, ese mismo trabajo ya se está haciendo en el
        attributeChangedCallback. ya que el método observedAttributes está 
        escuchando cada cambio de los atributos asignados en el array.
        //
        // let sizeAvatar = this.getAttribute('size');
        // (sizeAvatar) ? this.size = this.sizeAvatar : this.size = 'default';


        this.size = 'default';
        this.shape = null;
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = this.AvatarTemplate(); //Esto ya retorna un string, no es necesario volverlo a castear.
    }

    static get observedAttributes(){
        return['size', 'shape'];
    }

    // Ahora que se refactorizó, no hay nada que hacer dentro del connectedCallback
    // Se puede quitar.
    // connectedCallback() {}

    AvatarTemplate() {
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

            <div class="${this.size} ${this.shape || ''}">
                <slot></slot>
            </div>
        `   
    }


    attributeChangedCallback(name, _, newVal){
        console.log(name, newVal);
        // Creo que para este tipo de componentes en donde sólo reciben valores
        // para después mostrarlos simplementa bastaría con inyectar el name de la
        // propiedad como key del objeto (en este caso this) y setearle el nuevo valor
        // No hay necesidad de hacer condicionales ni tampoco de hacer getters y setters.
        this[name] = newVal; 
        this.shadowRoot.innerHTML = `${this.AvatarTemplate()}` //Refrescamos los estilos, good.
    }
};

customElements.define('avatar-icon', Avatar);