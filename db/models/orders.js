const mongoose = require("../db.js");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  items: [
    {
      item: {
        type: mongoose.Schema.ObjectId,
        ref: "MenuItems"
      },

      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    required: true,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
orderSchema.set("toJSON", {
  virtuals: true
});
orderSchema.statics.calcTotal = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

// order model
const Order = mongoose.model("Order", orderSchema);

const getAll = async () => {
  // populate each item
  const orders = await Order.find().populate("items.item");

  return orders;
};

const getOne = async (id) => {
  const order = await Order.findById(id).populate("items.item");
  return order;
};

const create = async (body) => {
  const order = await Order.create(body);
  return order;
};

const update = async (id, body) => {
  const order = await Order.findByIdAndUpdate(id, body, { new: true });
  return order;
};

const remove = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  return order.id;
};

const getByStatus = async (status) => {
  const orders = await Order.find({ status }).populate("items");
  return orders;
};

const calculateTotalSales = async (startDate, endDate) => {
  const query = {};
  if (startDate && endDate) {
    // Pending: validate if date is valid and other edge cases like start date is greater than end date
    query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  const orders = await Order.find(query).populate('items.item');
  const total = orders.reduce((acc, order) => {
    const orderTotal = order.items.reduce((sum, item) => {
      // Check if item exists before accessing its price
      return item.item ? sum + (item.item.price * item.quantity) : sum;
    }, 0);
    return acc + orderTotal;
  }, 0);

  return total;
};

const getByStatusAndDateRange = async (status, startDate, endDate) => {
  const query = { status };
  if (startDate && endDate) {
    query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  return await Order.find(query);
};



module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByStatus,
  calculateTotalSales ,
  getByStatusAndDateRange,
  Order
};
