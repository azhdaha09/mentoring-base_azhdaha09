import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject} from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserDialogComponent } from "./create-user-dialog/create-user-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Store } from "@ngrx/store";
import { UsersAction } from "./store/user.actions";
import { selectUsers } from "./store/users.selectors";
 
export interface IUsers {
    id: number,
    name: string,
    username?: string,
    email: string,
    address?: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone?: string,
    website: string,
    company: {
        name: string,
        catchPhrase?: string,
        bs?: string
    }
}


@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgFor,
              UserCardComponent,
              AsyncPipe,
              CreateUserDialogComponent,
              MatIconModule,
              MatButtonModule]
})

export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);
    readonly dialog = inject(MatDialog);
    private readonly store = inject(Store);
    public readonly users$ = this.store.select(selectUsers);

    constructor() {
        this.usersApiService.getUsers().subscribe((response: any) => {
            this.store.dispatch(UsersAction.set({ users: response }));
        });

        this.users$.subscribe(
            users => console.log(users)
        );

        console.log(this.users$)
    };
    
    public deleteUser(id: number) {
        this.store.dispatch(UsersAction.delete({ id }));
    };


    public editUser(user: any) {
        this.store.dispatch(UsersAction.edit({ 
            user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                website: user.website,
                company: {
                    name: user.companyName
                }     
            }
        }));
    };


    public createUser(formData: any) {
        console.log('ДАННЫЕ ФОРМЫ:', formData);
        this.store.dispatch(UsersAction.create({
            user: {
                id: new Date().getTime(),
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                website: formData.website,
                company: {
                    name: formData.companyName
                }   
            }
        })
    )
};


    openDialog(): void {
            const dialogRef = this.dialog.open(CreateUserDialogComponent, {
              data: 1234312423,
            });
        
            dialogRef.afterClosed().subscribe(createResult => {
              console.log('МОДАЛКА ЗАКРЫТА', createResult);
              if (!createResult) return;
              this.createUser(createResult)
            });
          }



    
}