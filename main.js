#!/usr/bin/env node
let fs = require("fs");
let path = require("path");

let helpObj = require("./commands/help");
let organizeObj = require("./commands/organize");
let treeObj = require("./commands/tree");

// Taking User Input
let input = process.argv.slice(2);

let cmd = input[0]; // Get command
let Path = input[1]; // Get dir path

switch (cmd) {
    case "help":
        helpObj.helpKey();
        break;
    case "organize":
        organizeObj.organizeKey(Path);
        break;
    case "tree":
        treeObj.treeKey(Path);
        break;
    default:
        console.log("Invalid Command ❗❗❗");
        break;
}
