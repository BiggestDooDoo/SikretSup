const discord = require ('discord.js');
var client = new discord.Client();

client.on ("ready", () => {
    console.log ("readeh");

    client.user.setActivity ("DM me for help!");

    client.user.setStatus ("Idle")
});

const prefix = "s!"

client.on ("guildMemberAdd", member => {
    member.send ("Welcome to the server! Hope you enjoy your stay here and be sure to read the rules.");
    client.channels.get('541331824128032768').send(member.displayName + " has joined the server!")
});

client.on ("message", (message) => {
    if (message.author.bot) return;

    if (message.channel.type === "dm") {
        client.channels.get('538434332155445290').send(`**${message.author.tag} (${message.author.id})** sent "${message.content}"`);
    }

    MsgSp = message.content.split(" ", 3)
    
    msg = message.content.toLowerCase();

    mention = message.mentions.users.first() || MsgSp[1];

    if (msg.startsWith (prefix + "help")) {
        message.channel.send ("Hello there! If you have any question, DM me!")
    }

    if (msg.startsWith (prefix + "send")) {
        if (mention == null) { return; }
        if (message.member.hasPermission ("MUTE_MEMBERS")) {
            message.delete();
            mentionMessage = message.content.slice (29);
            mention.send ("**MOD:** " + mentionMessage)
        }
        if (message.member.hasPermission ("MENTION_EVERYONE")) {
            message.delete();
            mentionMessage = message.content.slice (29);
            mention.send ("**ADMIN:** " + mentionMessage)
        }
    }

    if (msg.startsWith (prefix + "tell") && message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        lemsg = message.content.slice (7);
        message.channel.send (lemsg)
    }

    if (msg.startsWith (prefix + "membercount")) {
        message.channel.send (`There are **${message.guild.memberCount}** members. **${message.guild.members.filter(member => member.user.bot).size}** of them are bots!`)
    }

    if (msg.startsWith (prefix + "mute") && message.member.hasPermission("MANAGE_MESSAGES")) {
        const role = message.guild.roles.find(r => r.name === "Muted");
        reasonM = message.content.slice(29);
        reallyreasonM = (`**${mention.tag}** has been muted. 
    Reason: ${reasonM} 
    Responsible User: ${message.author.username}`);
        message.guild.member(message.mentions.users.first()).addRole(role);
        message.channel.send ("**" + mention.tag + "**" + " Has been successfully muted!")
        client.channels.get('541581123843522580').send(reallyreasonM);
    }
    
    if (msg.startsWith (prefix + "unmute") && message.member.hasPermission("MANAGE_MESSAGES")) {
        const role = message.guild.roles.find(r => r.name === "Muted");
        message.guild.member(message.mentions.users.first()).removeRole(role);
        message.channel.send ("**" + mention.username + "**" + " Has been successfully unmuted!")
    }
    
    if (msg.startsWith (prefix + "role") && message.member.hasPermission("MANAGE_MESSAGES")) {
        const role = message.guild.roles.find(r => r.name === message.content.slice(29));
        message.guild.member(message.mentions.users.first()).addRole(role);
        message.channel.send ("**" + mention.username + "**" + " Has been given the role!")
    }

    if (msg.startsWith (prefix + "unrole") && message.member.hasPermission("MANAGE_MESSAGES")) {
        const role = message.guild.roles.find(r => r.name === message.content.slice(31));
        message.guild.member(message.mentions.users.first()).removeRole(role);
        message.channel.send ("**" + mention.username + "**" + " Has been removed from the role!")
    }

    if (msg.startsWith (prefix + "kick") && message.member.hasPermission("MANAGE_MESSAGES")) {
        reasonK = message.content.slice(29);
        message.guild.member(message.mentions.users.first()).kick()
        message.channel.send ("**" + mention.username + "**" + " Has been kicked!")
        mention.send("You have been kicked from ||         ||. Reason: " + reasonK)
        reallyreasonK = (`**${mention.tag}** has been kicked. 
    Reason: ${reasonK} 
    Responsible User: ${message.author.username}`);
        client.channels.get('541581123843522580').send(reallyreasonK);
    }

    if (msg.startsWith (prefix + "ban") && message.member.hasPermission("MANAGE_MESSAGES")) {
        reasonB = message.content.slice(28);
        message.guild.member(message.mentions.users.first()).ban()
        message.channel.send ("**" + mention.username + "**" + " Has been slain by the ban hammer!")
        mention.send("You have been banned from ||         ||. Reason: " + reasonB)
        reallyreasonB = (`**${mention.tag}** has been banned. 
    Reason: ${reasonB} 
    Responsible User: ${message.author.username}`);
        client.channels.get('541581123843522580').send(reallyreasonB);
    }
    
    //swear filter

    if (msg.includes ('fuck') || msg.includes ('shit') || msg.includes ('gay') || msg.includes ('sex') || msg.includes ('penis') || msg.includes ('cock') || msg.includes ('dick') || msg.includes ('pussy') || msg.includes ('bitch') || msg.includes ('vagina') || msg.includes ('nigga') || msg.includes ('nude') || msg.includes ('hentai') || msg.includes ('porn') || msg.includes ('rape')) {
        if (message.member.hasPermission ("ADMINISTRATOR")) { return; }
        message.delete();
        message.reply ('watch your language!')
    }
});

client.login (process.env.BOT_TOKEN);

//wordlist: fuck shit gay sex penis cock dick pussy bitch vagina nigga nude hentai porn rape
