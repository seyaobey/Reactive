/// <reference path="profiles_basic_wiz_page.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import core = require('../../lib/core');
import pn = require('../../ctrls/panels');
import bsi = require('./profiles_basic_wiz_page');


import rb = require('react-bootstrap');
var b: any = rb;



export class ProfileAddWizard extends core.base.BaseView {


    render() {

        var html = 
            <pn.BasePanel className="animated fadeInRight" style={{ minHeight: 350 }}>
                <h2><i className="fa fa-plus-circle"></i> <span>New profile</span> <a className="text-warning pull-right" style={{ marginRight: 20 }}><i className="fa fa-reply"></i> cancel</a></h2>

                <hr />

                {this.build_wizard()}

            </pn.BasePanel>


        return html;

    }


    componentDidMount() {

        this.init_wizard();

    }



    build_wizard() {

        var html =

            <div id="new-art-wiz" className="row">

                <h3>Basic info</h3>
                <section>
                    <h2>Profile basic information</h2>
                </section>
                <h3>Occupations</h3>
                <section>
                    <h2>Professional occupational selection</h2>
                </section>
                <h3>Profiles/Skills</h3>
                <section>
                    <h2>Professional profiles / skills selection</h2>
                </section>
                <h3>Skills</h3>
                <section>
                    <h2>Complete</h2>
                </section>
            </div>

        return html;
    }



    init_wizard() {

        var that = this;

        this.root.find('#new-art-wiz')['steps']({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "fade",
            autoFocus: true,

            onInit: (event, currentIndex) => {

                //this.active_page = 0;

                //this.get_active_page().activate_page();

            },

            onStepChanged: (event, current, prior) => {

                //that.active_page = current;

                //this.get_active_page().activate_page();
            },

            onStepChanging: (event, current, next) => {

                var ok = true;

                var forward = next > current;

                //if (forward) {

                //    if (current === 0) {

                //        if (!this['searchindex'] || !this['keywords']) {
                //            ok = false;
                //        }
                //    }

                //    if (current === 1) {

                //        var list = (this.refs['select-page'] as AmazonArticlesSelection_Page).selection_list;

                //        if (!list || list.length === 0) {
                //            ok = false;
                //        }
                //    }

                //}



                return ok;
            }
        });

    }

}