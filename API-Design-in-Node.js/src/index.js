import http from 'http';

const server = http.createServer(async (req, res) => {
    console.log(req)
    console.log(res)
    if (req.method === 'GET' && req.url === '/') {
        console.log("Hello form the server")
        res.end()
    }
})

server.listen(3001, () => {
    console.log('server on http://localhost:3001')
})