const mongoose = require("../db.js");

const menuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },   
    updatedAt: {
    type: Date}
});
menuItemsSchema.set("toJSON", {
  virtuals: true
});
// menu model
const MenuItems = mongoose.model('MenuItems', menuItemsSchema);

const getAll = async () => {
  try {
    const menuItems = await MenuItems.find();
    return menuItems;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const menuItem = await MenuItems.findById(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const menuItem = await MenuItems.create(body);
    return menuItem;
  } catch (error) {
    return error;
  }
};

// 1A
const update = async (id, updateData) => {
  try {
    updateData.updatedAt = new Date(); // Set updatedAt to current date
    const updatedMenuItem = await MenuItems.findByIdAndUpdate(id, updateData, { new: true });
    return updatedMenuItem;
  } catch (error) {
    return error;
  }
};

// 1B
const deleteById = async (id) => {
try {
  const deletedMenuItem = await MenuItems.findByIdAndDelete(id);
  return deletedMenuItem;
} catch (error) {
  return error;
}
};

module.exports = MenuItems;


module.exports = { getAll, getOne, create, update, deleteById, MenuItems };
