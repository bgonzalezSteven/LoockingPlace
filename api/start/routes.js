'use strict'


/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => {
  return {
    Message: 'Hello World menorcito'
  }
})

const addPrefixToGroup = group => {
  // Grupo para rutas con prefijo /api/
  group.prefix("api");

  return group;
};


addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas sin protección de autenticación aquí
    Route.post("login", "UserController.login");
  })
);

addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas con protección de autenticación aquí
    Route.get("InfoLog", "UserController.info")
    Route.put("changeModel", "UserController.update")


    // Rutas para la creacion del Roles del sistema //
    Route.get('rol', 'RolController.index')
    Route.post('role', 'RolController.store')
    Route.get('getRole/:id', 'RolController.show')
    Route.delete('role/:id', 'RolController.destroy')
    Route.get('permissions', 'PermissionController.index')
    // Rutas para la creacion del Roles del sistema //

    // Rutas para las cantidades de Habitaciones y sus tipos //
    Route.get('getInfoCounter', 'TypesRoomController.getInfoCount')
    Route.post('typesRoom', 'TypesRoomController.store')
    Route.delete('countRoomId/:id', 'TypesRoomController.destroy')
    Route.get('countRoom', 'TypesRoomController.index')
    Route.get('counterRoom', 'TypesRoomController.counterRoom')
    Route.get('getInfoRomm/:id', 'TypesRoomController.show')
    // Rutas para las cantidades de Habitaciones y sus tipos //

    // Rutas para la creacion de un Hotel //
    Route.get('getInfo', 'HotelController.changeInfo') // Ruta de Extraccion de la Informacion Hotelaria //
    Route.get('getRol', 'RolController.details')
    Route.get('hotels', 'HotelController.index')
    Route.post('hotels', 'HotelController.store')
    Route.put('changeStatus', 'HotelController.update')
    Route.get('getHotels/:id', 'HotelController.show')
    Route.delete('hotels/:id', 'HotelController.destroy')    
    // Rutas para la creacion de un Hotel //

    // Rutas para las Habitaciones //
    Route.get('roomTypes', 'RoomController.index')
    Route.post('roomTypes', 'RoomController.store')
    Route.get('getroomTypes/:id', 'RoomController.show')
    Route.delete('roomTypesId/:id', 'RoomController.destroy')
    // Rutas para las Habitaciones //

    // Rutas para los metodos de pago //
    Route.get('paypament', 'PaypamentController.index')
    Route.post('paypament', 'PaypamentController.store')
    Route.get('getpaypament/:id', 'PaypamentController.show')
    Route.delete('paypamentId/:id', 'PaypamentController.destroy')
    // Rutas para los metodos de pago //

    // Rutas para los Clientes//
    Route.get('customer', 'CustomerController.index')
    Route.post('customer', 'CustomerController.store')
    Route.get('getcustomer/:id', 'CustomerController.show')
    Route.delete('customerId/:id', 'CustomerController.destroy')
    Route.get('getCustomer', 'CustomerController.getinfo')
    // Rutas para los Clientes //

    // Rutas de las reservaciones //
    Route.post('reservation', 'ReservationController.store')
    Route.get('reservation', 'ReservationController.index')

    // Rutas de las reservaciones //


    // Rutas de Habitaciones //
    Route.post('rooms', 'RoomController.store')
    // Rutas de Habitaciones //


  }).middleware("auth")
);
