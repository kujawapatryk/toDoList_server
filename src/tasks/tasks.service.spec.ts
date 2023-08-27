import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.entity';
import { AddTaskDto } from './dto/add-task.dto';

describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository: Repository<Tasks>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: getRepositoryToken(Tasks),
                    useClass: Repository,
                },
            ],
        }).compile();

        tasksService = module.get<TasksService>(TasksService);
        tasksRepository = module.get<Repository<Tasks>>(getRepositoryToken(Tasks));
    });

    describe('create', () => {
        it('should create a task', async () => {
            const addTaskDto: AddTaskDto = { content: 'New task', done: false };

            tasksRepository.create = jest.fn().mockReturnValue(addTaskDto);
            tasksRepository.save = jest.fn().mockReturnValue(addTaskDto);

            const result = await tasksService.create(addTaskDto);

            expect(result).toEqual(addTaskDto);
            expect(tasksRepository.create).toHaveBeenCalledWith(addTaskDto);
            expect(tasksRepository.save).toHaveBeenCalledWith(addTaskDto);
        });
    });

    describe('getTasks', () => {
        it('should get tasks', async () => {
            const mockTasks: Tasks[] = [
                { id: 1, content: 'Task 1', done: false },
                { id: 2, content: 'Task 2', done: true },
            ];

            tasksRepository.find = jest.fn().mockReturnValue(mockTasks);

            const result = await tasksService.getTasks();

            expect(result).toEqual(mockTasks);
            expect(tasksRepository.find).toHaveBeenCalled();
        });
    });

    describe('deleteTask', () => {
        it('should delete a task by ID', async () => {
            const id = 1;

            tasksRepository.delete = jest.fn().mockReturnValue({ affected: 1 });

            const result = await tasksService.deleteTask(id);

            expect(result).toBe(1);
            expect(tasksRepository.delete).toHaveBeenCalledWith(id);
        });

        it('should return 0 when no task is deleted', async () => {
            const id = 2;

            tasksRepository.delete = jest.fn().mockReturnValue({ affected: 0 });

            const result = await tasksService.deleteTask(id);

            expect(result).toBe(0);
            expect(tasksRepository.delete).toHaveBeenCalledWith(id);
        });

    });
    
    

    describe('updateTask', () => {
        it('should update a task', async () => {
            const id = 1;
            const done = true;

            tasksRepository.update = jest.fn().mockReturnValue({ affected: 1 });

            const result = await tasksService.updateTask(id, done);

            expect(result).toBe(1);
            expect(tasksRepository.update).toHaveBeenCalledWith(id, { done });
        });

        it('should return 0 when no task is updated', async () => {
            const id = 2;
            const done = false;

            tasksRepository.update = jest.fn().mockReturnValue({ affected: 0 });

            const result = await tasksService.updateTask(id, done);

            expect(result).toBe(0);
            expect(tasksRepository.update).toHaveBeenCalledWith(id, { done });
        });
    });
});