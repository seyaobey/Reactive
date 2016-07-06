/// <reference path="../../typings/tsd.d.ts" />


declare var swal;
declare var Cookies;
declare var numeral;
declare var page;


interface String {
    format: (...d: any[]) => string;
}

String.prototype.format = function (...d: any[]): string {

    var args = (arguments.length === 1 && $.isArray(arguments[0])) ? arguments[0] : arguments;
    var formattedString = this;
    for (var i = 0; i < args.length; i++) {
        var pattern = new RegExp("\\{" + i + "\\}", "gm");
        formattedString = formattedString.replace(pattern, args[i]);
    }
    return formattedString;
}


_.mixin({
    guid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
});



module utils {

    export function is_null_or_empty(val: any): boolean {
        return val === null || val === undefined
            || !val || (0 === val.length);
    }


    export function exec(spin: JQuery, call: (_d: Q.Deferred<any>) => any): Q.Promise<any> {

        var d = Q.defer<any>();

        spin.removeClass('hidden');

        d.promise.finally(() => {
            spin.addClass('hidden');
        });

        call(d);

        return d.promise;
    }


    export function resolve_rst(rst: any) {

        if ($.isArray(rst.results)) {
            var r: Array<any> = rst.results;

            if (r.length > 0) {

                return r[0];

            }
        }
    }


    export function guid(): string {
        return (_ as any).guid();
    }


    export function scrollToObj(target, offset, time) {
        $('html, body').animate({ scrollTop: $(target).offset().top - offset }, time);
    }


    export function loadfile(file: string): Q.Promise<any> {

        var d = Q.defer();

        require([file], f => {
            d.resolve(f);
        }, err => {
            d.reject(err);
        });

        return d.promise;

    }
    

    export var Path = {

        join: function(...args:any[]){

            var parts = [];
            for (var i = 0, l = arguments.length; i < l; i++) {
                parts = parts.concat(arguments[i].split("/"));
            }
            // Interpret the path commands to get the new resolved path.
            var newParts = [];
            for (i = 0, l = parts.length; i < l; i++) {
                var part = parts[i];
                // Remove leading and trailing slashes
                // Also remove "." segments
                if (!part || part === ".") continue;
                // Interpret ".." to pop the last segment
                if (part === "..") newParts.pop();
                // Push new path segments.
                else newParts.push(part);
            }
            // Preserve the initial slash if there was one.
            if (parts[0] === "") newParts.unshift("");
            // Turn back into a single string path.
            return newParts.join("/") || (newParts.length ? "/" : ".");

        }
        
    }


    export function can_delete(): Q.Promise<boolean> {

        var d = Q.defer<boolean>();

        swal({
            title: "Voulez-vous reellement effacer cet element?",
            text: "Ce changement est definitif et ne peut etre annule",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            cancelButtonText: "Annuler",
            closeOnConfirm: true,
            closeOnCancel: true,
            //animation: false,
        }, function (confirmed) {

            if (confirmed) {
                d.resolve(true);
            } else {
                d.reject(false);
            }
        });


        return d.promise;
    }


    export function can_looseChanges(): Q.Promise<boolean> {

        var d = Q.defer<boolean>();

        swal({
            title: "Voulez-vous reellement quitter cette page?",
            text: "Les modifications non sauvegardees seront perdues",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            cancelButtonText: "Annuler",
            closeOnConfirm: true,
            closeOnCancel: true,
            //animation: false,
        }, function (confirmed) {

            if (confirmed) {
                d.resolve(true);
            } else {
                d.reject(false);
            }
        });


        return d.promise;
    }
    

    export function spin(el: JQuery) {
        ($(el) as any).waitMe({
            effect: 'rotation'
        });
    }


    export function unspin(el: JQuery) {
        ($(el) as any).waitMe('hide');
    }


    export function query(model: string, where?: string): Q.Promise<any> {

        var d = Q.defer();

        var model_obj = Backendless.Persistence.of(model);

        if (where) {
            var qry = new Backendless.DataQuery();
            qry.condition = where;
            model_obj.find(qry, new Backendless.Async( (res:DataCue) => {
                d.resolve(res.data);
            }, err => {
                d.reject(err)
            }));            
        }
        
        return d.promise;
    }
    
}



module schema {

    export interface callParams {
        fn: string,        
        params: any[]
    }

    export interface callResponse {
        response?: {
            results?: any[],            
        },
        error?: any
    }

    export function call(params: callParams): Q.Promise<callResponse> {

        var d = Q.defer<callResponse>();

        var srv_url = 'https://umarket-node.herokuapp.com/api';

        //var srv_url = 'http://localhost:1337/api';

        $.ajax(srv_url, { //

            type: 'POST',

            data: params,

            crossDomain: true,

            "dataType": "json",
            "cache": false,
            success: (res: any) => {

                if (res && res.response) {

                    if (typeof res.response === 'string') {
                        res.response = JSON.parse(res.response);
                    }
                    
                }

                d.resolve(res);

            },
            error: (err: any) => {

                d.reject(err);

            }
        });

        return d.promise;

    }
}



module DataSchema {

    
}



module lang {

    export function localize(root?: JQuery) {

        var el = root ? $(root) : $('[data-localize]');

        el['localize']('lang', {
            language: 'fr',
            pathPrefix: "/lang",
            callback: function (data, defaultCallback) {
                defaultCallback(data);
                //app.data_lang = data;
                //if (outer_callback) {
                //    outer_callback();
                //}
            }
        });

    }
}



module carts {

    function add_li( cart_id: any, prod: any, cart_item: any) {

        var url_img = null;

        if (prod.images && prod.images.length > 0) {
            url_img = prod.images[0].file.url;
        }

        var price = cart_item.price; // numeral(cart_item.price).format('€0,0.00');        
        var qty = cart_item.quantity;

        var html =
            `
             <li>
                <a href="/account/product/0-1">
                    <div class="media">
                        <img class="media-left media-object" src="{0}" alt="cart-Image" style="width:20%" />
                        <div class="media-body">
                            <h5 class="media-heading">{1}<br><span>{2} X €{3}</span></h5>
                        </div>
                    </div>
                </a>
            </li>
            `.format(url_img, prod.name, qty, price); //; , cart_item['id'], cart_id
        
        return html.trim();
    }


    function add_actions() {

        //account/carts
        //account/checkout

        var html =
            `<li>
                <div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn btn-default btn-cart">Shopping Cart</button>
                    <button type="button" class="btn btn-default btn-checkout">Checkout</button>
                </div>
             </li>
            `;

        return html.trim();
    }


    function fetch_account(__email: string) {
        
        return schema.call({
            fn: 'get',
            params: ['/accounts', { email: __email }]
        }).then(res => {
            return res.response.results[0];            
        });
    }


    function fetch_items_of_carts(__carts: any[]) {

        var d = Q.defer();

        var item_ids = [];
        var items:any[] = [];

        _.each(__carts, cart => {

            _.each(cart.items, (item: any) => {

                items.push(item);

                item_ids.push(item.product_id);
            });
        });

        if (item_ids.length === 0) {
            item_ids.push(utils.guid());
        }


        schema.call({
            fn: 'get',
            params: ['/products', { 'id': { $in: item_ids } }]
        }).then(res => {

            var products = [];

            if (res.response && res.response.results) {
                products = res.response.results;
            }

            d.resolve({
                prods: products,
                items: items
            });

        }).fail(err => {

            d.reject(false);
        });

        return d.promise;
    }


    function init_actions(ul: JQuery) {

        ul.find('.btn-checkout').click((e) => {
            page('/account/checkout');
        });

        ul.find('.btn-cart').click((e) => {
            page('/account/cart');
        });
    }


    export function update_cart(email: string) {

        var d = Q.defer();

        fetch_account(email).then(acc => {
            
            schema.call({
                fn: 'get',
                params: ['/carts', {
                    where: {
                        account_id: acc['id'],
                        status: 'active'
                    }
                }]
            }).then(res => {

                var cart_id = utils.guid();

                var cart = res.response.results[0];

                if (res.response.results.length > 0) {
                    cart_id = res.response.results[0]['id'];
                }


                fetch_items_of_carts(res.response.results).then((data: { prods:any[], items:any[] }) => {

                    var ul = $('.products-cart ul');

                    var must_empty = ul.find('.media').length > 0;

                    if (must_empty) {                        
                        ul.empty();
                        ul.append($('<li>Item(s) in your cart</li>'));
                    }
                    
                    _.each(data.prods, prod => {

                        var cart_item = _.find(data.items, itm => {
                            return itm.product_id === prod.id;
                        });

                        ul.append(add_li(cart_id, prod, cart_item)); 
                    });

                    if (cart) {
                        $('.products-cart .cart-total').html('€{0}'.format(cart['grand_total']));
                    }
                    
                    if (data.prods.length > 0) {

                        ul.append(add_actions());

                        init_actions(ul);
                    }

                    $('.products-cart').removeClass('hidden');
                    
                    d.resolve(data.items);

                });

            });
            
        });

        return d.promise;
    }


    export function display_cart() {

        var account = cookies.get('account');

        if (!account) {

            //$('.products-cart').addClass('hidden');

        } else {
            
            update_cart(account['email']).then((list:any) => {

                if (list && list.length > 0) {

                    $('.products-cart').removeClass('hidden');

                }
            });
        }

    }


    export function flyToElement(flyer, flyingTo, callback) {
        var $func = $(this);
        var divider = 3;
        var flyerClone = $(flyer).clone();
        $(flyerClone).css({ position: 'absolute', top: $(flyer).offset().top + "px", left: $(flyer).offset().left + "px", opacity: 1, 'z-index': 1000 });
        $('body').append($(flyerClone));

        var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width() / divider) / 2;
        var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(flyer).height() / divider) / 2;

        $(flyerClone).animate({
            opacity: 0.4,
            left: gotoX,
            top: gotoY,
            width: $(flyer).width() / divider,
            height: $(flyer).height() / divider
        }, 700,
            function () {
                $(flyingTo).fadeOut('fast', function () {
                    $(flyingTo).fadeIn('fast', function () {
                        $(flyerClone).fadeOut('fast', function () {
                            $(flyerClone).remove();
                            if (callback) {
                                callback();
                            }
                        });
                    });
                });
            });
    }
}



module cookies {

    export function set(name: string, obj: any) {
        Cookies.set(name, obj, { expires: 30 });
    }
    
    export function get(name: string) {

        function isJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        var obj:any = Cookies.get(name);

        if (obj) {

            if (isJson(obj)) {

                obj = JSON.parse(obj);
            }
        }

        return obj;
    }
    
    export function remove(name: string) {
        return Cookies.remove(name);
    }
}



module iCheck {

    export function icheck(params:{
        $el: JQuery,
        onChecked?: (e: Event) => void,
        onUnchecked?: (e: Event)=> void
    }) {
        
        params.$el['iCheck']({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio'
        });


        params.$el.off('ifChecked');
        params.$el.on('ifChecked', e => {
            
            if (params.onChecked) {
                params.onChecked(e);
            }
        });


        params.$el.off('ifUnchecked');
        params.$el.on('ifUnchecked', e => {

            if (params.onUnchecked) {
                params.onUnchecked(e);
            }
        });
    }

}