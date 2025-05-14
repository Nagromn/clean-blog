const mongoose = require('mongoose');

// const BlogPost = require('./src/models/BlogPost');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/my_blog');
    console.log('Connexion à MongoDB réussie');

    // await BlogPost.create({
    //   title: 'My first blog post',
    //   body: 'This is the content of my first blog post.'
    // });

    // await BlogPost.find({
    //     title: 'My first blog post'    
    // });

    // let id = '6824540316fd34928cdad3ae';
    // await BlogPost.findByIdAndUpdate(id, {
    //     title: 'My first blog post updated',
    //     body: 'This is the updated content of my first blog post.'
    // });

    // // let deleteId = ''
    // // await BlogPost.findByIdAndDelete(deleteId);

  } catch (err) {
    console.error('Erreur :', err);
  }
}

main();