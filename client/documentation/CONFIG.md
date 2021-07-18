# Config

Flags can be set via command line arguments or environment variables.

#### Command line arguments

`node build --flag=value`

#### Environment variables

Prefix each variable with `bot.`
```
bot.flag=value
```

### Flags

| Flag | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| host | string | localhost | Host of Minecraft server to connect to |
| port | number | 25565 | Port of Minecraft server to connect to |
| username | string | bot | Username of bot |
| password | string | (empty) | Password of Mojang account to authenticate as. Leave empty to log in without online mode |
| ops | string[] | (empty) | Array of usernames that can control (operate) the bot via commands, separated by commas. Example: Player,OtherPlayer |
