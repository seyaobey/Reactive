﻿/// <reference path="../company/account.tsx" />
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
import { AccountView } from '../company/account';

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

        if (this.app.router.params === 'login' || !Backendless.UserService.getCurrentUser()) {

            return null;
            
        } else {
            
            return <AccountView />

        }
        
    }


    enter_login() {

        $('body').addClass('gray-bg');

        $('.login-view').show();

        $('#wrapper').hide();
        
    }


    exit_login() {

        $('body').removeClass('gray-bg');

        $('#wrapper').show();

        $('.login-view').hide();

    }


    resolve_subview() {

        switch (this.props.params) {
            default:
                return this.default_content();
        }
    }



    componentDidMount() {


        super.componentDidMount();
        
        if (this.app.router.params === 'login' || !Backendless.UserService.getCurrentUser()) {

            this.enter_login();

            ReactDOM.render(<Login />, $('.login-view')[0]);

        } else {

            this.exit_login();
        }
        
        this.highlight_active_menu();
    }

 
    highlight_active_menu() {

        $('.sidebar-collapse li').removeClass('active');
        $('.sidebar-collapse li a').removeClass('active');

        var menu = this.props.params;

        if (!menu || menu === '/') {
            menu = '/account/dashboard'
        }

        $('.nav-second-level [href="{0}"]'.format(menu)).closest('.collapse').addClass('in');
        $('.nav-second-level [href="{0}"]'.format(menu)).closest('li').addClass('active');
        $('.nav-second-level [href="{0}"]'.format(menu)).parents('li').last().addClass('active');
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



class Login extends core.base.BaseView {

    render() {

        var html = 
            <div className="middle-box text-center loginscreen animated fadeInDown">
                <div>
                    <div className="text-center">
                        <h1 className="logo-name">HR+</h1>
                    </div>
                    <h3>Welcome to Stamp HR</h3>
                    <p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
                        {/*Continually expanded and constantly improved Inspinia Admin Them (IN+)*/}
                    </p>
                    <p>Login in.To see it in action.</p>
                    <form action="index.html" role="form" className="m-t">
                        <div className="form-group">
                            <input type="email" required placeholder="Username" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input type="password" required placeholder="Password" className="form-control" />
                        </div>
                        <button className="btn btn-primary block full-width m-b btn-login" type="button">Login</button>
                        <a href="#"><small>Forgot password?</small></a>
                        <p className="text-muted text-center"><small>Do not have an account?</small></p>
                        <a href="register.html" className="btn btn-sm btn-white btn-block">Create an account</a>
                    </form>
                    <p className="m-t"> <small>Inspinia we app framework base on Bootstrap 3 © 2014</small> </p>
                </div>
            </div>

        return html


    }



    componentDidMount() {
        
        $('.btn-login').off('click');
        $('.btn-login').click(() => {

            this.login($(this.root).find('[type="email"]').val(), $(this.root).find('[type="password"]').val())

        });

        this.login('seyaobey@gmail.com','JazzTheSoul1.')
    }


    private login(email: string, password: string) {

        utils.spin($('body'));
        
        Backendless.UserService.login(email, password, true, new Backendless.Async(res => {
            utils.unspin($('body'));
            toastr.success('Login was successfull');
            this.app.router.navigate('/');
        }, err => {
            utils.unspin($('body'));
            toastr.error(err['message']);
        }));

    }
}

