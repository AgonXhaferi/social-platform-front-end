import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserDto} from "../dto/user.dto";
import {FollowUserDto} from "../dto/follow-user.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) {
  }

  findUsersByPrimaryCultureId(cultureId: string): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(`http://localhost:3000/users/culture/${cultureId}`)
  }

  findUserById = (userId: string): Observable<UserDto> => {
    return this.httpClient.get<UserDto>(`http://localhost:3000/users/${userId}`)
  }

  followUser = (followUserDto: FollowUserDto): Observable<string> =>
    this.httpClient.post<string>(`http://localhost:3000/users/follow`, followUserDto)

  areUserFollowers = (followUserDto: FollowUserDto): Observable<boolean> => {
    return this.httpClient.get<boolean>(`http://localhost:3000/users/follow/are-followers`, {
        params: new HttpParams({
          fromObject: {
            followerId: followUserDto.followerId,
            followeeId: followUserDto.followeeId
          }
        })
      }
    )
  }
}
