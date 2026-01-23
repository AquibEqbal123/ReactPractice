import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
/* ================= GET ALL ================= */
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDepartmentEmployees = async (req, res) => {
  try {
    const { id } = req.params;

    const employees = await Employee.find({
      department: id, // 🔥 KEY FIX
    });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// export const getDepartments = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const employees = await Employee.find({
//       department: id,   // 🔥 KEY FIX
//     });

//     res.json(employees);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

/* ================= CREATE ================= */
export const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Department name required" });
    }

    const exists = await Department.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const dept = await Department.create({ name, description });
    res.status(201).json(dept);

  } catch (error) {
    console.error("Create department error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE ================= */
export const deleteDepartment = async (req, res) => {
  try {
    const dept = await Department.findByIdAndDelete(req.params.id);

    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= UPDATE ================= */
export const updateDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    const updatedDept = await Department.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedDept) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(updatedDept);
  } catch (error) {
    console.error("Update department error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
