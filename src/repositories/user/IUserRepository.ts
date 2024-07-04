export interface IUserRepository {
    create(user:User):Promise<User>
    getAll(limit:number,offset:number) : Promise<User[]>
    findOneByEmail (userIEmail:string): Promise<User| null>
    findOneById(userId:string): Promise<User| null>
    deleteById(userId:string): Promise<User| null>
    updateById(userId:string, user: User) : Promise<User| null>
}