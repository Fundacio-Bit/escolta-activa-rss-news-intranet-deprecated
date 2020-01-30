export const baseErrorMessage = 'Error de Servicio REST. Consulte detalles en la consola: [CTRL]+[SHIFT]+[I]'

export const getErrorMessage = (responseData) => {
  let errorMessage = ''

  if (responseData.hasOwnProperty('error'))
    {
    errorMessage = JSON.stringify(responseData.error)
    }
  else
    {
    errorMessage = JSON.stringify(responseData)
    }

  return errorMessage
}