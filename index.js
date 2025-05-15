const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/my_blog');
    console.log('Connexion à MongoDB réussie');

  } catch (err) {
    console.error('Erreur :', err);
  }
}

main();