import http from 'http'

export default async function handler(req, res) {
  const url = 'http://92.113.26.138:8080' + req.url
  http
    .get(url, (response) => {
      let data = ''

      // A chunk of data has been received.
      response.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Send the result.
      response.on('end', () => {
        res.status(200).send(data)
      })
    })
    .on('error', (err) => {
      res.status(500).send(err.message)
    })
}
