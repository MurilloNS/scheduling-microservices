import { Test, TestingModule } from '@nestjs/testing';
import { SchedulingServiceController } from './scheduling-service.controller';
import { SchedulingServiceService } from './scheduling-service.service';

describe('SchedulingServiceController', () => {
  let schedulingServiceController: SchedulingServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SchedulingServiceController],
      providers: [SchedulingServiceService],
    }).compile();

    schedulingServiceController = app.get<SchedulingServiceController>(SchedulingServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(schedulingServiceController.getHello()).toBe('Hello World!');
    });
  });
});
