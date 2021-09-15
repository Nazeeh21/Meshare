<h1 align="center">Contribution guidelines</h1>

To contibute to this project, [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) this repo and clone it on your local machine.

Navigate to the [server](./server) and [web](./web) folder and run `yarn` in your terminal in each folder.

To start the server, you need to configure environments by adding `.env` file in `server` folder and `.env.local` in `web` folder. You can refer to `.env.example` in each folder.

To start the backend server locally, navigate to `/server` and run `yarn watch` followed by `yarn dev`. You should now able to access *raphql playground* locally on [http://localhost:4000/graphql](http://localhost:4000/graphql)

To start the frontend server locally, navigate to `/web` and run `yarn dev`.

After proposing a feature or fixing a bug, create a Pull Request targetting to the [main](https://github.com/Nazeeh21/Meshare/tree/main) branch of this repo.
