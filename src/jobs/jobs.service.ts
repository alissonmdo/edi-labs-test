import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createJobDto: CreateJobDto) {
    const existingJob = await this.prisma.job.findUnique({
      where: { description: createJobDto.description },
    });

    if (existingJob) {
      throw new BadRequestException('Job description already exists');
    }

    const newJob = await this.prisma.job.create({ data: createJobDto });

    return newJob;
  }

  findAll() {
    return this.prisma.job.findMany();
  }

  findOne(id: number) {
    return this.prisma.job.findUnique({ where: { id } });
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    const { description } = updateJobDto;
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) throw new BadRequestException('Job not found');

    if (!description) {
      return job;
    }

    const existingJob = await this.prisma.job.findUnique({
      where: { description },
    });

    if (!existingJob)
      throw new BadRequestException('Job description must be unique');

    const updateJob = await this.prisma.job.update({
      where: { id: job.id },
      data: { description },
    });
    return updateJob;
  }

  async remove(id: number) {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) throw new BadRequestException('Job not found');

    const jobUsersAmount = await this.prisma.user.count({
      where: { job_id: id },
    });

    if (jobUsersAmount > 0) {
      throw new BadRequestException('Job must have no users');
    }

    return await this.prisma.user.delete({ where: { id } });
  }
}
