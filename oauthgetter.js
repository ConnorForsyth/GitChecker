/**
 * @Author: John Isaacs <john>
 * @Date:   06-Feb-192019
 * @Filename: oauthgetter.js
 * @Last modified by:   john
 * @Last modified time: 07-Feb-192019
 */



const request = require('request')
const args = require('minimist')(process.argv.slice(2))

var user = args['user']
var password = args['password']
var client = args['client']
var clientsecret = args['clientsecret']
var url = 'https://'+user+':'+password+'@api.github.com/authorizations';

request.post(url, {
  headers: {
    "User-Agent": "GitChecker",
    "Accept": "application/vnd.github.v3+json"
  },
  json:{
  "scopes": [
    "repo", "admin:org"
  ],
  "client_id": client,
  "client_secret": clientsecret,
  "note": "hub-GitChecker Oauth Getter",
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
})
