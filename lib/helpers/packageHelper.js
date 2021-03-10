const path = require("path");
const fs = require("fs");
const {exec} = require("child_process");
const readline = require("readline");

const createPackageFile=(body)=>{

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //get the directory the program is running
    exec("echo $PWD",(error,stdout,stderr)=>{
        if(error){
            console.log("This is error: "+error)
            rl.close()
        }
    
        if(stderr){
            console.log("This is std error: "+stderr)
            rl.close()
        }

        let data = 
        `{
            "name": "${body.name}",
            "version": "${body.version}",
            "description": "${body.description}",
            "main": "${body.main}",
            "repository": "${body.repository}",
            "author": "${body.author}",
            "license": "${body.license}"
        }`;

        //resolve path: path.basename gets the last folder in the current drectory, slice removes \n
        let folder = path.basename(stdout).slice(0, -1);

        //console.log(folder)
    
        fs.writeFile(`../${folder}/package.json`,data,(err)=>{
            if(err){
                console.log(err);
                rl.close()
            }
        })
    
    })

}


module.exports = {createPackageFile};