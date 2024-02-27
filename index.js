const express = require('express')

const dbConnect = require('./utils/db-connection')

const cloudinary = require('cloudinary').v2
const File = require('./module/file')


const morgan = require('morgan')

const multer = require('multer')
const fs = require('fs')
const path = require('path')

const app =express();
app.use(morgan("combined"));






          
cloudinary.config({ 
  cloud_name: 'm-ahmad-nxb', 
  api_key: '229884697848559', 
  api_secret: 'puMHRdFwuvHOO7mbTrzQERtQcTQ' 
});





//configure multer for file upload

const storage = multer.memoryStorage();
const upload = multer({storage});

// file Handing upload

app.post('/upload', upload.single('file'), async (req , resp)=>{
    try {

        if (!req.file){
            return resp.status(400).json({mess:"my file are not found"})
        }
    
        // write the buffer in temporary file

        const temFilePath = path.join(__dirname, '/upload', req.file.originalname);
        fs.writeFileSync(temFilePath, req.file.buffer)

        //upload the temporary file from cloudinary 

        const result = await cloudinary.uploader.upload(temFilePath, {resource_type: 'auto'})

        //  save file refernce in mongodb


        const newFile = new File({
            filename: req.file.originalname,
            url: result.secure_url,
        });
        newFile.save();

        resp.json(({url : result.secure_url}))





    } catch(error)  {
        console.error('Error:', error)
        resp.status(500).json({err: "Srver errror is not found"})
    }
}) 











dbConnect()
.then(() => {
    console.log("mongodb is connect");
}).catch((err) => {
    console.log(err.message);
});



const port = process.env.PORT || 5001
const host = process.env.HOST || localhost


app.listen(port,host, () => {
    console.log('connecting....')
});