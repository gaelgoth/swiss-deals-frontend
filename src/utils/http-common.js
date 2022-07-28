import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

export default axios.create({
  baseURL: 'https://deals-api.gothuey.dev/api/',
  // baseURL: 'http://127.0.0.1:9000/api/deal/',
  headers: { 'Cache-Control': 'no-cache' },
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter)),
})
