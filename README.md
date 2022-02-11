<div align="center" style='display: flex'> 
   <img style='margin: 0 auto ; max-width:700px' src='./public/images/NetflixLogo.png' /> 
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

### Step Two. Install all required dependencies using `npm install`

You may also install `firebase-tools` so you may use Firebase auth emulators later

```
npm install -g firebase-tools
```

### Step Three. Create a Firebase project, register a web app and initialize firebase

1.  Firstly, go to [firebase](https://firebase.google.com/), you should see this page. Click the top right **Sign in** button if you haven't sign in yet and click _Get started_ button.
    ![firebase homepage](./assets/firebase-home.jpg)

2.  Next, click _Add project_ and enter a project name you desired, then proceed to create your Firebase project.

3.  Below is your **firebase console**, create a web app and register a name.
    ![firebase homepage](./assets/firebase-console.jpg)

4.  Create a **`.env.local`** file in the root directory (which is where your package.json file lies), and paste the following code into the file. Fill in your Firebase web app details accordingly, using `.env.local` file to save these Firebase details enable you not to copy and paste the details whenever you need to access it.

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

    Copy the `"private_key"` value and `"client_email"` value. Paste it to `.env.local` file.

    ```
    FIREBASE_PRIVATE_KEY=
    FIREBASE_CLIENT_EMAIL=

    # Your private key should something like this
    # The single and double quote should not be neglected as it will caused error to be shown
    # FIREBASE_PRIVAVTE_KEY='"-----BEGIN PRIVATE KEY-----\nMIIEvasdads{more value bla bla}daaOThJrQ=\n-----END PRIVATE KEY-----\n"'

    ```

5.  This step is optional but is recommended, which is setup a Firebase auth emulator. The emulators is built to accurately mimic the behavios of Firebase services, so you can use Firebase auth locally and do not need to connect to Firebase cloud. To start the emulators, first copy the following code into `.env.local`.

    ```
    # set to true when using Firebase auth emulator
    NEXT_PUBLIC_USE_FIREBASE_AUTH_EMULATOR=false

    # https://github.com/gladly-team/next-firebase-auth/issues/184
    # FIREBASE_AUTH_EMULATOR_HOST existance cause unexpected error to /api/login,
    # so it should be comment out when you want to disable Firebase emulators

    # FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
    ```

    The `FIREBASE_AUTH_EMULATOR_HOST=localhost:9099` is being commented out, because it's existance can cause unexpected error when you decided to switch to Firebase cloud auth. You may temporary uncomment it when you want to use Firebase auth emulators, just remember to comment it back so it won't crashed the app. Besides that, head to `/lib/initAuth.js` and uncomment `firebaseAuthEmulatorHost: process.env.FIREBASE_AUTH_EMULATOR_HOST`, this also need to be commented back when using Firebase cloud auth.

    The error below will be `console log` in your text editor if you forgot to comment it while using Firebase cloud auth, a 500 response error will also be logged in your browser.

    In case you wonder, these error happens because of one dependency named `next-firebase-hook`.

    ```
    code: 'auth/argument-error',
    message: '`uid` argument must be a non-empty string uid.'
    ```

### Step Four. Setup The Movie Database (TMDB)

You need movies data to populate your page, so go to [The Movie Database (TMDB)](https://www.themoviedb.org/) and copy your api key to `.env.local`. If you did not have an account, create one and fill in the form to request an api key, so you can use the api key to fetch data to your page.

      ```
      MOVIE_DB_API_KEY=
      FETCH_KEY=CabtUaWSst3xez8FjgSbGyqmy
      ```

### Step Five. Setup `next-firebase-auth`

7.  Now to setup `next-firebase-auth` config, add the following code to `.env.local`.

    ```
    # This have to set to true when hosting in vercel or any other platform
    NEXT_PUBLIC_COOKIE_SECURE=false

    COOKIE_SECRET_PREVIOUS=pqwrifwesjkogvfincfjaenf
    COOKIE_SECRET_CURRENT=qpweouterzmxncgfhshalksd

    # For more info about COOKIE_SECRET, see
    # https://github.com/gladly-team/next-firebase-auth/issues/178
    ```

### Complete `.env.local` file

8.  Your `.env.local` file should look like this if you follow the previous step correctly, and it should have value filled in.

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
    # The single and double quote should not be neglected as it will caused error to be shown
    # FIREBASE_PRIVAVTE_KEY='"-----BEGIN PRIVATE KEY-----\nMIIEvasdads{more value bla bla}daaOThJrQ=\n-----END PRIVATE KEY-----\n"'

    # set to true when using Firebase auth emulator
    NEXT_PUBLIC_USE_FIREBASE_AUTH_EMULATOR=false

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
    ```

### Finally, run the app

Open up your terminal, and run the development server,

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the Firebase auth emulator, run

```bash
firebase emulators:start --only auth
```

Open [http://localhost:4060/auth](http://localhost:4060/auth) to view the emulator UI

## Netflix Clone Sitemap

![netflix clone sitemap ](./assets/netflix-clone-sitemap.png)
**NOTE** that the link in the footer have no functions, because all link links to _help.netflix.com_, which isn't part of this project.
