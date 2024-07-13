import { User } from '../models/user.model.js'

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }
  } catch (error) {
    console.log(error)
    throw new Error('Something went wrong in token generation')
  }
}

const userLogin = async (req, res, next) => {
  try {
    const { username, password, email } = req.body
    if (!username || !password || !email) {
       res.status(400).json({
        message: "Please provide all fields"
      })
    }

    const user = await User.findOne({
      $or: [{ username }, { email }]
    })

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      })
    }

    const isPasswordMatch = await user.isPasswordMatch(password)

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken')

    const option = {
      httpOnly: true,
      secure: true
    }

    return res.status(200)
      .cookie("accessToken", accessToken, option)
      .cookie("refreshToken", refreshToken, option)
      .json({
        message: "Login successful",
        user: loggedInUser,
        accessToken,
        refreshToken
      })

  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
    console.log("Error : ", error)
  }
}

export default userLogin