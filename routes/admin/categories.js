const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {

    Category.find().then(categories => {
        res.render('admin/categories', { categories: categories });
    }).catch(err => {
        if (err) throw err;
    })
});

router.post('/create', (req, res) => {

    const newCategory = new Category({
        name: req.body.name
    });

    newCategory.save().then(saveCategory => {

        req.flash('success_message', `Category ${saveCategory.name} was successfully created`);

        res.redirect('/admin/categories');
    });

});


router.get('/edit/:id', (req, res) => {
    Category.findOne({ _id: req.params.id }).then(category => {
        res.render('admin/categories/edit', { category: category });
    });
});

router.put('/edit/:id', (req, res) => {
    Category.findOne({ _id: req.params.id }).then(category => {

        category.name = req.body.name;

        category.save().then(updateCategory => {
            req.flash('success_message', 'Category was successfully updated');
            res.redirect('/admin/categories');
        })
    });
});


router.delete('/:id', (req, res) => {
    Category.findOne({ _id: req.params.id }).then(category => {

        category.deleteOne();

        req.flash('success_message', `Category ${category.name} was successfully deleted`);

        res.redirect('/admin/categories');

    }).catch(err => {
        console.log('no data deleted', err);
    })
});


module.exports = router;