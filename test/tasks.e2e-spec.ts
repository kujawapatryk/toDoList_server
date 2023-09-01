import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { AppModule } from '../src/app.module';
import { TasksModule } from '../src/tasks/tasks.module';
import { TasksService } from '../src/tasks/tasks.service';


export class InMemoryTasksService {
    public tasks = [];

    findAll() {
        return this.tasks;
    }

    create(task) {
        const id = this.tasks.length + 1;
        task.id = id;
        this.tasks.push(task);
        return task;
    }

    updateTask(id: number, updatedTask) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return null;
        }
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
        return this.tasks[taskIndex];
    }

    deleteTask(id: number) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return null;
        }
        const removedTask = this.tasks.splice(taskIndex, 1);
        return removedTask[0];
    }
}

describe('Tasks E2E Tests', () => {
    let app: INestApplication;
    let request: supertest.SuperTest<supertest.Test>;
    let taskId: number;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule, TasksModule],
        })
            .overrideProvider(TasksService)
            .useClass(InMemoryTasksService)
            .compile();

        app = module.createNestApplication();
        await app.init();
        request = supertest(app.getHttpServer());

        const newTask = { content: 'Test Task', done: true };
        const response = await request.post('/tasks').send(newTask);
        expect(response.status).toBe(201);
        taskId = response.body.id;
        expect(response.body).toEqual({id:1, content: 'Test Task', done: true })

    });

    afterEach(async () => {
        await request.delete(`/tasks/${taskId}`);
        await app.close();
    });

    describe('Post /tasks/', () => {
        it('should update a task', async () => {
            const newTask = { content: 'Test Task POST', done: true };
            const response = await request.post('/tasks').send(newTask);
            expect(response.status).toBe(201);

            expect(response.body).toEqual({id:2, content: 'Test Task POST', done: true });
        });
    });

    describe('patch /tasks/:id', () => {
        it('should update a task', async () => {
            const updatedContent = 'Updated Task';

            const response = await request
                .patch(`/tasks/${taskId}`)
                .send({ done: false });

            expect(response.body.message).toEqual('taskConfirmation');
        });
    });

    describe('patch /tasks/:id  incorrect data', () => {
        it('should update a task', async () => {
            const updatedContent = 'Updated Task';

            const response = await request
                .patch(`/tasks/incorrectData`)
                .send({ done: false });

            expect(response.body.message).toEqual('tryLater');
        });
    });

    describe('patch /tasks/:id  done: incorrect data', () => {
        it('should update a task', async () => {
            const updatedContent = 'Updated Task';

            const response = await request
                .patch(`/tasks/${taskId}`)
                .send({ done: 'incorrectDat' });

            expect(response.body.message).toEqual(["Done must be a boolean value"]);
        });
    });

    describe('DELETE /tasks/:id incorrect data', () => {
        it('should delete a task', async () => {
            const response = await request
                .delete(`/tasks/incorrectData`)
                .expect(200);

            expect(response.body.message).toEqual('tryLater');
        });
    });

    describe('DELETE /tasks/:id', () => {
        it('should delete a task', async () => {
            const response = await request
                .delete(`/tasks/${taskId}`)
                .expect(200);

            expect(response.body.message).toEqual('taskDeleted');
        });
    });
});