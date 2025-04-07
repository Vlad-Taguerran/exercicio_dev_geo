export class File {
  constructor(
    public readonly filename: string,
    public readonly path: string,
    public readonly createdAt: Date = new Date()
  ) {}
}
