import { Component, OnInit, VERSION } from '@angular/core';
import { BehaviorSubject, from, of, Subject } from 'rxjs';
import { tap, map, debounceTime, mergeMap, finalize } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name: any = new Subject();
  dt: any = of({
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  });
  start() {
    $('body').append("<div class='loader'></div>");
  }
  stop() {
    $('.loader').last().remove();
  }

  p:any = of([])
  oa(d) {
    return d;
  }
  pp = (a, ...b) => a.pipe(...b);
  mp1 = (d) => {
    console.log('action');
    return d + '_added';
  };
  aj(num = undefined) {
    let that = this;
    if (num == undefined) num = Number(Math.floor(Math.random() * 100)) + 1;
    return of([]).pipe(
      tap((d) => {
        that.start();
      }),
      mergeMap((d) =>
        from(
          fetch('https://jsonplaceholder.typicode.com/todos/' + num).then(
            (response) => response.json(),
            (err) => {
              return this.aj(Number(Math.floor(Math.random() * 10)) + 1);
            }
          )
        )
      ),
      finalize(() => {
        that.stop();
      })
    );
  }
  nest() {
    return this.pp(
      this.aj(),
      mergeMap((d) => this.aj()),
      mergeMap((d) => this.aj()),
      mergeMap((d) => this.aj())
    );
  }
  ngOnInit() {
    this.dt = this.pp(
      this.name,
      // debounceTime(500),
      // map(this.mp1),
      mergeMap((d) => this.nest())
    );
  }
  change() {
    this.name.next(new Date().getTime());
  }
  change2() {
    let that = this;
    this.p = this.pp(this.nest(),tap(d =>{
      that.name.next(new Date().getTime()); 
    }))
    
  }
}
