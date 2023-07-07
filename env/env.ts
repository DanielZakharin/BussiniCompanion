import { HSL_API_KEY } from '@env'

export type Env = {
    apiKey: string
}

var env: Env | undefined

export default (): Env => {
    if (!env) {
        env = {
            apiKey: HSL_API_KEY || process.env['REACT_APP_HSL_API_KEY']!! // ??? sometimes dotenv works and sometimes process.env!!! black magic...
        }
    }
    console.log(`ENV ${JSON.stringify(env)}`)
    return env
}