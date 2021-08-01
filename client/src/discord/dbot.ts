import Discord, {DiscordAPIError, TextChannel} from 'discord.js'

export function makeBot(token: string) {
    let client = new Discord.Client()
    client.login(token)
        .then(() => console.log('Logged in'))
    client.on('ready', () => {
        console.log('ready')
        let id = '871161933234065468'
        client.channels
            .fetch(id)
            .then((channel) => {
                if (channel instanceof TextChannel) {
                    channel.send('hello! my name is dbot! please be nice to me! i am sensitive!')
                        .catch(e => console.error('Error while sending message to channel with id ' + channel + '\n', e))
                } else {
                    console.error('Channel with id ' + id + ' has channel type of ' + channel.type + ', should be text channel')
                }
            })
            .catch((e) => {
                console.error('Error while fetching channel with id ' + id + '\n', e)
            })
    })
    client.on('error', console.error)
}
