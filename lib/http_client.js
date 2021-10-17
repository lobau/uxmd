const https = require('https')
const querystring = require("querystring")

const HEADERS_JSON = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const HEADERS_URL_ENCODED = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

class HttpClient {
  constructor(host, port, certificateAuthority) {
    this.host = host
    this.port = port
    this.certificateAuthority = certificateAuthority
  }

  async postJson(endpoint, data, headers={}) {
    headers = Object.assign(headers, HEADERS_JSON)
    return this.postString(endpoint, JSON.stringify(data), headers)
  }

  async postFormUrlEncoded(endpoint, data, headers={}) {
    headers = Object.assign(headers, HEADERS_URL_ENCODED)
    let xFormBody = ""
    for(const key of Object.keys(data)) {
      xFormBody = xFormBody + `${key}=${data[key]}&`
    }
    xFormBody = xFormBody.substring(0, xFormBody.length - 1)
    return this.postString(endpoint, xFormBody, headers)
  }

  async postString(endpoint, dataString, headers) {
    const options = {
      host: this.host,
      port: this.port,
      path: endpoint,
      method: 'POST',
      ca: this.certificateAuthority,
      headers: headers,
    }
    return this.request(options, dataString)
  }

  async getJson(endpoint, data, headers={}) {
    headers = Object.assign(headers, HEADERS_JSON)
    const stringifiedData = data ? querystring.stringify(data) : ""
    const uriParams =  stringifiedData.length > 0 ? `?${stringifiedData}` : ""
    const path = endpoint + uriParams
    return this.get(path, headers)
  }

  async paginatedGetJson(endpoint, data, headers={}, offset=0) {
    Object.assign(data, { offset })
    let response = await this.getJson(endpoint, data, headers)
    const result = response.items || []
    while(response.next) {
      response = await this.get(response.next, headers)
      result = result.concat(response.items)
    }
    return result
  }

  async get(path, headers) {
    const options = {
      host: this.host,
      port: this.port,
      path: path,
      method: 'GET',
      headers: headers,
      ca: this.certificateAuthority
    }
    /* No data for GET requests*/
    return this.request(options, null)
  }

  async request(options, bytes) {
    delete options.port
    delete options.ca
    console.log("REQUESTING", options, bytes)

    let responseChunks = []
    return new Promise((resolve, reject) => {
      const request = https.request(options, (res) => {
        res.on('data', (d) => {
          responseChunks.push(d)
        })
        res.on('end', () => {
          try {
            resolve(JSON.parse(Buffer.concat(responseChunks)))
          } catch(e) {
            reject(e)
          }

        })
        res.on('error', (e) => {
          reject(e)
        })
      })
      request.on('error', (e) => {
        reject(e)
      })
      if(bytes) {
        request.write(bytes)
      }
      request.end()
    })
  }
}

module.exports = HttpClient
