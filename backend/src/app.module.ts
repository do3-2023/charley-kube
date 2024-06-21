import { Module } from '@nestjs/common';
import { PersonController } from './controller/person.controller';
import { PersonService } from './service/person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { HealthController } from './controller/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { MigrationV11719220037932 } from './migrations/1719220037932-migration_v1';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'kubernetes',
      entities: [Person],
      migrations: [MigrationV11719220037932],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Person]),
    TerminusModule,
  ],
  controllers: [PersonController, HealthController],
  providers: [PersonService],
})
export class AppModule {}
