get head => answer, currWord, numbers
  Semper - always
post guess => 
  resObj = {
    // word you guessed
    answer: answer,
    // globs
    isCorrect: isCorrect,
    totalScore: language.total_score,
    // actually the 'next' word
    wordCorrectCount: currList.head.value.correct_count,
    wordIncorrectCount: currList.head.value.incorrect_count,
    nextWord: currList.head.value.original
  };