const Sauce = require('../models/sauce')
const fs = require('fs');

exports.createThing = (req, res, next) => {
  try{
    const sauceObject = JSON.parse(req.body.sauce);
    console.log(sauceObject)
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    const ret = sauce.save();
    if (ret) {

      res.status(201).json({'message': 'la sauce a été creer'})

    } else {

      res.status(401).json({'message': "la sauce n'a pas été créer"})

    }
    
  }catch{
    console.log(error);
    const er = {'message': error.info};
    res.status(error.statusCode).json(er)
  }};



exports.getOneThing = (req, res, next) => {

    try{ 
      
      Sauce.findOne({

      _id: req.params.id

      })
    
      if (Sauce) {
  
        res.status(201).json(Sauce)
  
      } else {
  
        res.status(401).json({'message': "la sauce n'a pas été créer"})
  
      }
      
    }catch{
      console.log(error);
      const er = {'message': error.info};
      res.status(error.statusCode).json(er)
    }};  

exports.modifyThing = (req, res, next) => {
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id})
      .then(thing => {
          if (thing.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = thing.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Thing.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};
exports.getAllStuff = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


exports.SauceLike = (req, res, next) => {

};