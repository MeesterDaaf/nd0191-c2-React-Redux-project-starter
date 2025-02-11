import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

describe('_saveQuestion', () => {
    it('should return saved question with all expected fields when correctly formatted data is passed', async () => {
        // Arrange
        const questionData = {
            optionOneText: 'Learn React',
            optionTwoText: 'Learn Angular',
            author: 'sarahedo'
        };

        // Act
        const savedQuestion = await _saveQuestion(questionData);

        // Assert
        expect(savedQuestion).toBeDefined();
        expect(savedQuestion.id).toBeDefined();
        expect(savedQuestion.timestamp).toBeDefined();
        expect(savedQuestion.author).toBe('sarahedo');
        expect(savedQuestion.optionOne.text).toBe('Learn React');
        expect(savedQuestion.optionOne.votes).toEqual([]);
        expect(savedQuestion.optionTwo.text).toBe('Learn Angular');
        expect(savedQuestion.optionTwo.votes).toEqual([]);
    });

    describe('should return an error if incorrect data is passed', () => {
        it('when optionOneText is missing', async () => {
            const invalidData = {
                optionTwoText: 'Option Two',
                author: 'sarahedo'
            };

            await expect(_saveQuestion(invalidData))
                .rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
        });

        it('when optionTwoText is missing', async () => {
            const invalidData = {
                optionOneText: 'Option One',
                author: 'sarahedo'
            };

            await expect(_saveQuestion(invalidData))
                .rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
        });

        it('when author is missing', async () => {
            const invalidData = {
                optionOneText: 'Option One',
                optionTwoText: 'Option Two'
            };

            await expect(_saveQuestion(invalidData))
                .rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
        });

        it('when all properties are missing', async () => {
            const invalidData = {};

            await expect(_saveQuestion(invalidData))
                .rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
        });
    });
});

describe('_saveQuestionAnswer', () => {
    it('should save the answer and return true when correctly formatted data is passed', async () => {
        // Arrange
        const authedUser = 'sarahedo';
        const qid = '8xf0y6ziyjabvozdd253nd';
        const answer = 'optionOne';

        const answerData = {
            authedUser,
            qid,
            answer
        };

        // Act
        const result = await _saveQuestionAnswer(answerData);

        // Assert
        expect(result).toBe(true);
    });

    describe('should return an error if incorrect data is passed', () => {
        it('when authedUser is missing', async () => {
            const invalidData = {
                qid: '8xf0y6ziyjabvozdd253nd',
                answer: 'optionOne'
            };

            await expect(_saveQuestionAnswer(invalidData))
                .rejects.toEqual('Please provide authedUser, qid, and answer');
        });

        it('when qid is missing', async () => {
            const invalidData = {
                authedUser: 'sarahedo',
                answer: 'optionOne'
            };

            await expect(_saveQuestionAnswer(invalidData))
                .rejects.toEqual('Please provide authedUser, qid, and answer');
        });

        it('when answer is missing', async () => {
            const invalidData = {
                authedUser: 'sarahedo',
                qid: '8xf0y6ziyjabvozdd253nd'
            };

            await expect(_saveQuestionAnswer(invalidData))
                .rejects.toEqual('Please provide authedUser, qid, and answer');
        });

        it('when all properties are missing', async () => {
            const invalidData = {};

            await expect(_saveQuestionAnswer(invalidData))
                .rejects.toEqual('Please provide authedUser, qid, and answer');
        });
    });
}); 