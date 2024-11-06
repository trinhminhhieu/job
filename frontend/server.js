const express = require("express"); // Sử dụng framework express
const next = require("next"); // Include module next

const port = parseInt(process.env.PORT, 10) || 3000; // Port để chạy app Nextjs, cũng là server nodejs
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const { createProxyMiddleware } = require("http-proxy-middleware");

// app.use(
//   "/api/v1",
//   createProxyMiddleware({
//     target: "http://127.0.0.1:4000",
//     changeOrigin: true,
//   })
// );

app.prepare().then(() => {
  const server = express();

  //Tạo ra các router. Dòng này có ý nghĩa khi gửi request đến path /a . Sẽ render file /a.js trong thư mục pages/a.js của Nextjs
  server.get("/a", (req, res) => {
    return app.render(req, res, "/a", req.query);
  });

  // Nếu các bạn muốn các routing tự động liến kết đến route files giống với cấu trúc của Nextjs thì chỉ cần thêm 3 dòng bên dưới
  // https://nextjs.org/docs/routing/introduction
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
