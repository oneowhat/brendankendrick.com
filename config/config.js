module.exports = {
  development: {
    root: require("path").normalize(__dirname + "/.."),
    app: {
      name: "brendankendrick.com dev" 
    },
    db: "mongodb://localhost/bk_dev",
    s3: {
      key: 'AKIAJFIE7JRCOR4DMLPQ',
      secret: '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',
      bucket: 'brendankendricldotcom',
      region: 'us-west-1'
    }
  },
  test: {
    app: {
      name: "brendankendrick.com test" 
    },
    db: "mongodb://localhost/bk_test"
  },
  production: {
    app: {
      name: "brendankendrick.com" 
    },
    db: ""
  }
}
