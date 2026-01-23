import Inventory from "../models/Inventory.js";

/* ========== GET ALL ITEMS ========== */
export const getItems = async (req, res) => {
  const items = await Inventory.find().sort({ createdAt: -1 });
  res.status(200).json(items);
};

/* ========== CREATE ITEM ========== */
export const createItem = async (req, res) => {
  try {
    const { stock } = req.body;

    let status = "In Stock";
    if (stock === 0) status = "Out of Stock";
    else if (stock <= 5) status = "Low Stock";

    const item = await Inventory.create({
      ...req.body,
      status // ✅ yahin se DB me save hoga
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


/* ========== UPDATE ITEM ========== */
export const updateItem = async (req, res) => {
  try {
    const { stock } = req.body;

    let status;
    if (stock !== undefined) {
      if (stock === 0) status = "Out of Stock";
      else if (stock <= 5) status = "Low Stock";
      else status = "In Stock";
    }

    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(status && { status }) // ✅ status auto update
      },
      { new: true }
    );

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


/* ========== DELETE ITEM ========== */
export const deleteItem = async (req, res) => {
  const item = await Inventory.findByIdAndDelete(req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json({ message: "Item deleted" });
};
