const express = require('express');
const adminController = require('../../controllers/adminController');
const route = express.Router();

route.all('/*',adminController.all);

route.get('/', adminController.indexEditor);
route.post('/create',adminController.createEditor);
route.get('/edit/:id',adminController.editEditor);
route.put('/edit/:id',adminController.updateEditor);
route.delete('/:id',adminController.deleteEditor);

module.exports = route;