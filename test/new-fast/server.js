
    const fastify = require('fastify')();

    fastify.register(require('./routes/home'),{prefix:'/users'});

    // Run the server!
    fastify.listen(2410, (err, address) => {
      if (err) throw err
      console.log(`server listening on 2410 `)
    })
    