const express = require("express")
const{validateToken} = require("../middleware/validateTokenHandler")
const checkRole = require("../middleware/checkRole")
const {Prop_Mngr_getMyBooking, postBooking, Cust_myBookings, updateBooking} = require("../controller/bookingController");

const router = express.Router();

router.post("/", validateToken, postBooking);
router.get("/myproperties", validateToken, Prop_Mngr_getMyBooking);
router.get("/mybookings", validateToken, Cust_myBookings);
router.put("/:id", validateToken,checkRole(["Propertyadmin"]) ,updateBooking);


module.exports = router;