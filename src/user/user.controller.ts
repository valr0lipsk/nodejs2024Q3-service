import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  NotFoundException,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './interfaces/dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const u = await this.userService.findOne(id);
    if (u) {
      return res.status(200).json(u);
    }
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    console.log('ID', id);
    const r = await this.userService.update(id, updateUserDto);
    console.log('RES', r);
    if (!r) {
      console.log('NOT found');
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (!r.id) {
      return res.status(403).json("Passwords doesn't match");
    }
    return res.json(r);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const r = await this.userService.remove(id);
    if (!r) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return res.status(204).send();
  }
}
