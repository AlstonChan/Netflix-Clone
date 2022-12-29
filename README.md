<div align="center" style='display: flex'>
   <img style='margin: 0 auto ; max-width:700px' src='./public/images/logo.png' />
</div>
<div align="center" style='display:flex; justify-content:center'>
  <img style='margin: 0 3px' src='https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E' />
  <img style='margin: 0 3px' src='https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' />
  <img style='margin: 0 3px' src='https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white' />
  <img style='margin: 0 3px' src='https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase' />
  <img style='margin: 0 3px' src='https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white' />
</div>
<h2 align="center" style="display: flex; justify-content:center;">A netflix clone created using Next.js and Firebase</h2>

# Getting Started

### Step One. Clone or download the code

```
git clone https://github.com/AlstonChan/Netflix-clone.git
```

Then type `cd Netflix-clone`.

### Step Two. Install all required dependencies using `npm install`

```
npm install
```

You may also install `firebase-tools` so you can use Firebase auth emulators later,

```
npm install -g firebase-tools
```

### Step Three. Create a Firebase project, register a web app and initialize firebase

1. Firstly, go to [firebase](https://firebase.google.com/), you should see this page. Click the top right **Sign in** button if you haven't sign in yet and click _Get started_ button.
   ![firebase homepage](./assets/firebase-home.jpg)

2. Next, click _Add project_ and enter a project name you desired, then proceed to create your Firebase project.

3. Below is your **firebase console**, create a web app and register a name.
   ![firebase homepage](./assets/firebase-console.jpg)

4. Create a **`.env.local`** file in the root directory (which is where your package.json file lies), and paste the following code into the file. Fill in your Firebase web app details accordingly, using `.env.local` file to save these Firebase details enable you not to copy and paste the details whenever you need to access it.

   ```
   NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=
   ```

   Next, click the **setting icon** besides _Project Overview_ located at top left corner of your screen and choose _Project settings_. Go to _Service accounts_ and on _Firebase Admin SDK_ option, click **Generate new private key** and download the JSON file.

   Copy the `"private_key"` value and `client_email` value. Paste it to `.env.local` file.

   ```
   FIREBASE_PRIVATE_KEY=
   FIREBASE_CLIENT_EMAIL=

   # Your private key should something like this
   # The double quote should not be neglected as it will caused error to be shown
   # FIREBASE_PRIVAVTE_KEY="-----BEGIN PRIVATE KEY-----\PPPPPPPP\n-----END PRIVATE KEY-----\n"
   ```

5. Go to your **[Firebase console](https://console.firebase.google.com/u/0/)**, select the project and navigate to `Authentication` section. Click get started and enable **`Email/Password`** & **`Google`** auth, this app will use these two providers to authenticate user.

6. This step is **optional** but is recommended, which is setting up a Firebase emulator. The emulators is built to accurately mimic the behavios of Firebase services, so you can use Firebase auth locally and do not need to connect to Firebase cloud. To start the emulators, first copy the following code into `.env.local`.

   ```
   # set to true when using Firebase auth emulator
   NEXT_PUBLIC_USE_FIREBASE_AUTH_EMULATOR=false
   NEXT_PUBLIC_USE_FIREBASE_FIRESTORE_EMULATOR=false
   NEXT_PUBLIC_USE_FIREBASE_STORAGE_EMULATOR=false

   # https://github.com/gladly-team/next-firebase-auth/issues/184
   # FIREBASE_AUTH_EMULATOR_HOST existance cause unexpected error to /api/login,
   # so it should be comment out when you want to disable Firebase emulators

   # FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
   ```

   The `FIREBASE_AUTH_EMULATOR_HOST=localhost:9099` is being commented out, because it's existance can cause unexpected error when you decided to switch to Firebase cloud auth. You may temporary uncomment it when you want to use Firebase auth emulators, just remember to comment it back so it won't crashed the app. Besides that, head to `/lib/initAuth.js` and uncomment `firebaseAuthEmulatorHost: process.env.FIREBASE_AUTH_EMULATOR_HOST`, this also need to be commented back when using Firebase cloud auth.

   The error below will be `console log` in your text editor if you forgot to comment it while using Firebase cloud auth, a 500 response error will also be logged in your browser.

   In case you wonder, these error happens because of one dependency named `next-firebase-auth`.

   ```javascript
   code: 'auth/argument-error',
   message: '`uid` argument must be a non-empty string uid.'
   ```

## Step Four. Setup Firebase CLI

1. Go to your text editior, in my case, I am using [Visual Studio Code](https://code.visualstudio.com/). Login to the Firebase CLI using the following command, You will be redirected to your browser to login.

   ```
   firebase login
   ```

2. After you have successfully login to the Firebase CLI, enter this command to initialize your firebase project to this application.

   ```
   firebase init
   ```

3. You will be greeted with a big **FIREBASE** word and you will be asked the following question:

   1. **Are you ready to proceed?**
      <u>Response</u>: type `y`

   2. **Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices.**
      <u>Response</u>: select `Firestore`, `Storage` and `Emulators` by pressing space. Use arrow key to navigate your option up and down. After you have selected these three options, press `Enter`.

   3. **Select a default Firebase project for this directory: (Use arrow keys)**
      <u>Response</u>: Use a existing project and select the Firebase project that you just initialize. Press `Enter` to proceed.

   4. **What file should be used for Firestore Rules?**
      <u>Reponse</u>: press `Enter`; Use the default `firestore.rules`

   5. **File firestore.rules already exists. Do you want to overwrite it with the Firestore Rules from the Firebase Console?**
      <u>Reponse</u>: type `n`

   6. **What file should be used for Firestore indexes?**
      <u>Reponse</u>: press `Enter`; Use the default `firestore.indexes.json`

   7. **File firestore.indexes.json already exists. Do you want to overwrite it with the Firestore Indexes from the Firebase Console?**
      <u>Reponse</u>: type `n`

   8. **What file should be used for Storage Rules?**
      <u>Reponse</u>: press `Enter`; Use the default `storage.rules`

   9. **File <u>storage.rules</u> already exists. Overwrite?**
      <u>Reponse</u>: type `n`

   10. **Which Firebase emulators do you want to set up? Press Space to select emulators, then Enter to confirm your choices.**
       <u>Response</u>: select `Firestore Emulator`, `Storage Emulator` and `Authentication Emulator` by pressing space. Use arrow key to navigate your option up and down. After you have selected these three options, press `Enter`.

   11. **Which port do you want to use for the auth emulator?**
       <u>Reponse</u>: press `Enter`; Use the default port `9099`

   12. **Which port do you want to use for the firestore emulator?**
       <u>Reponse</u>: press `Enter`; Use the default port `8080`

   13. **Which port do you want to use for the storage emulator?**
       <u>Reponse</u>: press `Enter`; Use the default port `9199`

   14. **Would you like to enable the Emulator UI?**
       <u>Reponse</u>: type `y`

   15. **Which port do you want to use for the Emulator UI (leave empty to use any available port)?**
       <u>Reponse</u>: press `Enter` or type `4060`

   16. **Would you like to download the emulators now?**
       <u>Reponse</u>: type `y`

**Note:** You might not meet the same questions as listed in the order above, I might missed some questions.

### Step Five. Setup The Movie Database (TMDB)

You need movies data to populate your page, so go to [The Movie Database (TMDB)](https://www.themoviedb.org/) and copy your api key to `.env.local`. If you did not have an account, create one and fill in the form to request an api key, so you can use the api key to fetch data to your page.

      MOVIE_DB_API_KEY=
      FETCH_KEY=CabtUaWSst3xez8FjgSbGyqmy

### Step Six. Setup `next-firebase-auth`

Now to setup `next-firebase-auth` config, add the following code to `.env.local`.

```
# This have to set to true when hosting in vercel or any other platform
NEXT_PUBLIC_COOKIE_SECURE=false

COOKIE_SECRET_PREVIOUS=pqwrifwesjkogvfincfjaenf
COOKIE_SECRET_CURRENT=qpweouterzmxncgfhshalksd

# For more info about COOKIE_SECRET, see
# https://github.com/gladly-team/next-firebase-auth/issues/178
```

### Complete `.env.local` file

Your `.env.local` file should look like this if you follow the previous step correctly, and it should have value filled in. Except if you have planned not to use Firebase auth emulators, you are safe to ignore **emulator related environment variable**. Lastly, add `NEXT_PUBLIC_CRYPTO_JS_NONCE=z3TWomYY` to the last line of your `.env.local` for **`crypto-js`** to encrypt the session data.

```
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=

FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

# Your private key should something like this
# The double quote should not be neglected as it will caused error to be shown
# FIREBASE_PRIVAVTE_KEY="-----BEGIN PRIVATE KEY-----\PPPPPPPP\n-----END PRIVATE KEY-----\n"

# set to true when using Firebase auth emulator
NEXT_PUBLIC_USE_FIREBASE_AUTH_EMULATOR=false
NEXT_PUBLIC_USE_FIREBASE_FIRESTORE_EMULATOR=false
NEXT_PUBLIC_USE_FIREBASE_STORAGE_EMULATOR=false

# https://github.com/gladly-team/next-firebase-auth/issues/184
# FIREBASE_AUTH_EMULATOR_HOST existance cause unexpected error to /api/login,
# so it should be comment out when you want to disable Firebase emulators

# FIREBASE_AUTH_EMULATOR_HOST=localhost:9099

MOVIE_DB_API_KEY=
FETCH_KEY=CabtUaWSst3xez8FjgSbGyqmy

# This have to set to true when hosting in vercel or any other platform
NEXT_PUBLIC_COOKIE_SECURE=false

COOKIE_SECRET_PREVIOUS=pqwrifwesjkogvfincfjaenf
COOKIE_SECRET_CURRENT=qpweouterzmxncgfhshalksd

# For more info about COOKIE_SECRET, see
# https://github.com/gladly-team/next-firebase-auth/issues/178

# For crypto-js aes nonce
NEXT_PUBLIC_CRYPTO_JS_NONCE=z3TWomYY
```

### Finally, run the app

Open up your terminal, and run the development server,

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the Firebase auth emulator, run

```bash
npm run emulators
```

Open [http://localhost:4060](http://localhost:4060) to view the emulator UI

# Netflix Clone Sitemap

This sitemap roughly shows how the app should work, and all the route of the app.
![netflix clone sitemap ](./assets/netflix-clone-sitemap.jpg)
**NOTE** that the link in the footer have no functions, because all link links to _help.netflix.com_, which isn't part of this project.

# Deployment ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

Deploy to [Vercel](https://vercel.com/dashboard) or [Netlify](https://www.netlify.com/). Remember to setup the environment variables for the app to function correctly.
