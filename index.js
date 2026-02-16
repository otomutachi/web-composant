class UiCard extends HTMLElement {
    static get observedAttributes() {
        return ['firstname', 'lastname', 'email'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.firstname = this.getAttribute('firstname');
        this.lastname = this.getAttribute('lastname');
        this.email = this.getAttribute('email');

       
    }

    attributeChangedCallback(name, oldValue, newValue) {
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
            </div>
        `;

        const btn = this.shadowRoot.querySelector('.profile-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                const nameDetail = this.getAttribute('name') || displayName;
                this.dispatchEvent(new CustomEvent('userSelected', {
                    detail: { name: nameDetail },
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }
}

customElements.define("ui-card", UiCard);