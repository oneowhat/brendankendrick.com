module.exports = {
  development: {
    root: require("path").normalize(__dirname + "/.."),
    app: {
      name: "brendankendrick.com dev" 
    },
    db: "mongodb://localhost/bk_dev",
    s3: {
      key: '',
      secret: '',
      bucket: '',
      region: ''
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
