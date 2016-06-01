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

      bogofedContents = [];

      targetLength = this.contents.length;

      while (bogofedContents.length < targetLength && this.contents.length > 1) {

      item = this.contents.pop();

      if (item.bogof === false) {

        bogofedContents.push(item);
      }
        else {

          if (this.contents.indexOf(item) > -1) {

            bogofedContents.push(item);
            bogofedContents.push(item);
            this.removeAnItem(item);
          }
        }
      }
      if (this.contents.length === 1) {
        bogofedContents.push(this.contents[0]);
      }
      this.contents = bogofedContents;
  }



  


}

module.exports = basket;



















