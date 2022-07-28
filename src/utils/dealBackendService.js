/**
 * @file File for deal-backend api consumption
 * @author Gaël Gothuey <gothuey.gael@gmail.com>
 * @date 18.06.2022
 * @version 1.0.0
 */

import http from '@/utils/http-common'

export default class DealBackendAPI {
  digitec = ['deals/digitec', 'deals/galaxus']
  qoqas = ['deals/qoqa', 'deals/qsport', 'deals/qooking', 'deals/qwine', 'deals/qlock']

  async getApiHealth() {
    try {
      const response = await http.get('/')
      return {
        success: response.data.success,
        message: response.data.message,
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
        message: 'API is not available',
      }
    }
  }

  async getDigitec() {
    this.getApiHealth()
    try {
      const response = await this.getAllData(this.digitec)
      return response
    } catch (e) {
      console.error(e)
    }
  }

  async getQoqa() {
    try {
      const response = await this.getAllData(this.qoqas)
      return response
    } catch (e) {
      console.error(e)
    }
  }

  getAllData(URLs) {
    return Promise.all(URLs.map(this.fetchData))
  }

  async fetchData(URL) {
    try {
      const response = await http.get(URL)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        endpoint: URL,
      }
    }
  }
}
