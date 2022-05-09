# real-time Crypto Ticker

## Crypto Ticker Concept Design :pencil2:

![TechDefined-concept-design](https://github.com/TristanVarewijck/TechDefined/blob/main/assets/images/concept-display.png)

## Live Demo :clapper:

See the latest updated demo here:
[Link to DEMO](https://pwa-news-node.herokuapp.com/)

---

## Description :label:

For the project "real-time-web" we had to make an application that works with web-sockets. I want to make a web application what received real-time crypto data visualised in a Graph. In addition i want to make a chat room for a certain Topic so people can discuss in real time the prices changes of the coin in focus.

---

## Table of Contents :arrow_right_hook:

- [Features](#features)
- [Activiy](#activitydiagram)
- [Socketio](#socketio)
- [Used Tools](#Tools)
- [Usage](#Usage)

---

## Proof of Concept

Here you can see the process of the concept.

### Sketching

Hieronder zie je 10 hele snelle schetsen om zo snel mogelijk op een concept te komen.

<img src="https://github.com/TristanVarewijck/real-time-web-2122/blob/main/public/assets/readme/1-5.jpg" alt="schetsen 1 tot en met 5" width="600px"/>

<img src="https://github.com/TristanVarewijck/real-time-web-2122/blob/main/public/assets/readme/6-10.jpg" alt="schetsen 6 tot en met 10" width="600px"/>

1. Live feed
2. Voice chatting
3. Zoom clone
4. Real-time crypto trades
5. GraphTicker
6. Telegram clone
7. Four in a row
8. Poll / quiz
9. Scribble
10. Live youtube watch

### 3 concepts

Om dichter bij een concept te komen heb ik 3 concepten uitgekozen die ik het interresants vind en mogelijk kan samenvoegen tot een groter eindproduct.

<figure>
  <img src="https://github.com/TristanVarewijck/real-time-web-2122/blob/main/public/assets/readme/real-time-cryptoTrades.png" width="600px"/>
  <figcaption>
  <p><strong>CryptoTrades</strong></p>
  <ol>
    <li>
   Hier zie je alle trades die worden gemaakt van bitcoin (op binance)
    </li>
    <li>
   Wanneer je een andere coin zoekt maak je een connectie met de server die alle trades van in dit geval Matic terugstuurd en dit allemaal in real-time
    </li>
   </ol>
  </figcaption>
  </figure>

---

<figure>
   <img src="https://github.com/TristanVarewijck/real-time-web-2122/blob/main/public/assets/readme/GraphTicker.png" width="600px"/>
   <figcaption>
   <p><strong>GraphTicker</strong></p>
   <ol>
    <li>
    Hier zie je een grafiek met een ticker die automatische real time de beweegt op basis van de data die hij binnenkrijgt.
    </li>
    <li>
    Als je op de dropdown klikt krijg je andere coins te zien.
    </li>
    <li>
    De grafiek wordt nu geupdated op basis van de andere coin. 
    </li>
   </ol>
   </figcaption>
   </figure>

---

 <figure>
   <img src="https://github.com/TristanVarewijck/real-time-web-2122/blob/main/public/assets/readme/Telegram-clone.png" width="600px"/>
   <figcaption>
   <p><strong>TelegramClone</strong></p>
   <ol>
    <li>
    Een chat app waar je verschillende chatrooms kan joinen, als je op de knop "enter message" drukt komt er een keyboard naar boven.
    </li>
    <li>
    Nadat je met de keyboard een bericht heb verstuurd dan wordt deze gebroadcast naar alle mensen in de room.
    </li>
    <li>
    Vervolgens zie je ook je eigen bericht in de chatroom staan.
    </li>
   </ol>
   </figcaption>
   </figure>

---

### Concept draft

Voor mijn concept wil ik een dashboard maken waarin de 3 concepten hierboven allemaal samenkomen. Ik wil ervoor zorgen dat mensen kunnen zoeken op een coin en daarover data visualisaties kunnen zien gebaseeerd op real-time. Als inspiratie hiervoor heb ik de dashboard van binance gebruikt zoals je ziet hieronder. Natuurlijk is dit slechts inspiratie en zal mijn applicatie anders zijn en ook anders werken.

 <figure>
   <img src="https://github.com/TristanVarewijck/real-time-web-2122/blob/main/public/assets/readme/binance-dasboard.png" width="600px"/>
   <figcaption>
   <p><strong>Binance dashboard (inspiratie)</strong></p>
  <p>
    Hierboven zie je de dashboard die binance gebruikt. Het ziet er supper ingewikeld uit maar daarom pak ik er ook een aantal delen uit en wil ik sommige delen vervangen met een chatroom, als je op coins zoekt dan blijft de UI hetzelfde maar veranderd enkel te data. Ik wil op een manier fixen dat elk coin-id een chatroom is zodat mensen met elkaar kunnen praten over een specifieke coin in aparte rooms. 
  </p>
   
   </figcaption>
   </figure>

---

<figure>
   <img src="https://github.com/TristanVarewijck/real-time-web-2122/blob/main/public/assets/readme/real-time-cryptoDashboard.png" width="600px"/>
   <figcaption>
   <p><strong>Concept LoFi Wireframe</strong></p>
   <ol>
    <li>
     Boven aan is er ruimte voor { token price } data zoals price, 24h, high, low
    </li>
    <li>
     In het grote vlak, hier komt de grafiek te staan of een ticker, die wordt gegenereerd doormiddel van real-time data
    </li>
    <li>
    In de twee vlakken hieronder kan je de trades zien "sells" en "buys" 
    </li>
     <li>
    In het vlak links komt de chatroom die is gebaseerd op de coin id zodat iedereen die deze coin bekijkt kan discusiëren over deze coin.  
    </li>
    <li>
   Hierboven heb je een zoekbalk waarin je coins kan zoeken. En dus rooms kan joinen.   
    </li>
   </ol>
   </figcaption>
   </figure>

## External data source

Voor dit project heb ik een externe data source nodig die opties heeft voor het verkijgen van real-time data dus eigenlijk het kunnen leggen van een connectie tussen client en server. Ik heb gekozen voor de Binance API.

**API:** <br>
<img src="https://github.com/TristanVarewijck/real-time-web-2122/blob/main/public/assets/readme/binance-logo.png" width="150px"/>

[Binance real-time-data API](https://binance-docs.github.io/apidocs/spot/en/#websocket-market-streams) <br>
Uit deze API wil ik de prijzen weten per coin maar ook wil ik meer informatie zoals: sells/buys etc.
Hierover meer in de sectie "Data modeling"

## Data modeling

Uit de API die ik gebruik wil ik een aantal key values hebben (dus niet alles) hieronder heb ik een model gemaakt met de data die ik nodig ga hebben voor mijn project.

**Data Model** <br>

<figure>
   <img src="https://github.com/TristanVarewijck/real-time-web-2122/blob/main/public/assets/readme/data-model-api.png" width="100%"/>
   <figcaption><p>Hierboven zie je het data model die past bij mijn case. Ook wil ik er bij vermelden dat de api open source is (geen apiKey) en data in real-time werkt waardoor ik geen rate-limiting heb. </p></figcapition>
   </figure>

## Proof of Concept 2

Op dit punt ben ik net begonnen met coderen en heb ik alvast nagedacht over "spike solution" dit houd in dat je rekening houd met het data verkeer (in dit geval over sockets) je wil niet dat je app crashed, omdat er teveel data overheen weer wordt gestuurd.

--**"A socket message (emit) has a max capicity of 1MB by default."**--

Dit een statement waar je rekening mee moet houden, omdat dit het de ruimte is die een emit tegelijkertijd kan versturen. Een gemiddeld instagram bericht is ongeveer 70kb dit is niet veel maar het kan wel erg oplopen als meerdere gebruikers tegelijkertijd een groot bericht versturen.

Een manier om dit te voorkomen is om bijvoorbeeld een character limit te zetten. Zodat mensen niet oneidig stukken plakken text kunnen versturen zonder rate-limit.

<figure>
   <img src="https://github.com/TristanVarewijck/real-time-web-2122/blob/main/public/assets/readme/twitter-limit.png" width="600px"/>
   <figcaption><p>Hierboven zie je een voorbeeld van hoe twitter de data beperkt door een character limit eraan te koppelen.</figcaption>

De importance van dit onderwerp is vooral hoog bij grote apps zoals Instgram of Twitter waar er data verkeer over sockets wordt verstuurd te gelijker tijd. Natuurlijk kan ik dit ook toepassen aan mijn applicatie want het kan zeker geen kwaad.

## MOSCOW - tabel

// 9 mei 2022

1. Must have

   - list of users
   - messages of user styled differently
   - data changed on search

2. Should have

   - See users in all groups
   - Private messaging

3. Could have

   - D3 realtime candle chart

4. Won't have

   - live trading

## Tools

- socket.io
- ejs
- express.js

## Usage

For using this app yourself you need to follow the following steps:

### 1. Clone Repo locally

```
git clone https://github.com/TristanVarewijck/TechDefined.git
```

### 2. Connect your API key

If you want to connect with the API you have to fill in your own personal {apiKey} wich you can get here: <br>
[Get NewsAPI apiKey](https://newsapi.org/).

```
https://newsapi.org/v2/everything?q=${input.value}&sortBy=publishedAt&language=en&pageSize=100&apiKey=${apiKey}
https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=100&apiKey=${apiKey}
```

### 3. Install dependencies

Install to need dependencies for using this project.

```
npm i
```

### 4. Run on Localhost

Because i am using the free version of this API your need to run it on your localhost to test it. If you want to move further with this app make sure to check out the [pricing scheme](https://newsapi.org/pricing) of NewsAPI.

For easily running this project on your localhost you can use the command:

```
npm start
```

### Thats it! :smile:

## Grading

Your efforts will be graded using a single point rubric (see below). You will have to pass the criterion (centre column) to pass the course. During the test you will be consulted and will be given feedback on things we think deficient and things we think are an improvement on the criterion.

| Deficiency | Criterion                                                                                                                                                                                                                                                   | Improvement |
| :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
|            | _Project_ Your app is working and published on Heroku. Your project is thoroughly documented in the `README.md` file in your repository. Included are a description of the data-lifecycle, real-time events and external data source used by your app.      |             |
|            | _Complexity_ You’ve implemented enough real-time functionality for us to test your comprehension of the subject. A lot of functionality is self-written. You are able to manipulate online examples live.                                                   |             |
|            | _Client-server interaction_ By interacting with the app, a user can influence the data model of the server in real time by directly modifying data OR by influencing API requests between server and source. The student has set up the data manipulations. |             |
|            | _Data management_ The server maintains a data model and each client is continuously updated with the correct data.                                                                                                                                          |             |
|            | _Multi-user support_ Multiple clients can connect to the server. Interaction works as expected and is not dependent on the number of clients. You can explain how your app approaches this.                                                                 |             |

<!-- Here are some hints for your project! -->

<!-- Start out with a title and a description -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- ☝️ replace this description with a description of your own work -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

<!-- How about a license here? When in doubt use GNU GPL v3. 📜  -->

## ToDoList

1. chat messages styles
2.
