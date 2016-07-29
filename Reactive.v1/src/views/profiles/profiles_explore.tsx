// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import core = require('../../lib/core');
import pn = require('../../ctrls/panels');

import rb = require('react-bootstrap');
var b: any = rb;



export interface ProfilesExplorerProps extends core.base.BaseProps {
    params?: any
}
export class ProfilesExplorer extends core.base.BaseView {

    props: ProfilesExplorerProps;

    render() {

        var html =
            <b.Row className="animated fadeInRight">

                <b.Col md={5} sm={12} xs={12}>

                    <pn.BasePanel>
                        <h2>Profiles <button className="btn btn-primary pull-right"><i className="fa fa-plus-circle"></i> Add new </button></h2>
                        <hr />
                    </pn.BasePanel>

                </b.Col>

                <b.Col md={7} sm={12} xs={12}>

                    <pn.BasePanel>
                        <h2><i className="fa fa-edit"></i> Edit profile</h2>
                    </pn.BasePanel>


                </b.Col>

            </b.Row>


        return html;
    }


    componentDidMount() {

        super.componentDidMount();
        
        this.update_url_path();

        this.exit_login();   

        this.highlight_active_menu();

    }


    highlight_active_menu() {

        $('.sidebar-collapse li').removeClass('active');
        $('.sidebar-collapse li a').removeClass('active');
        $('.sidebar-collapse .collapse').removeClass('in');

        var menu = this.props.params;

        if (!menu || menu === '/') {
            menu = '/profiles/explore'
        }

        $('.nav-second-level [href="{0}"]'.format(menu)).closest('.collapse').addClass('in');
        $('.nav-second-level [href="{0}"]'.format(menu)).closest('li').addClass('active');
        $('.nav-second-level [href="{0}"]'.format(menu)).parents('li').last().addClass('active');
    }


    exit_login() {

        $('body').removeClass('gray-bg');

        $('#wrapper').show();

        $('.login-view').hide();

    }


    update_url_path() {

        var route: core.types.RouteInfo = this.app.router.current_route;

        $('.path-title').html(route.title);
        $('.path-url li').not('.path-home').remove();

        _.each(route.path, p => {
            $('.path-url ol').append($('<li>{0}</li>'.format(p)));
        });
    }

}