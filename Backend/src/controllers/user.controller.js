import {User} from '../models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error while generating tokens");
    }
}

const registerUser = asyncHandler( async (req, res) => {
    const {username, email, password, fullName} = req.body;

    if([username, email, password, fullName].some((field) => field?.trim() === ""))
        throw new ApiError(400, "All fields are required")

    const existedUser = await User.findOne({$or: [{username}, {email}]})

    if(existedUser)
        throw new ApiError(409, "User already exists")
    
    const avatarLocalPath = req.file?.path;
    console.log(avatarLocalPath);
    

    if(!avatarLocalPath)
        throw new ApiError(400, "Avatar is required")

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if(!avatar)
        throw new ApiError(500, "Error while uploading avatar");

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullName,
        password,
        avatar: avatar.url
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser)
        throw new ApiError(500, "Error while creating user");

    return res
    .status(201)
    .json( new ApiResponse(201, createdUser, "User Created Successfully"))

});

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password)
        throw new ApiError(400, "Email and password are required");

    const user = await User.findOne({email});

    if(!user)
        throw new ApiError(404, "User not found");

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid)
        throw new ApiError(400, "Invalid credentials");

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id, ).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, {user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"))

});

const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));

});

export { registerUser, loginUser, logoutUser };