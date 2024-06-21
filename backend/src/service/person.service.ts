import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entity/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private usersRepository: Repository<Person>,
  ) {}

  async create(user: Person): Promise<Person> {
    return this.usersRepository.save(user);
  }

  findOne(id: string): Promise<Person | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findAll(): Promise<Person[]> {
    return this.usersRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
