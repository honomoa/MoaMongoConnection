module.exports = {
  server: 'localhost',
  port: 27017,
  database: 'db',
  username: 'username',
  password: 'password',
  opts: { server: { auto_reconnect: true }, auth: {authdb: 'admin'}},
  collectionPath: 'example/collections'
};

