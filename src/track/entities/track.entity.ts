import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;

  @ApiProperty({ type: 'string', format: 'uuid', nullable: true })
  @Column({ type: 'varchar', nullable: true })
  albumId: string | null;

  @ApiProperty()
  @Column()
  duration: number;
}
