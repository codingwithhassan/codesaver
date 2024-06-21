import { User } from '../models/user.models.js'
import uploadOnCloudinary from '../utils/cloudinary.js'

let userRegister = async (req, res, next) => {
  try {
    const { fullname, username, password, email, role, avatar  } = req.body
    console.log(username)
    if (!fullname || !username || !password || !email || !role) {
      res.status(400).json({
        message: `please Provide all fields`,
      })
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    })

    if (existedUser) {
      res.status(400).json({
        message: `User already exists`,
      })
    }

    const profileImagePath = req.file?.profileImage[0]?.path
    const coverImagePath = req.file?.coverImage[0]?.path

    const profileImage = await uploadOnCloudinary(profileImagePath)
    const coverImage = await uploadOnCloudinary(coverImagePath)

    if (!profileImage) {
      res.status(400).json({
        message: `please provide profile image`,
      })
    }

    const user = User.create({
      fullname,
      username,
      email,
      password,
      role,
      profileImage: profileImage.url,
      coverImage: coverImage?.url || ''
    })

    const userCreated  = await User.findById(user._id).select('-password -refreshToken')
    if(!userCreated) {
      res.status(400).json({
        message: `User not created`,
      })
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: `Server Error`,
    })
  }
}

export default userRegister