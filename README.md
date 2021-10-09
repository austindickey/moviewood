# moviewood

<div style="text-align:center">

<img src="./client/public/img/homeLogo.png" alt="Moviewood Logo" width="250" />

Tired of wasting time looking for something to watch? Here at Moviewood, we strive to give you the best movie and tv show recommendations based off of your current favorites. We know that time is money, so stop wasting your valuable time and jump right into another great movie or tv show. You can search for recommendations based off of a movie title, a tv show title, film features, or from the favorites you have saved to your account.

_This site utilizes data from TasteDive API and TMDB API._

</div>

---

### **NPM Dependencies**

* axios
* concurrently
* dotenv
* express
* if-env
* moment
* mongoose
* nodemon
* react
* react-dom
* react-router-dom
* react-scripts

---

### **Initial Setup**
If you want to run this site locally, navigate to the moviewood folder in your terminal (after downloading or cloning of course), and install all the necessary dependencies with:

```
npm i
```

---

Next, you will need to visit 2 sites and register for an api key (both sites will require you to make a free account):

Taste Dive - https://tastedive.com/account/api_access

TMDB - https://www.themoviedb.org/account/signup

---

Then, create a file named `.env` inside the root level, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```js
tasteDiveApiKey=your-taste-dive-key
tmdbApiKey=your-tmdb-key

```

---

Finally, run:

```
npm start
```
