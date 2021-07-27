class ConsoleHandler {
    textDecoder = new TextDecoder()
    listeners: Map<string, (() => void)[]> = new Map()

    constructor() {
        process.stdin.on('data', (data: Buffer) => {
            let raw = this.textDecoder.decode(data)
            let args = raw
                .slice(0, raw.length - 1) // remove newline from enter key
                .split(' ')

            switch (args[0]) {
                case 'help':
                    console.log('help')
                    break
                case 'test':
                    this.dispatch('test', null)
                default:
                    console.log('unknown command')
            }
        })
    }

    dispatch(event: string, data: any) {

    }

    on(event: string, listener: () => void) {
        let listeners = this.listeners.get(event)
        if (listeners === undefined) {
            listeners = []
        }
        listeners.push(listener)
    }
}