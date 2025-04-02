import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/pages/home/cabecalho/home.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-root',
    imports: [HomeComponent, ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent{

}
