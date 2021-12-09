

const { validate } = use("Validator")

exports.errorDestroy = async (models, field, value) => {
  let error = false
  console.log(
    models, 'models'
  )
  for (let element of models ) {
    const Modelo = use(`App/Models/${element.name}`)
    let encontro = await Modelo.query().where(field, value).first()
    if (encontro) {
      error = true
      return {
        error: error,
        msg: `el id esta siendo utilizado en el modelo ${element.name}`,
        model: element.label
      }
    } else {
      return {
        error: error,
        msg: 'No se encontro el id en ningun modelo'
      }
    }
  }
}
