/// <reference path="edit_division.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import core = require('../../lib/core');
import pn = require('../../ctrls/panels');

import rb = require('react-bootstrap');
var b: any = rb;

import { EditDivision, EditDivisionProps} from './edit_division';


interface OrganizationViewState extends core.base.BaseState {
    divid: string
}
export interface OrganizationViewProps extends core.base.BaseProps {    
}
export class OrganizationView extends core.base.BaseView {

    props: OrganizationViewProps;
    state: OrganizationViewState;
    divs_data: any[];
    first_load: boolean;

    constructor(props: OrganizationViewProps) {
        super(props);
        this.state.loading = true;
        this.first_load = true;
    }

    render() {

        var html =
            <b.Row className="animated fadeInRight">
                <b.Col md={5} xs={12}>

                    <pn.BasePanel style={{ minHeight: 350 }}>
                        {this.get_divs_list()}
                    </pn.BasePanel>

                </b.Col>

                <b.Col md={7} xs={12}>

                    <div className="division-placeholder">
                    </div>

                    
                </b.Col>

            </b.Row>


        return html;

    }


    componentDidMount() {
        super.componentDidMount();
        this.forceUpdate();
    }

    skip: boolean;

    componentDidUpdate() {


        if (this.state.loading) {

            utils.spin(this.root);
            
            this.load_divs_data().then(() => {

                this.setState(_.extend({}, this.state, {
                    loading: false
                }));

                this.state.divid = null;

            }).finally(() => {

                utils.unspin(this.root);

            }).done(() => {

            });
        }

        if (!this.state.loading)
        {
            if (this.divs_data && this.divs_data.length > 0) {

                if (this.first_load) {

                    this.first_load = false;

                    this.refs['divs_listview']['select'](this.divs_data[0]['objectId'])
                    
                }
            }
        }

    }



    load_divs_data() {

        var model = Backendless.Persistence.of('compdivs');

        var qry = new Backendless.DataQuery();

        qry.condition = "usrid = '{0}'".format(Backendless.UserService.getCurrentUser()['objectId']);
        qry.options = { relations: ["depts"] };

        var d = Q.defer();

        utils.spin(this.root);

        model.find(qry, new Backendless.Async((res: any) => {

            this.divs_data = res.data;

            utils.unspin(this.root);

            this.setState({
                loading: false
            });

            d.resolve(true);

        }, err => {

            utils.unspin(this.root);

            this.setState({
                loading: false
            });

            d.reject(false);

        }));

        return d.promise;
    }

    count: number;



    add_division() {

        ReactDOM.unmountComponentAtNode(this.jget('.division-placeholder')[0]);

        ReactDOM.render(<EditDivision divid={null} owner={this} />, this.jget('.division-placeholder')[0]);
        
    }


    edit_division(id:any) {


        ReactDOM.unmountComponentAtNode(this.jget('.division-placeholder')[0]);

        this.jget('.division-placeholder').empty();

        this.state.divid = id;

        ReactDOM.render(<EditDivision divid={id} owner={this} />, this.jget('.division-placeholder')[0]);
    }


    cancel_edit(id: any) {
        
        this.edit_division(id);
    }



    get_divs_list() {

        var selectid = this.state.divid;
        
        var html =
            <div>
                
                <div className="row" style={{ paddingLeft: 20, paddingRight: 20 }}>

                    <h2 style={{ display: 'inline-block' }}>Company divisions</h2>

                    <a href="#" className="btn btn-primary btn-outline pull-right" onClick={this.add_division.bind(this)}><i className="fa fa-plus"></i> new division</a>
                </div>

                <hr />

                <div>

                    <DivisionList ref='divs_listview' data={this.divs_data} select_id={selectid} owner={this} />

                </div>

                
            </div>

        return html;

    }


    notify(cmd: string, data?: any): Q.Promise<any> {

        switch (cmd) {

            case "update-list":

                this.setState(_.extend({}, this.state, {
                    selected_divid: data,
                    loading : true
                }));

                return Q.resolve(true);

            default:
                return super.notify(cmd, data);
        }
        
    }
}




interface DivisionListProps extends core.base.BaseProps {
    data: any[],
    select_id?: string
}

interface DivisionListState extends core.base.BaseState {
    
}

class DivisionList extends core.base.BaseView{

    props: DivisionListProps;
    state: DivisionListState;

    render() {

        var html = 
            <ul id= "inprogress" className= "sortable-list connectList agile-list" >

                {
                    _.map(this.props.data, div => {

                        return this.get_divs_view(div);
                    })
                }
                
           </ul >
        
        return html;

    }


    select(id: string) {
        this.edit_div(id);
    }


    get_divs_view(div: any) {

        if (this.state.loading) {
            return;
        }

        var type: string = 'info-element';

        if (this.props.select_id === div['objectId']) {

            type = 'danger-element highlight';

        }

                
        var html =
            <li key={div['objectId']} data-rowid={div['objectId']} className={type}>
                <a href='javascript:void(0)' style={{ display: 'block', fontSize: 15 }}>{div['compdiv_title']}</a>
                <span className="text-muted">{div['compdiv_descr']}</span>
                <div className="agile-detail row" style={{ paddingRight: 10, marginTop:0 }}>
                    <div className="pull-right">
                        <a className="btn btn-xs btn-white btn-edit" href="javascript:void(0)" onClick={() => { this.edit_div(div['objectId']) } } style={{ marginRight: 10 }}><i className="fa fa-edit"></i> edit</a>
                        <a className="btn btn-xs btn-white" href="javascript:void(0)"><i className="fa fa-times"></i> delete </a>
                    </div>

                </div>
            </li>

        return html;

    }



    componentDidMount() {
        super.componentDidMount();
        this.forceUpdate();
    }


    componentDidUpdate() {

    }


    edit_div(id) {
        
        this.jget('.danger-element').removeClass('danger-element highlight').addClass('info-element');

        this.jget('[data-rowid="{0}"]'.format(id)).removeClass('info-element').addClass('danger-element highlight');

        this.props.owner['edit_division'](id);

    }

}

