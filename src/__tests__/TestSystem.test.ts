import request from 'supertest';
import { getConnection } from 'typeorm';
import app from '../app';
import createConnection from '../database/index';

let id_campus: string;
let id_course: string;
let id_user: string;
let email_user: string;
let senha_user = '123';
let token_user: string;
let proposal_id: string;
let project_id: string;
let notification_id: string;
let activity_id: string;

beforeAll(async () => {
  const connection = await createConnection();

  await connection.runMigrations();
});

afterAll(async () => {
  const connection = getConnection();

  await connection.dropDatabase();

  await connection.close();
});

describe('Campus', () => {
  it('should be create a new campus', async () => {
    const campus = await request(app).post('/api/v1/campus/').send({
      name: 'Unigran',
    });
    id_campus = campus.body.id;
    expect(campus.status).toBe(201);
  });

  it('should be list all campus', async () => {
    const campus = await request(app).get('/api/v1/campus/').send();
    expect(campus.status).toBe(200);
  });

  it('should be update a campus', async () => {
    const campus = await request(app).put(`/api/v1/campus/${id_campus}`).send({
      name: 'Unigran2',
    });
    expect(campus.status).toBe(200);
  });

  it('should be delete a campus', async () => {
    const campus2 = await request(app).post('/api/v1/campus/').send({
      name: 'UTF',
    });

    const campus = await request(app).delete(
      `/api/v1/campus/${campus2.body.id}`,
    );
    expect(campus.status).toBe(204);
  });
});

describe('Courses', () => {
  it('should be create a new Couse', async () => {
    const courses = await request(app).post('/api/v1/courses/').send({
      name: 'Eng.Software',
      campus_id: id_campus,
    });
    id_course = courses.body.id;
    expect(courses.status).toBe(201);
  });

  it('should be update a Course', async () => {
    const courses = await request(app)
      .put(`/api/v1/courses/${id_course}`)
      .send({
        name: 'Eng.Software2',
        campus_id: id_campus,
      });
    expect(courses.status).toBe(200);
  });

  it('should be get a Course', async () => {
    const courses = await request(app).get(`/api/v1/courses/${id_course}`);
    expect(courses.status).toBe(200);
  });

  it('should be get all Course', async () => {
    const courses = await request(app).get(`/api/v1/courses/`);
    expect(courses.status).toBe(200);
  });

  it('should be delete a Course', async () => {
    const courses2 = await request(app).post('/api/v1/courses/').send({
      name: 'Eng.Software',
      campus_id: id_campus,
    });
    const courses = await request(app).delete(
      `/api/v1/courses/${courses2.body.id}`,
    );
    expect(courses.status).toBe(204);
  });
});

describe('User Create', () => {
  it('should be create a new User', async () => {
    const users = await request(app).post('/api/v1/users/').send({
      name: 'joão pedro',
      email: 'joo@jooj.com',
      password: '123',
      role: 'adm',
      course_id: id_course,
    });
    id_user = users.body.id;
    email_user = users.body.email;
    senha_user = users.body.password;
    expect(users.status).toBe(201);
  });
});

describe('Login', () => {
  it('should be login a User', async () => {
    const login = await request(app).post('/api/v1/sessions/').send({
      email: email_user,
      password: '123',
    });
    // console.log(login);
    token_user = login.body.token;
    //console.log(token_user);
    expect(login.status).toBe(200);
  });
});

describe('Proposals', () => {
  it('should be create a new Proposal', async () => {
    const proposals = await request(app)
      .post('/api/v1/proposals/')
      .set('Authorization', `Bearer ${token_user}`)
      .send({
        title: 'Proposal 1',
        description: 'Description 1',
      });
    proposal_id = proposals.body.id;
    expect(proposals.status).toBe(201);
  });

  it('should be update a Proposal', async () => {
    const proposals = await request(app)
      .put(`/api/v1/proposals/${proposal_id}`)
      .set('Authorization', `Bearer ${token_user}`)
      .send({
        title: 'Proposal 2',
        description: 'Description 2',
      });
    expect(proposals.status).toBe(200);
  });

  it('should be get a Proposal by role and course', async () => {
    const proposals = await request(app)
      .get(`/api/v1/proposals/listByRoleAndCourse`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(proposals.status).toBe(200);
  });

  it('should be get a Proposal by id', async () => {
    const proposals = await request(app)
      .get(`/api/v1/proposals/${proposal_id}`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(proposals.status).toBe(200);
  });

  it('should be get all Proposal', async () => {
    const proposals = await request(app)
      .get(`/api/v1/proposals/`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(proposals.status).toBe(200);
  });

  it('should be delete a Proposal', async () => {
    const proposals = await request(app)
      .delete(`/api/v1/proposals/${proposal_id}`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(proposals.status).toBe(204);
  });
});

describe('Projects', () => {
  it('should be create a new Project', async () => {
    const projects = await request(app)
      .post('/api/v1/projects/')
      .set('Authorization', `Bearer ${token_user}`)
      .send({
        title: 'Project 1',
        description: 'Description 1',
      });
    project_id = projects.body.id;
    expect(projects.status).toBe(201);
  });

  it('should be update a Project', async () => {
    const projects = await request(app)
      .put(`/api/v1/projects/${project_id}`)
      .set('Authorization', `Bearer ${token_user}`)
      .send({
        title: 'Project 2',
        description: 'Description 2',
      });
    expect(projects.status).toBe(200);
  });

  it('should be get a Project by id', async () => {
    const projects = await request(app)
      .get(`/api/v1/projects/${project_id}`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(projects.status).toBe(200);
  });

  it('should be get all Project', async () => {
    const projects = await request(app)
      .get(`/api/v1/projects/`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(projects.status).toBe(200);
  });
});

describe('Activities', () => {
  it('should be create a new Activity', async () => {
    const activities = await request(app)
      .post('/api/v1/activities/')
      .set('Authorization', `Bearer ${token_user}`)
      .send({
        title: 'Activity 1',
        description: 'Description 1',
        project_id: project_id,
      });
    activity_id = activities.body.id;
    expect(activities.status).toBe(201);
  });

  it('should be update a Activity', async () => {
    const activities = await request(app)
      .put(`/api/v1/activities/${activity_id}`)
      .set('Authorization', `Bearer ${token_user}`)
      .send({
        title: 'Activity 2',
        description: 'Description 2',
      });
    expect(activities.status).toBe(201);
  });

  it('should be get a Activity by Project id', async () => {
    const activities = await request(app)
      .get(`/api/v1/activities/listbyproject/${project_id}`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(activities.status).toBe(200);
  });

  it('should be get all Activity', async () => {
    const activities = await request(app)
      .get(`/api/v1/activities/`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(activities.status).toBe(200);
  });

  it('should be patch Chende Status', async () => {
    const activities = await request(app)
      .patch(`/api/v1/activities/${activity_id}`)
      .set('Authorization', `Bearer ${token_user}`)
      .send({
        status: 'CANCELED',
      });
    expect(activities.status).toBe(201);
  });

  it('should be delete a Activity', async () => {
    const activities = await request(app)
      .delete(`/api/v1/activities/${activity_id}`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(activities.status).toBe(204);
  });
});

describe('Delete Project', () => {
  it('should be delete a Project', async () => {
    const projects = await request(app)
      .delete(`/api/v1/projects/${project_id}`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(projects.status).toBe(204);
  });
});

describe('Notifications', () => {
  it('should be create a new Notification', async () => {
    const notifications = await request(app)
      .post('/api/v1/notifications/')
      .set('Authorization', `Bearer ${token_user}`)
      .send({
        description: 'Description 1',
      });
    notification_id = notifications.body.id;
    expect(notifications.status).toBe(201);
  });

  it('should be update a Notification', async () => {
    const notifications = await request(app)
      .put(`/api/v1/notifications/${notification_id}`)
      .set('Authorization', `Bearer ${token_user}`)
      .send({
        description: 'Description 2',
      });
    expect(notifications.status).toBe(200);
  });

  it('should be get a Notification list', async () => {
    const notifications = await request(app)
      .get(`/api/v1/notifications/`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(notifications.status).toBe(200);
  });

  it('should be delet a Notification', async () => {
    const notifications = await request(app)
      .delete(`/api/v1/notifications/${notification_id}`)
      .set('Authorization', `Bearer ${token_user}`);
    expect(notifications.status).toBe(204);
  });
});

describe('User', () => {
  it('should be update a User', async () => {
    //console.log(token_user);
    const users = await request(app)
      .put(`/api/v1/users/${id_user}`)
      .set('authorization', `Bearear ${token_user}`)
      .send({
        name: 'joão pedro2',
        email: 'joo@jooj.com',
        password: '123',
        role: 'adm',
        course_id: id_course,
      });
    expect(users.status).toBe(200);
  });

  it('should be delete a User', async () => {
    const users = await request(app)
      .delete(`/api/v1/users/${id_user}`)
      .set('authorization', `Bearear ${token_user}`);
    expect(users.status).toBe(204);
  });
});
