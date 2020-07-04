import React, { Component } from "react";
import Customer from "./components/Customer";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class App extends Component {
  //고객데이터는 변동되므로 state로 customer 변수 명시
  state = {
    customers: "",
    completed: 0, // progress 바는 0~100%까지 게이지있으므로 0 넣어줌
  };
  //일반적으로 API를 불러와서 웹사이트에 특정한 view를 불러오고자 한다면 componentDidMount에서 컴포넌트를 비동기적으로 호출하면 된다! 이후에 API에서 응답이 돌아왔을때 상태가 변화되고 리액트에서 변화감지후 알아서 갱신됨
  componentDidMount() {
    //0.02초마다 progress 함수가 실행되게 설정
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => this.setState({ customers: res }))
      //담긴데이터(body)가 callApi불러와져서 then 함수로 하여금 res 이름으로 변수 이름이 바뀜. 그리고 customers 변수 값에 넣어줌
      .catch((err) => console.log(err));
    //오류발생시 콘솔창에 알림
  }
  callApi = async () => {
    //접속하고자 하는 api 주소를 넣고
    const response = await fetch("/api/customers");
    //고객 목록이 json형태로 출력되는데 그걸 body에 넣어줌
    const body = await response.json();
    return body;
  };

  //로딩바 애니메이션
  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? (
              this.state.customers.map((c) => {
                return (
                  <Customer
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={this.state.completed}
                  ></CircularProgress>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
