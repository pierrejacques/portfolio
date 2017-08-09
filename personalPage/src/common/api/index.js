import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
const rootAddress = 'static'
const remoteBackup = 'http://121.196.192.102/static' // 发布的时候改掉
const remoteUrl = 'http://202.120.43.16:8081'
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
  getData: (category, url,) => Vue.http.get(`${remoteUrl}/data/${category}/${url}`),
  getUrl: (category, url, handler) => {
		const img = new Image
		const priorUrl = `${remoteUrl}/data/${category}/${url}`
		const bkUrl = `${remoteBackup}/data/${category}/${url}`
		let isPrior = true;
		img.onload = () => {
			if (isPrior) {
				handler(priorUrl)
			} else {
				handler(bkUrl)
			}
		}
		img.onerror = () => {
			if (isPrior) {
				isPrior = false
				img.src = bkUrl
			} else {
				handler(undefined)
			}
		}
		img.src = priorUrl
	},
}
