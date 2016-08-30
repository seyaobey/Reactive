/// <reference path="profile_wizard_basepage.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import core = require('../../lib/core');
import pn = require('../../ctrls/panels');
import bw = require('./profile_wizard_basepage');

import rb = require('react-bootstrap');
var b: any = rb;



export class ProfileWizard_BaseInfo_Page extends bw.ProfileWizard_BasePage {

    props: bw.ProfileWizardWizardWizard_BasePageProps;


    build_content() {

        var html = 
            <form role="form">
                <div className="form-group"><label>Profile title</label> <input type="text" placeholder="Enter a profile title" className="form-control" /></div>
                <div className="form-group"><label>Password</label> <input type="password" placeholder="Password" className="form-control" /></div>                
            </form>


        return html;

    }


    get_title() {

        return <span>Basic information</span>
    }


}