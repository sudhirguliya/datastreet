import { Component, OnInit } from '@angular/core';
import { User,Category,SubCategory } from '../../_models/index';
import { UserService, AlertService, AuthenticationService,SubCategoryService,CategoryService} from '../../_services/index';
import { Router } from '@angular/router';
import { ToastComponent } from '../../shared/toast/toast.component';
@Component({
  selector: 'app-profile',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubCategoryComponent implements OnInit {
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "desc";
    
  users: User[] = [];
  isLoading = true;
  categories: Category[] = [];
  user: any = {};
  isEditing = false;
  isAdding = false;

  currentUser: User;
    
    private isVisible = true;
 
    constructor( public toast: ToastComponent, private category : CategoryService,private subcategoryService: SubCategoryService, private userService: UserService, private alertService: AlertService , private authenticationService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.loadAllCategory();
    }
	showListing()
	{
		this.isEditing = false;
		this.isAdding = false;
     this.loadAllCategory();
		
	}
  enableEditing(user) {
    console.log(user.parent.id)
    this.loadAllCategoryDrp();
    this.isEditing = true;
    this.isAdding = false;
    this.user = user;
  }
  enableAdding() {
	this.loadAllCategoryDrp();
    this.isAdding = true;
    this.isEditing = false;
    this.user = {};
  }

  cancelEditing() {
    this.isEditing = false;
    this.isAdding = false;
    this.user = {};
    this.alertService.error('item editing cancelled.', true);
    // reload the cats to reset the editing
    this.loadAllCategory();
  }

  editUser(user) {
    user.parent=user.parent.id;
    delete user.parent.id;
    this.subcategoryService.update(user).subscribe(
      res => {
        this.isEditing = false;
        this.user = user;
        this.loadAllCategory();
        this.toast.setMessage('Sub category is Edited.', 'success');
      },
      error => console.log(error)
    );
  }
 addCategory() {
		this.subcategoryService.create(this.user).subscribe(
      res => {
        this.isEditing = false;
		    this.isAdding = false;
        this.loadAllCategory();
        this.toast.setMessage('Sub category is insert.', 'success');
      },
      error => console.log(error)
    );
  }
    viewUser(id: number) {
        this.userService.getUserById(id).subscribe(users => { 
                    this.users = users.data;
                });
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    // }

    deleteUser(user) {
     // console.log(user.id);
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.subcategoryService.delete(user.id).subscribe(
        res => {
          const pos = this.users.map(elem => { return elem.id; }).indexOf(user.id);
          this.users.splice(pos, 1);
          this.alertService.success('item deleted successfully.', true);
        },
        error => console.log(error)
      );
    }
  }
	private loadAllCategoryDrp() {
      
        this.category.getAll()
            .subscribe(users => { 
                    
					this.categories = users.data;
                   // console.log(this.categories);
                    //console.log(this.users);
                },
                error => {
                    if (error.status === 401)
                    {                   
                        this.alertService.error('User with specified credentials is not found', true);
                        this.authenticationService.logout();
                    } 
                },
                () => this.isLoading = false);
    }
    private loadAllCategory() {
      
        this.subcategoryService.getAll()
            .subscribe(users => { 
                    this.users = users.data;
                },
                error => {
                    if (error.status === 401)
                    {                   
                        this.alertService.error('User with specified credentials is not found', true);
                        this.authenticationService.logout();
                    } 
                },
                () => this.isLoading = false);
    }

}
