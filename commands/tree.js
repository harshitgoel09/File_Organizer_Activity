let fs = require("fs");
let path = require("path");

// treeFn
function treeFn(dirPath) {

    if (dirPath == undefined) {
        console.log("Tree Command Implemented 💯");
        treeHelper(process.cwd(), "");
        return;
    }

    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
        console.log("Tree Command Implemented 💯");
        treeHelper(dirPath, "");
    } else {
        console.log("Invalid Directory Path ❗❗❗");
        return;
    }
}

function treeHelper(dirPath, indent) {
    // check wheather it is File or Folder

    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);

        // Go deep insisde the folders
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports = {
    treeKey: treeFn
}