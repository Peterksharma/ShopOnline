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


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  //fidbyPK = find by primary key
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })

    if (!categoryData) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: res.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    if (categoryData[0] === 0) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!categoryData) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;
