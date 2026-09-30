const express = require("express");

const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);

router.get("/", getAllBookings);
router.get("/:id",getBookingById);
router.put("/:id",updateBookingStatus);
router.put("/:id/cancel",cancelBooking);

module.exports = router;