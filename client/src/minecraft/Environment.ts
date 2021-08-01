export default class Environment {
    host: string = 'localhost'
    port: number = 25565
    viewerPort: number = 30000
    username: string = 'bot'
    password: string = ''
    ops: string[] = []
    token?: string

    constructor(args: string[]) {
        for (let arg of args) {
            let split = arg.split('=')
            if (split.length !== 2) {
                throw new Error('Malformed argument ' + arg + '. Valid format is --flag=value')
            }

            let flag = split[0].slice(2)
            if (flag === '') {
                throw new Error('Malformed flag ' + arg + '. Valid format is --flag=value')
            }

            let value = split[1]

            switch (flag) {
                case 'host':
                    this.host = value
                    break
                case 'port':
                    this.port = parseInt(value)
                    if (isNaN(this.port)) {
                        throw new Error(value + ' is not a number')
                    }
                    break
                case 'viewerport':
                    this.viewerPort = parseInt(value)
                    if (isNaN(this.port)) {
                        throw new Error(value + ' is not a number')
                    }
                    break
                case 'username':
                    this.username = value
                    break
                case 'password':
                    this.password = value
                    break
                case 'token':
                    this.token = value
                case 'ops':
                    this.ops = value.split(',')
                    break
                default:
                    throw new Error('Unknown flag ' + flag)
            }
        }
    }
}