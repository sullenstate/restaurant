// $(document).on('ready', function() {
  
// });

var showFlag = function(label, flag){
	return flag ? label : 'not ' + label;
};

var FoodItem = function(name, calories, vegan, glutenFree, citrusFree){
	this.name = name;
	this.calories = calories;
	this.vegan = vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;
};

FoodItem.prototype.toString = function(){
	return _.capitalize(this.name) + ': ' + this.calories + ' calories, ' + showFlag('vegan', this.vegan) + ', ' +
	  showFlag('gluten free', this.glutenFree) + ', ' + showFlag('citrus free', this.citrusFree) + '.';
};

var Drink = function(name, description, price, ingredients){
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
};

var drinkOrPlateToString = function(){
	return _.capitalize(this.name) + ' ($' + this.price.toFixed(2) + '). ' + this.description + ' Ingredients: '
	+ _.capitalize(this.ingredients.map(_.property('name')).join(', ')) + '.';
};

Drink.prototype.toString = drinkOrPlateToString;

var Plate = function(name, description, price, ingredients){
	this.name = name;
	this.description = description;
	this.price = price;
	this.ingredients = ingredients;
};

Plate.prototype.toString = drinkOrPlateToString;

var Order = function(plates){
	this.plates = plates;
};

// Takes an array and assumes duplicate elements are contiguous in the array and counts duplicates
var countDuplicates = function(array){
	return array.sort().reduce(function(accum, next){
		if (accum.length === 0 || next !== _.last(accum).item) {
			return accum.concat([{item : next, count : 1}])
		} else {
			var newAccum = _.clone(accum)
			newAccum[newAccum.length - 1]++;
			return newAccum;
		}
	}, []);
};

Order.prototype.toString = function(){
	return 
};

var Menu = function(plates){
	this.plates = plates;
};

var Restaurant = function(name, description, menu){
	this.name = name;
	this.description = description;
	this.menu = menu;
};

var Customer = function(dietaryPreference){
	this.dietaryPreference = dietaryPreference;
};


var tequila = new FoodItem('tequila', 200, true, true, true);
var lime = new FoodItem('lime', 25, true, true, false);
var margarita = new Drink('margarita', 'This is a lovely mixed drink.', 5.50, [tequila, lime]);
// var granola = new FoodItem('granola', 200, true, true, true);
// var steak = new FoodItem('steak', 300, false, true, true);
// var pumpkinSeeds = new FoodItem('pumpkin seeds', 100, true, true, true);

// console.log(granola.toString());
// console.log(steak.toString());
// console.log(pumpkinSeeds.toString());
console.log(margarita.toString());