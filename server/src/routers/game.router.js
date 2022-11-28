// const router = require('express').Router();
// // const { generateUser } = require('@arti.oga/random-package');
// const { Theme, Item, User } = require('../../db/models');

// router
//   .route('/')
//   .get(async (req, res) => {
//     try {
//       const allThemes = await Theme.findAll({ include: Item, order: [['value', 'ASC']] });
//       res.json(allThemes);
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({ msg: error.message });
//     }
//   })
//   .post(async (req, res) => {
//     try {
//       // const cities = ['Moscow', 'London', 'Hongkong', 'Paris', 'Lima'];
//       // const specialties = ['Front-End', 'Back-End', 'DevOps', 'SecOps', 'TeamLead', 'TechLead'];

//       const candidates = [{ id: 1, login: 'admin', password: '$2a$10$qNgeW5meBC6TLzZVpDhWR.p.dXpY0EYkJFPsk5eFsXlCr6i7kA51m' }, { id: 2, login: 'admin2', password: '$2a$10$qNgeW5meBC6TLzZVpDhWR.p.dXpY0EYkJFPsk5eFsXlCr6i7kA51m' }, { id: 3, login: 'admin3', password: '$2a$10$qNgeW5meBC6TLzZVpDhWR.p.dXpY0EYkJFPsk5eFsXlCr6i7kA51m' }];
//       const newCandidates = await User.bulkCreate(candidates);
//       res.json(newCandidates);
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({ msg: error.message });
//     }
//   });

// router
//   .route('/:candidateId')
  // .get(async (req, res) => {
  //   try {
  //     const candidate = await Candidate.findByPk(req.params.candidateId);
  //     res.json(candidate);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({ msg: error.message });
  //   }
  // })
  // .get(async (req, res) => {
  //   try {
  //     const picked = await PickedCandidate.create({
  //       hr_id: req.session.hr.id,
  //       candidate_id: req.params.candidateId,
  //     });

  //     const candidate = await Candidate.findByPk(
  //       +req.params.candidateId,
  //       { include: PickedCandidate },
  //     );

  //     res.json(candidate);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({ msg: error.message });
  //   }
  // })
  // .delete(async (req, res) => {
  //   try {
  //     await Candidate.destroy({ where: { id: +req.params.candidateId } });
  //     res.sendStatus(200);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({ msg: error.message });
  //   }
  // });

// module.exports = router;
