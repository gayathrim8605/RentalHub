const express = require("express");

const {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/EquipmentController");

const router = express.Router();

// Add equipment
router.post("/", createEquipment);

// Get all equipment
router.get("/", getAllEquipment);

// Get equipment by ID
router.get("/:id", getEquipmentById);

router.put("/:id", updateEquipment);

router.delete("/:id",deleteEquipment);

module.exports = router;