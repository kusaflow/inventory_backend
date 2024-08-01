const express = require("express")
const{validateToken} = require("../middleware/validateTokenHandler")
const checkRole = require("../middleware/checkRole")
const {Prop_Mngr_getMyBooking, postBooking, Cust_myBookings, updateBooking, DeleteBooking, GetBookingByID} = require("../controller/bookingController");

const router = express.Router();

router.post("/", validateToken,checkRole(['customer','Propertyadmin','superadmin']), postBooking);
router.get("/mybookings_PM", validateToken, checkRole(['Propertyadmin', 'superadmin']), Prop_Mngr_getMyBooking);
router.get("/mybookings_Cust", validateToken, checkRole(['customer','Propertyadmin','superadmin']), Cust_myBookings);
router.put("/:id", validateToken,checkRole(["Propertyadmin"]) ,updateBooking);
router.delete("/:id", validateToken ,DeleteBooking);
router.get("/:id", validateToken ,GetBookingByID);

module.exports = router;