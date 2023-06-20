const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get ('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then (dbCatData => {
      if(!dbCatData) {
        res.status(404).json({message: 'Not Found'});
        return;
      }
      res.json(dbCatData);
    })
    .catch(err => {
      console.log (err);
      res.status(500).json(err)
    });
})


router.get('/:id', (req, res) => {
  Category.findOne({
    where: {id: req.params.id},
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    }
  })
  .then (dbCatData => {
    if(!dbCatData) {
      res.status(404).json({message: 'Not Found'});
      return;
    }
    res.json(dbCatData);
  })
  .catch(err => {
    console.log (err);
    res.status(500).json(err)
  });
});


router.post ('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCatData => res.json(dbCatData))
  .catch(err => {
    console.log (err);
    res.status(500).json(err)
  });
})



router.put('/:id', (req, res) => {
    Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then (dbCatData => {
      if(!dbCatData) {
        res.status(404).json({message: 'Not Found'});
        return;
      }
      res.json(dbCatData);
    })
    .catch(err => {
      console.log (err);
      res.status(500).json(err)
    });
})

router.delete('/:id', async (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
      .then (dbCatData => {
      if(!dbCatData) {
        res.status(404).json({message: 'Not Found'});
        return;
      }
      res.json(dbCatData);
    })
    .catch(err => {
      console.log (err);
      res.status(500).json(err)
    });
  })

module.exports = router;
