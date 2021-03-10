#!/usr/bin/env node

const path = require("path");
const readline = require("readline");
const process = require('process');
const fs = require("fs");
const args = require('minimist')(process.argv.slice(2))
const {createPackageFile} = require('./lib/helpers/packageHelper');
const {yarnInstaller} = require('./lib/helpers/yarnHelper');
const {nodeInstaller} = require('./lib/helpers/nodeHelper');
const {exec} = require("child_process");
const {createIndex, createHomeRoute} = require("./lib/filecreators/createExpressFiles");
const { createFastifyIndex, createFastifyHomeRoute } = require("./lib/filecreators/createFastifyFiles");




//get server type e.g. express, fastify etc defaults to express
let server = args["server"] || "express";

//get package manager type e.g. npm or yarn, defaults to npm
let manager = args["package"] || "npm";
//check if package manager is correct
// if (manager !== "npm" || manager !== "yarn") {
//     return console.log("Error: package manager unknown")
// }


//package json body
let name = path.basename(path.resolve(process.cwd()));
let description = "";
let version = "1.0.0";
let repository = "";
let main = "index.js";
let author = "";
let license = "ISC";



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if(!["yarn","npm"].includes(manager)){
    console.log("We don't support that package manager yet...");
    rl.close();
    return;
}

const nib =()=>{
    rl.question(`What is the name ? default (${name}) : `, (answer) => {
        if(answer !== ""){
            name = answer;
        }
        // get description
        rl.question(`description : `, (answer) => {
            // assign answer to description
            description = answer;
    
                //get version
                rl.question('What is the version (1.0.0) : ', (answer) => {
                    // assign answer to version
                    if(answer !== ""){
                        version = answer;
                    }
                    
                    //get repository
                    rl.question('Git repository : ', (answer) => {
                        // assign answer to repository
                        repository = answer;
    
                        //get main
                        rl.question('Main file (index.js): ', (answer) => {
                            // assign answer to main file
                            if(answer !== ""){
                                main = answer;
                            }
                            //get author
                            rl.question('Author : ', (answer) => {
                                // assign answer to author
                                author = answer
                                //create package json file
                                let body = {
                                    name,
                                    description,
                                    version,
                                    repository,
                                    main,
                                    author,
                                    license 
                                }
    
                                createPackageFile(body)
    
                                switch (manager) {
                                    case "npm":
                                        console.log('running npm install...')
                                        nodeInstaller(server);
                                        break;
                            
                                    case "yarn":
                                        console.log('running yarn add...')
                                        yarnInstaller(server);
                                        break;
                                
                                    default:
                                        console.log("This is not a known package manager...");
                                        rl.close();
                                        break;
                                }
                                
                                if(server === "express"){
                                    createIndex(main, rl)
                                    createHomeRoute(rl);
                                }

                                if(server === "fastify"){
                                    createFastifyIndex(main, rl)
                                    createFastifyHomeRoute(rl);
                                }
    
                                // console.log('\n✨ Done, package resolved successfully...');
                                // rl.close()
                                
                            });
                        });
    
                    });
    
                });
          });
    
      });
}

if(!["express", "fastify"].includes(server)){
    console.log("We don't support that server yet, please raise an issue on our github repo...");
    rl.close();
    return;
}else{
    nib();
}






  
