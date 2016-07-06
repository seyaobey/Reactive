/// <reference path="../../../typings/toastr/toastr.d.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import core = require('../../lib/core');
import pn = require('../../ctrls/panels');

import rb = require('react-bootstrap');
var b: any = rb;


export interface EditDivisionProps extends core.base.BaseProps {
    divid: string
}

export class EditDivision extends core.base.BaseView {

    props: EditDivisionProps;
    item: any;
    
    render() {
        
        var html =
            <pn.BasePanel className="animated fadeInRight" >

                <div className="row" style={{ paddingLeft: 20, paddingRight: 20 }}>

                    <h3 style={{ display: 'inline-block' }}>Edit division</h3>

                    <a href="#" className="btn btn-warning pull-right" style={{ marginLeft: 10 }}><i className="fa fa-times"></i> cancel</a>
                    <a href="#" className="btn btn-success pull-right btn-save btn-save" onClick={this.save.bind(this)}><i className="fa fa-check"></i> save</a>
                </div>

                <hr />

                <div className="row" style={{ paddingLeft: 20, paddingRight: 20 }}>

                    <form role="form">
                        <div className="form-group"><label>Title</label> <input type="text" data-bind="textInput:compdiv_title" id="compdiv_title" className="form-control" placeholder="Enter a title" /></div>
                        <div className="form-group"><label>Description</label> <textarea  data-bind="textInput:compdiv_descr"  id="compdiv_descr" rows={4} className="form-control" placeholder="Enter a division" /></div>
                    </form>

                </div>

                <br />

                <div className="department hidden">
                    
                    <div className="row" style={{ paddingLeft: 20, paddingRight: 20 }}>

                        <h3 style={{ display: 'inline-block' }}>Departments</h3>

                        <a href="#" className="btn btn-warning btn-outline pull-right" style={{ marginLeft: 10 }}><i className="fa fa-times"></i> cancel</a>
                        <a href="#" className="btn btn-success btn-outline pull-right" style={{ marginLeft: 10 }}><i className="fa fa-check"></i> save</a>
                        <a href="#" className="btn btn-primary pull-right" style={{ marginLeft: 10 }}><i className="fa fa-plus"></i> new department</a>

                    </div>

                    <hr />

                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Department</th>
                                <th>Description</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td> @mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td> @fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td> @twitter</td>
                            </tr>
                        </tbody>
                    </table>

                </div>




            </pn.BasePanel>



        return html;

    }


    componentDidMount() {

        super.componentDidMount();

        this.forceUpdate();
    }


    componentDidUpdate() {

        if (this.props.divid) {
            
            // load data + bind

            utils.spin(this.root);

            this.load_data().then(() => {

                ko.cleanNode(this.root[0]);

                ko.applyBindings(this.item, this.root[0]);

                this.jget('.department').removeClass('hidden')
                
            }).finally(() => {

                utils.unspin(this.root);

            });
        }
    }



    load_data() {

        var model = Backendless.Persistence.of('compdivs');

        var qry = new Backendless.DataQuery();
        

        qry.condition = "objectId = '{0}'".format(this.props.divid);
        qry.options = { relations: ["depts"] };

        var d = Q.defer();
        
        var that = this;

        model.find(qry, new Backendless.Async((res: any) => {

            that.item = ko['mapping'].fromJS(res.data[0]);
            
            d.resolve(true);

        }, err => {
            
            d.reject(false);

        }));

        return d.promise;

    }

    save() {

        if (!this.props.divid) {

            return this.add_div();

        } else {

            return this.save_div();
        }
    }


    add_div() {

        var model = Backendless.Persistence.of('compdivs');
        var obj = new CompDiv();
        obj['usrid'] = Backendless.UserService.getCurrentUser()['objectId'];
        obj['compdiv_title'] = this.root.find('#compdiv_title').val();
        obj['compdiv_descr'] = this.root.find('#compdiv_descr').val();

        if (!obj || !obj['compdiv_title']) {
            toastr.error('Title not found');
            return Q.reject(false);
        }

        var d = Q.defer();

        model.save(obj, new Backendless.Async(res => {

            toastr.success('Data saved successfully');

            this.props.owner.notify('update_list');

            d.resolve(true);

        }, err => {

            toastr.error(err['message']);

            d.reject(false);

        }));

        return d.promise;
        
    }



    save_div() {

        var obj = ko['mapping'].toJS(this.item);

        if (!obj || !obj['compdiv_title']) {
            toastr.error('Title not found');
            return Q.reject(false);
        }

        utils.spin(this.root);

        var model = Backendless.Persistence.of('compdivs');

        var d = Q.defer();

        model.save(obj, new Backendless.Async(res => {

            toastr.success('Data saved successfully');
            
            this.props.owner.notify('update_list');

            d.resolve(true);

        }, err => {
            
            toastr.error(err['message']);

            d.reject(false);
        }));

        return d.promise;
    }

}


class CompDiv {
    usrid: string
    compdiv_title: string
}