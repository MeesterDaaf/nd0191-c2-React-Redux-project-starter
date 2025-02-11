import { _saveQuestion } from '../utils/_DATA';

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
}); 