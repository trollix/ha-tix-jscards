class HelloWorldPlusCard extends HTMLElement {

    config;
    content;

    setConfig(config) {
        if (!config.entity) {
            throw new Error('Please define an entity!');
        }
        this.config = config;
    }

    set hass(hass) {
        const entityId = this.config.entity;
        const state = hass.states[entityId];
        const stateStr = state ? state.state : 'unavailable';

        // done once
        if (!this.content) {
            // user makes sense here as every login gets it's own instance
            this.innerHTML = `
                <ha-card header="Hello ${hass.user.name}!">
                    <div class="card-content"></div>
                </ha-card>
            `;
            this.content = this.querySelector('div');
        }
        // done repeatedly
        this.content.innerHTML = `
            <p>The ${entityId} is ${stateStr}.</p>
        `;
    }

    static getStubConfig() {
        return { entity: "sun.sun" }
    }

}

customElements.define('helloworld-plus-card', HelloWorldPlusCard);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "helloworld-plus-card",
    name: "Hello World Plus Card",
    description: "A custom card made by me!" // optional
});