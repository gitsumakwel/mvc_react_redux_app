  const grayBG = [
    "background-color: #CDDAE0",
    "color: #",
    "padding: 2px 4px"
  ].join(";")
  const blak = [
    "color: #444",
    "padding: 2px 4px"
  ].join(";")
 
  const describe = (context) => {
      const type = context.constructor.toString()
      return { 
          len:context.length, 
          isArray:type.indexOf("Array")>-1, 
          isString:type.indexOf("String")>-1, 
          isObject:type.indexOf("Object")>-1, 
          isBool:type.indexOf("Boolean")>-1, 
          isNumber:type.indexOf("Number")>-1,
          isSet:type.indexOf("Set")>-1,
          anObject:(typeof context) === typeof {}
        }
    }
  const greater = (vars,msg) => vars.length > msg.length

  const log = (msg,vars) => {   
    if (vars === 'undefined' || vars===null) vars='no value'
    if (msg === 'undefined' || msg===null) msg='output'
    const dmsg = describe(msg)
    const dvar = describe(vars)
    const color = [grayBG,blak]
    let message =""
    const format = []    
    const cmessage = 'output'    
    if ( (dvar.isString || dvar.isObject || dvar.isBool || dvar.isNumber) && dmsg.isString ) {
        message +=`%c${msg}: %c${JSON.stringify(vars,null,2)}`
        format.push(...color)
    } else if (dvar.isArray && dmsg.isString) {
        vars.forEach((vitem,index) => {
            if (index>0)message += '\n'
            message += `%c[${index}]-${msg}: `

            const dvitem = describe(vitem)
            if (dvitem.isArray || dvitem.isObject || dvitem.isString || dvitem.isBool || dvitem.isNumber) message +=`%c${JSON.stringify(vitem)}`
            else  message +=`%c${JSON.stringify([...vitem])}`
            
            format.push(...color)
        })    
    } else if (dvar.isArray && dmsg.isArray) {
        if(greater(vars,msg)) {
            vars.forEach((vitem,index) => {
                if (index>0)message += '\n'
                if( dmsg.len - 1 < index) message.push(`%c${cmessage}: `)
                else message += `%c${msg[index]}: `

                const dvitem = describe(vitem)
                if (dvitem.isArray || dvitem.isObject || dvitem.isString || dvitem.isBool || dvitem.isNumber) 
                    message +=`%c${JSON.stringify(vitem)}`

                else message +=`%c${JSON.stringify([...vitem])}`
                
                format.push(...color)
            })
        } else {
            
            vars.forEach((vitem,index) => {
                if (index>0) message += '\n'
                message += `%c${msg[index]}: `
                //console.log(vitem)
                if (vitem.isArray || vitem.isObject || vitem.isString || vitem.isBool || vitem.isNumber) 
                    message += `%c${JSON.stringify(vitem,null,2)}`

                else message +=`%c${JSON.stringify([...vitem])}`            

                format.push(...color)
            })
        }
    } else if ((dvar.isString || dvar.isObject || dvar.isBool || dvar.isNumber) && dmsg.isArray){
        message += `%c${msg[0]} : %c${JSON.stringify(vars,null,2)}`
        format.push(...color)
    }
    console.log(message,...format)
  }

  module.exports = {log}