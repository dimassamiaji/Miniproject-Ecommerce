module.exports = {
  apps: [
    {
      name: "miniproject-ecommerce",
      script: "./src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8001,
      },
      time: true,
    },
  ],
};
