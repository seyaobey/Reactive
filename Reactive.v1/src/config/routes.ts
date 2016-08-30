﻿
/// <reference path="../lib/jx.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import {Types} from '../lib/jx';


export var routes: Types.RouteList = {
    '/': {
        url: 'home/home',        
        title: 'Account',
        path: ['<a href="/account/dashboard">Company</a>', '<strong>Dashboard</strong>']
    },

    '/login': {
        params:'login',
        url: 'home/home',
    },

    '/account/dashboard': {
        url: 'company/account',
        title: 'Account',
        path: ['<a href="/account/dashboard">Company</a>', '<strong>Dashboard</strong>']
    },

    '/account/settings': {
        url: 'company/account',
        title:'Account',
        path: ['<a href="/account/settings">Company</a>', '<strong>Settings</strong>' ]
    },

    '/account/organization': {
        url: 'company/account',
        params:'organization',
        title: 'Account',
        path: ['<a href="/account/organization">Company</a>', '<strong>Organization</strong>']
    },

    '/account/employees': {
        url: 'company/account',
        title: 'Account',
        path: ['<a href="/account/employees">Company</a>', '<strong>Employees</strong>']
    },

    '/profiles/explore': {
        url: '/profiles/profiles_explore',
        title: 'Profiles',
        path: ['<a href="/profiles/explore">Profiles</a>', '<strong>Explore</strong>']
    },
    
}
