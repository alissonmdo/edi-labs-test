import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) throw new BadRequestException('Email already registered');

    const jobExists = await this.prisma.job.findUnique({
      where: { id: createUserDto.job_id },
    });

    if (!jobExists) throw new BadRequestException('Job must exist');

    if (createUserDto.manager_id) {
      const managerExists = await this.prisma.user.findUnique({
        where: { id: createUserDto.manager_id },
      });

      if (!managerExists)
        throw new BadRequestException('Manager must exist or not be provided');
    }

    const newUser = await this.prisma.user.create({ data: createUserDto });

    return newUser;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, job_id, manager_id, name } = updateUserDto;
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException('User not found');

    if (job_id) {
      const jobExists = await this.prisma.job.findUnique({
        where: { id: job_id },
      });

      if (!jobExists) throw new BadRequestException('Job must exist');
    }

    if (manager_id) {
      const managerExists = await this.prisma.user.findUnique({
        where: { id: manager_id },
      });

      if (!managerExists) throw new BadRequestException('Manager must exist');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { email, job_id, manager_id, name },
    });
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestException('User not found');
    const subdordinatesAmount = await this.prisma.user.count({
      where: { manager_id: id },
    });

    if (subdordinatesAmount > 0) {
      throw new BadRequestException(
        'User cannot be managing other users when deleted',
      );
    }

    return await this.prisma.user.delete({ where: { id } });
  }
}
