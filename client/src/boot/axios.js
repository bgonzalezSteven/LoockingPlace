/*
* Archivo con la configuración general de axios
*/
import axios from 'axios'
import env from '../env'
import { Notify } from 'quasar'

const axiosInstance = axios.create({
  baseURL: env.apiUrl// url base cargada de archivo env.js
})

export default async ({ store, Vue }) => {
  // Vue.prototype.$axios = axios
  Vue.prototype.$api = axiosInstance

  axiosInstance.interceptors.response.use(function (response) {
    console.log('axiosResponse', response)
    // Todo bien con la respuesta
    if (response.config.method === 'post') {
      if (response.status === 200) {
        if (response.data.token === undefined) { // Si no es login
          Notify.create({
            color: 'positive',
            icon: 'done',
            message: 'Registro guardado con éxito!'
          })
        } else { // Es Login
          /* let sessionInfo = {
            token: response.data.token
          } */
          localStorage.setItem('sessionInfo', JSON.stringify(response.data))
        }
      }
      if (response.status === 103) {
        if (response.data.token === undefined) { // Si no es login
          Notify.create({
            color: 'negative',
            icon: 'warning',
            message: 'Ya existe un rol con ese slug'
          })
        } else { // Es Login
          /* let sessionInfo = {
            token: response.data.token
          } */
          Notify.create({
            color: 'negative',
            icon: 'warning',
            message: 'Ya existe un rol con ese slug'
          })
        }
      }
      if (response.status === 422) {
        if (response.data.token === undefined) { // Si no es login
          Notify.create({
            color: 'negative',
            icon: 'warning',
            message: 'Ocurrio un error al cargar los archivos'
          })
        } else { // Es Login
          /* let sessionInfo = {
            token: response.data.token
          } */
          localStorage.setItem('sessionInfo', JSON.stringify(response.data))
        }
      }
      if (response.status === 204) {
        if (response.data.token === undefined) { // Si no es login
          Notify.create({
            color: 'positive',
            icon: 'done',
            message: 'Registro modificado con éxito!'
          })
        } else { // Es Login
          /* let sessionInfo = {
            token: response.data.token
          } */
          localStorage.setItem('sessionInfo', JSON.stringify(response.data))
        }
      }
      if (response.status === 205) {
        if (response.data.token === undefined) { // Si no es login
          Notify.create({
            color: 'negative',
            icon: 'warning',
            message: 'El aspirante ya posee sus credenciales!'
          })
        } else { // Es Login
          /* let sessionInfo = {
            token: response.data.token
          } */
          localStorage.setItem('sessionInfo', JSON.stringify(response.data))
        }
      }
    } else if (response.config.method === 'put') {
      if (response.status === 200) {
        if (response.data.token === undefined) { // Si no es login
          Notify.create({
            color: 'warning',
            icon: 'done',
            message: 'Registro modificado con éxito!'
          })
        } else { // Es Login
          /* let sessionInfo = {
            token: response.data.token
          } */
          localStorage.setItem('sessionInfo', JSON.stringify(response.data))
        }
      }
      if (response.status === 204) {
        if (response.data.token === undefined) { // Si no es login
        } else { // Es Login
          /* let sessionInfo = {
            token: response.data.token
          } */
          localStorage.setItem('sessionInfo', JSON.stringify(response.data))
        }
      }
    } else if (response.config.method === 'delete') {
      if (response.status === 200) {
        if (response.data.token === undefined) { // Si no es login
          Notify.create({
            color: 'negative',
            icon: 'done',
            message: 'Registro eliminado con éxito!'
          })
        } else { // Es Login
          /* let sessionInfo = {
            token: response.data.token
          } */
          localStorage.setItem('sessionInfo', JSON.stringify(response.data))
        }
      }
    }
    return response.data
  }, function (error) {
    // Error en la respuesta
    console.log('debug', error.response)
    if (error.response === undefined) { // Si no hubo comunicación con el servidor
      console.log('no hay conexion con el servidor', error)
      Notify.create({
        color: 'red',
        icon: 'warning',
        message: 'Por favor verifica tu conexión de internet'
      })
    } else { // Si el servidor dio respuesta
      console.log('linea49')
      if (error.response.status === 401) { // Error de Login
        Notify.create({
          message: 'Correo y/o Contraseña Incorrectos',
          color: 'red',
          position: 'center'
        })
      } else if (error.response.status === 403) { // Error de Login
        Notify.create({
          message: error.response.data,
          color: 'red',
          position: 'center'
        })
      } else if (error.response.status === 404) { // Error de Login
        Notify.create({
          message: 'Error en ruta. Código 404',
          color: 'black',
          position: 'center'
        })
      } else if (error.response.status === 500) { // Error en servidor
        Notify.create({
          message: 'Error en servidor. Código 500',
          color: 'black',
          position: 'center'
        })
      }
      var data = error.response.data
      const status = error.response.status
      console.log('error.response.data.error', data)
      if (data) {
        if (status === 401) {
          console.log('data.statusCode === 401')
          if (error.response.config.url.search('/accessTokens/') !== -1) {

          } else if (data.code === 'LOGIN_FAILED') { // Si es un error de autenticación
            Notify.create({
              message: 'Correo y/o Contraseña Incorrectos9',
              color: 'red'
            })
          } else {
          }
        }
        if (data.statusCode === 403) {
          Notify.create({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: data.message
          })
        }
        if (data[0].status === 422) {
          Notify.create({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Correo ya registrado en el sistema para este periodo escolar!' /* + data[0].message */,
            position: 'center'
          })
          // return Promise.reject(data.response.data.error)
        }
        if (data[0].status === 423) {
          Notify.create({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: data[0].message,
            position: 'center'
          })
          // return Promise.reject(data.response.data.error)
        }
        if (data[0].status === 424) {
          Notify.create({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Por favor verifica tu conexión de internet, ha ocurrido un error en el envio del correo' /* + data[0].message */,
            position: 'center'
          })
          // return Promise.reject(data.response.data.error)
        }
        if (data.statusCode === 500) {
          Notify.create({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'Error interno en servidor' + data.message
          })
          // return Promise.reject(data.response.data.error)
        }
        // Añadir mas mensajes segun codigos de error especificos y mostrar las notificaciones correspondientes

        // Notify.create(error.response.data.error.message)
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message)
      }
      // console.log(error.config)
    }

    // return Promise.reject(data)
  })

  axiosInstance.interceptors.request.use(async function (config) {
    // Antes de enviar cada petición se añade el token si existe

    store.dispatch('generals/fetchAccessToken')
    const token = (store.state.generals.sessionInfo !== null) ? store.state.generals.sessionInfo.token : false
    console.log('token', token)
    if (token) {
      if (!config.headers) { config.headers = {} }
      config.headers = {
        Authorization: 'Bearer ' + token
      }
    }
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
}

export { axiosInstance }
