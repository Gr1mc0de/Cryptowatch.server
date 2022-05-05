module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/cryptowatch.sqlite3'
    },
    useNullAsDefault: true
  }

};
