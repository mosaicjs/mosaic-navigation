import expect from 'expect.js';
import Promise from 'promise';
import { Navigation, NavHandler } from '../';

describe('Navigation', function() {
    let activated = [];
    let deactivated = [];
    let updated = [];
    let nav;
    beforeEach(function(){
        nav = new Navigation();
    })
    class TestHandler extends NavHandler {
        constructor(key){
            super();
            this.key = key;
        }
        _push(type, list){
            let str = this.key + '=';
            for (let i = 2; i < arguments.length; i++) {
                str += JSON.stringify(arguments[i]);
            }
            list.push(str);
            // console.log(type, ':', str);
            return Promise.resolve();
        }
        activate(params){
            return this._push('activate', activated, params);
        }
        update(params, prevParams){
            return this._push('update', updated, params, prevParams);
        }
        deactivate(params){
            return this._push('deactivate', deactivated, params);
        }
    }
    function test(state, control) {
        return Promise.resolve().then(function(){
            activated = [];
            deactivated = [];
            updated = [];
            return nav.setState(state);
        }).then(function(){
            expect(activated).to.eql(control.activated || []);
            expect(deactivated).to.eql(control.deactivated || []);
            expect(updated).to.eql(control.updated || []);
            for (let key in state) {
                let slot = nav.getActive(key);
                expect(!!slot).to.be(true);
                expect(slot.path).to.eql(state[key]);
            }
        });
    }
    it('should update dependencies', function(done){
        nav.register('screen', ':projectId/*path', new TestHandler('project'));
        nav.register('layout', ':layout', new TestHandler('layout'));
        nav.register('lang', ':lang', new TestHandler('lang'));
        nav.register('theme', ':theme', new TestHandler('theme'));
        nav.register('stats', ':stats', new TestHandler('stats'));
        nav.setDependencies({
            'screen': ['layout', 'lang'],
            'layout': ['theme']
        });
        Promise.resolve().then(function(){
            return test({
                screen: 'foobar/path/myfile.doc',
                layout: 'mobile',
                theme: 'dark',
                lang: 'en',
                stats: 'mystats' // independent type
            }, 
            {
               activated : [
                'theme={"theme":"dark"}',
                'lang={"lang":"en"}',
                'stats={"stats":"mystats"}',
                'layout={"layout":"mobile"}',
                'project={"projectId":"foobar","path":"path/myfile.doc"}'
               ]  
            });
        }).then(function(){
            // The 'stats' type is not updated
            return test({
                lang: 'fr'
            }, {
                updated : [
                 'lang={"lang":"fr"}{"lang":"en"}',
                 'theme={"theme":"dark"}{"theme":"dark"}',
                 'layout={"layout":"mobile"}{"layout":"mobile"}',
                 'project=' + 
                      '{"projectId":"foobar","path":"path/myfile.doc"}' +
                      '{"projectId":"foobar","path":"path/myfile.doc"}'
                ]
            });
        }).then(done, done);
    });
    
    it('shoud be able to define all dependencies for an element', function(done){
        nav.register('screen', '/', new TestHandler('dashboard'));
        nav.register('screen', '/:projectId', new TestHandler('project'));
        nav.register('screen', '/:projectId/*path', new TestHandler('projectWithPath'));
        Promise.resolve().then(function(){
            return test({screen: '/foobar'}, {
                activated : ['project={"projectId":"foobar"}'] 
            });
        }).then(function(){
            return test({
                screen: '/foobar/path/to/my/file.pdf'
            }, {
                activated: ['projectWithPath={"projectId":"foobar","path":"path/to/my/file.pdf"}'],
                deactivated: ['project={"projectId":"foobar"}'] 
            });
        }).then(function(){
            return test({
                screen: '/barfoo/new/path/to/newfile.doc'
            }, {
                updated : [
                   'projectWithPath=' + 
                   '{"projectId":"barfoo","path":"new/path/to/newfile.doc"}' + 
                   '{"projectId":"foobar","path":"path/to/my/file.pdf"}'
               ]
            });
        }).then(function(){
            return test({
                screen: '/'
            },{
                activated : ['dashboard={}'],
                deactivated: ['projectWithPath={"projectId":"barfoo","path":"new/path/to/newfile.doc"}']
            });
        }).then(function(){
        }).then(done, done);
    });
});
    