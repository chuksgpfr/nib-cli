const {exec} =  require("child_process");
const fs = require("fs");
const path = require("path")


//create index file

const createIndex=(main,rl)=>{
    //data for index file
    let data = `
    const express = require('express');
    const homeRoute = require('./routes/home');


    var app = express();

    const PORT = 3990;

    app.use('/api', homeRoute);

    app.listen(PORT, () => {
        console.log(\'Server is running on PORT 3990\')
    })`;

    //use the data to create a main(index.js/app.js) file
    exec("echo $PWD",(error,stdout,stderr)=>{
        if(error){
            console.log(error);
            rl.close()
        }
        if(stderr){
            console.log(stderr);
            rl.close()
        }

        //resolve path: path.basename gets the last folder in the current drectory, slice removes \n
        let folder = path.basename(stdout).slice(0, -1);

        fs.writeFile(`../${folder}/${main}`,data,(err)=>{
            if(err){
                console.log(err);
                rl.close()
            }
            console.log(`\n✨ ${main} file created successfully.....`);
            rl.close()
        })

    })

}

const createHomeRoute =(rl)=>{
    
    let data = `
    const express = require("express");

    const router = express.Router();

    router.get('/',(req,res)=>{
        res.status(200).send("OK")
    });

    module.exports = router;
    `
    //create route folder
    exec("mkdir routes",(error, stdout, stderr)=>{
        if(error){
            console.log(error);
            rl.close()
            return;
        }
        if(stderr){
            console.log(stderr);
            rl.close()
            return;
        }

        console.log(`\n✨ Route folder created successfully.....`);

        //echo current folder so i can navigate into it
        exec("echo $PWD",(error, stdout, stderr)=>{
            if(error){
                console.log(error);
                rl.close()
                return;
            }
            if(stderr){
                console.log(stderr);
                rl.close()
                return;
            }
            
            //resolve path: path.basename gets the last folder in the current drectory, slice removes \n
            let folder = path.basename(stdout).slice(0, -1);

            fs.writeFile(`../${folder}/routes/home.js`,data,(err)=>{
                if(err){
                    console.log(err);
                    rl.close()
                    return;
                }
                console.log(`\n✨ Home route file created successfully.....`);
                rl.close()
                return;
            })
        })
        

    })
}

module.exports = {createIndex, createHomeRoute}


