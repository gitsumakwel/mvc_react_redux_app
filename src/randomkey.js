let CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890+-*.@$^='
let ALPHANUM = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

const randomNumbers = (length,container,alphanum) => {
  if (length < 1)return container;
  container = randomNumbers(length-1, container,alphanum);
  container.push(Math.floor(Math.random() * (alphanum?ALPHANUM.length:CHARACTERS.length) ))
  return container;
}

const randomkey = (length,alphanum=false) => {

    if (typeof alphanum !== typeof true) alphanum = false
    //array of random numbers
    let randChars = [];
    randChars = randomNumbers(length,randChars,alphanum);
    randChars = randChars.map(index => alphanum?ALPHANUM[index]:CHARACTERS[index]);
    return randChars;
};

//console.log(CHARACTERS.length)
//console.log(Math.pow(3,CHARACTERS.length))
module.exports = {
  randomkey,
}
