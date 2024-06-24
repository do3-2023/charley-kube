import { Module } from '@nestjs/common';
import { PersonController } from './controller/person.controller';
import { PersonService } from './service/person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entity/person.entity';
import { HealthController } from './controller/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { MigrationV11719220037932 } from './migrations/1719220037932-migration_v1';
import { MigrationV21719221203249 } from './migrations/1719221203249-migration_v2';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'kubernetes',
      autoLoadEntities: true,
      entities: [Person],
      migrations: [MigrationV11719220037932, MigrationV21719221203249],
      migrationsRun: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Person]),
    TerminusModule,
  ],
  controllers: [PersonController, HealthController],
  providers: [PersonService],
})
export class AppModule {}
