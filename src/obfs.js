const crypto = require('crypto');

let password = `${process.env.REACT_APP_PART1}`;
let iv = `${process.env.REACT_APP_PART2}`;
const algorithm = 'aes-256-cbc';


 async function encode(string,salt) {

    let key = await crypto.pbkdf2Sync(password, salt, 100, 32, "sha512");
    let cipher = crypto.createCipheriv(algorithm, key, Buffer.from(iv));
    let encrypted = '';
    cipher.setEncoding('hex');
    cipher.on('data', (chunk) => encrypted += chunk);
    cipher.on('end', () => null); //console.log('encode')

    cipher.write(string);
    cipher.end();
    return encrypted
}

async function decode(string,salt) {

    let key = await crypto.pbkdf2Sync(password, salt, 100, 32, "sha512");
    let decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv));
    let decrypted = '';
    let chunk = null;
    decipher.on('readable', () => {
      while (null !== (chunk = decipher.read())) {
        decrypted += chunk.toString('utf8');
      }
    });
    decipher.on('end', () => null );//console.log('decode')

    // Encrypted with same algorithm, key and iv.
    const encrypted = string;
    decipher.write(encrypted, 'hex');
    decipher.end();

    return decrypted;
}

module.exports = {
  encode,
  decode,
}
