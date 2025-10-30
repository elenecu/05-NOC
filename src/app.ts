import { Server } from "./presentation/server.js";
import { envs } from "./config/plugins/envs.plugin.js";
import { LogModel } from "./data/mongo/index.js";
import { MongoDataBase } from "./data/mongo/init.js";
import { PrismaClient } from "./generated/prisma/client.js";


(async () => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const prisma = new PrismaClient();

  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'MEDIUM',
  //     message: 'Hola mundo desde Prisma',
  //     origin: 'app.ts',
  //   },
  // });
  // console.log( newLog );

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: 'MEDIUM',
  //   },
  // });
  // console.log( logs );


  // Crear una colección = tables, documento = registro

  // const newLog = await LogModel.create({
  //   message: 'Hola mundo desde Mongo',
  //   level: 'low',
  //   origin: 'app.ts',
  // })
  // await newLog.save();
  // console.log( newLog );


  Server.start();
}