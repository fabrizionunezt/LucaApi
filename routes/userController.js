const express = require('express');
const router = express.Router();
const User = require('../DBmodels/User');

router.get('/getList', async (req, res) => {
   try {
       const listUsers = await User.find();
       res.json(listUsers);
   } catch (error) {
       res.json({message:error})
   }
});

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        scoreFire: req.body.scoreFire,
        scorePolice: req.body.scorePolice,
        scoreFlower: req.body.scoreFlower
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.json({ message: error });
    }
});



module.exports = router;