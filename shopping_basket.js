var  basket = {

  contents: [],


  value: 0,


  loyaltyCard: false,

  addItem: function(item) {

    this.contents.push(item);
    this.addToValue(item.price);
  },


  removeAnItem: function(item) {

    i = 1;
    while (i < 2) {
      for (article of this.contents) {
        if (article === item) {
          this.contents.splice(this.contents.indexOf(article), 1);
          i++;
          break;
        }
      }
    }
    this.addToValue(0 - item.price);
  },


  empty: function() {

    this.contents = [];
    this.value = 0;
  },


  changeCardStatus: function() {

    this.loyaltyCard ? this.loyaltyCard = false : this.loyaltyCard = true;
  },


  addToValue: function(amount) {

    this.value += amount;
  },


  applyDiscount: function() {

    if (this.value > 2000) {

      this.value = Math.floor(0.8 * this.value);
    }

    this.loyaltyCard ? this.value = Math.floor(0.95 * this.value) : this.value = this.value;
  },


  applyBOGOF: function() {

      bogofedContents = []; //all basket contents should be copied here by
                            //end of the function
      while (this.contents.length > 1) { 
        var item = this.contents.pop(); //pops item off array as long as there
                                        //are at least 2 items in it
        if (item.bogof === false) { //if popped item is not bogof...
          bogofedContents.push(item); //...pushes item into the new array
        } else {  //if popped item is bogof...

          if (this.contents.indexOf(item) > -1){//checks for duplicate in basket
            bogofedContents.push(item);//...pushes popped item into new array
            bogofedContents.push(item);//...pushes duplicate item into new array
            this.removeAnItem(item);//removes duplicate from basket and adjusts
          }                         //basket value
          else {bogofedContents.push(item);}
        }
      }
      if (this.contents.length === 1) { //if an single item is left in basket
        bogofedContents.push(this.contents[0]);//pushes item into new array
      }
      this.contents = bogofedContents;//makes the new array the basket contents
  }



  


}

module.exports = basket;



















