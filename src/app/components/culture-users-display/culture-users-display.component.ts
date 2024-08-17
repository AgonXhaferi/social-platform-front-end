import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {UserDto} from "../dto/user.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CulturesService} from "../../services/cultures.service";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-culture-users-display',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable
  ],
  templateUrl: './culture-users-display.component.html',
  styleUrl: './culture-users-display.component.css'
})
export class CultureUsersDisplayComponent {
  culture: string = ""
  users: UserDto[] = []
  displayedColumns: string[] = [
    'name',
    'lastname',
    'username',
    'email',
    'country',
    'postalCode',
    'street',
    'age',
    'view'
  ];


  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private cultureService: CulturesService,
              private spinnerService: SpinnerService,
              private router: Router) {
  }


  onRowClicked(row: UserDto): void {
    this.spinnerService.show()

    const link = ['/users', row.id];

    this.router.navigate(link).then(
      () => this.spinnerService.hide()
    )
  }

}
