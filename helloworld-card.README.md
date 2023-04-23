# INFORMATIONS

## The Cards Code

Find the code in the file named `card.js` alongside with this README.

### A custom element

The card has to be a [***custom
element***](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).
The class inherits from `HTMLElement` or any equivalent parent class. Often you
will find cards, that inherit from [`LitElement`](https://lit.dev).

```js
class HelloWorldCard extends HTMLElement {
```

### Configuration

While setting up your card in the dashboard, `setConfig()` gets triggered upon
edit with the configuration data. This method is required. You use it here to
update the internal config property. In the second tutorial, you will go a step
ahead.

```js
    setConfig(config) {
        this.config = config;
    }
```

### View

```js
set hass(hass) {
    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const stateStr = state ? state.state : 'unavailable';
```

The `hass()` setter gets triggered, when the state of the hass object is
changing. First we extract the information of our interest into constants,
to prepare them for the output.

```js
if (!this.content) {
    this.innerHTML = `
        <ha-card header="Hello ${hass.user.name}!">
            <div class="card-content"></div>
        </ha-card>
    `;
    this.content = this.querySelector('div');
}
```

The HTML enclosure of the card (including the header) gets setup once. It does
not change. Nonetheless we can use the user name here. There is a new instance
per login. The inner `<div>` as a placeholder gets assigned to the content
variable.

```js
this.content.innerHTML = `
    <p>The ${entityId} is ${stateStr}.</p>
`;
```

Only the dynamic node is updated upon each call to minimize changes of the DOM
tree.
