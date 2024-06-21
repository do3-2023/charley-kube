import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PersonService } from '../service/person.service';
import { Person } from 'src/entity/person.entity';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  getAllUsers() {
    return this.personService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.personService.remove(id);
  }

  @Post()
  async create(@Body() person: Person): Promise<Person> {
    return this.personService.create(person);
  }
}
