
module.exports = {
    decodeJwt: function(token) {
        const segments = token.split('.')

        if (segments.length !== 3) throw new Error('Segments invalid')
        
        // base64 segments
        const headerSeg = segments[0]
        const payloadSeg = segments[1]
        const signSeg = segments[2]
    
        //base64 decode and parse JSON
        const header = JSON.parse(base64urlDecode(headerSeg))
        const payload = JSON.parse(base64urlDecode(payloadSeg))
    
        return {
            header: header,
            payload: payload,
            signSeg: signSeg,
        }
    },
}

function base64urlDecode(str) {
    return Buffer.from(base64urlUnescape(str), 'base64')
}
  
function base64urlUnescape(str) {
    str += Array(5 - str.length % 4).join('=')
    return str.replace(/\-/g, '+').replace(/_/g, '/')
}

