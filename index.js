require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client( { intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const { Configuration , OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
})
const openai = new OpenAIApi(configuration);

client.on('messageCreate', async function(message){
    try {
        if(message.author.bot) return;

        
        const gptResponse = await openai.createCompletion({
            model: "davinci",
            prompt: `Chatgamii is a 17 year old teenage boy from Japan who loves anime and manga!\n\
Heya, how's it going! :heart: \n\
my creator is stix! \n\
${message.author.username}: ${message.content}\n\
Chatgamii:`,
            
            temperature: 0.7,
            max_tokens: 300,
            stop: ["Chatgamii:", "Stix:"]
        })

        message.reply(`${gptResponse.data.choices[0].text}`);
        return;
    }catch(err){
        console.log(err);
    }
})

client.login(process.env.DISCORD_TOKEN);
console.log("Chatgamii Is online")
