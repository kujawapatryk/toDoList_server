
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { Tasks } from './tasks.entity';
import { TasksService } from './tasks.service';


describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Tasks),
          useValue: {},
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks = [
        { id: 1, content: 'Task 1', done: false },
        { id: 2, content: 'Task 2', done: true },
      ];
      jest.spyOn(tasksService, 'getTasks').mockResolvedValue(tasks);

      const result = await tasksController.getTasks();

      expect(result).toEqual(tasks);
    });
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const addTaskDto = { content: 'New Task', done: false };
      const createdTask = { id: 1, ...addTaskDto };
      jest.spyOn(tasksService, 'create').mockResolvedValue(createdTask);

      const result = await tasksController.createTask(addTaskDto);

      expect(result).toEqual(createdTask);
    });
  });


});