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

app.get('/story', async (req, res) => {
    try {
        const story = await model.invoke("Tell me a short story about an ogre")
        console.log(story.content)
        res.send(story.content);
    } catch (error) {
        console.error("error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
// Route to handle POST requests for motivational responses
app.post('/chat', async(req, res) => {
    console.log(req.body);
    try {
        const { prompt } = req.body;
        const response = await model.invoke(prompt);
        res.json({ message: response.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
