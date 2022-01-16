/*
* The MIT License (MIT)
*
* Product:      shopify-collection-dsl
* Description:  Create Custom- and Smart Collections for Shopify programmatically.
*
* Copyright (c) Notixbit Creative <info@notixbit.net>
* Copyright (c) Steven Agyekum <agyekum@posteo.de>
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software
* and associated documentation files (the "Software"), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies
* or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
* TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
* TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/

class CustomCollection {
  /**
   * Constructor
   * @param {string} title - The title
   */
  constructor(title) {
    this.method = 'customCollection'
    this.opts = {
      title
    }
  }
  /**
   * Sets the title
   * @param {string} column - The title
   * @returns {this} - Current instance
   */
  title(title) {
    this.opts.title = title
    return this
  }

  /**
   * Sets the sort-order
   * @param {string} order - The order
   * @returns {this} - Current instance
   */
  sort(order) {
    this.opts.sort_order = order
    return this
  }

  /**
   * Sets the scope
   * @param {string} scope - The scope
   * @returns {this} - Current instance
   */
  scope(scope) {
    this.opts.published_scope = scope
    return this
  }

  /**
   * Sets the body (description)
   * @param {string} html - The description
   * @returns {this} - Current instance
   */
  body(html) {
    this.opts.body_html = html
    return this
  }

  /**
   * Sets an image
   * @param {object} image - The image props
   * @returns {this} - Current instance
   */
  image(image) {
    this.opts.image = image
    return this
  }

  /**
   * Creates the collection
   * @param {Shopify} shopify - The Shopify instance
   * @param {boolean} dryrun - Whether to debug the request
   * @param {object} opts - Override internal this.opt property
   * @returns {promise} - Promise on success/fail
   */
  async create(shopify,
    dryrun = false,
    opts = this.opts) {
    shopify = shopify[this.method]
    const payload = {
      ...opts
    }
    return dryrun ? payload
      : await shopify.create(payload)
  }

}

module.exports = CustomCollection
