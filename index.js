class UiCard extends HTMLElement {
    static get observedAttributes() {
        return ['firstname', 'lastname', 'email'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        console.log('firstname : ', this.firstname);
        console.log('lastname : ', this.lastname);
        console.log('email : ', this.email);
        this.render();
    }

    connectedCallback() {
        console.log('Ui card ready');
        this.render();
    }

    render() {
        this.firstname = this.getAttribute('firstname');
        this.lastname = this.getAttribute('lastname');
        this.email = this.getAttribute('email');
        const displayName = `${this.firstname} ${this.lastname}`.trim();

        this.shadowRoot.innerHTML = `

            <style>
                :host {
                    width: calc(33.333% - 14px);
                    display: inline-block;
                    margin: 6px;
                }

                .card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    background: #222;
                    padding: 20px;
                    border-radius: 20px;

                    color: white;
                    min-width: 220px;
                }

                img { max-width:100%; border-radius: 8px; }

                button.profile-btn {
                    margin-top: 12px;
                    background: #ff8c00;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    color: #111;
                    font-weight: 600;
                }

                button.duplicate-btn {
                    margin-left: 8px;
                    background: #b4ed15;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    color: #111;
                    font-weight: 600;
                }
            </style>

            <div class="card">
                <header>
                    <img src="https://images4.fanpop.com/image/photos/17000000/Anakin-Skywalker-anakin-skywalker-17028586-992-960.jpg" />
                </header>
                <article>
                    <p>Prénom : <strong>${this.firstname}</strong></p>
                    <p>Nom : <strong>${this.lastname}</strong></p>
                    <p>Email : <strong>${this.email}</strong></p>
                </article>
                <button class="profile-btn">Voir profil</button>
                <button class="duplicate-btn">Dupliquer</button>
            </div>
        `;

        const btn = this.shadowRoot.querySelector('.profile-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('userSelected', {
                    detail: { name: displayName },
                    bubbles: true,
                    composed: true
                }));
            });
        }
        const dupBtn = this.shadowRoot.querySelector('.duplicate-btn');
        if (dupBtn){
            dupBtn.addEventListener('click',()=>{
                alert('Carte dupliquée : ' + displayName);
                this.dispatchEvent(new CustomEvent('duplicateCard',{
                    detail: {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        email: this.email
                    },
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }
}

customElements.define("ui-card", UiCard);