const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User, Result } = require('../../db/models');

router.get('/', (req, res) => {
  console.log(req.session)
//    res.json( {user: {
//     id: req.session.user?.id,
//     name: req.session.user?.name,
//     result_id: req.session.user?.result_id,
//   } || null });
// });
  res.json( req.session.user || null );
});
router.post('/signup', async (req, res) => {
  try {
    const { login, password } = req.body;
    console.log('Это данны с регистрации++++++++++ SIGNUP', login, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({ login, password: hashedPassword });
    const newUser = createUser.get();
    delete newUser.password;
    delete newUser.createdAt;
    delete newUser.updatedAt;

    req.session.user = {
      id: newUser.id,
      name: newUser.login,
    };
    return res.json(newUser);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { login, password } = req.body;
    console.log('+++++++++Это SIGNIN', login, password);
    const findUser = await User.findOne({ where: { login }, raw: true });
    if (!findUser) {
      console.log('Пользователя нет');
      return res.status(401).json({ msg: 'Пользователя не существует!' });
    }
    const userIsFound = await bcrypt.compare(password, findUser.password);
    if (userIsFound) {
      delete findUser.password;
      const createUserResult = await Result.create({ user_id: findUser.id, total_score: 0 });

      req.session.user = {
        id: findUser.id,
        name: findUser.login,
        result_id: createUserResult.id,
      };
      console.log('Пользователь есть, сеесия готова!');
      return res.json(findUser);
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

router.get('/signout', (req, res) => {
  req.session.destroy();
  res.clearCookie('phaseThree');
  res.sendStatus(200);
});

module.exports = router;
