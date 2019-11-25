import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iron-sgc';

  private mediaMatch: MediaQueryList = matchMedia("(max-width:950px)")
  routeId;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  //  this.recebeSessao();
  }

//  recebeSessao(){

//   this.routeId = location.pathname.split('/')[2];
//   console.log('ROUTE ID APP ', this.routeId);

//     this.authService.recebeDadosLogin(this.routeId).subscribe(
//       data => {
//         const { userData } = data

//         console.log(userData);


//         sessionStorage.setItem('user', userData.map(id => id.userId))
//         sessionStorage.setItem('person', userData.map(idPerson => idPerson.pessoaId))
//         sessionStorage.setItem('token', userData.map(tk => tk.token))

//         // console.log(userData);
//       },
//       error => {
//         console.log(error)
//       }
//     );
//   }

  telaMenor(){
    return this.mediaMatch.matches;
  }

}
