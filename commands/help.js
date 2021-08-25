// helpFn

function helpFn() {
    console.log(`
    List Of All Commands : 
            node main.js tree "directoryPath"
            node main.js organize "directoryPath"
            node main.js help
    `);
}

module.exports = {
    helpKey: helpFn
}