import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const rootAddress = 'static'
//const remoteAddress = 'http://121.196.192.102/static'
const remoteAddress = 'http://202.120.43.16:8081'
const tryParse = str => {
  let data
  try {
    data = JSON.parse(str);
  } catch(e) {
    data = {}
    const positionIdx = RegExp('position').exec(e).index + 9
    const errPosition = e.toString().slice(positionIdx, positionIdx + 4)
    console.log(`JSON parsed error @${errPosition}`);
  }
  return data
}
const get = url => {
  const promise = Vue.http.get(url);
  return (success, fail) => {
    promise
    .then(response => {
      success(tryParse(response.bodyText))
    }, response => {
      fail(response)
    })
  }
}

export default {
  getMenu: () => ({ then: get(`${rootAddress}/json/menu.json`) }),
  getJSON: category => ({ then: get(`${rootAddress}/json/${category}.json`) }),
  getData: (category, url) => Vue.http.get(`${remoteAddress}/data/${category}/${url}`),
  getUrl: (category, url) => `${remoteAddress}/data/${category}/${url}`,
}
