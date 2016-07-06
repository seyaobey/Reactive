// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');

var __router_ctx: any;
var __app: application.App;


declare var page;
declare var Cookies;


export module types {

    export interface AppSettings {
        rootpage: string,
        masterpage_template?: string,
        homepage_template?: string,
        viewpath_root?: string,
        srv_url?: string,

        BACKENDLESS_APPID?: string,
        BACKENDLESS_KEYID?: string,
        BACKENDLESS_VERID?: string,
    }


    export interface RouteInfo {
        url: string,
        descr?: string
    }


    export interface RouteList {
        [name: string]: RouteInfo
    }
    
    export enum Usertype { admin, contact, guest }

}


export module base {


    export interface BaseProps extends React.Props<any> {
        owner?: BaseView,        
    }


    export interface BaseState {
        loading?: boolean,
    }


    export class BaseView extends React.Component<BaseProps, any>{

        state: BaseState;
        props: BaseProps;
        __context: any;


        constructor(props?: BaseProps) {

            super(props);

            this.props = props;

            this.state = {};
        }

        get app(): application.App {
            return __app;
        }


        initalize_state(): BaseState {
            return {
            };
        }


        get root(): JQuery {
            return $(ReactDOM.findDOMNode(this));
        }


        jget(sel: string): JQuery {
            return this.root.find(sel);
        }


        notify(cmd: string, data?: any): Q.Promise<any> {
            return Q.resolve(true);
        }


        componentWillMount() {

        }


        componentDidUpdate() {

        }


        componentWillUnmount() {

        }

        componentDidMount() {

        }

        
    }
    
}



export module application {


    export class Router {

        private __app: App;
        constructor(app: App) {
            this.__app = app;
        }

        params: any;
        routes: any;



        init_routes(routes: any) {

            this.routes = routes;


            _.each(Object.keys(routes), (key: string) => {

                var route = routes[key];

                page(key, ctx => {

                    this.params = ctx.params;

                    var url = _.find(Object.keys(this.routes), r => {
                        return r === key;
                    });

                    var route = null;

                    if (url) {
                        route = this.routes[url];
                    }

                    if (!route) {
                        // --> 404
                    }

                    var path = '..' + utils.Path.join('/views', route.url);
                    var __params = key;
                    
                    require([path], module => {

                        var view = module[Object.keys(module)[0]];

                        ReactDOM.unmountComponentAtNode($(this.__app.settings.rootpage)[0]);

                        $(this.__app.settings.rootpage).empty();

                        ReactDOM.render(React.createElement(view, {
                            params: __params
                        }), $(this.__app.settings.rootpage)[0]);

                    });
                });
            });

            page.start();

        }


        update_url(url: string): any {
            return page.show(url, null, false);
        }


        navigate(urlpath: string) {
            return page(urlpath);
        }

    }


    export class App {

        private __router: Router;
        get router(): Router {

            if (!this.__router) {
                this.__router = new application.Router(this);
            }

            return this.__router;
        }


        private __setts: types.AppSettings;
        get settings(): types.AppSettings {
            return this.__setts;
        }

        get_default_settings(): types.AppSettings {

            return {

                rootpage: '#root-page',
                masterpage_template: '/html/masterpage.html',
                homepage_template: '/html/homepage.html',
                viewpath_root: ''
            }

        }


        load_settings() {

            var d = Q.defer();

            require(['../config/settings'], fn => {

                this.__setts = _.extend(this.get_default_settings(), fn['settings']);

                this.load_backendless();

                d.resolve(fn);

            });


            return d.promise;
        }


        load_rootes() {

            var d = Q.defer();

            require(['../config/routes'], fn => {

                var routes = fn['routes'];

                this.router.init_routes(routes);

                d.resolve(fn);

            });

            return d.promise;
        }


        load_backendless() {
            Backendless.initApp(this.settings.BACKENDLESS_APPID, this.settings.BACKENDLESS_KEYID, this.settings.BACKENDLESS_VERID);
        }



        store_user(usr) {
            cookies.set('current-user', usr);
        }

        
        get_user(): any {
            return cookies.get('current-user');
        }

        

        login(email: string, password: string): Q.Promise<any> {

            var d = Q.defer();

            Backendless.UserService.login(email, password, true, new Backendless.Async((data) => {

                this.store_user(data);
                
            }, (err) => {
                d.reject(err);
            }));


            return d.promise;

        }


        signup(params: { email: string, password: string, name: string, surname: string }): Q.Promise<any> {

            var usr = new Backendless.User();
            usr.email = params.email;
            usr.password = params.password;
            usr['name'] = params.name;
            usr['surname'] = params.surname;

            var d = Q.defer();

            Backendless.UserService.register(usr, new Backendless.Async((data) => {
                d.resolve(data);
            }, (err) => {
                d.reject(err)
            }));

            return d.promise;
        }



        login_as_guest(): Q.Promise<any> {

            var d = Q.defer();

            Backendless.UserService.login('guest@gmail.com', 'guest', false, new Backendless.Async(res => {
                d.resolve(true);
            }, err => {
                d.reject(false);
            }));

            return d.promise;
        }


        start() {

            Q.all([
                this.load_settings(),
                //this.load_moltin(),
                this.load_rootes()]).then(() => {

                    return this.login_as_guest();

                });
        }
    }


    export function InitApplication() {

        __app = new application.App();

        __app.start();
    }

}