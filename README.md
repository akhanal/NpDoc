### NpDoc

This app allows users to interact with their doctors. 
It will use APIs provided by a backend service which is hosted separately.

### Code organization
1. The layout of the app and all routes are defined is defined in app/_layout.js. 
expo-router takes care of routing. See package.json especially line "main": "expo-router/entry",
2. app/index.js is the landing page/screen and provides login. 
It will navigate to home if user is already logged in.
3. app/home.js is the home page that shows list of doctors. When clicking a doctor, it takes to doctor details page.
4. app/doctor-details.js shows details about a doctor and lets user chat or call that doctor.
5. Users are of two types- doctor and patient.
6. context/GlobalContext.js keeps track of logged in User.
7. utils/storage.js provides methods to locally store value for key. It is utilized to store logged in user.
