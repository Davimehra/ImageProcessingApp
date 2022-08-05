
const { exec } = require('child_process');
const fs = require('fs');

const path = require('path');
const { useState } = require('react');



function GreyScaleConvertor(fileName, fileExtension, UserId) {

    return new Promise((resolve, reject) => {
        // index.js Directory is cwd
        //curDir = D:\APPS\Working_Projects\OnlineCompilerAppAndWeb\AppCompilerOnline\newInterface_v_1_0_0\imageProcessing\backend 

        fs.readFile('./ImageProcessing/PythonScripts/ImageProcessingScripts/GrayScaled.py', 'utf-8', (err, data) => {
            { err && reject(err) }
            if (data) {
                let replacedPythondata = (data.replace(`os.listdir('../Inputs/')[0].split('.')[0];`, `'${UserId}_${fileName}'`)).replace(`os.listdir('../Inputs/')[0].split('.')[1];`, `'${fileExtension}'`);
                console.log("pythonReplacedData +++++++ \n", replacedPythondata);
                fs.writeFile(`./ImageProcessing/PythonScripts/tempScripts/${UserId}_GreyScaled_${fileName}.py`, replacedPythondata, err => {
                    if (err) {
                        console.error(err);
                        reject("File Writing Error", err);
                    }

                });

            }
        });

        exec(`python ./ImageProcessing/PythonScripts/tempScripts/${UserId}_GreyScaled_${fileName}.py`, (err, stdout, stderr) => {
            { (err || stderr) && (reject(stderr)) }
            { stdout && (resolve(stdout)) }
            { stderr && (reject(stderr)) }
        });

    })
}
function EdgeDetectorConvertor(fileName, fileExtension, UserId) {
    return new Promise((resolve, reject) => {

        // index.js Directory is cwd
        //curDir = D:\APPS\Working_Projects\OnlineCompilerAppAndWeb\AppCompilerOnline\newInterface_v_1_0_0\imageProcessing\backend 

        fs.readFile('./ImageProcessing/PythonScripts/ImageProcessingScripts/EdgeDetector.py', 'utf-8', (err, data) => {
            { err && reject(err) }
            if (data) {
                let replacedPythondata = (data.replace(`os.listdir('../Inputs/')[0].split('.')[0];`, `'${UserId}_${fileName}'`)).replace(`os.listdir('../Inputs/')[0].split('.')[1];`, `'${fileExtension}'`);
                // console.log("pythonReplacedData +++++++ \n", replacedPythondata);
                fs.writeFile(`./ImageProcessing/PythonScripts/tempScripts/${UserId}_EdgeDetector_${fileName}.py`, replacedPythondata, err => {
                    if (err) {
                        console.error(err);
                        reject("File Writing Error", err);
                    }

                });

            }
        });

        exec(`python ./ImageProcessing/PythonScripts/tempScripts/${UserId}_EdgeDetector_${fileName}.py`, (err, stdout, stderr) => {
            { (err || stderr) && (reject(stderr)) }
            { stdout && (resolve(stdout)) }
            { stderr && (reject(stderr)) }
        });
    })
}

function InputImageDirFetcher() {
    return new Promise((resolve, reject) => {

        exec('python ./ImageProcessing/PythonScripts/FeatureScripts/InputPathProvider.py', (error, stdout, stderr) => {
            { (error || stderr) && reject(stderr) }
            { stderr && reject(stderr) }
            { stdout && resolve(stdout) }
        })
    })
}



module.exports = {
    GreyScaleConvertor, EdgeDetectorConvertor, InputImageDirFetcher
}
