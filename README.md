## How to run locally

Install dependencies and copy `.env` from example for both api and front

```bash
cd ./api
yarn --frozen-lockfile && cp .example.env .env
cd ../front
yarn --frozen-lockfile && cp .example.env .env
```

And then run them with `docker-compose`:
```bash
docker-compose up
```

It executes all services in watch mode.

Frontend: `http://localhost:3000/`

Backend GraphQL: `http://localhost:3000/graphql`


## Stack
- Backend framework - Nest.js. 
It provides very convenient DI mechanism and supports GraphQL.
- Database - Redis. The main purpose for this task is caching, 
no data manipulation is required, that's why Redis is the best choice for it.
- Frontend - React.js, according to requirements, and cos it's awesome :).
- Store provider - Redux+Thunk. Simply because it's the most popular libraries for it.
- Frontend GraphQL client - Apollo, according to requirements. 
But I'd choose `graphql-request`, because it's lightweight 
and has integration with `graphql-codegen`. 
You can check out my article about it https://medium.com/geekculture/how-to-integrate-your-app-with-graphql-server-without-writing-code-fb665a2537f2 :)
- UI framework - Material UI. Probably it's an overkill, but it speeds up the frontend development. 


## Notices

It seems like blocktap.io API has some issues.
It returns 500 error on introspection query,
that's why I've had to hardcode the query to it in the backend.
Please don't blame me for it :)  
Usually I autogenerate queries and types with graphql-codegen, like I did in the frontend.

## Thoughts

To reduce external API calls it makes sense to preload all quotes or all popular cryptocurrencies quotes with cron job in background every 5 minutes and save them to cache.
It can be implemented with `bull` lib.
