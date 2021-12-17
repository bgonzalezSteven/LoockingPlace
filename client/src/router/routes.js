
const routes = [
  {
    path: '/menu',
    component: () => import('layouts/Menu.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      // Rutas para el acceso del sistema
      { path: '/rol', component: () => import('pages/Admin/Role/List.vue'), meta: { permission: 'configuration.role'} },
      { path: '/rol/agg_rol', component: () => import('pages/Admin/Role/Form.vue'), meta: { permission: 'configuration.role'} },
      { path: '/rol/edit_rol/:id', component: () => import('pages/Admin/Role/Form.vue'), meta: { permission: 'configuration.role'} },
      // Rutas de Registro de Hoteles
      { path: '/hotels', component: () => import('pages/Admin/Hotels/List.vue'), meta: { permission: 'configuration.hotels'} },
      { path: '/hotels/agg_hotels', component: () => import('pages/Admin/Hotels/Form.vue'), meta: { permission: 'configuration.hotels'} },
      { path: '/hotels/edit_hotels/:id', component: () => import('pages/Admin/Hotels/Form.vue'), meta: { permission: 'configuration.hotels'} },
      // Rutas de Cantidad de Habitaciones
      { path: '/countRoom', component: () => import('pages/Manager/CountRoom/List.vue'), meta: { permission: 'configuration.reserves'} },
      { path: '/countRoom/agg_countRoom', component: () => import('pages/Manager/CountRoom/Form.vue'), meta: { permission: 'configuration.reserves'} },
      { path: '/countRoom/edit_countRoom/:id', component: () => import('pages/Manager/CountRoom/Form.vue'), meta: { permission: 'configuration.reserves'} },
      // Rutas para la gestion de Habitaciones
      { path: '/information', component: () => import('pages/Manager/Information.vue'), meta: { permission: 'configuration.habitations'} },
      { path: '/roomTypes', component: () => import('pages/Manager/Rooms/List.vue'), meta: { permission: 'configuration.habitations'} },
      { path: '/roomTypes/agg_roomTypes', component: () => import('pages/Manager/Rooms/Form.vue'), meta: { permission: 'configuration.habitations'} },
      { path: '/roomTypes/edit_roomTypes/:id', component: () => import('pages/Manager/Rooms/Form.vue'), meta: { permission: 'configuration.habitations'} },
      // Rutas para la gestion de metodos de pago
      { path: '/paypament', component: () => import('pages/Manager/Paypament/List.vue'), meta: { permission: 'configuration.paypament'} },
      { path: '/paypament/agg_paypament', component: () => import('pages/Manager/Paypament/Form.vue'), meta: { permission: 'configuration.paypament'} },
      { path: '/paypament/edit_paypament/:id', component: () => import('pages/Manager/Paypament/Form.vue'), meta: { permission: 'configuration.paypament'} },
      // Rutas para los clientes
      { path: '/customer', component: () => import('pages/Manager/Customer/List.vue'), meta: { permission: 'reservation.client'} },
      { path: '/customer/agg_customer', component: () => import('pages/Manager/Customer/Form.vue'), meta: { permission: 'reservation.client'} },
      { path: '/customer/edit_customer/:id', component: () => import('pages/Manager/Customer/Form.vue'), meta: { permission: 'reservation.client'} },
      // Rutas para las reservaciones
      { path: '/reservation', component: () => import('pages/Manager/Reservation/List.vue'), meta: { permission: 'reservation.list'} },
      { path: '/reservation/agg_reservation', component: () => import('pages/Manager/Reservation/Form.vue'), meta: { permission: 'reservation.list'} },
      { path: '/reservation/edit_reservation/:id', component: () => import('pages/Manager/Reservation/Form.vue'), meta: { permission: 'reservation.list'} },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Login.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}
export default routes
