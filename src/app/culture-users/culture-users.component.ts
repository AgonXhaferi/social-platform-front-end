import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CulturesService} from "../services/cultures.service";
import {MatTableModule} from "@angular/material/table";
import {UserDto} from "../dto/user.dto";
import {catchError, concatMap, map, Observable, of} from "rxjs";
import {UserService} from "../services/user.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-culture-users',
  standalone: true,
  imports: [MatTableModule, AsyncPipe, NgIf],
  templateUrl: './culture-users.component.html',
  styleUrl: './culture-users.component.css'
})
export class CultureUsersComponent implements OnInit {
  users: UserDto[] = []
  displayedColumns: string[] = ['name', 'lastname', 'username', 'email', 'country', 'postalCode', 'street', 'age'];

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      concatMap(params => {
        const culture = params.get('cultureName');

        if (!culture) {
          alert('Culture path variable incorrect');
          throw new Error('Culture path variable incorrect');
        }

        return this.userService.findUsersByPrimaryCultureId(culture)
      })
    ).subscribe(usersOfPrimaryCulture => {
      this.users = usersOfPrimaryCulture;
    });
  }

  onRowClicked(row: UserDto): void {
    console.log('Row clicked:', row);
    console.log('User ID:', row.id);
  }
}
