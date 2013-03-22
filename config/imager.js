module.exports = {
  variants: {
    product: {
      resize: {
        detail: "x440"
      },
      crop: {
        thumb: "160000@"
      },
      resizeAndCrop: {
        mini: {resize: "63504@", crop: "252x210"}
      }
    },
    
    article: {
    
    }

    gallery: {
      crop: {
        thumb: "100x100"
      }
    }
  },

  storage: {
    S3: {
      key: 'API_KEY',
      secret: 'SECRET',
      bucket: 'BUCKET_NAME',
      region: 'REGION'
    }
  },

  debug: true
}
