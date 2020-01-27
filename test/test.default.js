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

const { expect } = require('chai')
const { CustomCollection, SmartCollection } = require('../index')

const title = 'my-collection'
const otherTitle = 'other-title'
const sort = 'best-selling'
const body = 'Good products for <b>men</b>'
const scope = 'web'
const image = {
  src: 'http://example.com/image.png',
  alt: 'An image'
}

let collection = undefined

describe('CustomCollection [TEST]', () => {

  it('creates an instance', done => {

    collection = new CustomCollection(title)

    performInstanceChecks(collection)
    done()
  })

  it('checks for valid property values', done => {

    performPropertyChecks(collection)
    done()
  })

})

describe('SmartCollection [TEST]', () => {

  it('creates an instance', done => {

    collection = new SmartCollection(title)

    performInstanceChecks(collection)

    expect(collection.opts).to.have.property('rules')

    expect(collection).to.have.property('rule')
    expect(collection.rule).to.be.a('function')

    expect(collection).to.have.property('disjunctive')
    expect(collection.disjunctive).to.be.a('function')

    done()
  })

  it('checks for valid property values', done => {

    collection
      .rule('title', 'contains', 'shoes')
      .rule('vendor', 'equals', 'Nike')

    performPropertyChecks(collection)

    expect(collection.opts.rules).to.be.a('array')
    expect(collection.opts.rules).to.deep.have.members([{
      column: 'title',
      relation: 'contains',
      condition: 'shoes',
    },
    {
      column: 'vendor',
      relation: 'equals',
      condition: 'Nike',
    }])

    done()
  })

})

function performInstanceChecks(collection) {
  expect(collection).to.be.a('object')

  expect(collection).to.have.property('opts')
  expect(collection.opts).to.be.a('object')

  expect(collection).to.have.property('title')
  expect(collection.title).to.be.a('function')

  expect(collection).to.have.property('sort')
  expect(collection.sort).to.be.a('function')

  expect(collection).to.have.property('scope')
  expect(collection.scope).to.be.a('function')

  expect(collection).to.have.property('body')
  expect(collection.body).to.be.a('function')

  expect(collection).to.have.property('image')
  expect(collection.image).to.be.a('function')

  expect(collection).to.have.property('create')
  expect(collection.create).to.be.a('function')
}

function performPropertyChecks(collection) {
  expect(collection.opts).to.have.property('title')
  expect(collection.opts.title).to.equal(title)

  collection
    .title(otherTitle)
    .sort(sort)
    .body(body)
    .scope(scope)
    .image(image)

  expect(collection.opts).to.have.property('title')
  expect(collection.opts.title).to.equal(otherTitle)

  expect(collection.opts).to.have.property('sort_order')
  expect(collection.opts.sort_order).to.equal(sort)

  expect(collection.opts).to.have.property('body_html')
  expect(collection.opts.body_html).to.equal(body)

  expect(collection.opts).to.have.property('published_scope')
  expect(collection.opts.published_scope).to.equal(scope)

  expect(collection.opts).to.have.property('image')
  expect(collection.opts.image).to.be.a('object')
  expect(collection.opts.image).to.equal(image)
}