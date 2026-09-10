import { Body, Controller, Get, Post, Param } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {

  private users: User[] = [
      { id: 1, name: 'Kirk', email: 'kirk@example.com' },
      { id: 2, name: 'Diddy Jhonson', email: 'diddy@example.com' },
    ];

  @Get()
  getUsers() : User[]{
    return this.users;
  }


  @Get('/search/name/:name')
  getUserByName(@Param('name') name: string) {
    const user = this.users.find(u => u.name === name);
    return {
      data: user,
      message: user ? 'User found' : 'User not found',
    }
  }

  @Get('/search/id/:id')
  getUserById(@Param('id') id: string) {
    const user = this.users.find(u => u.id === Number(id));
    return {
      data: user,
      message: user ? 'User found' : 'User not found',
    }
  }

  @Post()
  create(@Body() body: User){
    this.users.push(body);
    return {success: true, user: body};
  }
}
