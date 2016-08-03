/// <reference path="profiles_add_wizard.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import core = require('../../lib/core');
import pn = require('../../ctrls/panels');
import wz = require('./profiles_add_wizard');
import ed = require('./profiles_edit_view');

import rb = require('react-bootstrap');
var b: any = rb;



export interface ProfilesExplorerProps extends core.base.BaseProps {
    params?: any
}

interface ProfilesExplorerState extends core.base.BaseState {
    right_view: string
}

export class ProfilesExplorer extends core.base.BaseView {

    props: ProfilesExplorerProps;
    state: ProfilesExplorerState;

    render() {

        var html =
            <b.Row className="animated fadeInRight">

                <b.Col md={5} xs={12}>

                    <pn.BasePanel style={{ minHeight: 350 }}>
                        <h2>Profiles <button className="btn btn-primary pull-right btn-new-profile"><i className="fa fa-plus-circle"></i> Add new </button></h2>
                        <hr />
                    </pn.BasePanel>

                </b.Col>

                <b.Col md={7} xs={12}>

                    {this.resolve_right_view()}
                    
                </b.Col>

            </b.Row>


        return html;
    }


    componentDidMount() {

        super.componentDidMount();
        
        this.update_url_path();

        this.exit_login();   

        this.init_actions();
        
        this.highlight_active_menu();

    }


    init_actions() {

        this.root.find('.btn-new-profile').click(() => {

            this.setState(_.extend(this.state, {
                right_view:'add_new_profile'
            } as ProfilesExplorerState))
        });
    }

    
    highlight_active_menu() {

        $('.sidebar-collapse li').removeClass('active');
        $('.sidebar-collapse li a').removeClass('active');

        var menu = this.props.params;

        if (!menu || menu === '/') {
            menu = '/profiles/explore'
        }

        $('.nav-second-level [href="{0}"]'.format(menu)).closest('li').addClass('active');
        $('.nav-second-level [href="{0}"]'.format(menu)).parents('li').last().addClass('active');
    }

    resolve_right_view() {

        switch (this.state.right_view) {

            case 'add_new_profile': {
                return <wz.ProfileAddWizard owner={this}  />
            }


            default:
                return <ed.ProfileEditView owner={this} />
        }

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