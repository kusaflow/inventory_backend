const express = require("express")
const{validateToken} = require("../middleware/validateTokenHandler")
const checkRole = require("../middleware/checkRole")
const {Prop_Mngr_getMyBooking, postBooking, Cust_myBookings, updateBooking, DeleteBooking, GetBookingByID} = require("../controller/bookingController");

const router = express.Router();

router.post("/", validateToken, postBooking);
router.get("/mybookings_PM", validateToken, Prop_Mngr_getMyBooking);
router.get("/mybookings_Cust", validateToken, Cust_myBookings);
router.put("/:id", validateToken,checkRole(["Propertyadmin"]) ,updateBooking);
router.delete("/:id", validateToken ,DeleteBooking);
router.get("/:id", validateToken ,GetBookingByID);

module.exports = router;