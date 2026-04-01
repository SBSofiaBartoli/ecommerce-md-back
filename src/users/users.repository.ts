// import { Injectable } from "@nestjs/common";
// import { UserDto } from "./dtos/user.dto";

// export interface User {
//     id: number,
//     email: string,
//     name: string,
//     password: string,
//     address: string,
//     phone: string,
//     country?: string | undefined,
//     city?: string | undefined,
// }

// @Injectable()
// export class UsersRepository {
//     users: User[] = [
//         {
//             id: 1,
//             email: "usuario1@example.com",
//             name: "Usuario Uno",
//             password: "pass1!",
//             address: "Calle 101",
//             phone: "+34 600 111 111",
//             country: "España",
//             city: "Barcelona"
//         },
//         {
//             id: 2,
//             email: "usuario2@example.com",
//             name: "Usuario Dos",
//             password: "pass2!",
//             address: "Avenida Central 202",
//             phone: "+34 600 222 222"
//         },
//         {
//             id: 3,
//             email: "usuario3@example.com",
//             name: "Usuario Tres",
//             password: "pass3!",
//             address: "Calle Norte 303",
//             phone: "+52 55 3333 3333",
//             country: "México",
//             city: "CDMX"
//         },
//         {
//             id: 4,
//             email: "usuario4@example.com",
//             name: "Usuario Cuatro",
//             password: "pass4!",
//             address: "Ruta 404",
//             phone: "+57 300 444 4444",
//             country: "Colombia",
//             city: "Bogotá"
//         },
//         {
//             id: 5,
//             email: "usuario5@example.com",
//             name: "Usuario Cinco",
//             password: "pass5!",
//             address: "Boulevard 505",
//             phone: "+54 9 11 5555 5555"
//         },
//         {
//             id: 6,
//             email: "usuario6@example.com",
//             name: "Usuario Seis",
//             password: "pass6!",
//             address: "Calle Sur 606",
//             phone: "+55 21 6666 6666",
//             country: "Brasil",
//             city: "Río de Janeiro"
//         },
//         {
//             id: 7,
//             email: "usuario7@example.com",
//             name: "Usuario Siete",
//             password: "pass7!",
//             address: "Avenida Este 707",
//             phone: "+1 202 777 7777",
//             country: "Estados Unidos",
//             city: "Washington"
//         },
//         {
//             id: 8,
//             email: "usuario8@example.com",
//             name: "Usuario Ocho",
//             password: "pass8!",
//             address: "Calle Oeste 808",
//             phone: "+49 151 88888888",
//             country: "Alemania",
//             city: "Berlín"
//         },
//         {
//             id: 9,
//             email: "usuario9@example.com",
//             name: "Usuario Nueve",
//             password: "pass9!",
//             address: "Paseo 909",
//             phone: "+33 6 99 99 99 99",
//             country: "Francia",
//             city: "París"
//         },
//         {
//             id: 10,
//             email: "usuario10@example.com",
//             name: "Usuario Diez",
//             password: "pass10!",
//             address: "Ruta 1001",
//             phone: "+34 600 101 010"
//         }
//     ];

//     getUsers(page: number, limit: number) {
//         let usersMap = this.users.map(({password, ...rest}) => rest);
//         const start = (page -1) * limit;
//         const end = start + limit;

//         return (usersMap = usersMap.slice(start, end));
//     }

//     getUserById(id: number) {
//         const user = this.users.find(user => user.id === id);
//         if (!user) {
//             return null;
//         }
//         const { password, ...rest } = user;
//         return rest;
//     }

//     createUser(user: UserDto) {
//         if (this.users.length === 0) {
//         const newUser = {id: 1, ...user};
//         this.users = [...this.users, newUser];
//         return newUser;
//         }

//         const maxId = Math.max(...this.users.map(u => u.id));
//         const id = maxId + 1;
//         const newUser = {id, ...user}
//         this.users = [...this.users, newUser];
//         return newUser;
//     }

//     updateUser(id: number, data: Partial<User>) {
//         const index = this.users.findIndex(user => user.id === id);
//         if(index === -1) {
//             return null;
//         }
//         const update = {
//             ...this.users[index],
//             ...data,
//             id,
//         }
//         this.users[index] = update;
//         return update;
//     }

//     deleteUser(id: number) {
//         const index = this.users.findIndex(user => user.id === id);
//         this.users.splice(index, 1);
//         return id;
//     }

//     loginUser(email: string, password: string) {
        
//         const user = this.users.find(user => user.email === email);
//         if (!user || user.password !== password) return null;
//         return user;
//     }
// }
