import { Table, Column, Model, DataType, Default, PrimaryKey } from "sequelize-typescript";
import { v4 } from "uuid";

@Table({ tableName: "files", timestamps: true })
export class FileModel extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({type: DataType.UUID,defaultValue:  v4()})
   id!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  filename!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  path!: string;
}
