import _ from 'lodash';
import $ from 'jquery';

const choresTemplate = `<% _.forEach(chores, function(chore) 
        { %><tr>
            <td><%- chore.name %></td>
            <td><button id="<%- chore.id %>" class="btn btn-xs">remove</button></td>
        </tr><% }
    ); %>`;

function buildChores(chores){

    'use strict';

    let compiledTemplate = _.template(choresTemplate);

    $('#choresList').empty()
    
        .append( compiledTemplate( { 'chores': chores } ) );
}

export { buildChores };