// GET /head => 
//   responseObject = {
//     answer: currentWord.translation,
//     nextWord: currentWord.original,
//     wordCorrectCount: currentWord.correct_count,
//     wordIncorrectCount: currentWord.incorrect_count,
//     totalScore: language.total_score
//   };
// POST /guess => 
//   resObj = {
//     // word you guessed
//     answer: currentWord.answer,
//     isCorrect: isCorrect,
//     // globs
//     totalScore: language.total_score,
//     // actually the 'next' word
//     wordCorrectCount: nextWord.correct_count,
//     wordIncorrectCount: nextWord.incorrect_count,
//     nextWord: nextWord.original
//   };

//   UPDATE COMPANY SET SALARY = 15000 WHERE ID = 3;

render() {
  const button = () => {
    return (
      <button 
        onClick={(e) => this.props.nextWord(e)}
      >Try another word!</button>
    )
    //      return <Button>Try another word!</Button>
  }
  const display = () => {
    if (!this.props) {
      return (
        <div>
          <h1>loading...</h1>// 
        </div>
      );
    } else if (this.props.isCorrect === false) {
      return (
        <>
          <div className="DisplayScore">
            <p>Your total score is: {this.props.score}</p>
            <h2>Good try, but not quite right :(</h2>
          </div>
          <div className="DisplayFeedback">
            <p>
              The correct translation for {this.props.currentWord} was{' '}
              {this.props.answer} and you chose {this.props.guess}!
            </p>
            {button()}
          </div>
        </>
      );
    } else if (this.props.isCorrect === true) {
      return (
        <>
          <div className="DisplayScore">
            <p>Your total score is: {this.props.score}</p>
            <h2>You were correct! :D</h2>
          </div>
          <div className="DisplayFeedback">
            <p>
              The correct translation for {this.props.currentWord} was{' '}
              {this.props.answer} and you chose {this.props.guess}!
            </p>
            {button()}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="DisplayScore">
            <p>Your total score is: {this.props.score}</p>
          </div>
          <h2>Translate the word:</h2>
          <span>{this.props.word}</span>
          <GuessInput handleSubmit={this.props.handleSubmit} />
        </>
      );
    }
  };
  return (
    <main>
      {display()}
      <p>You have answered this word correctly {this.props.correct} times.</p>
      <p>You have answered this word incorrectly {this.props.wrong} times.</p>
    </main>
  );
}