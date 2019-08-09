import {Column, Entity, PrimaryColumn} from 'typeorm';
import {IsAlpha} from 'class-validator';

@Entity()
export class User {

    @PrimaryColumn()
    mail: string;

    @IsAlpha()
    @Column()
    name: string;

    @IsAlpha()
    @Column()
    surname: string;

    @Column()
    phone: string;

    @Column()
    country: string;
}
