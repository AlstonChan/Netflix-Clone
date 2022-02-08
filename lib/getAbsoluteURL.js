const getAbsoluteURL = (url, req = null) => {
  let host;
  if (req) {
    host = req;
  } else {
    if (typeof window === "undefined") {
      throw new Error(
        'The "req" parameter must be provided if on the server side.'
      );
    }
    host = window.location.host;
  }
  const isLocalhost = host.indexOf("localhost") === 0;
  const protocol = isLocalhost ? "http" : "https";
  return `${protocol}://${host}${url}`;
};

export default getAbsoluteURL;
