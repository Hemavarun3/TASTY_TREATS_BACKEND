import asyncHandler from '../Utills/asyncHandler.js';
import { userModel } from '../Models/usermodel.js';
import { orderModel } from '../Models/ordermodel.js';





const signup=asyncHandler(async (req,res,next)=>{
    const user=req.body;
    if(!user.firstName || !user.lastName || !user.email || !user.password || !user.confirmPassword || !user.address )
    {
        return res.status(400).send('Insufficient details');
    }
    
    const user_exist=await userModel.findOne(user);
    if(user_exist)
    {
       return  res.status(400).send('User already Exist');
    }
    if(user.password!=user.confirmPassword)
    {
        return res.status(400).send('Password and ConfirmPassword doesnot march');
    }
    const final_user={
        name : `${user.firstName} ${user.lastName}`,
        email : user.email,
        address : user.address,
        password : user.password,
        isAdmin : user.isAdmin
    }
    const save_status=await userModel.create(final_user);
    res.status(200).send({message : 'User Registered Succesfully',alert : true});
});

const login=asyncHandler(async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        if(!password && !email)
        {
            res.status(400).send({data : 'email or password is required',alert : false});
        }
        const user = await userModel.findOne({
            $or:[{email}]
        })
        if(!user)
        {
            res.status(404).send({data : 'user doesnot exist',alert : false});
        }
        const isPasswordValid =await user.isPasswordCorrect(password);
        if(!isPasswordValid)
        {
            res.status(401).send({data : 'Invalid user Credentials',alert : false});
        }
        const {accessToken,refreshToken}=await generateAccessRefreshToken(user._id);
        const loggedInUser = await userModel.findById(user._id).select("-password");
        const options ={
            httpOnly :true,
            secure :true
        }
        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json(
            {
                data : {user: loggedInUser,accessToken,refreshToken},
                alert : true
            }
        )
    } catch (error) {
        res.status(401).send({data : `${error.message}`,alert : false});
    }
});
const generateAccessRefreshToken = async (userId) => {
    try {
        const user = await userModel.findById(userId);
        if(!user)
        {
            res.status(401).send({data : `user not found`,alert : false});
        }
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken=refreshToken;
        const response=await user.save({validateBeforeSave : false});
        return {accessToken,refreshToken};
    } catch (error) {
        res.status(401).send({data : `Something went wrong while generating tokens`,alert : false});
    }
}
const logout = asyncHandler(async (req, res, next) => {
    try {
        // Update the user document to remove the refresh token
        await userModel.findByIdAndUpdate(req.body._id, {
            $set: {
                refreshToken: ""
            }
        }, {
            new: true
        });

        // Define cookie options
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag only in production
            sameSite: 'None'
        };

        // Clear the cookies and send the response
        res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .send({ data: "Logged out Successfully", alert: false });
    } catch (error) {
        res.status(401).send({ data: error.message, alert: false });
    }
});
const getuserOrders = async (req,res,next) =>{
    try {
        const user=req.body;
        const data= await orderModel.find({
            userid:user.userid
        });
        let result=[];
        data.map((curr) => {
            result.push({
                userid:curr.userid,
                status : curr.status,
                items : curr.items
            })
        })
        res.status(200).send(result);
    } catch (error) {
        res.status(401).send(error.message);
    }
}
const newToken = async (req, res, next) => {
    try {
        const {refreshToken} = req.body;
        console.log("Hello      ");
        console.log(refreshToken);
        if (!refreshToken) {
            return res.status(400).send({ message: "Invalid Token", alert: false });
        }
        const decodedtoken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decodedtoken) {
            return res.status(400).send({ message: "Unauthorised Request", alert: false });
        }
        const user = await userModel.findById(decodedtoken._id);
        if (!user) {
            return res.status(400).send({ message: "user doesn't exist", alert: false });
        }
        const newaccessToken = user.generateAccessToken();
        return res.status(200)
            .json(
                {
                    data: { newaccessToken, refreshToken },
                    message: "Log in Successful",
                    alert: true
                }
            )
    } catch (error) {
        return res.status(400).send({ message:`${error.message}`, alert: false });
    }

}

export {signup,login,logout,getuserOrders,newToken};