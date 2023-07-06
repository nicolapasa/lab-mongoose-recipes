const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const rigatoni=  {
  "title": "Rigatoni alla Genovese",
  "level": "Easy Peasy",
  "ingredients": [
    "2 pounds red onions, sliced salt to taste",
    "2 (16 ounce) boxes uncooked rigatoni",
    "1 tablespoon chopped fresh marjoram leaves",
    "1 pinch cayenne pepper",
    "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
  ],
  "cuisine": "Italian",
  "dishType": "main_course",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
  "duration": 220,
  "creator": "Chef Luigi"
}
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(rigatoni)
  })
  .then((recipe)=>{
        console.log(recipe.title)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((recipes)=>{
    recipes.forEach(recipe=>{
      console.log(recipe.title)
    })
  
})
.then(() => {
  return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
})
.then((e)=>{
  console.log('success', e)
})
.then(() => {
  return Recipe.deleteOne({title: "Carrot Cake"})
})
.then(()=>{
  console.log('success')
})
.then(()=>{
  return mongoose.connection.close()
})
.then(()=>{
  console.log('db closed')
})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
