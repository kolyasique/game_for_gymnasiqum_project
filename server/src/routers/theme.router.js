const router = require('express').Router();

const {
  Theme, Item, Itemstatus, Result,
} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    // const created = await Theme.bulkCreate([{title: 'Эльбрус'},{title: 'Молодец'},{title: 'Беспонтовые вопросы'}])
    // const created2 = await Item.bulkCreate([{theme_id: 3, question:'Ачун?', answer:'А ничу нормально разговаривай', value:300},{theme_id: 3, question:'Когда?', answer:'Нормально', value:1500},{theme_id: 3, question:'Как дела?', answer:'Как давно не виделись', value:2000}])
    const allThemes = await Theme.findAll({ include: { model: Item, include: { model: Itemstatus } } });
    // console.log(allThemes[0].Items);
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
  const questionValue = req.body.value;
  const resultUserGameId = req.session.user.result_id;
  console.log(req.body,'_+_+_+_+_+_+_+_+_+_+_');
  const findItemById = await Item.findOne({ where: { id: userAnswerId } });
  console.log(findItemById);
  const findUserResult = await Result.findOne({ where: { id: resultUserGameId } });
  if ((findItemById.answer).toLowerCase() === userAnswer.toLowerCase()) {
    const changeStatus = await Itemstatus.create({
      user_id: Number(req.session.user.id), 
      item_id: Number(userAnswerId), 
      result_id: Number(req.session.user.result_id), 
      status: true,
    });
    console.log('true');
    const increment = await findUserResult.increment('total_score', { by: questionValue });
    res.json({ message: 'Ответ верный', score: increment.total_score });
  } else {
    const changeStatus = await Itemstatus.create({
      user_id: +req.session.user.id,
       item_id: +userAnswerId,
        result_id: +req.session.user.result_id,
         status: false,
    });
    console.log('false');
    const decrement = await findUserResult.decrement('total_score', { by: questionValue });
    res.json({ message: 'Ответ НЕверный', score:decrement.total_score});
  }
  //  const addScore = await Result.update({})
});

module.exports = router;
