const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function(collection){

  const router = express.Router();

  //INDEX
  router.get('/', (req, res) => {
    collection
    .find()
    .toArray()
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error: err});
    })
  });

  //SHOW BY ID
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
    .findOne({_id: ObjectID(id)})
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error: err});
    });
  });

  //DELETE BY ID
  router.delete('/:id', (req, res) => {
    console.log('delete router here');
    const id = req.params.id;
    collection
    .deleteOne({_id: ObjectID(id)})
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({status: 500, error: err});
    });
  });

  return router;
};

module.exports = createRouter;
