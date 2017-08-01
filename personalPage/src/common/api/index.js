import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const rootAddress = 'static'
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
  getData: (category, url) => Vue.http.get(`${rootAddress}/data/${category}/${url}`),
  getUrl: (category, url) => `${rootAddress}/data/${category}/${url}`,
}
