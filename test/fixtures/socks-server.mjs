import { createServer } from 'node:net'
import { once } from 'node:events'

// Only hands successful tunnels to the supplied local fixture. No outbound connections.
export async function startSocksFixture(origin, requests) {
  const sockets = new Set()
  const server = createServer(socket => {
    sockets.add(socket)
    socket.on('close', () => sockets.delete(socket))
    socket.on('error', () => {})
    async function read(n) {
      let chunk
      while ((chunk = socket.read(n)) === null) {
        if (socket.destroyed || socket.readableEnded) throw new Error('fixture socket closed')
        await once(socket, 'readable')
      }
      return chunk
    }
    async function accept() {
      const [version, count] = await read(2)
      const methods = await read(count)
      if (version !== 5 || !methods.includes(0)) throw new Error('unsupported fixture greeting')
      socket.write(Buffer.from([5, 0]))
      const [v, command, , family] = await read(4)
      if (v !== 5 || command !== 1 || (family !== 1 && family !== 4)) throw new Error('expected an IP destination')
      const address = await read(family === 1 ? 4 : 16)
      const port = (await read(2)).readUInt16BE()
      requests.push({ address: address.toString('hex'), port })
      socket.write(Buffer.from([5, 0, 0, 1, 127, 0, 0, 1, 0, 80]))
      origin.emit('connection', socket)
    }
    void accept().catch(() => socket.destroy())
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  return {
    url: 'socks5://127.0.0.1:' + server.address().port,
    close() {
      for (const socket of sockets) socket.destroy()
      return new Promise(resolve => server.close(resolve))
    },
  }
}
