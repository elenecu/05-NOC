import { envs } from "./envs.plugin";



describe('envs.plugin.ts', () => {


  test('should be defined', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'eleneq94@gmail.com',
      MAILER_SECRET_KEY: 'bfkeadytsvdxnuyv',
      PROD: true,
      MONGO_URL: 'mongodb://Nicolas:123456789@localhost:27017',
      MONGO_DB_NAME: 'NOC_TEST',
      MONGO_USER: 'Nicolas',
      MONGO_PASS: '123456789'
    });
  });

  test('should return error if not found env', async() => {
    jest.resetModules();
    process.env.PORT = 'ABC';
    try {
      await import('./envs.plugin');

      expect(true).toBe(false);
    } catch (error) {
      console.log(error);
      expect(`${error}`).toContain('env-var: "PORT" should be a valid integer');
    }
  });

  
});