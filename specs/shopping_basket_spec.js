var basket = require('../shopping_basket');

var assert = require('chai').assert;                                         

describe('Basket', function() {

  it('should be empty at start', function() {

    assert.equal(0, basket.contents.length);

  })

  it('should start with value of its contents equalling zero', function() {

    assert.equal(0, basket.value);
  })

  it('should start with loyaltyCard set to false', function() {

    assert.equal(false, basket.loyaltyCard);
  })

  it('should be able to have an item added to its contents', function() {

    var item = {
      name: 'cake', 
      price: 150
    }

    basket.addItem(item);
    assert.equal(basket.contents[0], item);
    basket.empty();
  })

  it('should be able to have a single item removed from its contents', function() {

    var item = {
      name: 'cake', 
      price: 150
    };

    var item2 = {
      name: 'fags',
      price: 1000
    };

    basket.addItem(item);
    basket.addItem(item2);
    basket.removeAnItem(item);
    assert.equal(basket.contents[0], item2);
    assert.equal(basket.contents.length, 1);
    basket.empty();
  })


  it('should be able to have all items removed from its basket', function() {

    basket.empty();
    assert.equal(0, basket.contents.length);
  })

  it('should be able to change its loyalty card status', function() {

    basket.changeCardStatus();
    assert.equal(true, basket.loyaltyCard);
    basket.changeCardStatus();
  })

  it('should have a value which increases when an item is added', function() {

    basket.empty();
    var item = {
      name: 'cake',
      price: 150
    };
    basket.addItem(item);
    assert.equal(150, basket.value);
    basket.empty();
  })

  it('should have a value which equals zero when contents are emptied', function() {

    basket.empty();
    assert.equal(0, basket.value);
  })

  it('should have a value which decreases when an item is removed from its contents', function() {

    var item = {
      name: 'cake',
      price: 150
    };

    var item2 = {
      name: 'fags',
      price: 1000
    };

    basket.addItem(item);
    basket.addItem(item2);
    basket.addItem(item2);
    basket.removeAnItem(item);
    assert.equal(2000, basket.value);
    basket.empty();
  })

  it('should have a discounted value that is 20% less than the total value of all the items in its contents, for cases where the total value is over £20 (2000)', function() {

    var item = {
      name: 'malibu black',
      price: 2699
    };

    basket.addItem(item);
    basket.applyDiscount();
    assert.equal(2159, basket.value);
    basket.empty()
  })

  it('should not have any discount applied to its value when the base value is less than £20', function() {

    var item = {
      name: 'cake',
      price: 150
    };

    basket.addItem(item);
    basket.applyDiscount();
    assert.equal(150, basket.value);
    basket.empty();
  })

  it('should have a further 5% discount applied to its value where the base value of the contents is over £20 and a loyalty card is held', function() {

    var item = {
      name: 'malibu black',
      price: 2699
    };

    basket.addItem(item);
    basket.changeCardStatus();
    basket.applyDiscount();
    assert.equal(2051, basket.value);
    basket.empty();
  })

  it('should have its value reduced accordingly if its contents hold an even number of BOGOF items', function() {

    var item = {
      name: 'malibu black',
      price: 2699,
      bogof: true
    };

    var item2 = {
      name: 'cake',
      price: 150,
      bogof: false
    };

    basket.addItem(item);  //If i comment out this line then both of these last
    basket.addItem(item);     //two tests pass; otherwise they both fail??
    basket.addItem(item2);
    basket.addItem(item);
    basket.addItem(item);
    basket.applyBOGOF();
    assert.equal(5548, basket.value);
    basket.empty();
  })

  it('should have its value reduced accordingly if its contents hold an odd number of BOGOF items', function() {  //passes test but loses item from contents

    var item = {
      name: 'malibu black',
      price: 2699,
      bogof: true
    };

    var item2 = {
      name: 'cake',
      price: 150,
      bogof: false
    };

    basket.empty();
    basket.addItem(item);
    basket.addItem(item);
    basket.addItem(item2);
    basket.addItem(item2);
    basket.addItem(item);
    basket.addItem(item);
    basket.addItem(item);
    basket.applyBOGOF();
    assert.equal(8397, basket.value);
    console.log( basket ) 
    // for (item of basket.contents) {
    // console.log(item.name)
    // }
  })


})



















