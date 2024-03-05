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
    ["system", `You are a story telling expert.`],
    ["human", "Tell me a short story about an ogre"],
];


app.get('/story', async (req, res) => {
    try {
        const result = await model.invoke(messages); // Stap 1: Stuur de initiële instructies en voorbeeldchat naar OpenAI
        console.log(result.content);
        res.send(result.content);
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/chat', async(req, res) => {
    try {
        const { prompt } = req.body;
        messages.push(["human", prompt]); // Stap 2: Voeg het bericht van de gebruiker toe aan de array met berichten
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
