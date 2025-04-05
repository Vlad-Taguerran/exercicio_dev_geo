export class FileGetDto {
  constructor(
    public id: string,
    public filename: string,
    public path: string,
    public createdAt: Date
  ) {}
}
