import { HSL_API_KEY } from '@env'

export type Env = {
    apiKey: string
}

var env: Env | undefined

export default (): Env => {
    if (env) return env
    else {
        return {
            apiKey: HSL_API_KEY
        }
    }
}