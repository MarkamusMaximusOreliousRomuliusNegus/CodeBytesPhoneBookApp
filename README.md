# CodeBytesPhoneBookApp

How to set up the project
1. make sure you have node js installed
2. compile application and run

Disclaimer, I ran out of time. 
The code you are about to review is very rushed. i simply ran out of time and it shows.
* the frontend code is not generic. Ideally i would make the phoneList component take any model allowing any input form / render template. in its current state it could only ever render a list for phone items
* i would reduce the amount of code in the phoneList. There is a lot of code for handling the datasource which could be potentially moved to its own class
* I would add front end and back end unit test to prove the code behaves the way it should
* I would use a real database rather than an in memory placeholder located in the InMemoryPhoneDataRepository class
