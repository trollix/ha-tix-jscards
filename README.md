# ha-tix-jscards

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

### Using the Card

Go to a dashboard. Use the three dots in the upper right hand corner to edit the
dashboard. Take control if required. Click ***+ ADD CARD***. At the bottom
select ***Manual*** to add a custom card.

![card configuration](img/img1.png)

In the card configuration enter:

```yaml
type: 'custom:hello-world-card'
entity: sun.sun
```

Don't forget the `custom` prefix, as you add a custom card. The type of the card
is the type you did register in the last line of the `card.js` file:

```js
customElements.define('hello-world-card', HelloWorldCard);
```

If everything went well so far, congratulations! You should now see the output of the first card you created yourself. Try different entities.

## Hello World plus

Find the code in the file named `card.js` alongside with this README.

### Assisting the setup

While setting up your card in the dashboard, `setConfig()` gets triggered upon
edit with the configuration data.

```js
setConfig(config) {
    if (!config.entity) {
        throw new Error('Please define an entity!');
    }
    this.config = config;
}
```

You consume it to set up the internal
configuration of the object. Our card requires an entity. If it is missing, the
method throws an error.

![entity message](img/entity-msg.png)

The error will be caught to be displayed in an error frame to guide the user.

### Providing a default configuration

To provide a default configuraion define a method `getStubConfig`. It must
return a data object (json) holding the properties you want to set a default for
(without the `type:` parameter).

```js
static getStubConfig() {
    return { entity: "sun.sun" }
}
```

![calling card.js in the browser](img/script-in-browser.png)

If you change the code in `card.js` for testing, you may have difficulties to
reload it. In this case it may help, to directly reload the script and check,
that it has been updated.

### Adding the card to rhe visual card selection

To register your card for the visual selection register it the the
`window.customCards` list. Add an object with the keys `type` and `name` and
optionally `description`.

```js
window.customCards = window.customCards || [];
window.customCards.push({
    type: "hello-world-card",
    name: "Hello World Card",
    description: "A custom card made by me!" // optional
});
```

The type has to match the name of the custom element you did set. Remember?

```js
customElements.define('hello-world-card', HelloWorldCard);
```

![visual selection](img/img2.png)

#### A note aside

If you are a little experienced, you will wounder, that there is no interface to
register the card and that the internal implementation of the registry gets
exposed. You even have to care to create the list, if it does not already exist.

That's a decision made by the developers. A likely reason is, that all
dependencies shall be avoided to give you the full freedom to choose your own
tools. You may consider to pack the lines after the body of the class into a
function with suitable parameters, that you can reuse for all your cards.

### Summary

Let's wrap up the ***Hello World*** tutorials. There are two main points to
mention on the level of architecture.

First, the card is a [***custom
element***](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).
The class inherits  a lot of methods from `HTMLElement` or any equivalent parent
class. Often you will find cards, that inherit from [`LitElement`](https://lit.dev).

Second, there is an interface to the ***Home Assistant Frontend***. Some methods
are required, others are optional. There is no full specification yet. In doubt
the source is the authority.

You did learn, how to throw errors to help the user with the setup of the card.
In addition you can provide a default configuration. Finally you did learn, how
to register the card for the visual card selection.
