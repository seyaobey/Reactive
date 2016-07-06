
/// <reference path="../lib/jx.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import {Types} from '../lib/jx';


export var routes: Types.RouteList = {
    '/': {
        url: 'home/home',        
    },

    '/panels': {
        url: 'home/home',      
    },

    '/edit-controls': {
        url: 'home/home'        
    },
    
}
