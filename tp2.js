const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
app.set('view engine', 'ejs'); // générateur de template «ejs»
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public

const ObjectID = require('mongodb').ObjectID;

var db // Variable qui contiendra le lien pour la BD

var aClique = false; // Variable qui permet d'empêcher la création de plusieurs données en même temps

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  // On retrourne un message d'erreur en cas d'erreur
  if (err){  console.log(err)
    return
  }
  db = database
  app.listen(8081, () => {
    console.log('Connexion à la base de données réussit sur le port 8081')
  })
})


app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
 
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      // On retrourne un message d'erreur en cas d'erreur
      if (err){  console.log(err)
        return
      }
    // affiche le contenu de la BD
    res.render('index.ejs', {adresse: resultat})

    }) 
})


// La fonction qui gère le formulaire
app.get('/formulaire',  (req, res) => {
   console.log('la route  get / = ' + req.url)
   res.sendFile(__dirname + "req.url")
})


// La fonction qui permet de sauvegarder une valeur
app.post('/adresse',  (req, res) => {
  if(aClique == false){
    db.collection('adresse').save(req.body, (err, result) => {
      // On retrourne un message d'erreur en cas d'erreur
      if (err){  console.log(err)
        return
      }
      console.log('sauvegarder dans la BD')
      res.redirect('/')
    })
    aClique = true;
  }
})

// La fonction qui permet de modidier les valeurs
app.post('/modifier/:id', (req, res) => {
  aClique = false;
  var id = req.params.id

  console.log(id)
  console.log(req)
  db.collection('adresse')
  //console.log(adresse[i]._id.toString())
  .findOneAndUpdate({"_id": ObjectID(req.params.id)}, req.body ,(err, resultat) => {


  // code pour tester certains fonctionnalités non fonctionnelles.
  //object.style.background = "yellow"
  //this.style.background = "yellow"

  // On retrourne un message d'erreur en cas d'erreur
  if (err){  console.log(err)
    return
  }
  res.redirect('/')  // redirige vers la route qui affiche la collection
  })
})


// La fonction qui permet de supprimer une valeur définitevement
app.get('/detruire/:id', (req, res) => {
  aClique = false;
  var id = req.params.id
  console.log(id)
  db.collection('adresse')
  .findOneAndDelete({"_id": ObjectID(req.params.id)}, (err, resultat) => {

  // On retrourne un message d'erreur en cas d'erreur
  if (err){  console.log(err)
    return
  }
  res.redirect('/')  // redirige vers la route qui affiche la collection
  })
})