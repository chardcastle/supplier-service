import { Router } from "express";
import {
    getList,
    getViewById,
    getCreateForm,
    postCreate,
    putUpdate,
    deleteEntityId,
} from "./supplier.controller.js";

const router = Router();

router.get("/list", getList);
router.get("/view/:id", getViewById);
router.get("/create", getCreateForm);
router.post("/create",postCreate);
router.put("/update/:id", putUpdate);
router.delete("/view/:id", deleteEntityId);

export default router;
