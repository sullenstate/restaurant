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

var all = function(bools){
	return bools.reduce(function(a, b){
		return a && b;
	}, true);
};

var makeDietChecker = function(restriction){
	return function(){
		return all(this.ingredients.map(_.property(restriction)));
	};
};

Plate.prototype.isVegan = makeDietChecker('vegan');
Plate.prototype.isGlutenFree = makeDietChecker('glutenFree');
Plate.prototype.isCitrusFree = makeDietChecker('citrusFree');

var Order = function(plates){
	this.plates = plates;
};

// Takes an array and counts duplicates - This returns an array with objects that contain items and their count
var countDuplicates = function(array){
	return array.sort().reduce(function(accum, next){
		if (accum.length === 0 || next !== _.last(accum).item) {
			return accum.concat([{item : next, count : 1}])
		} else {
			var newAccum = _.cloneDeep(accum);
			newAccum[newAccum.length - 1].count++;
			return newAccum;
		}
	}, []);
};

Order.prototype.toString = function(){
	return countDuplicates(this.plates.map(_.property('name'))).map(function(countedItem){
		return _.capitalize(countedItem.item) + ' (' + countedItem.count + ')'
	}).join(', ');
};

var Menu = function(plates){
	this.plates = plates;
};

Menu.prototype.toString = function(){
	return this.plates.map(function(plate){
		return plate.toString();
	}).join(' \n');
};

var Restaurant = function(name, description, menu){
	this.name = name;
	this.description = description;
	this.menu = menu;
};

Restaurant.prototype.toString = function(){
	return this.name + '\n' +
		this.description + '\n\n' +
		'Menu:\n' +
		'--------\n' +
		this.menu.toString(); 
};


var Customer = function(dietaryPreference){
	this.dietaryPreference = dietaryPreference;
};

var rice = new FoodItem('Rice', 200, true, true, true);
var tortilla = new FoodItem('Tortilla', 150, true, false, true);
var beans = new FoodItem('Beans', 200, true, true, true);
var avocado = new FoodItem('Avocado', 400, true, true, true);
var cilantro = new FoodItem("Cilantro", 5, true, true, true);
var tequila = new FoodItem('tequila', 200, true, true, true);
var lime = new FoodItem('lime', 25, true, true, false);

var burritoPlate = new Plate('Burrito Plate', "Who doesn't know what a burrito is?", 9.99, [tortilla, rice, beans]);
var guacamolePlate = new Plate('Guacamole Plate', "creamy green avocado ", 3.99, [avocado, lime, cilantro]);

var margarita = new Drink('margarita', 'This is a lovely mixed drink.', 5.50, [tequila, lime]);

var firstOrder = new Order([burritoPlate, margarita, burritoPlate, guacamolePlate, margarita]);
var mainMenu = new Menu([burritoPlate, guacamolePlate, margarita]);
var restaurant = new Restaurant("Pica's Taqueria", 'A Mexican American Joint', mainMenu);

// var granola = new FoodItem('granola', 200, true, true, true);
// var steak = new FoodItem('steak', 300, false, true, true);
// var pumpkinSeeds = new FoodItem('pumpkin seeds', 100, true, true, true);

// console.log(granola.toString());
// console.log(steak.toString());
// console.log(pumpkinSeeds.toString());
// console.log(margarita.toString());