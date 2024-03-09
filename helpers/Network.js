import axios from 'axios'
import toast from 'react-hot-toast'

const Network = class NETWORK {
  constructor(axios) {
    this.network = axios.create({
      baseURL: '/',
    })

    // this.network.interceptors.request.use(async config => {
    //   const token = localStorage.getItem('token')
    //   if (token) {
    //     config.headers.token = token
    //     config.headers.platform = 'web'
    //   }

    //   return config
    // })

    this.network.interceptors.response.use(null, error => {
      if (error.response.status === 401) {
        location.href = '/login'
      }
      if (error.response.status === 400) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
      }
      if (error.response.status === 406) {
        const lang = localStorage.getItem('i18nextLng')
        if (lang === 'en') {
          toast.error('An unknown error occurred. Please contact the site administrator!')
        } else if (lang === 'tr') {
          toast.error('Bilinmeyen bir hata oluştu. Lütfen site yetkilisi ile iletişime geçin!')
        }
        console.log(error)
      }

      return Promise.reject(error)
    })
  }

  getData = async path => {
    return await this.network.get(path).then(r => r.data)
  }

  postData = async (path, body) => {
    return await this.network.post(path, body).then(r => r.data)
  }
  patchData = async (path, body) => {
    return await this.network.patch(path, body).then(r => r.data)
  }

  putData = async (path, body) => {
    return await this.network.put(path, body).then(r => r.data)
  }
  deleteData = async (path, body) => {
    return await this.network({
      method: 'DELETE',
      data: body,
      url: path
    }).then(r => r.data)
  }
}

export default new Network(axios)
