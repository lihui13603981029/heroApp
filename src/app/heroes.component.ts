import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { Router }            from '@angular/router';
import { HeroService } from './hero.service';


@Component({
  selector: 'my-heroes',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class HeroesComponent implements OnInit{
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  
  constructor(
  	private heroService: HeroService,
		private router: Router
  ){}


	ngOnInit(): void {
		this.getHeroes();
	}
	
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    
  }
  getHeroes(): void{
  	this.heroService.getHeroes().then(heroes =>this.heroes = heroes);
  }
  gotoDetail(): void {
	  this.router.navigate(['/detail', this.selectedHero.id]);
	}
  
  add(name:string ):void {
  	name = name.trim();
  	if (!name){return;}
  	this.heroService.create(name)
  			.then(hero => {
  				this.heroes.push(hero);
  				this.selectedHero = null;
  			});
  }
  deleted(hero: Hero):void {
  	this.heroService
  		.deleted(hero.id)
  		.then(()=> {
  				this.heroes = this.heroes.filter(h => h != hero);
  				if(this.selectedHero === hero) {
  						this.selectedHero = null;
  				}
  		});
  }
}