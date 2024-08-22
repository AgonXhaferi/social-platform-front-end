import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {UserResponseDto} from "../../dto/response/user-response.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CulturesService} from "../../services/cultures.service";
import {SpinnerService} from "../../services/spinner.service";
import {concatMap, from, zip} from "rxjs";
import Session from "supertokens-web-js/recipe/session";

@Component({
  selector: 'app-culture-content-display',
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
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './culture-users-display.component.html',
  styleUrl: './culture-users-display.component.css'
})
export class CultureUsersDisplayComponent implements OnInit {
  culture: string = ""
  users: UserResponseDto[] = []

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
              private spinnerService: SpinnerService,
              private router: Router) {
  }

  ngOnInit(): void {
    zip([this.route.paramMap, from(Session.getUserId())])
      .pipe(
        concatMap(([params, userId]) => {
          this.culture = params.get('cultureName')!;

          if (!this.culture) {
            alert('Culture path variable incorrect');
            throw new Error('Culture path variable incorrect');
          }

          return this.userService.findUsersByPrimaryCultureId(this.culture)
        })
      ).subscribe(
      (
        usersOfPrimaryCulture) => {
        this.users = usersOfPrimaryCulture;

        this.spinnerService.hide()
      })
  }


  onRowClicked(row: UserResponseDto): void {
    this.spinnerService.show()

    const link = ['/users', row.id];

    this.router.navigate(link).then(
      () => this.spinnerService.hide()
    )
  }

}
