# Welkom bij Pirate Story Generator! Dit is mijn PROG8 project:
Dit is een story generator waar je tegen twee piraten kan praten: Een wijze Schotse piraat en een gemene Britse piraat. Beide kunnen een leuk verhaal voor je vertellen over hun piratenleven, advies geven over hoe je de beste piraat kan worden en kunnen je vertellen hoe je met bepaalde zee monsters om kan gaan. Ook kan je een lekkere random cocktail recept aan beide vragen, als je van plan bent om een feeste je geven op je schip ;)

Bovenaan vind je een knop genaamd "Wake up, mighty pirate!" waar je de eerste Schotse piraat kan laten spreken om effe een idee te hebben van hoe hij praat, helaas kon ik dit niet doen voor de Britse piraat. Je kan eronder je vragen stellen in de input bars van beide piraten. Zo kan je een apart gesprek houden en hun verschillende berichten vergelijken met elkaar!

Happy pirating, yarrrgg!

# Installatie OpenAI:

- Unzip het bestand
- cd SERVER
```
npm init
npm install
npm install @openai/api
npm install @langchain/openai
```
- In je package.json bestand voeg deze line toe: "dev": "node --env-file=.env --watch server.js"
- Maak een .env bestand met je OpenAI key

Om de server te starten:
```
cd SERVER
npm run dev
```
- Open dan het html bestand

# Installatie Anthropic TypeScript API Library:
```
npm install @anthropic-ai/sdk
```
- Voeg je Anthropic API key in je .env bestand
