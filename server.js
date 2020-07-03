const express = require("express"); // express 불러오기
const bodyParser = require("body-parser"); // 서버모듈 기능 선언
const app = express();
const port = process.env.PORT || 5000; //5000번 포트로 열어줌

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello Express!" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
