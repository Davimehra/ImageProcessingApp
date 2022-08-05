const { urlencoded, json, response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use('/output', express.static('./ImageProcessing/Outputs'));
app.use('/input', express.static('./ImageProcessing/Inputs'));

const { EdgeDetectorConvertor, GreyScaleConvertor, InputImageDirFetcher } = require('./ImageProcessing/PythonCompiler/PythonCompiler')

app.listen(process.env.PORT || 3001, () => {
    console.log(`Listening at http://localhost:${process.env.PORT || 3001}`);
})
app.get('/', (req, res) => {
    res.status(200).json({ messsage: 'Get Request working for /' });
})

// Using Multer for storing Image data
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json());


const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './ImageProcessing/Inputs')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const uploads = multer({
    storage: storage,
})

app.post('/api', uploads.single('inputimage'), async (req, res) => {
    const file = req.file;
    const UserId = req.query.UserId;
    const fileName = req.query.filename;

    res.status(200).json({ FileInformation: file, UserId: UserId, FileName: fileName });
})

app.get('/fetch', async (req, res) => {

    try {
        const DirResponseObject = await InputImageDirFetcher();
        const Array = DirResponseObject.toString().replace(['['], '').replace([']'], '').replace(/'/g, '').replace(/ /g, '')
        const PathString = Array.trim().split(',')

        res.json({ PathArray: PathString })
    } catch (error) {
        res.status(400).json(res);
    }

})

app.get('/api/scriptexecute', async (req, res) => {
    const UserId = req.query.UserId;
    const ScriptName = req.query.scriptname;

    const FileName = req.query.fileName;
    const FileExtension = req.query.fileExtension;

    console.log(`filename:= ${FileName}  , UserId := ${UserId} , ScriptName =: ${ScriptName} FileExtension:= ${FileExtension}`);
    if (ScriptName === 'GreyScaled') {
        await GreyScaleConvertor(FileName, FileExtension, UserId).then((response) => {

            console.log("Python File Data = ", response);
        }).catch((err) => {
            res.json({ "Error": err });
        })
    }

    if (ScriptName === 'EdgeDetector') {
        await EdgeDetectorConvertor(FileName, FileExtension, UserId).then((response) => {

            console.log("Python File Data = ", response);
        }).catch((err) => {
            res.json({ "Error": err });
        })
    }


    res.json({ ScriptName: ScriptName, FileName: FileName });
})
