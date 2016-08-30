// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import core = require('../../lib/core');
import pn = require('../../ctrls/panels');
import bsi = require('./profiles_wiz_basicinfo');


import rb = require('react-bootstrap');
var b: any = rb;


export interface ProfileWizardWizardWizard_BasePageProps extends core.base.BaseProps {    
    page_index: number
}

interface ProfileWizardWizard_BasePageState extends core.base.BaseState {
}
export class ProfileWizard_BasePage extends core.base.BaseView {

    props: ProfileWizardWizardWizard_BasePageProps;
    state: ProfileWizardWizard_BasePageState;

    constructor(props: ProfileWizardWizardWizard_BasePageProps) {

        super(props);

        this.props.owner['add_page'](this);
    }


    get is_active_page(): boolean {
        return this.props.page_index === this.props.owner['active_page'];
    }


    activate_page() {
        this.forceUpdate();
    }


    render() {

        var html =

            <div className="row" style={{ minHeight: 300 }}>

                <div className="col-lg-12">

                    <h2>{this.get_title() }</h2>

                    <hr />

                    {this.build_content() }

                </div>

            </div>


        return html;
    }

    get_title() {

        return <span>Wizard page</span>
    }


    componentDidMount() {

        super.componentDidMount();

        this.forceUpdate();
    }


    build_content() {

        if (!this.is_active_page) {
            return null;
        }

        return this.internal_build_content();

    }


    internal_build_content() {
        return null;
    }
}