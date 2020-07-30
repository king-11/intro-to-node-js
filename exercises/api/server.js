const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name) => {
  const assetPath = path.join(__dirname, 'assets', name)
  return new Promise((resolve, reject) => {
    fs.readFile(assetPath, {
      encoding: 'utf-8'
    }, (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })
  })
}

const hostname = '127.0.0.1'
const port = 3000
const router = {
  '/ GET': {
    mime: mime.getType('html'),
    asset: 'index.html',
  },
  '/style.css GET': {
    mime: mime.getType('css'),
    asset: 'style.css',
  }
}

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer(async (req, res) => {
  const method = req.method
  const route = url.parse(req.url).pathname
  // this is sloppy, especially with more assets, create a "router"
  const match = router[`${route} ${method}`]
  if (!match) {
    res.writeHead(404);
    logRequest(method, route, 400)
    return res.end()
  }

  res.writeHead(200, {
    "Content-Type": match.mime
  })
  res.write(await findAsset(match.asset))
  logRequest(method, route, 200)
  res.end()
  // most important part, send down the asset
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})