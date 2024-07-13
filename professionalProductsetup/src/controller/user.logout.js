import { User } from "../models/user.model.js"

const logOut = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            { $set: { refreshToken: "" } },
            { new: true }
        )
        const option = {
            httpOnly: true,
            secure: true,
        }
        res.status(200).cookie("accessToken", '', option).cookie("refreshToken", '', option).json({ message: "Logout successful" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default logOut