export class UserImage extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'})
        this.shadowRoot.innerHTML = this.UserImageTemplate();
    }

    static get observedAttributes(){
        return ['img'];
    }

    UserImageTemplate(){
        return `
            <style>
                .user_photo{
                    width: 150px;
                    height: 150px;
                    background: #fff;
                    padding: 5px;
                    border-radius: 50%;
                    border: 1px solid rgba(0,0,0,.25);
                }
                .user_photo img{
                    width: 150px;
                    border-radius: 50%;
                }
            </style>

            <div class="user_photo">
                <img src="${this.getAttribute('img')}">
            </div>
        `;
    }
};