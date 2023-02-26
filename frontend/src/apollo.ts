import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_STORAGE_TOKEN } from "./constants";

const getIp = async () => {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  return data.ip;
};
const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const isSidebarOpenVar = makeVar(Boolean(window.innerWidth >= 960));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_HOST,
});

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${authTokenVar()}` : "",
      "x-real-ip": await getIp(),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
