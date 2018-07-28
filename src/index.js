import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

// creating Board class 

class Board extends React.Component {

    // we are taking out this part because state is now in Game 
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         // array of 9 nulls
    //         squares: Array(9).fill(null),
    //         // xIsNext:true,
    //     }
    // }

    // putAnXorO(i){
    //     // console.log(i)
    //     // we are duplicating the array so we can keep track of history
    //     const squares = this.state.squares.slice();
    //     // squares[i] this is so we can't click 2 times and replace x for o and vice vewrsa,
    //     //  and also we cant keep playing after we have winner
    //     if(calculateWinner[squares] || squares[i]){

    //     }
    //     // we duplicat ethe Array, set the state of the square we clicked on to x
    //     squares[i] = this.state.xIsNext? 'X': 'O';

    //     // render the state to a new duplicated array where one of the null is set to "X"
    //     this.setState({
    //         squares:squares,
    //         xIsNext: !this.state.xIsNext
    //     });
    // }


    // define function renderSquare with one arg 
        renderSquare(i) {
            // return <Square blah={i}/>;

          return <Square blah={ this.props.squares[i] } 
        //   i is index
        //  onClick = { () => this.putAnXorO(i) }

            onClick = { () => this.props.onClick(i) }
          />;
        }
      
        render() {

            // const winner = calculateWinner(this.state.squares);
            // let status;
            // if (winner){
            //     status = `Winner: ${winner}`
            // } else {
            //     status = `Next player: ${(this.state.xIsNext)? 'X' : 'O'}`;            
            // }


          
           // returns value of passed arg
          return (
            <div>
              {/* <div className="status">{status}</div> */}
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

    constructor(props){
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            xIsNext: true,
            stepNumber: 0,
        }
    }
    // this is moved from Board to here
    putAnXorO(i){
        console.log('hello')
        if(this.state.stepNumber !== this.state.history.length -1){
            return;
        }
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length -1];
        const squares = current.squares.slice();
       
        // const squares = this.state.history[this.state.history.length - 1].squares.slice();
        // squares[i] this is so we can't click 2 times and replace x for o and vice vewrsa,
        // and also we cant keep playing after we have winner
        if(calculateWinner[squares] || squares[i]){
            return;
        }
        // we duplicat ethe Array, set the state of the square we clicked on to x
        squares[i] = this.state.xIsNext? 'X': 'O';

        // render the state to a new duplicated array where one of the null is set to "X"
        this.setState({
            history: this.state.history.concat([{ squares:squares }]), // try this with spread operator
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    resetTheGame(){
        this.setState({
            history: [{ squares: Array(9).fill(null) }],
            xIsNext: true,
            stepNumber: 0,
        })
    }

    showTheResetButton(){
        const winner = calculateWinner(this.state.history[this.state.history.length - 1].squares);
        if(winner || this.state.history.length === 10 ){
            return (
                <button onClick={ () => this.resetTheGame() }>
                    Reset Game
                </button>
            )
        }
    }



    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext: ( step % 2 ) === 0,
        })
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move # ${move}` : `Go to game start`;
            return (
                <li key={move}>

                    <button onClick={ () => this.jumpTo(move) }>
                    { desc }
                    </button>
                </li>
            )
        })


        let status;
        if (winner){
            status = `Winner: ${winner}`
        } else {
            status = `Next player: ${(this.state.xIsNext)? 'X' : 'O'}`;            
        }

      return (
        <div className="game">
          <div className="game-board">
          { this.showTheResetButton() }
            <Board 
                squares = { current.squares }
                onClick = { (i) => this.putAnXorO(i) } 
            />
          </div>
          <div className="game-info">
            <div> { status }</div>
            <ol> { moves }</ol>
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