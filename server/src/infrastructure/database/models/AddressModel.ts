import {DataTypes, InferAttributes, InferCreationAttributes, Optional } from "sequelize";
import {Model,BelongsTo, Table, Column, ForeignKey, Default, DataType, PrimaryKey } from "sequelize-typescript";
import { UserModel } from "./UserModel";
import { v4 } from "uuid";
interface AddressModelCreationAttributes extends Optional<InferCreationAttributes<AddressModel>, 'id'> {}
@Table({ tableName: 'addresses', timestamps:  true })
export class AddressModel extends Model<InferAttributes<AddressModel>, AddressModelCreationAttributes> {
  
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({type: DataType.UUID,defaultValue:  v4()})
  id!: string;
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, allowNull: false }) 
  userId!: string;

  @BelongsTo(() => UserModel)
  user?: UserModel;

  @Column({ type: DataType.STRING, allowNull: true })
  address?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  house_number?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  city?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  state?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  postcode?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  notes?: string;


  @Column({ type: DataType.GEOMETRY('POINT'), allowNull: false })
  location!:  { type: string; coordinates: [number, number] };
}