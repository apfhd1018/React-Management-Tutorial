const express = require("express"); // express 불러오기
const bodyParser = require("body-parser"); // 서버모듈 기능 선언
const app = express();
const port = process.env.PORT || 5000; //5000번 포트로 열어줌

//restAPI에서는 데이터 주고받을떄 json데이터형식을 통해 주고받음
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//클라이언트가 아래 경로 접속하면 클라이언트에게 데이터 반환
app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "https://placeimg.com/64/64/1",
      name: "나동빈",
      birthday: "961222",
      gender: "남자",
      job: "대학생",
    },
    {
      id: 2,
      image: "https://placeimg.com/64/64/2",
      name: "홍길동",
      birthday: "921028",
      gender: "남자",
      job: "프로그래머",
    },
    {
      id: 3,
      image: "https://placeimg.com/64/64/3",
      name: "유석종",
      birthday: "951212",
      gender: "남자",
      job: "개발자",
    },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
