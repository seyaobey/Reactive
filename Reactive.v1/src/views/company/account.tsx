/// <reference path="dashboard.tsx" />
/// <reference path="organization.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import core = require('../../lib/core');
import pn = require('../../ctrls/panels');
import { OrganizationView, OrganizationViewProps } from './organization';
import { DashboardView } from './dashboard';

import rb = require('react-bootstrap');
var b: any = rb;


export interface AccountViewProps extends core.base.BaseProps {
    params?: any
}
export class AccountView extends core.base.BaseView {

    props: AccountViewProps;


    render() {

        var html =
            <div className="row">
                <b.Col xs={12}>
                    {this.resolve_content() }
                </b.Col>
            </div>


        return html;
    }


    update_url_path() {

        var route: core.types.RouteInfo = this.app.router.current_route;

        $('.path-title').html(route.title);
        $('.path-url li').not('.path-home').remove();

        _.each(route.path, p => {
            $('.path-url ol').append($('<li>{0}</li>'.format(p)));
        });
    }


    exit_login() {

        $('body').removeClass('gray-bg');

        $('#wrapper').show();

        $('.login-view').hide();

    }


    resolve_content() {

        if (this.props.params) {

            return this.resolve_subview();

        } else {

            return this.default_content();

        }

    }


    default_content() {

        return <DashboardView />

    }


    resolve_subview() {

        switch (this.props.params) {

            case '/account/organization':
                return <OrganizationView />;

            default:
                return this.default_content();
        }

    }


    componentDidMount() {

        super.componentDidMount();

        $.getScript('/js/inspinia.js');

        this.update_url_path();

        this.highlight_active_menu();
    }


    highlight_active_menu() {

        $('.sidebar-collapse li').removeClass('active');
        $('.sidebar-collapse li a').removeClass('active');

        var menu = this.props.params;

        if (!menu || menu === '/') {
            menu = '/account/dashboard'
        }

        $('.nav-second-level [href="{0}"]'.format(menu)).closest('li').addClass('active');
        $('.nav-second-level [href="{0}"]'.format(menu)).parents('li').last().addClass('active');
    }

}