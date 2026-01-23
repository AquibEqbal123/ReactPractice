import Sale from "../models/Sale.js";

/* ===== GET ALL SALES ===== */
export const getSales = async (req, res) => {
  const sales = await Sale.find().sort({ createdAt: -1 });
  res.status(200).json(sales);
};

/* ===== CREATE SALE ===== */
export const createSale = async (req, res) => {
  const sale = await Sale.create(req.body);
  res.status(201).json(sale);
};

/* ===== UPDATE SALE ===== */
export const updateSale = async (req, res) => {
  try {
    const { start, end } = req.body;

    let status;
    const today = new Date();

    if (end) {
      const endDate = new Date(end);
      status = endDate < today ? "Ended" : "Live";
    }

    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(status && { status }) // ✅ auto update status
      },
      { new: true }
    );

    res.json(updatedSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


/* ===== DELETE SALE ===== */
export const deleteSale = async (req, res) => {
  const sale = await Sale.findByIdAndDelete(req.params.id);

  if (!sale) {
    return res.status(404).json({ message: "Sale not found" });
  }

  res.status(200).json({ message: "Sale deleted" });
};
