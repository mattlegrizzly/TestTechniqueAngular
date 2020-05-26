const List = require('../Models/list')

exports.createList = (req, res, next) => {
    delete req.body._id;
    const list = new List({
        titre: req.body.titre,
        courses: req.body.courses,
        userId: req.body.userId,
    });
    list.save()
        .then(() => res.status(201).json({message : 'Liste enregistré'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getLists = (req, res, next) => {
    List.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneList = (req, res, next) => {
    List.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}))
};

exports.modifyList = (req, res, next) => {
    List.updateOne({_id: req.params.id }, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message :'Liste modifié !'}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteList = (req, res, next) => {
    List.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({ message : 'Liste supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};