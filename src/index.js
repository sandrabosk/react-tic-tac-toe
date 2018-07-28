import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

// creating Board class 

class Board extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            // array of 9 nulls
            squares: Array(9).fill(null),
            xIsNext:true,
        }
    }

    putAnXorO(i){
        // console.log(i)
        // we are duplicating the array so we can keep track of history
        const squares = this.state.squares.slice();
        // we duplicat ethe Array, set the state of the square we clicked on to x
        squares[i] = this.state.xIsNext? 'X': 'O';

        // render the state to a new duplicated array where one of the null is set to "X"
        this.setState({
            squares:squares,
            xIsNext: !this.state.xIsNext
        });
    }


    // define function renderSquare with one arg 
        renderSquare(i) {
            // return <Square blah={i}/>;

          return <Square blah={ this.state.squares[i] } 
        //   i is index
            onClick = { () => this.putAnXorO(i) }
          />;
        }
      
        render() {

            const winner = calculateWinner(this.state.squares);
            let status;
            if (winner){
                status = `Winner: ${winner}`
            } else {
                status = `Next player: ${(this.state.xIsNext)? 'X' : 'O'}`;            
            }


          
           // returns value of passed arg
          return (
            <div>
              <div className="status">{status}</div>
              <div className="board-row">
              {/* these numbers are 'i' */}
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
      


//define class Square 
class Square extends React.Component {
  
    constructor(props){
        // takes properties from 'parent'
        super(props);
        // this.state = {
        //     theXorO: null,
        // }

    }


    // theClickFunction = () => {
        // looks at the state and replace this object from up where blah = null
        // with whatever we pass here 
    // this.setState({ theXorO:'X' }); 
        // alert('clicked bro!');
        // alert(this.props.blah)
        // console.log('hi');
    // }

    render() {
        // this is like component.html (this is kinda like view)
        return (
            // square has button 
            <button className="square"
            onClick = {() => this.props.onClick()}
                // onClick={ () => { this.theClickFunction()}}
                // onClick={ () => { alert('clicked')}}
            >

            { this.props.blah }

            {/* when you're in the 'view' everything is interpolated in curly braces */}
            {/* {this.state.theXorO} */}
            {/* a b */}
             {/* TODO */}

            </button>
      );
    }
  }

  //props and state are used to pass data from one component to the other
  // props can keep track of the state

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
  
  




ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


  // every class has to have render function


  function calculateWinner(squares){
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