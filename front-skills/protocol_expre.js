let test_url ="https://www.google.com"
let protocolExpr = /^http(s)?(?=:\/\/)/

let protocol = protocolExpr.exec(test_url)[0]

console.log(protocol)

