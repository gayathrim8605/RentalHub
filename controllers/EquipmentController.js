const Equipment = require("../models/Equipment");

// Add new equipment
const createEquipment = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      owner,
      pricePerDay,
      location,
      image,
    } = req.body;

    if (
      !name ||
      !description ||
      !category ||
      !owner ||
      !pricePerDay ||
      !location
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const equipment = await Equipment.create({
      name,
      description,
      category,
      owner,
      pricePerDay,
      location,
      image,
    });

    res.status(201).json({
      message: "Equipment added successfully",
      equipment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add equipment",
      error: error.message,
    });
  }
};

// Get all equipment
const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find()
      .populate("owner", "name email phone");

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch equipment",
      error: error.message,
    });
  }
};

// Get equipment by ID
const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate("owner", "name email phone");

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found",
      });
    }

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch equipment",
      error: error.message,
    });
  }
};
const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found",
      });
    }

    res.status(200).json({
      message: "Equipment updated successfully",
      equipment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update equipment",
      error: error.message,
    });
  }
};
const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found",
      });
    }

    res.status(200).json({
      message: "Equipment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete equipment",
      error: error.message,
    });
  }
};

module.exports = {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
};