import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_uri="/api/user";
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(this.api_uri);
  }

  createUser(user:User){
    return this.http.post(this.api_uri,user);
  }

  updateUser(user:User,id:number){
    return this.http.put(this.api_uri+`/${id}`,user);
  }

  deleteUser(id:number){
    return this.http.delete(this.api_uri+`/${id}`);
  }


}
