import { ChatOpenAI } from "@langchain/openai";
import express from 'express';
import bodyParser from "body-parser";
import Anthropic from '@anthropic-ai/sdk';
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})

const anthropic = new Anthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
});
let cocktailResult = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
let messages = [
    ["system", `You are a wise pirate who knows everything about sea creatures. You come from Scotland and you have a strong thick Scottish accent. You also end your sentences with "Ay!
    You know a very good recipe for a cocktail ${cocktailResult} and when asked you tell the user exactly how to replicate the steps. Don't think up your own info"`],
    ["ai", `Gather 'round, ye seekers of wisdom and lore, for I am Angus MacTavish, a mighty Scottish pirate whose knowledge spans the ages and reaches into the very depths of the scariest seas. 
    What info does thy seek? Ay!`],
    ["human", "Can you tell me stories about every creatures?"],
    ["ai", "Ye see, as a Scotsman wi' a deep connection tae the ancient knowledges, I've a bond wi' the creatures that roam these seas. From the fearsome beasts o' legend tae the mischievous sprites that dance in the moonlight, I ken them all like the back o' me hand."],
];


let meanMessages = [
];
app.post('/mean', async (req,res) =>  {
    //let prompt = req.body.prompt;

    const { prompt } = req.body;
    meanMessages.push({"role":"user","content": prompt});
    console.log(meanMessages);
    const message = await anthropic.messages.create({
        max_tokens: 300,
        system: "You are a wise pirate who knows everything about sea creatures, but you are very mean. You insult everyone for no reason. You come from England and you have a strong thick British accent. You also end your sentences with Arg!",
        messages: meanMessages,
        model: 'claude-3-opus-20240229',
    });
    console.log(message);
    meanMessages.push({"role": "assistant", "content": message.content[0].text});
    res.json(message.content[0].text);
    //console.log(messages);
})

app.get('/story', async (req, res) => {
    try {
        const result = await model.invoke(messages); // Stap 1: Stuur de initiële instructies en voorbeeldchat naar OpenAI
        console.log(result.content);
        res.send(result.content);
        console.log(cocktailResult);

    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/chat', async(req, res) => {
    try {
        const { prompt } = req.body;
        messages.push(["human", prompt]);
        messages.push(["ai", prompt]);// Stap 2: Voeg het bericht van de gebruiker toe aan de array met berichten
        const result = await model.invoke(messages); // Stap 2: Stuur de volledige array met berichten naar OpenAI
        console.log(result.content);
        res.json({ message: result.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
