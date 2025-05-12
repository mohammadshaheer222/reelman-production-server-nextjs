const Admin = require("../../models/adminModel");
const sendToken = require("../../utils/jwtToken.js");
const { comparePassword, hashPassword } = require("../../utils/bcrypt.js");
const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors");
const ErrorHandler = require("../../utils/ErrorHandler.js");

console.log(process.env.ACTIVATION_SECRET, "jwt")
console.log(process.env.ACTIVATION_COOKIE, "expires in")

const login = catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!email || !password) {
            return next(new ErrorHandler("Please Provide All Fields", 400));
        }
        // const hashedPassword = await hashPassword(password);
        // const userN = await Admin.create({ email, password: hashedPassword })

        const admin = await Admin.findOne({ email });

        if (admin && (await comparePassword(password, admin.password))) {
            console.log(admin,"admin")
            sendToken(admin, 201, res);
            return;
        }
        return next(new ErrorHandler("Invalid credentials", 400));
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// router.route("/login").post(
//     catchAsynErrors(async (req, res, next) => {
       
//     })
// );

//forgotten
// router.route("/forgotten-password").post(
//     catchAsynErrors(async (req, res, next) => {
//         try {
//             const { email } = req.body;

//             if (!email) {
//                 return next(new ErrorHandler("Email field is mandatory", 400));
//             }

//             const admin = await Admin.findOne({ email });
//             if (!admin) {
//                 return next(new ErrorHandler("Admin is not registered", 400));
//             }

//             const accessToken = jwt.sign(
//                 { id: admin._id },
//                 process.env.ACTIVATION_SECRET,
//                 {
//                     expiresIn: process.env.ACTIVATION_EXPIRES,
//                 }
//             );

//             try {
//                 await sendMail({
//                     email,
//                     subject: "Reset Password",
//                     message: `http://localhost:5173/reset-password/${accessToken}`,
//                 });
//             } catch (error) {
//                 return next(new ErrorHandler(error.message, 500));
//             }

//             res.status(200).json({
//                 success: true,
//                 message: "Check your email and Reset Your Password",
//             });
//         } catch (error) {
//             return next(new ErrorHandler(error.message, 500));
//         }
//     })
// );

// router.route("/reset-password/:token").post(
//     catchAsynErrors(async (req, res, next) => {
//         try {
//             const { token } = req.params;
//             const { password, confirmPass } = req.body;

//             if (!password) {
//                 return next(new ErrorHandler("Password field is mandatory", 400));
//             }

//             const decoded = jwt.verify(token, process.env.ACTIVATION_SECRET);
//             if (!decoded) {
//                 return next(new ErrorHandler("Not verified", 401));
//             }

//             if (password !== confirmPass) {
//                 return next(new ErrorHandler("Passwords do not match", 400));
//             }

//             const id = decoded.id;
//             const hashedPassword = await hashPassword(password);
//             const updatedPassword = await Admin.findByIdAndUpdate(
//                 { _id: id },
//                 { password: hashedPassword },
//                 { new: true, runValidators: true }
//             );

//             res.status(201).json({ success: true, message: "Password Updated" });
//         } catch (error) {
//             return next(new ErrorHandler(error.message, 500));
//         }
//     })
// );

//protected route

// router.route("/verify-user").get(
//   verifyAdmin,
//   catchAsynErrors(async (req, res, next) => {
//     try {
//       res.status(200).json({ success: true, message: "Authorized" });
//     } catch (error) {
//       console.log(error);
//     }
//   })
// );

// router.route("/logout").get(
//     CatchAsyncErrors(async (req, res, next) => {
//         res.clearCookie("token");
//         res.status(200).json("User has been logged out!!!");
//     })
// );

module.exports = { login }
