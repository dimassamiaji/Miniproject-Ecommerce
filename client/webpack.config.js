module.exports = {
 
  module: {
    rules: [
      
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "media/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
};
