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

    renderSquare(i) {
        return (
        <Square2 
            value={this.props.squares[i]}
            /**属性值随便命名 */
            onSquareClick = {() => this.props.onSquareClick(i)}
        />
        );
    }

    render() {
        return (
            <div>
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
    constructor(props) {
        super(props)
        this.state = {
            history : [
                {
                    squares : Array(9).fill(null)
                }
            ],
            xIsNext : true,
            currStep : 0
        }
    }

    handleSquareClick(i) {
        const history = this.state.history.slice(0, this.state.currStep + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        /*
        如果已经有人胜出了，或者当前位置已经有落子了，则点击无任何反应
        */
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history : history.concat([{
                squares : squares
            }]),
            xIsNext : !this.state.xIsNext,
            currStep : history.length
        });
    }

    jumpTo(stepIdx) {
        this.setState  ({
            currStep : stepIdx,
            xIsNext : (stepIdx%2) == 0
        });
    }

    /*
    游戏复位重置
    */
    gameReset() {
        this.setState({
            currStep : 0,
            xIsNext : true,
            history : [
                {
                    squares : Array(9).fill(null)
                }
            ]
        })
    }


    render() {
        const history = this.state.history
        const current = history[this.state.currStep]
        const squares = current.squares.slice();
        const winner = calculateWinner(squares)
        const moveToHistory = this.state.history.map((stepSquare, idx) => {
            const moveDesc = idx ? "Move to Step #" + idx : "Game Start";
            return (
                <li key={idx}>
                    <button onClick={() => this.jumpTo(idx)}>{moveDesc}</button>
                </li>
            );
        })
        let status
        if (winner) {
            status = "winner: " + winner
        } else {
            const player = this.state.xIsNext ? "X" : "O";
            status = "next Player:" + player
        }
        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares = {current.squares}
                onSquareClick = {(i) => this.handleSquareClick(i)}
            />
            </div>
            <div className="game-info">
                <div onClick={() => this.gameReset()}>reset</div>
                <div>{status}</div>
                <ol>{moveToHistory}</ol>
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
  