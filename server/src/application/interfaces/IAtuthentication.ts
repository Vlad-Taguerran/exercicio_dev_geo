export interface Authentication{
  login(email:string,password:string): Promise<string>
  logout(userId: string): Promise<void>
}