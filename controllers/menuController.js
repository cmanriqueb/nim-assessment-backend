const mongoose = require("mongoose");
const MenuItems = require("../db/models/menuItems.js");


const getAll = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const menu = await MenuItems.getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const menu = await MenuItems.create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const updatedMenuItem = await MenuItems.update(req.params.id, req.body);

      // Check if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send("Menu item not found");
      }
    if (!updatedMenuItem) {
      return res.status(404).send("Menu item not found");
    }
    res.send(updatedMenuItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteItem = async (req, res) => {
  try {
    const deletedItem = await MenuItems.deleteById(req.params.id);
    if (!deletedItem) {
      return res.status(404).send("Menu item not found");
    }
    res.send(req.params.id);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const search = async (req, res) => {
  try {
    const searchQuery = req.query.text;
    const searchResult = await MenuItems.searchItems(searchQuery);
    res.send(searchResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
};




module.exports = { getAll, getOne, create, update, deleteItem, search };
