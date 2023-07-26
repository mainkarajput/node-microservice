const gateway = require('fast-gateway')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT

const server = gateway({
    routes: [
        {
            prefix: '/order',
            target: 'http://localhost:8081'
        },
        {
            prefix: '/products',
            target: 'http://localhost:8083'
        }
    ]
})

server.start(PORT).then(() => {
    console.log(`api-gateway listening on http://localhost:${PORT}`)
}).catch((err) => {
    console.log('error calling gateway');
})

