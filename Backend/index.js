import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import voice from "elevenlabs-node";
import express from "express";
import { promises as fs } from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();


async function audioFileToBase64(filePath) {
  try {
    const audioBuffer = await fs.readFile(filePath);
    return `data:audio/wav;base64,${audioBuffer.toString("base64")}`;
  } catch (error) {
    console.error(`Error converting audio file to Base64: ${error}`);
    throw error;
  }
}


async function readJsonTranscript(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON transcript: ${error}`);
    throw error;
  }
}






const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
const voiceID = "kgG7dCoKCfLehAPWkJOE";

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/voices", async (req, res) => {
  res.send(await voice.getVoices(elevenLabsApiKey));
});

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

const lipSyncMessage = async (message) => {
  const time = new Date().getTime();
  console.log(`Starting conversion for message ${message}`);
  await execCommand(
    `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
  );
  console.log(`Conversion done in ${new Date().getTime() - time}ms`);
  await execCommand(
    `./bin/rhubarb -f json -o audios/message_${message}.json audios/message_${message}.wav -r phonetic`
  );
  console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
};

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    res.send({
      messages: [
        {
          text: "Hello... How was your day?",
          audio: await audioFileToBase64("audios/intro_0.wav"),
          lipsync: await readJsonTranscript("audios/intro_0.json"),
          facialExpression: "smile",
          animation: "Talking_1",
        },
      ],
    });
    return;
  }
  if (!elevenLabsApiKey || !process.env.GEMINI_API_KEY) {
    res.send({
      messages: [
        {
          text: "Please, don't forget to add your API keys!",
          audio: await audioFileToBase64("audios/api_0.wav"),
          lipsync: await readJsonTranscript("audios/api_0.json"),
          facialExpression: "angry",
          animation: "Angry",
        },
      ],
    });
    return;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([userMessage || "Hello"]);
    const responseText = result.response.text();

    const messages = [
      {
        text: responseText,
        facialExpression: "smile",
        animation: "Talking_1",
      },
    ];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const fileName = `audios/message_${i}.mp3`;

      // Call your audio generation function if needed
    }

    res.send({ messages });
  } catch (error) {
    console.error("Error with Gemini API:", error);
    res.status(500).send({ error: "Failed to generate a response from Gemini API" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
