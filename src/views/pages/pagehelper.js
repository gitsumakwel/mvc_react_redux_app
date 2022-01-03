import $ from 'jquery';
import { randomkey } from '../../randomkey'
import { encode } from '../../obfs'
import Filter from 'bad-words'


const fetchData = async (page,cache) => {
  //prepare body
  const serial = await randomkey(10,true).join('');
  const result = await encode(page,serial)
  const body = { serial:serial,type:result }
  //set container of fetched data
  let fdata = null;
  //fetch the data

  await $.post('/api/page/latest?page=0',body,(data,status,xhr)=>{
    if (status==="success") {
      fdata = data      
    }
  })

  return fdata
}

const checkDataIfLatest = async (page,cache) => {
  const cache_data = JSON.parse(window.localStorage.getItem(cache))[page]
  //console.log('check',page,cache_data)
  
  let fdata = await fetchData(page,cache)
  
  // console.log('fdata', fdata)
  fdata = fdata[page]
  
  if (cache_data===null || cache_data===undefined) return fdata

  const cdata = Object.assign({},cache_data)

  //get most items for blogs, works, projects
  //compare the lastupdate
  // console.log(cdata)  
  if (fdata[0].lastupdate===cdata[0].lastupdate) return null;  
  return fdata
}

//data => { key: [array], key: [array], ...}
//exclude => [key, key, ...]
//mergeSortLimit(container,data,sort,limit,exclude)
const mergeSortLimit = async (container,data,sort,limit,exclude) => {
  for (let x in data) {
    if (exclude.indexOf(x)>=0) continue;
    container = [...container,...data[x]]
  }
  container = container.sort( (a,b)=> sort<0?(new Date(b.lastupdate)-new Date(a.lastupdate)):(new Date(a.lastupdate)-new Date(b.lastupdate)) )
  container = container.splice(0,limit);
  return container
}

const submitMessage = async (name,email,msg) => {    
  const filter = new Filter()
  
  const serial = await randomkey(10,true).join('');  
  name = await encode(name,serial)
  email = await encode(email,serial)  
  msg = await filter.clean(msg)
  msg =  await encode(msg,serial)

  let response = null
  await $.post('/api/message',{serial:serial,name:name,email:email,message:msg},(data,status,xhr)=>{
      if (status==='success')response = data
  })
  return response
}

//https://stackoverflow.com/questions/6787383/how-to-add-remove-a-class-in-javascript

function hasClass(ele,cls) {
  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}

export {
  checkDataIfLatest,
  fetchData,
  submitMessage,
  mergeSortLimit,
  addClass,
  removeClass,
  hasClass
}
