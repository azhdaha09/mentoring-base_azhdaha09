import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, output, Output} from "@angular/core";
import { IUsers } from "../users-list.component";
import { MatDialog } from '@angular/material/dialog'
import { EditUserDialogComponent } from "./edit-user-dialog/edit-user-dialog.component";
import { DeleteUserDialogComponent } from "./delete-user-dialog/del-user-dialog.component";
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button'



@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [EditUserDialogComponent, MatCardModule, MatButtonModule]
})

export class UserCardComponent {
    @Input()
    user!: IUsers;

    @Output()
    deleteUser = new EventEmitter()

    @Output()
    editUser = new EventEmitter()


    readonly dialog = inject(MatDialog)



    openDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
          data: {user: this.user},
        });
    
        dialogRef.afterClosed().subscribe(editResult => {
          console.log('МОДАЛКА ЗАКРЫТА, ЗНАЧЕНИЕ ФОРМЫ -', editResult );
          if (!editResult) return;
          this.editUser.emit(editResult)
        });
      }


      openDialogDelete(): void {
        const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
          data: {user: this.user}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed'); 
          if (!result) return;
          this.deleteUser.emit(result)
        });
      }



    onDeleteUser(userId: number) {
        this.deleteUser.emit(userId)
    }
}