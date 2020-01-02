GET /head => 
  responseObject = {
    answer: currentWord.translation,
    nextWord: currentWord.original,
    wordCorrectCount: currentWord.correct_count,
    wordIncorrectCount: currentWord.incorrect_count,
    totalScore: language.total_score
  };
POST /guess => 
  resObj = {
    // word you guessed
    answer: currentWord.answer,
    isCorrect: isCorrect,
    // globs
    totalScore: language.total_score,
    // actually the 'next' word
    wordCorrectCount: nextWord.correct_count,
    wordIncorrectCount: nextWord.incorrect_count,
    nextWord: nextWord.original
  };