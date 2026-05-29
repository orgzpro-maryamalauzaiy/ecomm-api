const express = require("express");
const {historyOrder} = require("../apis/controllers/historyOrdersController");
const { verifyUser } = require("../apis/utils/verifyToken");

const router = express.Router();

router.get("/", verifyUser, historyOrder);
