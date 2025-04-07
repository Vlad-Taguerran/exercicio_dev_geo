import { Table, Column, Model, DataType, HasMany, Default, PrimaryKey } from 'sequelize-typescript';
import { AddressModel } from './AddressModel';
import { InferAttributes, InferCreationAttributes  } from 'sequelize/types/model';
import {Optional } from 'sequelize';
import { v4 } from 'uuid';
interface UserModelCreationAttributes extends Optional<Omit<InferCreationAttributes<UserModel>, 'addresses'>, never>  {
  addresses?: AddressModel[];
}
@Table({tableName: 'users', timestamps:  true})
export class UserModel extends Model<InferAttributes<UserModel>, UserModelCreationAttributes>{
  

  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({type: DataType.UUID,defaultValue:  v4()})
   id!: string;
  @Column({type: DataType.STRING, allowNull: false})
   name!: string;
  @Column({type:DataType.STRING, unique:true, allowNull:false})
   email!: string;
  @Column({type: DataType.STRING, allowNull:false})
   password!:string

   
  @HasMany(() => AddressModel)
  
  addresses!: AddressModel[];
}