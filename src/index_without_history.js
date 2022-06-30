import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

/**
 *通过继承react.Component类实现的组件为class组件，也可以实现函数组件，如下面所示
 */
class Square extends React.Component {
    /**
     * 构造函数
     */
    /*
    constructor(props) {
        super(props);
        this.state = {
            value : null,
        };
    }
    

    render() {
      return (
        <button 
            className="square" 
            onClick={() => {this.setState({value: "X"}); }} 
        >
            {this.state.value}
        
        </button>
      );
    }
    */
    render () {
        return (
            /* button是内在组件，它的onClick属性是固定的，所以名字不能随便命名，但是Square组件是自定义组件，属性名字可以随便起，如此处叫onSquareClick
            注意：此处容易写成onClick={() => this.props.onSquareClick}> 如果属性值是一个函数，则必须要带上（）
            */
            <button className='square' onClick={() => this.props.onSquareClick()}>
                {this.props.value}
            </button>
        )
    }

  }

/*
函数组件的写法，注意与class组件的写法的区别
*/
function Square2(props) {

    return (
        <button className='square' onClick={props.onSquareClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares : Array(9).fill(null),
            xIsNext : true
        };
    }

    handleSquareClick(i) {
        const squares = this.state.squares.slice();
        /*
        如果已经有人胜出了，或者当前位置已经有落子了，则点击无任何反应
        */
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            squares : squares,
            xIsNext : !this.state.xIsNext
        });

    }

    renderSquare(i) {
        return (
        <Square2 
            value={this.state.squares[i]}
            /**属性值随便命名 */
            onSquareClick = {() => this.handleSquareClick(i)}
        />
        );
    }

    render() {
        /*
        为什么xIsNext变动后，status变量仍然会随时变动，是不是因为这些逻辑是写在render()里面，表示的是一个组件整体，render里面描述的都是组件的运转逻辑，在实际的执行过程
        中都是各方协同生效的
        */
        const player = this.state.xIsNext ? "X" : "O";
        /*
        render返回的组件，直接根据他的状态(state字段)确定好了页面上的展示，如果状态发生了改变，则组件的效果自动地就发生了调整
        */
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = "winner:" + winner;
        } else {
            status = 'Next player: ' + player;
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
        }
    }
    return null;
}

  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  