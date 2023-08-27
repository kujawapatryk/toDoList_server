// import { Test, TestingModule } from '@nestjs/testing';
// import { AppModule } from '../src/app.module';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { TasksModule } from '../src/tasks/tasks.module';
//
// describe('AppController (e2e)', () => {
//     let app: INestApplication;
//
//     beforeEach(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             imports: [AppModule],
//         }).compile();
//
//         app = moduleFixture.createNestApplication();
//         await app.init();
//     });
//     afterAll(async () => {
//         await app.close();
//     });
//
//     it('/tasks (GET)', () => {
//         return request(app.getHttpServer())
//             .get('/tasks')
//             .expect(200)
//             .expect([]);
//     });
//
//     it('/tasks (POST)', () => {
//         return request(app.getHttpServer())
//             .post('/tasks')
//             .send({ content: 'New task', done: false })
//             .expect(201)
//             .expect({
//                 id: expect.any(Number),
//                 content: 'New task',
//                 done: false,
//             });
//     });
//
//     it('/tasks/:id (DELETE)', async () => {
//         const response = await request(app.getHttpServer())
//             .post('/tasks')
//             .send({ content: 'Delete me', done: false });
//
//         const idToDelete = response.body.id;
//
//         await request(app.getHttpServer())
//             .delete(`/tasks/${idToDelete}`)
//             .expect(200)
//             .expect({ message: 'taskDeleted', status: 'success' });
//     });
//
//     it('/tasks/:id (DELETE - not found)', () => {
//         return request(app.getHttpServer())
//             .delete('/tasks/999')
//             .expect(404);
//     });
//
//     it('/tasks/:id (PATCH)', async () => {
//         const response = await request(app.getHttpServer())
//             .post('/tasks')
//             .send({ content: 'Update me', done: false });
//
//         const idToUpdate = response.body.id;
//
//         await request(app.getHttpServer())
//             .patch(`/tasks/${idToUpdate}`)
//             .send({ done: true })
//             .expect(200)
//             .expect({ message: 'taskConfirmation', status: 'success' });
//     });
//
//     it('/tasks/:id (PATCH - not found)', () => {
//         return request(app.getHttpServer())
//             .patch('/tasks/999')
//             .send({ done: true })
//             .expect(500);
//     });
// });