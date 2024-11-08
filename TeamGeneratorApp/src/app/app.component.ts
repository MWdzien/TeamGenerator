import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newMemberName: string = "";
  members: string[] = [];
  errorMessage: string = "";
  numberOfTeams: number | "" = "";
  teams: string[][] = [];

  updateNewMemberName(inputValue: string) {
    this.newMemberName = inputValue;
  }

  addMember() {
    if (!this.newMemberName.replaceAll(" ", "")){
      this.errorMessage = "Name can't be empty";
      return;
    }
    this.errorMessage = "";

    this.members.push(this.newMemberName);
    this.newMemberName = "";
  }

  updateTeamNumber(inputValue: string){
    this.numberOfTeams = Number(inputValue);
  }

  assignTeams(){
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMessage = "Invalid number of teams"
      return;
    }

    if (this.numberOfTeams > this.members.length){
      this.errorMessage = "Not enough members"
      return;
    }

    this.errorMessage = "";
    this.teams = Array.from({ length: this.numberOfTeams }, () => []);

    const shuffledMembers = [...this.members].sort(() => Math.random() - 0.5);

    shuffledMembers.forEach((member, idx) => {
      const teamIndex = idx % Number(this.numberOfTeams);
      this.teams[teamIndex].push(member);
    });
  }



}
