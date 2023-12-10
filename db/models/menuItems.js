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
 }
},{ timestamps: true }); // Adds createdAt and updatedAt timestamps
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
    const updatedMenuItem = await MenuItems.findByIdAndUpdate(id, updateData, { new: true, timestamps: true });
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

// 1C
const searchItems = async (query) => {
  try {
    const regexQuery = new RegExp(query, 'i'); // 'i' for case-insensitive
    return await MenuItems.find({
      $or: [
        { name: { $regex: regexQuery }},
        { description: { $regex: regexQuery }}
      ]
    });
  } catch (error) {
    throw error;
  }
};

module.exports = MenuItems;


module.exports = { getAll, getOne, create, update, deleteById, searchItems, MenuItems };
