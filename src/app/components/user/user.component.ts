import { Component, OnInit ,ViewChild} from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/interfaces/user'

import { ModalManager } from 'ngb-modal';
 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  users:any = [];

  user:User = {
    name:'',
    doc:'',
    profile:''
  };

  @ViewChild('userForm') UserForm: any;
  private modalRef:any;

  constructor(private userService:UserService,private modalService: ModalManager) { }

  ngOnInit(): void {  
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      res=>{
        this.users = res
        console.log(this.users)
      }
     ,err=> console.log(err));
  }

  createUser(){
    this.userService.createUser(this.user).subscribe(
      res=>{
        console.log(res)
      }
     ,err=> console.log(err));
    this.closeModal()
    this.getUsers()
  }

  deleteUser(id:number){
    /*
    this.userService.deleteUser(id).subscribe(
      res=>{
        console.log(res)
      }
     ,err=> console.log(err));
     */
     this.getUsers()
  }

  updateUser(user:User,id:number){
    this.user = user
    this.openModal()
    /*
    this.userService.updateUser(this.user,id).subscribe(
      res=>{
        console.log(res)
      }
     ,err=> console.log(err));
     this.getUsers()
     */
    
  }

  createUserModal(){
    this.user = {
      name:'',
      doc:'',
      profile:''
    };
    this.openModal()
  }

  openModal(){
      this.modalRef = this.modalService.open(this.UserForm, {
        size: "md",
        modalClass: 'mymodal',
        hideCloseButton: false,
        centered: false,
        backdrop: true,
        animation: true,
        keyboard: false,
        closeOnOutsideClick: true,
        backdropClass: "modal-backdrop"
    })
  }
  closeModal(){
    this.modalService.close(this.modalRef);
}
}
