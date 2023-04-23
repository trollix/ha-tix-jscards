# INFORMATIONS

## The Code

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
