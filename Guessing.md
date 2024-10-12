# Random Guessing Game Flowchart

This flowchart illustrates the sequence of events for the Random Guessing Game. 

```mermaid
flowchart TD
    Start([Start]) --> GenerateNumber[Generate random number between 1 to 100]
    GenerateNumber --> UserGuess[Input User Guess]
    UserGuess --> CheckGuess{Is guess valid?}
    CheckGuess -->|No| InvalidInput[Error: Invalid input]
    InvalidInput --> UserGuess
    CheckGuess -->|Yes| CompareGuess{Is guess correct?}
    CompareGuess -->|Correct| CorrectGuess[You guessed it!]
    CompareGuess -->|Wrong| Wrong[Your guess is wrong! Try again.]
    Wrong --> UserGuess
    CorrectGuess --> End([End])
