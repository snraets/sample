import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin'

import _ from 'lodash';

class Model {
    constructor(){
        this.chores = [];
        this.users = [];

        this.choresSubject = new Subject();
        this.usersSubject = new Subject();
    }

    init(){

        let model = this; 
        let addChores = this.addChores;

        this.choresSubject.subscribe();      

        let choresObservable = Observable.ajax({
            url: 'http://localhost:3000/chores',
            method: 'GET'
        })

            .map((results) => results.response);

        let usersObservable = Observable.ajax({
            url: 'http://localhost:3000/users',
            method: 'GET'
        })

            .map((results) => results.response);

        Observable.forkJoin( choresObservable, usersObservable )

            .subscribe((results) => {

                let boundAddChores = addChores.bind(model);

                boundAddChores(results[0]);
            });
    }

    subscribeChores(observer){
        this.choresSubject.subscribe(observer);
    }

    updateChores(){
        this.choresSubject.next( this.chores );
    }

    addChores(chores){

        let model = this;
        let updateChores = this.updateChores;
        let choresCallList = [];   

        let newChores = _.filter(chores, {"id": null});

        if(newChores.length === 0){
            this.chores.push(...chores);   
            this.updateChores();            
        }
        else{

            _.forEach(newChores, (chore) => {
                
                choresCallList.push( 
                    Observable.ajax({
                        url: 'http://localhost:3000/chores',
                        method: 'POST',
                        body: {"name": chore.name}
                    }));
            });

            Observable.forkJoin.apply(null, choresCallList)

                .subscribe((results) => {

                    let boundUpdateChores = updateChores.bind(model);

                    _.forEach(results, (AjaxResponse) => {
                        model.chores.push(AjaxResponse.response);
                    });

                    boundUpdateChores();
                });            
        } 

        return this.chores;
    }

    sortChores(){
        this.chores = _.sortBy(this.chores, ['name']);
        this.updateChores();
    }

    deleteChores(id){

        let parsedIndex = parseInt(id);
        let model = this;
        let updateChores = this.updateChores;

        Observable.ajax({
            url: 'http://localhost:3000/chores/' + id,
            method: 'delete',
        }).subscribe(() => {

            let boundUpdateChores = updateChores.bind(model);

            model.chores = _.pullAllBy(model.chores, [{ 'id': parsedIndex }], 'id');
            boundUpdateChores();
        }); 
    }
}

export { Model }