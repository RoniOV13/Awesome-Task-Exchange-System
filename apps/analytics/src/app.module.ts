import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://mongodb/dataBase`,
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
