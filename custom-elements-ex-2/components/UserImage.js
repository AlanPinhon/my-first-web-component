export class UserImage extends HTMLElement {
    constructor(){
        super();

        this.src = '';

        this.attachShadow({mode:'open'})
        this.shadowRoot.innerHTML = this.UserImageTemplate();
    }

    UserImageTemplate(){
        return `
            <style>
                .user_photo{
                    width: 150px;
                    height: 150px;
                    background: #ddd;
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
                <img src="../../custom-elements-ex-1/avatar_icon.svg">
            </div>
        `;
    }
};