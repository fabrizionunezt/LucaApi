const express = require('express');
const router = express.Router();
const QuestionInt = require('../DBmodels/QuestionInt');
const Question = require('../DBmodels/Question');
const QuestionAnswer = require('../DBmodels/QuestionAnswer');
const Subject = require('../DBmodels/Subject');
const User = require('../DBmodels/User');

//get question List
router.get('/getList/:idUser', async (req, res) => {
    try {
        var resultado = [];
        var idUser = req.params.idUser;
        const questionList = await Question.find();
        for (const question of questionList) {
            var objResult = {};
            var objQuestion = {
                _id: question._id,
                idSubject: question.idSubject,
                idAuthor: question.idAuthor,
                title: question.title,
                details: question.details,
                registerDate: question.registerDate,
                answers: [],
                subject: {},
                author: {}
            };

            //obtain answers to the question
            const answers = await QuestionAnswer.find({ idQuestion: question._id });
            if (answers != null) {
                objQuestion.answers = answers;
            }
            //obtain subject data
            const subject = await Subject.findById(question.idSubject);
            if (subject != null) {
                objQuestion.subject = subject;
            }
            //obtain author
            const author = await User.findById(question.idAuthor);
            if (author != null) {
                objQuestion.author = author;
            }
            //obtain detail about the interac of the user with the question
            const questionInt = await QuestionInt.findOne({ idQuestion: question._id, idUser: idUser });
            if (questionInt != null) {
                objResult = {
                    user: {
                        _id: '',
                        name: '',
                        scoreFire: 0,
                        scorePolice: 0,
                        scoreFlower: 0
                    },
                    _id: questionInt._id,
                    liked: questionInt.liked,
                    disliked: questionInt.disliked,
                    following: questionInt.following,
                    question: objQuestion
                }
            } else {
                objResult = {
                    user: {
                        _id: '',
                        name: '',
                        scoreFire: 0,
                        scorePolice: 0,
                        scoreFlower: 0
                    },
                    liked: false,
                    disliked: false,
                    following: false,
                    question: objQuestion
                }

            }
            resultado.push(objResult);
        }
        res.json(resultado);
    } catch (error) {
        res.json({ mensaje: error });
    }
});

router.post('/saveQuestion', async (req, res) => {
    const question = new Question({
        idSubject: req.body.subject._id,
        idAuthor: req.body.author._id,
        title: req.body.title,
        details: req.body.details
    });

    try {
        const savedQuestion = await question.save();
        res.json(savedQuestion);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post('/saveQuestionInt/:idUser', async (req, res) => {
    var idUser = req.params.idUser;
    var idQuestion = req.body._id
    const questionInt = new QuestionInt({

        idUser: idUser,
        liked: req.body.liked,
        disliked: req.body.disliked,
        following: req.body.following,
        idQuestion: req.body.question._id
    });

    try {
        if (idQuestion == '') {
            const savedQuestionInt = await questionInt.save();
            res.json(savedQuestionInt);
        } else {
            const updatedQuest = await QuestionInt.update(
                { "_id": idQuestion },
                {
                    $set: {
                        "liked": req.body.liked, "disliked": req.body.disliked, "following": req.body.following
                    }
                }
            );
            res.json(updatedQuest);
        }
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;