const { createProxyMiddleware } = require("http-proxy-middleware");

// O navegador acessa /api; o servidor do React encaminha para a API no computador.
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://127.0.0.1:50100",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    }),
  );
};
