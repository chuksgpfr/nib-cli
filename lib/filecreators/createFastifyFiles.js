const {exec} =  require("child_process");
const fs = require("fs");
const path = require("path")


const createFastifyIndex=(main,rl)=>{
    //data for index file
    let data = `
        const fastify = require('fastify')();

        fastify.register(require('./routes/home'),{prefix:'/users'});

        // Run the server!
        fastify.listen(2410, (err, address) => {
        if (err) throw err
        console.log('server listening on 2410')
        })
    `;

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

const createFastifyHomeRoute =(rl)=>{
    
    let data = `
        async function routes(fastify, options){

            fastify.get('/:id',async(req,res)=>{
            res.send({
                id: req.params.id
            })
            })
        
        }
      
        module.exports = routes;
    `;
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

module.exports = {createFastifyIndex, createFastifyHomeRoute}