import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import $ from 'jquery';
import { Model } from './model';
import { buildChores } from './builder';

export default function Start(){

    'use strict';

    const model = new Model();

    model.subscribeChores(buildChores);

    model.init();    
    
    Observable.fromEvent($('#addChore'), 'click')
        
        .subscribe((event)=>{    

            let newChore = [{"id":null,"name":$("#newChore").val(), userId:null }];

            model.addChores(newChore);
            
            $("#newChore").val('');

        }, () => {})

    Observable.fromEvent($("#choresList"), 'click')
        
        .subscribe((event) => {

            let id = $(event.target).attr("id");

            model.deleteChores(id);
        });

    Observable.fromEvent($("#sortChores"), 'click')
        
        .subscribe((event) => {
            
            model.sortChores();
        });
}