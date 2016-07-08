// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import core = require('../../lib/core');
import pn = require('../../ctrls/panels');

import rb = require('react-bootstrap');
var b: any = rb;


export class DashboardView extends core.base.BaseView {

    render() {

        var html =

            <b.Row className="animated fadeInRight">

                <b.Col xs={12}>

                    <b.Col lg={5} md={6} xs={12}>

                        <pn.BasePanel style={{ minHeight: 350 }}>

                            <h2>Getting started</h2>

                            <br />

                            <div className="ibox-content ibox-heading" style={{ marginBottom: 30 }}>
                                <h3><a href="#">Discover Stamp HR</a></h3>
                                <small><i className="fa fa-map-marker" /> Meeting is on 6: 00am.Check your schedule to see detail.</small>
                            </div>

                            <div className="ibox-content ibox-heading"  style={{ marginBottom: 30 }}>
                                <h3><a href="#">Build your company organigram</a></h3>
                                <small><i className="fa fa-map-marker" /> Meeting is on 6: 00am.Check your schedule to see detail.</small>
                            </div>

                            <div className="ibox-content ibox-heading"  style={{ marginBottom: 30 }}>
                                <h3><a href="#">Add a new professional profile</a></h3>
                                <small><i className="fa fa-map-marker" /> Meeting is on 6: 00am.Check your schedule to see detail.</small>
                            </div>

                            <div className="ibox-content ibox-heading"  style={{ marginBottom: 30 }}>
                                <h3><a href="#">Add a new employee</a></h3>
                                <small><i className="fa fa-map-marker" /> Meeting is on 6: 00am.Check your schedule to see detail.</small>
                            </div>

                        </pn.BasePanel>

                    </b.Col>

                    <b.Col lg={7} md={6} xs={12}>

                        <div className="col-lg-4 hidden-md" style={{ paddingLeft:0 }}>
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <span className="label label-primary pull-right">Today</span>
                                    <h5>Vistits</h5>
                                </div>
                                <div className="ibox-content">
                                    <h1 className="no-margins">106, 120</h1>
                                    <div className="stat-percent font-bold text-navy">44% <i className="fa fa-level-up" /></div>
                                    <small>New visits</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4  hidden-md">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <span className="label label-danger pull-right">Low value</span>
                                    <h5>Activity</h5>
                                </div>
                                <div className="ibox-content">
                                    <h1 className="no-margins">80, 600</h1>
                                    <div className="stat-percent font-bold text-danger">38% <i className="fa fa-level-down" /></div>
                                    <small>In first month</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4  hidden-md" style={{ paddingRight: 0 }}>
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <span className="label label-info pull-right">Annual</span>
                                    <h5>Orders</h5>
                                </div>
                                <div className="ibox-content">
                                    <h1 className="no-margins">275, 800</h1>
                                    <div className="stat-percent font-bold text-info">20% <i className="fa fa-level-up" /></div>
                                    <small>New orders</small>
                                </div>
                            </div>
                        </div>


                        <div className="ibox">

                            <div className="ibox-content col-lg-12">


                                <h2>Explore Esco</h2>

                                <br />

                                <div className="col-lg-12">
                                    <div className="ibox float-e-margins">
                                        <div className="ibox-title" style={{ border: 'none' }}>
                                            <h5>Your daily feed</h5>
                                            <div className="ibox-tools">
                                                <span className="label label-warning-light pull-right">10 Messages</span>
                                            </div>
                                        </div>
                                        <div className="ibox-content">
                                            <div>
                                                <div className="feed-activity-list">
                                                    <div className="feed-element">
                                                        <a className="pull-left" href="profile.html">
                                                            <img src="/img/profile.jpg" className="img-circle" alt="image" />
                                                        </a>
                                                        <div className="media-body ">
                                                            <small className="pull-right">5m ago</small>
                                                            <strong>Monica Smith</strong> posted a new blog.<br />
                                                            <small className="text-muted">Today 5: 60 pm - 12.06.2014</small>
                                                        </div>
                                                    </div>
                                                    <div className="feed-element">
                                                        <a className="pull-left" href="profile.html">
                                                            <img src="/img/a2.jpg" className="img-circle" alt="image" />
                                                        </a>
                                                        <div className="media-body ">
                                                            <small className="pull-right">2h ago</small>
                                                            <strong>Mark Johnson</strong> posted message on <strong>Monica Smith</strong> site.<br />
                                                            <small className="text-muted">Today 2: 10 pm - 12.06.2014</small>
                                                        </div>
                                                    </div>
                                                    <div className="feed-element">
                                                        <a className="pull-left" href="profile.html">
                                                            <img src="/img/a3.jpg" className="img-circle" alt="image" />
                                                        </a>
                                                        <div className="media-body ">
                                                            <small className="pull-right">2h ago</small>
                                                            <strong>Janet Rosowski</strong> add 1 photo on <strong>Monica Smith</strong>.<br />
                                                            <small className="text-muted">2 days ago at 8: 30am</small>
                                                        </div>
                                                    </div>
                                                    <div className="feed-element">
                                                        <a className="pull-left" href="profile.html">
                                                            <img src="/img/a4.jpg" className="img-circle" alt="image" />
                                                        </a>
                                                        <div className="media-body ">
                                                            <small className="pull-right text-navy">5h ago</small>
                                                            <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>.<br />
                                                            <small className="text-muted">Yesterday 1: 21 pm - 11.06.2014</small>
                                                            <div className="actions">
                                                                <a className="btn btn-xs btn-white"><i className="fa fa-thumbs-up" /> Like </a>
                                                                <a className="btn btn-xs btn-white"><i className="fa fa-heart" /> Love</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="feed-element">
                                                        <a className="pull-left" href="profile.html">
                                                            <img src="/img/a5.jpg" className="img-circle" alt="image" />
                                                        </a>
                                                        <div className="media-body ">
                                                            <small className="pull-right">2h ago</small>
                                                            <strong>Kim Smith</strong> posted message on <strong>Monica Smith</strong> site.<br />
                                                            <small className="text-muted">Yesterday 5: 20 pm - 12.06.2014</small>
                                                            <div className="well">
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                                                Over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                                                            </div>
                                                            <div className="pull-right">
                                                                <a className="btn btn-xs btn-white"><i className="fa fa-thumbs-up" /> Like </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="feed-element">
                                                        <a className="pull-left" href="profile.html">
                                                            <img src="/img/profile.jpg" className="img-circle" alt="image" />
                                                        </a>
                                                        <div className="media-body ">
                                                            <small className="pull-right">23h ago</small>
                                                            <strong>Monica Smith</strong> love <strong>Kim Smith</strong>.<br />
                                                            <small className="text-muted">2 days ago at 2: 30 am - 11.06.2014</small>
                                                        </div>
                                                    </div>
                                                    <div className="feed-element">
                                                        <a className="pull-left" href="profile.html">
                                                            <img src="/img/a7.jpg" className="img-circle" alt="image" />
                                                        </a>
                                                        <div className="media-body ">
                                                            <small className="pull-right">46h ago</small>
                                                            <strong>Mike Loreipsum</strong> started following <strong>Monica Smith</strong>.<br />
                                                            <small className="text-muted">3 days ago at 7: 58 pm - 10.06.2014</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary btn-block m-t"><i className="fa fa-arrow-down" /> Show More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                        </div>


                    </b.Col>

                    <b.Col lg={5} md={6} xs={12}>

                        <pn.BasePanel style={{ minHeight: 350 }}>
                            <h2>Social feed</h2>
                        </pn.BasePanel>

                    </b.Col>

                </b.Col>
                
            </b.Row>

        return html;
    }

}