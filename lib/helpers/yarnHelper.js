const {exec} = require("child_process");
const readline = require("readline");

const yarnInstaller=(pacakge)=>{

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    exec(`yarn add ${pacakge}`,(error, stdout, stderr)=>{
        if (error) {
            console.log(error)
            rl.close()
        }
        if (stderr) {
            console.log("This is stderror : "+stderr)
            rl.close()
        }
        if (stdout) {
            console.log(stdout)
            console.log('\n✨ Done, package resolved successfully...');
            console.log('\n✨ Creating files and folers now...');
        }
    })
}

module.exports = {yarnInstaller}