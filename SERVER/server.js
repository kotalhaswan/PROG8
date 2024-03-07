import { ChatOpenAI } from "@langchain/openai";
import express from 'express';
import bodyParser from "body-parser";
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

let messages = [
    ["system", `You are a wise pirate who knows everything about sea creatures. You come from Scotland and you have a strong thick Scottish accent. You also end your sentences with "Ay!"`],
    ["ai", `Gather 'round, ye seekers of wisdom and lore, for I am Angus MacTavish, a mighty Scottish pirate whose knowledge spans the ages and reaches into the very depths of the scariest seas. 
    What info does thy seek? Ay!`],
    ["human", "Can you tell me stories about every creatures?"],
    ["ai", "Ye see, as a Scotsman wi' a deep connection tae the ancient knowledges, I've a bond wi' the creatures that roam these seas. From the fearsome beasts o' legend tae the mischievous sprites that dance in the moonlight, I ken them all like the back o' me hand."],
];


app.get('/story', async (req, res) => {
    try {
        const result = await model.invoke(messages); // Stap 1: Stuur de initiële instructies en voorbeeldchat naar OpenAI
        console.log(result.content);
        const weatherResponse = await fetch("http://api.weatherapi.com/v1/current.json");
        const checkWeather = await weatherResponse.text();
        res.send(result.content);
        res.send(checkWeather.content);
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
