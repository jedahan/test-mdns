const mdns = require('mdns')

const servicesStrings = [
  mdns.tcp('http', 'livingroom').toString(),
  mdns.udp('osc', 'livingroom').toString(),
  mdns.tcp('socketio', 'livingroom').toString()
]

console.dir({servicesStrings})

for (let serviceString of servicesStrings) {
  const service = mdns.makeServiceType(serviceString)
  const browser = mdns.createBrowser(service)

  browser.on('serviceUp', ({type}) => {
    const found = servicesStrings.includes(type.toString())
    console.log(`${type.toString()} ${found ? 'found' : 'not found'} in services`)
  })

  browser.start()
}

let port = 3000
for (let serviceString of servicesStrings) {
  const service = mdns.makeServiceType(serviceString)
  const advertisement = mdns.createAdvertisement(service, port++)
  advertisement.start()
}
