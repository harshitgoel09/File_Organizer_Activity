let fs = require("fs");
let path = require("path");
const { types } = require("../utility");

// organizeFn

function organizeFn(dirPath) {
    console.log("Organize Command Implemented 💯");

    let organizedPath;

    if (dirPath == undefined) {
        dirPath = process.cwd();
    }

    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
        //Valid Directory Path
        organizedPath = path.join(dirPath, "organized_files");
        if (fs.existsSync(organizedPath) == false) {

            //Create Organize Files Folder
            fs.mkdirSync(organizedPath);
        }

    } else {
        console.log("Invalid Directory Path ❗❗❗");
        return;
    }

    // Identify Categories Of All the Files Present At dirPath
    organizeHelper(dirPath, organizedPath);
}

function organizeHelper(src, dest) {

    let fileNames = fs.readdirSync(src);

    for (let i = 0; i < fileNames.length; i++) {
        // File Address
        let fileAddress = path.join(src, fileNames[i]);

        // check wheater it is file or folder
        let isFile = fs.lstatSync(fileAddress).isFile();
        if (isFile) {
            // Get Category
            let category = getCategory(fileNames[i]);

            // Send (copy/cut)  files to the organized directory , inside their category sub-folder
            sendFiles(fileAddress, dest, category);
        }
    }

}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1); // Remove . from extension Name

    for (let key in types) {
        let categoryTypeArr = types[key]; //get Array filled with Value for specific Key

        for (let i = 0; i < categoryTypeArr.length; i++) {
            if (ext == categoryTypeArr[i]) {
                // extension found in this categoryTypeArr, Hence return its key
                return key;
            }
        }
    }

    return "others";
}

function sendFiles(srcFilePath, dest, category) {
    // Get path of category folder
    let categoryDirPath = path.join(dest, category);

    if (fs.existsSync(categoryDirPath) == false) {
        // Create Directory of Category
        fs.mkdirSync(categoryDirPath);
    }

    // Create File path where we needs to copy it
    let fileName = path.basename(srcFilePath); // Get File Name
    let finalFilePath = path.join(categoryDirPath, fileName);

    // Copy File from original to final path and then cut it from its orignal location
    fs.copyFileSync(srcFilePath, finalFilePath);
    fs.unlinkSync(srcFilePath);
}

module.exports = {
    organizeKey: organizeFn
}