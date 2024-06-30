import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {UserDto} from "../dto/user.dto";
import {catchError, concatMap, map, Observable, of} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {MatButton} from "@angular/material/button";
import {CulturesService} from "../../services/cultures.service";
import Session from "supertokens-web-js/recipe/session";

@Component({
  selector: 'app-culture-users',
  standalone: true,
  imports: [MatTableModule, AsyncPipe, NgIf, MatButton],
  templateUrl: './culture-users.component.html',
  styleUrl: './culture-users.component.css'
})
export class CultureUsersComponent implements OnInit {
  culture: string = ""
  users: UserDto[] = []
  displayedColumns: string[] = ['name', 'lastname', 'username', 'email', 'country', 'postalCode', 'street', 'age'];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private cultureService: CulturesService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      concatMap(params => {
        this.culture = params.get('cultureName')!; //TODO: find a better way to handle this.

        if (!this.culture) {
          alert('Culture path variable incorrect');
          throw new Error('Culture path variable incorrect');
        }

        return this.userService.findUsersByPrimaryCultureId(this.culture)
      })
    ).subscribe(usersOfPrimaryCulture => {
      this.users = usersOfPrimaryCulture;
    });
  }

  onRowClicked(row: UserDto): void {
    console.log('Row clicked:', row);
    console.log('User ID:', row.id);
  }

  async subscribe() {
    const userId = await Session.getUserId()

    this.cultureService.subscribeToCulture({
      userId,
      cultureId: this.culture
    })
      .subscribe(data => {
        debugger;
        console.log(data)
      })
  }
}
