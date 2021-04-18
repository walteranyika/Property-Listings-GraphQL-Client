import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient ,InMemoryCache }from '@apollo/client';
import {ApolloProvider} from '@apollo/react-hooks'
import reportWebVitals from './reportWebVitals';
import {Listings} from "./sections/Listings";
import './styles/index.css';

const client =new ApolloClient({
    uri:"http://localhost:9000/api",
    cache:new InMemoryCache()
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <Listings title="Tinyhouse App"/>
    </ApolloProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
