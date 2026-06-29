import { Router } from "express";
import { searchPrices } from "./price-search.controller";

const router = Router();

// GET /api/price-search?q=<query>
router.get("/api/price-search", searchPrices);

export default router;
