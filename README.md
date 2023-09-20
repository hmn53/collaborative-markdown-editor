# collaborative-markdown-editor
A collaborative markdown editor using Operational Transform

Supports multiple real-time documents, with live cursors. Based on
[CodeMirror 6](https://codemirror.net/) and
[operational transformation](https://codemirror.net/examples/collab/), so all changes are resolved by server code.

## Local setup

Install the client and server packages.

```bash
yarn install
```
Spin up Postgres and Redis required by the server

```bash
docker-compose up
```
Start client and server

```bash
yarn dev
```

Visit `http://localhost:6480` in your browser.
