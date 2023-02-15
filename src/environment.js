/* Holds reference to environment variables depending on the mode (development vs production)
*/

export const IS_PRODUCTION = import.meta.env.PROD

/* 
  Object containing environment variables we need
*/
export const ENV = {
  API_URL: IS_PRODUCTION ? `${import.meta.env.VITE_PRODUCTION_API_URL}` : `${import.meta.env.VITE_DEV_API_URL}`
}
