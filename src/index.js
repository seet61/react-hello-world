import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
*/
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i=0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext? 'X' : 'O';
    this.setState({
      squares:squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

class ClickButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: "off",
      label: "Нажми",
    };
    this.press = this.press.bind(this);
  }

  press(e) {
    console.log(e);

    let className = (this.state.class === "off")? "on" : "off";
    this.setState({class: className});
  }

  render() {
    return <button onClick={this.press} className={this.state.class}>{this.state.label}</button>
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date(), name: "Дима"};
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Привет, {this.state.name}</h1>
        <h2>Текущее время: {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

const propsValues = {
    title: "Список смартфонов",
    items: [
        "HTC U Ultra", 
        "iPhone 7", 
        "Google Pixel", 
        "Huawei P9", 
        "Meizu Pro 6", 
        "Asus Zenfone 3"
    ]
};

class Item extends React.Component {
  render() {
    return <li>{this.props.name}</li>
  }
}

class ItemsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: this.props.data.items};

    this.filterList = this.filterList.bind(this);
  }

  //фильтр
  filterList(e) {
    var filteredList = this.props.data.items.filter(function(item){
      return item.toLowerCase().search(e.target.value.toLowerCase())!== -1;
    })
    //обновление состояния
    this.setState({items: filteredList});
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <input placeholder="Поиск" onChange={this.filterList} />
        <ul>
          {
            this.state.items.map(function(item){
              return <Item key={item} name={item} />
            })
          }
        </ul>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Game />, document.getElementById('root')
)

ReactDOM.render(
  <ClickButton />, document.getElementById('app')
)

ReactDOM.render(
  <Clock />, document.getElementById('clock')
)

ReactDOM.render(
  <ItemsList data={propsValues} />, document.getElementById('phones')
)