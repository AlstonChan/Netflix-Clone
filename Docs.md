# Documentation (About my findings)

## **Data caching**

### 1. React Query

While **[React Query](https://react-query.tanstack.com/overview "React Query")** can cache data on client side, this web app need to do Server Side Rendering, which **React Query** does [provide](https://react-query.tanstack.com/guides/ssr "provide"), but then the api key will have to be exposed to the client side. Below is the code snippet when using **React Query** SSR _( Note: this code snippet is not completed )_ ,

```javascript
export async function getStaticProps(context) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["movies", context], () => {
    const url = `/movie?api_key=${process.env.MOVIE_DB_API_KEY}&with_genres=99&page=$1`;
    const res = await axios.get(url);
    const data = res.data;
    return { genre: genres[x].name, data };
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
  //This actually won't work, when context is passed to queryClient.prefetchQuery, a circular structure error is shown.
  //When using {query} = context on the top, somehow query will always be undefined when passed to the function.
}
```

Everything is fine here, until the same function needs to be implemented in client side, which means exposing the api key to the client side.

```javascript
export default function Browse() {
  //context can be solved using next js router (I guess)
  const { data } = useQuery(["movies", context], () => {
    const url = `/movie?api_key=${process.env.MOVIE_DB_API_KEY}&with_genres=99&page=1`;
    const res = await axios.get(url);
    const data = res.data;
    return { genre: genres[x].name, data };
  });
}

//This won't work, as process.env.MOVIE_DB_API_KEY only run on server side
//and using process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY means exposing api to client
```

**Solution:**
Create a api route at pages/api and request movieDB data there. Then, use getServerSideProps to fetch data from the api, viola, done. This solve the problem because **next. js** api routes have _same-origin only_ by default, no other website/app/user can connect to the api. This solution have some drawbacks though, it might decrease the performance of application, stated by **[next. js documentation](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props "next. js documentation")**

> It can be tempting to reach for an API Route when you want to fetch data from the server, then call that API route from getServerSideProps. This is an unnecessary and inefficient approach, as it will cause an extra request to be made due to both getServerSideProps and API Routes running on the server.
> Take the following example. An API route is used to fetch some data from a CMS. That API route is then called directly from getServerSideProps. This produces an additional call, reducing performance. Instead, directly import the logic used inside your API Route into getServerSideProps. This could mean calling a CMS, database, or other API directly from inside getServerSideProps.

```javascript
export async function getStaticProps(context) {
  const host = { ...context.req.headers }.host;
  const endpoint = getAbsoluteURL("/api/fetchmovie", host);
  const queryClient = new QueryClient();
  let requestedData = "";
  if (context.query.fetchmoviedata == "hom") {
    requestedData = "hom";
    await queryClient.prefetchQuery(["moviesDB", requestedData], () =>
      fetchMoviesDB(requestedData, endpoint)
    );
  } else if (context.query.fetchmoviedata == "tvs") {
    requestedData = "tvs";
    await queryClient.prefetchQuery(["moviesDB", requestedData], () =>
      fetchMoviesDB(requestedData, endpoint)
    );
  } else if (context.query.fetchmoviedata == "new") {
    requestedData = "new";
    await queryClient.prefetchQuery(["moviesDB", requestedData], () =>
      fetchMoviesDB(requestedData, endpoint)
    );
  } else if (context.query.fetchmoviedata == "myl") {
    requestedData = "myl";
    await queryClient.prefetchQuery(["moviesDB", requestedData], () =>
      fetchMoviesDB(requestedData, endpoint)
    );
  }
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
});
```

**Note:**
There's some issues with serverless function deployed on _Vercel_ before **`commit f0379b51e5a09b26b982cdc0fdaf294e8f38df91`**, due to one missing `else statement` when user is in `browse` profile page (profile page did not send any `requestedData`). That one missing `else statement` will cause approximately **_`60% - 80%`_** of serverless execution time to be spent on nothing and timeout after 10s.

[**_UPDATE_**] This can also be fixed simply by adding a `if (!requestedData) return;` inside fetchMovieDB function.

[**_UPDATE2_**] Since the `/browse` page has been split into 4 page, `getServerSideProps` no longer need conditional fetching. Switching page doesn't affect react query caching as pagination is enable with `keepPreviousData`.

### 2. Another way to cache fetched data is using the HTTP headers in _getServerSideProps_

```javascript
export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=420"
  );
  return {
    props: {
      //data here
    },
  };
}
```

this caching somehow does not work in development mode, so I deployed it to **Vercel**.Although **Vercel** automatically did the caching for me (I cannot find any cache control headers I have defined), the transition using navbar is still very very slow, taking over 500ms to 3 seconds!

### 3. **Redis**, not yet tested

## **Firebase Emulators**

To run both emulator, open a new terminal and run `firebase emulators:start` or `npm run emulators`. If you encountered error using these commands, please continue reading :)

### 1. Authentication emulator

In order to run firebase auth emulators, follow these 3 steps:

1. Uncomment _line 15_ in `initAuth.js`

   ```text
   firebaseAuthEmulatorHost: process.env.FIREBASE_AUTH_EMULATOR_HOST,
   ```

2. Uncomment the following code in `.env.local`

   ```text
   FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
   ```

   and set use firebase auth emulator from false to true

   ```text
   NEXT_PUBLIC_USE_FIREBASE_AUTH_EMULATOR=true
   ```

3. Open a new terminal and run `firebase emulators:start --only auth` or `npm run emulators:auth` to spin up the emulator.

**_IMPORTANT_** - Before pushing your code to _GitHub_, _GitLab_ or any remote repository, always remember to **_comment_** back the code you have uncommented in order to run firebase auth emulator and set **`firebase auth emulator from true to false`**. If you forgot to do so, the following error would occurred:

```javascript
code: 'auth/argument-error',
message: '`uid` argument must be a non-empty string uid.'
```

This error comes from a dependency named `next-firebase-auth`, as of this writing, I am using version `1.0.0-canary.7` and since this version is considered unstable, this kind of error is normal.

**_[GitHub Issues](https://github.com/gladly-team/next-firebase-auth/issues/184)_**

### 2. Firestore emulator

In order to run firebase auth emulators, follow these 3 steps:

1. Set use firebase firestore emulator from false to true

   ```text
   NEXT_PUBLIC_USE_FIREBASE_FIRESTORE_EMULATOR=true
   ```

2. Check your `node.js` version using `node -v`, if your `node.js` version is 17, your firestore emulator will get **Timeout** and stop. To fix this issue, you have to either downgrade your `node.js` version to 16 **_OR_** edit the `firebase.json` file as below:

   ```json
   {
     "firestore": {
       "rules": "firestore.rules",
       "indexes": "firestore.indexes.json"
     },
     "emulators": {
       "auth": {
         "port": 9099
       },
       "firestore": {
         "port": 8080,
         "host": "127.0.0.1"
       },
       "ui": {
         "enabled": true,
         "port": 4060
       },
       "storage": {
         "port": 9199
       }
     },
     "remoteconfig": {
       "template": "firebase.js"
     },
     "storage": {
       "rules": "storage.rules"
     }
   }
   ```

   Adding `"host": "127.0.0.1"` instead of `localhost` fixed the issues if you do not want to downgrade your `node.js` to version 16.

   **NOTE:** Having `"host": "127.0.0.1"` in auth emulators can cause error....

3. Open a new terminal and run `firebase emulators:start --only firestore` or `npm run emulators:db` to spin up the emulator.

**_[GitHub Issues](https://github.com/firebase/firebase-tools/issues/2379)_**
