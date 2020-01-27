/*
* The MIT License (MIT)
*
* Product:      shopify-collection-dsl
* Description:  Create Custom- and Smart Collections for Shopify programmatically.
*
* Copyright (c) 2020 Notixbit Creative <info@notixbit.net>
* Copyright (c) 2020 Steven Agyekum <agyekum@posteo.de>
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

const CustomCollection = require('./CustomCollection')

class SmartCollection extends CustomCollection {
  /**
   * Constructor
   * @param {string} title - The title
   */
  constructor(title) {
    super(title)
    this.method = 'smartCollection'
    this.opts = {
      rules: [],
      title
    }
  }

  /**
   * Sets a rule
   * @param {string} column - The column
   * @param {string} relation - The relation
   * @param {string} condition - The condition
   * @returns {this} - Current instance
   */
  rule(column, relation, condition) {
    this.opts.rules.push({
      column,
      relation,
      condition
    })
    return this
  }

  /**
   * Sets disjunctive prop to true
   * @returns {this} - Current instance
   */
  disjunctive() {
    this.opts.disjunctive = true
    return this
  }

}

module.exports = SmartCollection
