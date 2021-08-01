import Discord, {Client, Snowflake, TextChannel} from 'discord.js'

export default class Dbot {
    client: Client

    constructor(token: string) {
        this.client = new Discord.Client()
        this.client.login(token)
            .then(() => console.log('Logged in'))
        this.client.on('ready', () => {
            console.log('ready')

        })
        this.client.on('error', console.error)
    }

    sendMessage(id: Snowflake, message: string) {
        this.client.channels
            .fetch(id)
            .then((channel) => {
                if (channel instanceof TextChannel) {
                    channel.send(message)
                        .catch(e => console.error('Error while sending message to channel with id ' + channel.id + '\n', e))
                } else {
                    console.error('Channel with id ' + id + ' has channel type of ' + channel.type + ', should be text channel')
                }
            })
            .catch((e) => {
                console.error('Error while fetching channel with id ' + id + '\n', e)
            })
    }
}