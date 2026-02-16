class UiCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.firstname = this.getAttribute("firstname");
        this.firstname = this.getAttribute("firstname");
        this.firstname = this.getAttribute("firstname");
    
    }

    connectedCallback() {
        console.log('ui card ready')
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Card Title';
        const content = this.getAttribute('content') || 'Card content';
        const footer = this.getAttribute('footer') || 'Card footer';
        const image = this.getAttribute('image') || '';
        
        const imageHtml = image ? `<img src="${image}" alt="${title}">` : '';

        this.shadowRoot.innerHTML =` 
        <div>
             <header
        <div>`

        const template = `
            <div class="card">
                ${imageHtml}
                <h2>${title}</h2>
                <p>${content}</p>
                <footer>${footer}</footer>
            </div>
        `;
        
        this.shadowRoot.innerHTML =  template;
    }
}

customElements.define('ui-card', UiCard);