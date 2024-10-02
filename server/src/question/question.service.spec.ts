import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
    let service: QuestionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QuestionService],
        }).compile();

        service = module.get<QuestionService>(QuestionService);
    });
});
