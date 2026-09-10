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


  @Get('/search/:name')
  getUserByName(@Param('name') name: string) {
    console.log('.:: User by name:', name)
    const user = this.users.find(u => u.name === name);
    return {
      data: user,
      message: user ? 'User found' : 'User not found',
    }
  }

  @Get('/search/:id')
  getUserById(@Param('id') id: number) {
    console.log('.:: User by id:', id)
    const user = this.users.find(u => u.id === Number(id));
    return {
      data: user,
      message: user ? 'User found' : 'User not found',
    }
  }

  @Post()
  create(@Body() body : any){
    console.log(body)
    this.users.push(body);
    return {success: true, user: body};
  }
}
