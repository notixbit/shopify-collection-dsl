
# shopify-collection-dsl

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Build Status](https://travis-ci.org/notixbit/shopify-collection-dsl.svg?branch=master)](https://travis-ci.org/notixbit/shopify-collection-dsl) [![npm version](https://badge.fury.io/js/%40notixbit%2Fshopify-collection-dsl.svg)](https://badge.fury.io/js/%40notixbit%2Fshopify-collection-dsl)

Create Custom- and Smart Collections for Shopify programmatically.

This module is using [Shopify-api-node](https://github.com/MONEI/Shopify-api-node) for communicating with the Shopify API.

Features:
  * [CustomCollection](https://help.shopify.com/en/api/reference/products/customcollection#create-2020-01) & [SmartCollection](https://help.shopify.com/en/api/reference/products/smartcollection#create-2020-01)
  * ES6 Promises (async/await)
  * Debugging (dry-run)
  * Tests

---

# Table of contents
* [Use Case](#use-case)
* [CustomCollection](#customcollection)
  * [API Reference](#api-reference)
  * [Method Reference](#method-reference)
    * [Create a CustomCollection instance](#create-a-customcollection-instance)
    * [Set title](#set-title)
    * [Set sort-order](#set-sort-order)
    * [Set scope](#set-scope)
    * [Set body (description)](#set-body-description)
    * [Set image](#set-image)
    * [Create the collection](#create-the-collection)
* [SmartCollection](#smartcollection)
  * [API Reference](#api-reference-1)
  * [Method Reference](#method-reference-1)
    * [Create a SmartCollection instance](#create-a-smartcollection-instance)
    * [Set rule](#set-rule)
    * [Set disjunctive](#set-disjunctive)
* [Setup / Install](#setup--install)
* [Unit-Tests](#unit-tests)
  * [Make](#make)
  * [NPM](#npm)
* [Contributing](#contributing)
* [License](#license)

---

# Use Case

Here at Notixbit, one of our customers wanted us to create 40+ Smart Collections including 
multiple rules for those collections. Using the Shopify-API was a no-brainer for us, and so we
started writing a parser that would allow us to programmatically create those collections.
The parser reads data from a local/remote database while provisioning the collections that are needed for the customers shop.

This module (shopify-collection-dsl) is a wrapper around Shopify-api-node, and we decided
to separate it from the parser and release it as an Open Source project.

---

# CustomCollection

## API Reference

```javascript
CustomCollection(
    [String=title]
) -> Object {
    /* Constants */
    this: Object=this
    opts: Object=this.opts

    /* Methods */
    title: [String=title] | this
    sort: [String=order] | this
    scope: [String=scope] | this
    body: [String=html] | this
    image: [Object=image] | this
    async create: [Shopify=shopify, Boolean=dryrun, Object=opts] | Promise
}

```

---

## Method reference:

### Create a CustomCollection instance

**Available options:**

| Argument | Description | Required |
| ------ | ----------- | ------ | 
| title | The collection title | Yes | 

```javascript
const collection = new CustomCollection('my-title')
```
---

### Set title

You can change the collection title by calling the ``.title`` method, too.<br>

**Available arguments:**

| Argument | Description | Default |
| ------ | ----------- | ----- |
| title | The collection title | None |

```javascript
collection.title('my-title')
```

---

### Set sort-order

**Available arguments:**

| Argument | Description | Default |
| ------ | -----------  | ----- |
| order | The sort-order | manual |

Reference:<br>

```
alpha-asc: Alphabetically, in ascending order (A - Z).
alpha-desc: Alphabetically, in descending order (Z - A).
best-selling: By best-selling products.
created: By date created, in ascending order (oldest - newest).
created-desc: By date created, in descending order (newest - oldest).
manual: Order created by the shop owner.
price-asc: By price, in ascending order (lowest - highest).
price-desc: By price, in descending order (highest - lowest).
```
[See Documentation	
](https://help.shopify.com/en/api/reference/products/customcollection)<br>

```javascript
collection.sort('alpha-asc')
```

---

### Set scope

**Available arguments:**

| Argument | Description | Default |
| ------ | -----------  | ----- |
| scope | The scope | global |

Reference:<br>

```
web: The custom collection is published to the Online Store channel but not published to the Point of Sale channel.

global: The custom collection is published to both the Online Store channel and the Point of Sale channel.
```
[See Documentation	
](https://help.shopify.com/en/api/reference/products/customcollection)<br>

```javascript
collection.scope('web')
```

---

### Set body (description)

**Available arguments:**

| Argument | Description | Default |
| ------ | -----------  | ----- |
| html | The description | None |

[See Documentation	
](https://help.shopify.com/en/api/reference/products/customcollection)<br>

```javascript
collection.body('Great <b>shoes</b> for men!')
```

---

### Set image

**Available arguments:**

| Argument | Description | Default |
| ------ | -----------  | ----- |
| image | The image | none |

Reference:<br>

```
attachment: An image attached to a custom collection returned as Base64-encoded binary data.
src: The source URL that specifies the location of the image.
alt: Alternative text that describes the collection image.
created_at: The time and date (ISO 8601 format) when the image was added to the collection.
width: The width of the image in pixels.
height: The height of the image in pixels.
```
[See Documentation	
](https://help.shopify.com/en/api/reference/products/customcollection)<br>

```javascript
collection.image({
  'src': 'http://example.com/shoes.png',
  'alt': 'Shoes picture'
})
```

---

### Create the collection

**Available arguments:**

| Argument | Description | Default |
| ------ | -----------  | ----- |
| shopify | Shopify module instance | none |
| dryrun | Whether to debug the request | false |
| opts | Override internal ``this.opts`` | this.opts |


```javascript
await collection.create(shopify)

// or

collection.create(shopify)
  .then()
  .catch()
```

To debug (dry-run) the payload for the request,<br>
simply pass ``true`` to the ``.create`` method. 

```javascript
const payload = collection.create(shopify, true)
console.log(payload)
```

---

# SmartCollection

## API Reference

```javascript
SmartCollection extends CustomCollection(
    [String=title]
) -> Object {
    /* Constants */
    this: Object=this
    opts: Object=this.opts

    /* Methods */
    title: [String=title] | this
    sort: [String=order] | this
    scope: [String=scope] | this
    body: [String=html] | this
    image: [String=image] | this
    rule: [String=column, String=relation, String=condition] | this
    disjunctive: [] | this
    async create: [Shopify=shopify, Boolean=dryrun, Object=opts] | Promise
}

```

---

## Method reference:

A SmartCollection instance inherits all CustomCollection methods, including two additional methods.

### Create a SmartCollection instance

**Available options:**

| Argument | Description | Required |
| ------ | ----------- | ------ | 
| title | The collection title | Yes | 

```javascript
const collection = new SmartCollection('my-title')
```
---

### Set rule

You can set multiple rules for your Smart Collection.<br>

**Available arguments:**

| Argument | Description | Default |
| ------ | ----------- | ----- |
| rule | The rule | None |

```javascript
collection.rule('title', 'contains', 'shoes')
```

Chain them like so:

```javascript
collection
  .rule('title', 'contains', 'shoes')
  .rule('vendor', 'equals', 'Nike')
```


---

### Set disjunctive

If this method is called, the internal ``opts.disjunctive`` is set to ``true``,<br>
otherwise it is set to ``false``.

```
true: Products only need to match one or more of the rules to be included in the smart collection.
false: Products must match all of the rules to be included in the smart collection.
```
[See Documentation	
](https://help.shopify.com/en/api/reference/products/smartcollection)<br>

```javascript
collection.disjunctive()
```

---

## Setup / Install

Use `npm install @notixbit/shopify-collection-dsl` 

```javascript
const { 
  Shopify, 
  CustomCollection, 
  SmartCollection 
} = require('@notixbit/shopify-collection-dsl')

const shopify = new Shopify({
  'shopName': 'your-shop',
  'apiKey': 'your-key',
  'password': 'your-pw'
})

// Now you can create Custom Collections...
const collection = new CustomCollection('my-collection')

collection
  .body('Great products for young people')
  .sort('best-selling')
  .create(shopify)

// ... and/or Smart Collections

const collection = new SmartCollection('my-collection')

collection
  .body('Great products for young people')
  .sort('best-selling')
  .rule('title', 'contains', 'shoes')
  .rule('vendor', 'equals', 'Nike')
  .disjunctive()
  .create(shopify)
```

---

## Unit-Tests

The testing-framework used in this module is [Mocha](https://github.com/mochajs/mocha) with the BDD / TDD assertion library [Chai](https://github.com/chaijs/chai).

* test/test.default.js `Performs 4 tests` | [Source](../master/test/test.default.js)

Output using [Mocha](https://github.com/mochajs/mocha) `list` reporter:   

<img src="https://i.imgur.com/3vrrRHc.png" />

Default reporter: `list`

### Make

```make test```

### NPM

```npm test```

---

## Contributing

You're very welcome and free to contribute. Thank you.

---

## License

[MIT](LICENSE)
