const router = require('express').Router();

const { Theme, Item, Itemstatus } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const allThemes = await Theme.findAll({ include: { model: Item, include: { model: Itemstatus } } });
    console.log(allThemes[0].Items);
    res.json(allThemes);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

router.post('/answer', async (req, res) => {
// const userAnswer = req.body.answer;
  const userAnswerId = req.body.id;
  const userAnswer = req.body.inputValue.answer;

  const findItemById = await Item.findOne({ where: { id: userAnswerId } });
  console.log(findItemById);
  if ((findItemById.answer).toLowerCase() === userAnswer.toLowerCase()) {
    const changeStatus = await Itemstatus.create({user_id: req.session.user.id, item_id: userAnswerId, status:true})
    console.log('true');
    res.json({ message: 'Ответ верный' });
  } else {
    const changeStatus = await Itemstatus.create({user_id: req.session.user.id, item_id: userAnswerId, status:true})
    console.log('false');
    res.json({ message: 'Ответ НЕверный' });
  }
});

module.exports = router;
