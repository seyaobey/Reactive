// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import core = require('../../lib/core');
import pn = require('../../ctrls/panels');

import rb = require('react-bootstrap');
var b: any = rb;



export class ProfileEditView extends core.base.BaseView {


    render() {

        var html =
            <pn.BasePanel style={{ minHeight: 350 }}>
                <h2><i className="fa fa-edit"></i> Edit profile</h2>
                <hr />
            </pn.BasePanel>


        return html;

    }

}