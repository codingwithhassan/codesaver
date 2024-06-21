import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME , 
  api_key:process.env.API_KEY , 
  api_secret:process.env.API_SECRET  
});


const uploadOnCloudinary = async (filepath) => {
    try{
      if(!filepath){
        return null
      }
const result = await cloudinary.uploader.upload(filepath, {
public_id: `shoes`
})
console.log(`file uploaded sucesfully, ${result.url}`)
} catch (err) {
  console.log(err)
  FileSystem.uslinkSync(filepath)
return will
}
}
export default uploadOnCloudinary





