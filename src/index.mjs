#!/usr/bin/env node

import serve from 'serve-handler'
import express from 'express'
import parsePlz from 'yargs-parser'
import bodyParser from 'body-parser'
import fs from 'fs/promises'
import Path from 'path'
import cors from 'cors'

const args = parsePlz(process.argv)
const app = express()

// cors for everyone
app.use(cors())

const PORT = args.port ?? 5000

app.use(bodyParser.text())

app.post('*', async (req, res) => {
  const { path, body } = req
  const fullPath = Path.join(process.cwd(), path)
  try {
    await fs.writeFile(fullPath, body)
    const message = `file has been saved: ${fullPath}`
    console.log(message)
    res.json(message)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

app.use((req, res) => serve(req, res))

const start = (port) => {
  app.listen(port, () => {
    console.log(`Yeah: http://localhost:${port}`)
  }).on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log(`Port already used (${port}). Try with the next one.`)
      start(port + 1)
    }
  })
}

start(PORT)
