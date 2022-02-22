# Notes (About my findings)

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

**Note:**
There's some issues with serverless function deployed on _Vercel_ before **`commit f0379b51e5a09b26b982cdc0fdaf294e8f38df91`**, due to one missing `else statement` when user is in `browse` profile page (profile page did not send any `requestedData`). That one missing `else statement` will cause approximately **_`60% - 80%`_** of serverless execution time to be spent on nothing and timeout after 10s.

### 2. Another way to cache fetched data is using the HTTP headers in _getServerSideProps_,

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

### 3. **Redis**, not yet tested.
