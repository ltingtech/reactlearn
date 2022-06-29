import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

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
  
  class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares : Array(9).fill(null),
        };
    }

    handleSquareClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = "X";
        this.setState({squares : squares});
    }

    renderSquare(i) {
      return (
        <Square 
            value={this.state.squares[i]}
            /**属性值随便命名 */
            onSquareClick = {() => this.handleSquareClick(i)}
        />
      );
    }

    render() {
      const status = 'Next player: X';
  
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
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  