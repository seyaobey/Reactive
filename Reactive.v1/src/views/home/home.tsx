/// <reference path="../../lib/core.tsx" />
/// <reference path="../../ctrls/panels.tsx" />
/// <reference path="../../../typings/react/react-bootstrap.d.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import core = require('../../lib/core');
import pn = require('../../ctrls/panels');

import rb = require('react-bootstrap');
var b: any = rb;


export interface HomeViewProps extends core.base.BaseProps {
    params?: any
}
export class HomeView extends core.base.BaseView {

    props: HomeViewProps;


    render() {

        var html =
            <div className="row">
                {this.resolve_content()}
            </div>


        return html;
    }


    resolve_content() {

        if (this.props.params) {

            return this.resolve_subview();

        } else {

            return this.default_content();

        }

    }


    default_content() {

        return <div className="col-lg-12 animated fadeInRight">
                    <div className="text-center m-t-lg">
                        <h1>
                            Welcome in StampHR
                        </h1>
                        <small>
                            It is an application skeleton for a typical web app.You can use it to quickly bootstrap your webapp projects and dev environment for these projects.
                        </small>
                    </div>
               </div>

    }


    resolve_subview() {

        switch (this.props.params) {

            case '/panels':

                return <Panels />

            case '/edit-controls':

                return <Panels />

            default:
                return this.default_content();
        }

    }


    componentDidMount() {

        super.componentDidMount();

        this.highlight_active_menu();
    }


    highlight_active_menu() {

        $('.sidebar-collapse li').removeClass('active');
        $('.sidebar-collapse li a').removeClass('active');
        
        var menu = this.props.params;
        
        $('[href="{0}"]'.format(menu)).closest('li').addClass('active');
        $('[href="{0}"]'.format(menu)).parents('li').last().addClass('active');
    }

}


class Panels extends core.base.BaseView {

    render() {
        
        var html =
            <div className="col-lg-12 animated fadeInRight">

                <div className="col-lg-6">

                    <pn.BasePanel title="Default container">

                        <h4>Some random content</h4>

                        <p>
                            Aenean commodo ligula eget dolor.Aenean massa.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim.</p>
                        <p>
                            Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.Nullam dictum felis eu pede mollis pretium.Integer tincidunt.Cras dapibus.Vivamus elementum semper nisi.
                        </p>
                    </pn.BasePanel>

                </div>

                <div className="col-lg-6">

                    <pn.BasePanel title="Default container" toolbox={true}>

                        <h4>Basic panel with toolbox</h4>

                        <p>
                            Aenean commodo ligula eget dolor.Aenean massa.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.Nulla consequat massa quis enim.</p>
                        <p>
                            Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.Nullam dictum felis eu pede mollis pretium.Integer tincidunt.Cras dapibus.Vivamus elementum semper nisi.
                         </p>
                        
                    </pn.BasePanel>

                </div>


                <div className="col-lg-6">

                    <pn.BasePanel title="Bootstrap classic panel" toolbox={true}>

                        <h4>Bootstrap classic panel</h4>

                        <b.Panel header="Bootstrap" bsStyle="primary">
                            Panel content
                        </b.Panel>

                   </pn.BasePanel>

               </div>

            </div>

        return html;

    }


    componentDidMount() {



    }

}

