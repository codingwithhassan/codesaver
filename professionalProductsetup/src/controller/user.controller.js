import { User } from '../models/user.models.js';
import uploadOnCloudinary from '../utils/cloudinary.js';

const userRegister = async (req, res, next) => {
  try {
    const { fullname, username, password, email, role, avatar } = req.body;

    // Check if all required fields are provided
    if (!fullname || !username || !password || !email || !role) {
      return res.status(400).json({
        message: `Please provide all fields`,
      });
    }

    // Check if user with same username or email already exists
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
      return res.status(400).json({
        message: `User already exists`,
      });
    }

    // Upload profile and cover images to Cloudinary (assuming `req.file` structure)
    const profileImagePath = req.file?.profileImage[0]?.path;
    const coverImagePath = req.file?.coverImage[0]?.path;

    const profileImage = await uploadOnCloudinary(profileImagePath);
    const coverImage = await uploadOnCloudinary(coverImagePath);

    // Check if profile image upload failed
    if (!profileImage) {
      return res.status(400).json({
        message: `Please provide profile image`,
      });
    }

    // Create new user in the database
    const newUser = await User.create({
      fullname,
      username,
      email,
      password,
      role,
      profileImage: profileImage.url,
      coverImage: coverImage?.url || '', // Default to empty string if cover image not uploaded
    });

    // Return response with created user data (excluding sensitive info)
    const userCreated = await User.findById(newUser._id).select('-password -refreshToken');
    if (!userCreated) {
      return res.status(400).json({
        message: `User not created`,
      });
    }

    // Return success message and user data
    res.status(200).json({
      message: `User registered successfully`,
      user: userCreated,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Server Error`,
    });
  }
};

// export default userRegister;
import { generateAccessAndRefreshToken } from '../utils/token.js'; // Assuming token generation logic is in token.js

const refreshAccessToken = async (req, res, next) => {
  try {
    const incomingRefreshToken = req.body.refreshToken || req.cookies.refreshToken;

    // Check if refresh token is provided
    if (!incomingRefreshToken) {
      return res.status(401).json({
        status: 'error',
        message: `Please provide refresh token`,
      });
    }

    // Validate the refresh token (example validation, adjust as per your logic)
    // Example: Check against user.refreshToken from database
    const isValidRefreshToken = true; // Replace with your actual validation logic

    if (!isValidRefreshToken) {
      return res.status(401).json({
        status: 'error',
        message: `Access denied. Refresh Token does not match`,
      });
    }

    // Assuming generateAccessAndRefreshToken generates new tokens
    const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);

    // Set cookie options
    const options = {
      httpOnly: true,
      secure: true, // Enable in production if using HTTPS
      // other options like maxAge, domain, etc.
    };

    // Set cookies and return new tokens
    res.cookie('accessToken', accessToken, options);
    res.cookie('refreshToken', newRefreshToken, options);

    // Respond with new tokens
    res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
      message: "Access token refreshed successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  userRegister,
  refreshAccessToken,
  changePassword
}

import { User } from "../models/user.model.js"

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: 'Please provide old and new password'
            })
        }

        const user = await User.findById(req.user._id)

        const isMatch = await user.isPasswordMatch(oldPassword)

        if (!isMatch) {
            return res.status(400).json({
                message: 'Old password is incorrect'
            })
        }

        user.password = newPassword

        await user.save({ validateBeforeSave: false })

        return res.status(200).json({
            message: 'Password changed successfully',
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Error while changing password',
            success: false1
        })
        console.log(error)
    }
}0
