<div align="center" style='display: flex'>
   <img style='margin: 0 auto ; max-width:700px' src='./public/images/logo.png' />
</div>
<div align="center" style='display:flex; justify-content:center'>
  <img style='margin: 0 3px' src='https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E' />
  <img style='margin: 0 3px' src='https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB' />
  <img style='margin: 0 3px' src='https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white' />
  <img style='margin: 0 3px' src='https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase' />
  <img style='margin: 0 3px' src='https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white' />
  <img src="https://img.shields.io/badge/dotenv-000000?style=for-the-badge&logo=dotenv" />
</div>
<h2 align="center" style="display: flex; justify-content:center;">A Netflix-Clone site built with Next.js and Firebase</h2>

## Getting Started

### Step One. Clone or download the code

```bash
git clone https://github.com/AlstonChan/Netflix-Clone.git
```

Then type `cd Netflix-Clone`.

### Step Two. Install all required dependencies using `npm install`

```bash
npm install
```

You may also install `firebase-tools` so you can use Firebase auth emulators later,

```bash
npm install -g firebase-tools
```

### Step Three. Create a Firebase project, register a web app and initialize firebase

1. Firstly, go to [firebase](https://firebase.google.com/), you should see this page. Click the top right **Sign in** button if you haven't sign in yet and click _Get started_ button.
   ![firebase homepage](./assets/firebase-home.jpg)

2. Next, click _Add project_ and enter a project name you desired, then proceed to create your Firebase project.

3. Below is your **firebase console**, create a web app and register a name.
   ![firebase homepage](./assets/firebase-console.jpg)

4. Create a **`.env.local`** file in the root directory (which is where your package.json file lies), and paste the following code into the file. Fill in your Firebase web app details accordingly, using `.env.local` file to save these Firebase details enable you not to copy and paste the details whenever you need to access it.

   ```env
   # Firebase Client
   NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=
   ```

5. Go to your **[Firebase console](https://console.firebase.google.com/u/0/)**, select the project and navigate to `Authentication` section. Click get started and enable **`Email/Password`** & **`Google`** auth, this app will use these two providers to authenticate user.

6. This step is **optional** but is recommended, which is setting up a Firebase emulator. The emulators is built to accurately mimic the behaviors of Firebase services, so you can use Firebase auth locally and do not need to connect to Firebase cloud. To start the emulators, first copy the following code into `.env.local`.

   ```env
   # set to true when using Firebase auth emulator
   NEXT_PUBLIC_USE_FIREBASE_AUTH_EMULATOR=false
   NEXT_PUBLIC_USE_FIREBASE_FIRESTORE_EMULATOR=false
   NEXT_PUBLIC_USE_FIREBASE_STORAGE_EMULATOR=false

   ```

## Step Four. Setup Firebase CLI

1. Go to your text editior, in my case, I am using [Visual Studio Code](https://code.visualstudio.com/). Login to the Firebase CLI using the following command, You will be redirected to your browser to login.

   ```bash
   firebase login
   ```

2. After you have successfully login to the Firebase CLI, enter this command to initialize your firebase project to this application.

   ```bash
   firebase init
   ```

3. You will be greeted with a big **FIREBASE** word and you will be asked the following question:

   1. **Are you ready to proceed?**
      _Response_: type `y`

   2. **Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices.**
      _Response_: select `Firestore`, `Storage` and `Emulators` by pressing space. Use arrow key to navigate your option up and down. After you have selected these three options, press `Enter`.

   3. **Select a default Firebase project for this directory: (Use arrow keys)**
      _Response_: Use a existing project and select the Firebase project that you just initialize. Press `Enter` to proceed.

   4. **What file should be used for Firestore Rules?**
      _Response_: press `Enter`; Use the default `firestore.rules`

   5. **File firestore.rules already exists. Do you want to overwrite it with the Firestore Rules from the Firebase Console?**
      _Response_: type `n`

   6. **What file should be used for Firestore indexes?**
      _Response_: press `Enter`; Use the default `firestore.indexes.json`

   7. **File firestore.indexes.json already exists. Do you want to overwrite it with the Firestore Indexes from the Firebase Console?**
      _Response_: type `n`

   8. **What file should be used for Storage Rules?**
      _Response_: press `Enter`; Use the default `storage.rules`

   9. **File _storage.rules_ already exists. Overwrite?**
      _Response_: type `n`

   10. **Which Firebase emulators do you want to set up? Press Space to select emulators, then Enter to confirm your choices.**
       _Response_: select `Firestore Emulator`, `Storage Emulator` and `Authentication Emulator` by pressing space. Use arrow key to navigate your option up and down. After you have selected these three options, press `Enter`.

   11. **Which port do you want to use for the auth emulator?**
       _Response_: press `Enter`; Use the default port `9099`

   12. **Which port do you want to use for the firestore emulator?**
       _Response_: press `Enter`; Use the default port `8080`

   13. **Which port do you want to use for the storage emulator?**
       _Response_: press `Enter`; Use the default port `9199`

   14. **Would you like to enable the Emulator UI?**
       _Response_: type `y`

   15. **Which port do you want to use for the Emulator UI (leave empty to use any available port)?**
       _Response_: press `Enter` or type `4060`

   16. **Would you like to download the emulators now?**
       _Response_: type `y`

**Note:** You might not meet the same questions as listed in the order above, I might missed some questions.

### Last Step. Setup The Movie Database (TMDB)

You need movies data to populate your page, so go to [The Movie Database (TMDB)](https://www.themoviedb.org/) and copy your api key to `.env.local`. If you did not have an account, create one and fill in the form to request an api key, so you can use the api key to fetch data to your page.

   ```env
      MOVIE_DB_API_KEY=
      FETCH_KEY=CabtUaWSst3xez8FjgSbGyqmy
   ```

### Complete `.env.local` file

Your `.env.local` file should look like this if you follow the previous step correctly, and it should have value filled in. Except if you have planned not to use Firebase auth emulators, you are safe to ignore **emulator related environment variable**. Lastly, add `NEXT_PUBLIC_CRYPTO_JS_NONCE=z3TWomYY` to the last line of your `.env.local` for **`crypto-js`** to encrypt the session data.

```env
# Firebase Client
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=

# set to true when using Firebase auth emulator
NEXT_PUBLIC_USE_FIREBASE_AUTH_EMULATOR=false
NEXT_PUBLIC_USE_FIREBASE_FIRESTORE_EMULATOR=false
NEXT_PUBLIC_USE_FIREBASE_STORAGE_EMULATOR=false

MOVIE_DB_API_KEY=
FETCH_KEY=CabtUaWSst3xez8FjgSbGyqmy

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

## Netflix Clone Sitemap

This sitemap roughly shows how the app should work, and all the route of the app.
![netflix clone sitemap ](./assets/netflix-clone-sitemap.jpg)
**NOTE** that the link in the footer have no functions, because all link links to _help.netflix.com_, which isn't part of this project.

## Additional Configuration File

### .env.vault

I have use a [Dotenv Vault](https://www.dotenv.org/) services to store the my `.env` file as `.env` file **_SHOULD NOT_** be commit and push to a repository, I figured that the dotenv vault is a great place to store such file. You could and should delete this file if you plan on using your own vault to store the `.env` file or you simply wanted a remove a needless file.

## Deployment ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

Deploy to [Vercel](https://vercel.com/dashboard) or [Netlify](https://www.netlify.com/). Remember to setup the environment variables for the app to function correctly.
