import express from "express";
import { addStaffController, deleteStaffController, forgetController, loginController, resetPasswordController, updateStaffController, userRegisterController, userUpdateController, verificationController, viewStaffController } from "../controllers/authController.js";
import { mailController } from "../middleware/mailController.js";
import { isAdmin, isStaff, isSuperAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router=express.Router();

router.post('/register',userRegisterController)
router.put('/updateuser/:_id',requireSignIn,userUpdateController)
router.post('/mail',mailController)
router.post('/verification',verificationController )
router.post('/login',loginController)
router.post('/forget',forgetController)
router.post('/resetPassword',resetPasswordController)
// staff
router.post("/add-staff",requireSignIn,isAdmin,addStaffController)
// Using PUT method for updating an existing resource
router.put("/updateProfileStaff/:id", requireSignIn, updateStaffController);

router.get("/all-staff",requireSignIn,isAdmin,viewStaffController)

router.delete("/delete-staff/:_id",requireSignIn,isAdmin,deleteStaffController)



router.get("/staff-auth", requireSignIn,isStaff, (req, res) => {
    res.status(200).send({ ok: true });
  });
  //protected Admin route auth
  router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });
    //protected Admin route auth
    router.get("/superAdmin-auth", requireSignIn, isSuperAdmin, (req, res) => {
      res.status(200).send({ ok: true });
    });

export default router
