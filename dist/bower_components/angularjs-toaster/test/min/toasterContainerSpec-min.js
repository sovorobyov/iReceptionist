"use strict";function compileContainer(){var t=angular.element("<toaster-container></toaster-container>");return $compile(t)(rootScope),rootScope.$digest(),t}var rootScope,toaster,$compile;describe("toasterContainer",function(){beforeEach(function(){module("toaster"),inject(function(t,e,o){toaster=t,rootScope=e,$compile=o})}),it("should pop a toast via individual parameters",function(){var t=compileContainer(),e=t.scope();toaster.pop("info","test","test"),expect(e.toasters.length).toBe(1)}),it("should unsubscribe events on $destroy if handlers exist",function(){var t;inject(function(e){t=e});var e=compileContainer(),o=e.scope();spyOn(t,"unsubscribeToNewToastEvent").and.callThrough(),spyOn(t,"unsubscribeToClearToastsEvent").and.callThrough(),o.$destroy(),expect(t.unsubscribeToNewToastEvent).toHaveBeenCalled(),expect(t.unsubscribeToClearToastsEvent).toHaveBeenCalled()}),describe("addToast",function(){it("should default to icon-class config value if toast.type not found in icon-classes",function(){var t;inject(function(e){t=e}),compileContainer(),expect(t["icon-class"]).toBe("toast-info"),toaster.pop({type:"invalid"}),rootScope.$digest(),expect(toaster.toast.type).toBe("toast-info")}),it("should allow subsequent duplicates if prevent-duplicates is not set",function(){var t=compileContainer(),e=t.scope();expect(e.toasters.length).toBe(0),toaster.pop({type:"info",title:"title",body:"body"}),toaster.pop({type:"info",title:"title",body:"body"}),rootScope.$digest(),expect(e.toasters.length).toBe(2)}),it("should not allow subsequent duplicates if prevent-duplicates is true without toastId param",function(){var t=angular.element("<toaster-container toaster-options=\"{'prevent-duplicates': true}\"></toaster-container>");$compile(t)(rootScope),rootScope.$digest();var e=t.scope();expect(e.toasters.length).toBe(0),toaster.pop({type:"info",title:"title",body:"body"}),toaster.pop({type:"info",title:"title",body:"body"}),rootScope.$digest(),expect(e.toasters.length).toBe(1)}),it("should allow subsequent duplicates if prevent-duplicates is true with unique toastId params",function(){var t=angular.element("<toaster-container toaster-options=\"{'prevent-duplicates': true}\"></toaster-container>");$compile(t)(rootScope),rootScope.$digest();var e=t.scope();expect(e.toasters.length).toBe(0),toaster.pop({type:"info",title:"title",body:"body",toastId:1}),toaster.pop({type:"info",title:"title",body:"body",toastId:2}),rootScope.$digest(),expect(e.toasters.length).toBe(2)}),it("should not allow subsequent duplicates if prevent-duplicates is true with identical toastId params",function(){var t=angular.element("<toaster-container toaster-options=\"{'prevent-duplicates': true}\"></toaster-container>");$compile(t)(rootScope),rootScope.$digest();var e=t.scope();expect(e.toasters.length).toBe(0),toaster.pop({type:"info",title:"title",body:"body",toastId:1}),toaster.pop({type:"info",title:"title",body:"body",toastId:1}),rootScope.$digest(),expect(e.toasters.length).toBe(1)}),it("should not render the close button if showCloseButton is false",function(){var t=compileContainer();toaster.pop({type:"info",body:"With a close button"}),rootScope.$digest(),expect(t.find("button")[0]).toBeUndefined()}),it("should use the default close html if toast.closeHtml is undefined",function(){var t=compileContainer();toaster.pop({type:"info",body:"With a close button",showCloseButton:!0}),rootScope.$digest();var e=t.find("button");expect(e.length).toBe(1),expect(e[0].outerHTML).toBe('<button class="toast-close-button" type="button">×</button>')}),it("should use the toast.closeHtml argument if passed",function(){var t=compileContainer();toaster.pop({type:"info",body:"With a close button",showCloseButton:!0,closeHtml:"<button>Close</button>"}),rootScope.$digest();var e=t.find("button");expect(e.length).toBe(1),expect(e[0].outerHTML).toBe("<button>Close</button>")}),it("should render toast.closeHtml argument if not a button element",function(){var t=compileContainer();toaster.pop({type:"info",body:"With close text",showCloseButton:!0,closeHtml:"<span>Close</span>"}),rootScope.$digest();var e=t.find("span");expect(e.length).toBe(1),expect(e[0].outerHTML).toBe("<span>Close</span>")}),it("should show the close button if mergedConfig close-button is an object set to true for toast-info",function(){var t=angular.element("<toaster-container toaster-options=\"{'close-button': {'toast-info': true}}\"></toaster-container>");$compile(t)(rootScope),rootScope.$digest(),toaster.pop({type:"info"}),rootScope.$digest();var e=t.find("button");expect(e.length).toBe(1),expect(e[0].outerHTML).toBe('<button class="toast-close-button" type="button">×</button>')}),it("should not render the close button if mergedConfig close-button type cannot be found",function(){var t=angular.element("<toaster-container toaster-options=\"{'close-button': {'toast-invalid': true}}\"></toaster-container>");$compile(t)(rootScope),rootScope.$digest(),toaster.pop({type:"info"}),rootScope.$digest();var e=t.find("button");expect(e.length).toBe(0),expect(e[0]).toBeUndefined()}),it("should not render the close button if mergedConfig close-button is not an object",function(){var t=angular.element("<toaster-container toaster-options=\"{'close-button': 1 }\"></toaster-container>");$compile(t)(rootScope),rootScope.$digest(),toaster.pop({type:"info"}),rootScope.$digest();var e=t.find("button");expect(e.length).toBe(0),expect(e[0]).toBeUndefined()}),it("should render trustedHtml bodyOutputType",function(){var t=compileContainer();toaster.pop({bodyOutputType:"trustedHtml",body:"<section>Body</section>"}),rootScope.$digest();var e=t.find("section");expect(e.length).toBe(1),expect(e[0].outerHTML).toBe("<section>Body</section>")}),it("should render template bodyOutputType when body is passed",function(){inject(function(t){t.put("/templatepath/template.html","<section>Template</section>")});var t=compileContainer();toaster.pop({bodyOutputType:"template",body:"/templatepath/template.html"}),rootScope.$digest(),expect(toaster.toast.body).toBe("/templatepath/template.html");var e=t.find("section");expect(e.length).toBe(1),expect(e[0].outerHTML).toBe('<section class="ng-scope">Template</section>')}),it("should render default template bodyOutputType when body is not passed",function(){inject(function(t){t.put("toasterBodyTmpl.html","<section>Template</section>")});var t=compileContainer();toaster.pop({bodyOutputType:"template"}),rootScope.$digest(),expect(toaster.toast.bodyTemplate).toBe("toasterBodyTmpl.html");var e=t.find("section");expect(e.length).toBe(1),expect(e[0].outerHTML).toBe('<section class="ng-scope">Template</section>')}),it("should render templateWithData bodyOutputType when body is passed",function(){inject(function(t){t.put("template.html","<section>Template {{toaster.data}}</section>")});var t=compileContainer();toaster.pop({bodyOutputType:"templateWithData",body:"{template: 'template.html', data: 123 }"}),rootScope.$digest();var e=t.find("section");expect(e.length).toBe(1),expect(e[0].outerHTML).toBe('<section class="ng-binding ng-scope">Template 123</section>')}),it("should throw exception for default templateWithData bodyOutputType when body is not passed",function(){inject(function(t){t.put("template.html","<section>Template {{toaster.data}}</section>")}),compileContainer();var t=!1;try{toaster.pop({bodyOutputType:"templateWithData"})}catch(e){expect(e.message).toBe("Cannot read property 'template' of undefined"),t=!0}expect(t).toBe(!0)}),it("should remove first in toast if limit is met and newest-on-top is true",function(){var t=angular.element("<toaster-container toaster-options=\"{'limit': 2, 'newest-on-top': true }\"></toaster-container>");$compile(t)(rootScope),rootScope.$digest();var e=t.scope();toaster.pop({type:"info",body:"first"}),toaster.pop({type:"info",body:"second"}),rootScope.$digest(),expect(e.toasters.length).toBe(2),expect(e.toasters[0].body).toBe("second"),expect(e.toasters[1].body).toBe("first"),toaster.pop({type:"info",body:"third"}),rootScope.$digest(),expect(e.toasters.length).toBe(2),expect(e.toasters[0].body).toBe("third"),expect(e.toasters[1].body).toBe("second")}),it("should remove last in toast if limit is met and newest-on-top is false",function(){var t=angular.element("<toaster-container toaster-options=\"{'limit': 2, 'newest-on-top': false }\"></toaster-container>");$compile(t)(rootScope),rootScope.$digest();var e=t.scope();toaster.pop({type:"info",body:"first"}),toaster.pop({type:"info",body:"second"}),rootScope.$digest(),expect(e.toasters.length).toBe(2),expect(e.toasters[0].body).toBe("first"),expect(e.toasters[1].body).toBe("second"),toaster.pop({type:"info",body:"third"}),rootScope.$digest(),expect(e.toasters.length).toBe(2),expect(e.toasters[0].body).toBe("second"),expect(e.toasters[1].body).toBe("third")})}),describe("removeToast",function(){it("should not remove toast if id does not match a toast id",function(){var t=compileContainer(),e=t.scope();toaster.pop({type:"info",body:"toast 1"}),toaster.pop({type:"info",body:"toast 2"}),rootScope.$digest(),expect(e.toasters.length).toBe(2),expect(e.toasters[0].id).toBe(2),expect(e.toasters[1].id).toBe(1),e.removeToast(3),rootScope.$digest(),expect(e.toasters.length).toBe(2)}),it("should invoke onHideCallback if it exists when toast is removed",function(){var t=compileContainer(),e=t.scope(),o={callback:function(){}};spyOn(o,"callback"),toaster.pop({type:"info",body:"toast 1",onHideCallback:o.callback}),rootScope.$digest(),e.removeToast(1),rootScope.$digest(),expect(o.callback).toHaveBeenCalled()})}),describe("scope._onNewTest",function(){it("should not add toast if toasterId is passed to scope._onNewToast but toasterId is not set via config",function(){var t=compileContainer(),e=t.scope();expect(e.config.toasterId).toBeUndefined(),toaster.pop({type:"info",body:"toast 1",toasterId:1}),rootScope.$digest(),expect(e.toasters.length).toBe(0)}),it("should add toast if toasterId is passed to scope._onNewToast and toasterId is set via config",function(){var t=angular.element("<toaster-container toaster-options=\"{ 'toaster-id': 1 }\"></toaster-container>");$compile(t)(rootScope),rootScope.$digest();var e=t.scope();expect(e.config.toasterId).toBe(1),toaster.pop({type:"info",body:"toast 1",toasterId:1}),rootScope.$digest(),expect(e.toasters.length).toBe(1)}),it("should add toasts to their respective container based on toasterId",function(){var t=angular.element("<toaster-container toaster-options=\"{ 'toaster-id': 1 }\"></toaster-container>"),e=angular.element("<toaster-container toaster-options=\"{ 'toaster-id': 2 }\"></toaster-container>");$compile(t)(rootScope),$compile(e)(rootScope),rootScope.$digest();var o=t.scope(),s=e.scope();toaster.pop({type:"info",body:"toast 1",toasterId:1}),toaster.pop({type:"info",body:"toast 2",toasterId:2}),rootScope.$digest(),expect(o.toasters.length).toBe(1),expect(s.toasters.length).toBe(1)})}),describe("scope._onClearToasts",function(){it("should remove all toasts from all containers if toasterId is *",function(){var t=angular.element("<toaster-container toaster-options=\"{ 'toaster-id': 1 }\"></toaster-container>"),e=angular.element("<toaster-container toaster-options=\"{ 'toaster-id': 2 }\"></toaster-container>");$compile(t)(rootScope),$compile(e)(rootScope),rootScope.$digest();var o=t.scope(),s=e.scope();toaster.pop({type:"info",body:"toast 1",toasterId:1}),toaster.pop({type:"info",body:"toast 2",toasterId:2}),rootScope.$digest(),expect(o.toasters.length).toBe(1),expect(s.toasters.length).toBe(1),toaster.clear("*"),rootScope.$digest(),expect(o.toasters.length).toBe(0),expect(s.toasters.length).toBe(0)}),it("should remove all toasts from all containers if config.toasterId and toastId are undefined",function(){var t=angular.element("<toaster-container toaster-options=\"{ 'close-button': false }\"></toaster-container>"),e=angular.element("<toaster-container toaster-options=\"{ 'close-button': true }\" ></toaster-container>");$compile(t)(rootScope),$compile(e)(rootScope),rootScope.$digest();var o=t.scope(),s=e.scope();toaster.pop({type:"info",body:"toast 1"}),toaster.pop({type:"info",body:"toast 2"}),rootScope.$digest(),expect(o.toasters.length).toBe(2),expect(s.toasters.length).toBe(2),toaster.clear(),rootScope.$digest(),expect(o.toasters.length).toBe(0),expect(s.toasters.length).toBe(0)}),it("should not remove by toasterId / toastId from the correct container if toast.toasterId is defined and toast.toastId is undefined",function(){var t=angular.element("<toaster-container toaster-options=\"{ 'toaster-id': 1 }\"></toaster-container>"),e=angular.element("<toaster-container toaster-options=\"{ 'toaster-id': 2 }\"></toaster-container>");$compile(t)(rootScope),$compile(e)(rootScope),rootScope.$digest();var o=t.scope(),s=e.scope();toaster.pop({type:"info",body:"toast 1",toasterId:1}),toaster.pop({type:"info",body:"toast 2",toasterId:2}),toaster.pop({type:"info",body:"toast 3",toasterId:2}),rootScope.$digest(),expect(o.toasters.length).toBe(1),expect(s.toasters.length).toBe(2),toaster.clear(2,1),rootScope.$digest(),expect(o.toasters.length).toBe(1),expect(s.toasters.length).toBe(2)}),it("should remove by toasterId / toastId from the correct container if toasterId is defined and toastId is defined",function(){var t=angular.element("<toaster-container toaster-options=\"{ 'toaster-id': 1 }\"></toaster-container>"),e=angular.element("<toaster-container toaster-options=\"{ 'toaster-id': 2 }\"></toaster-container>");$compile(t)(rootScope),$compile(e)(rootScope),rootScope.$digest();var o=t.scope(),s=e.scope();toaster.pop({type:"info",body:"toast 1",toasterId:1,toastId:1}),toaster.pop({type:"info",body:"toast 2",toasterId:2,toastId:1}),toaster.pop({type:"info",body:"toast 3",toasterId:2,toastId:2}),rootScope.$digest(),expect(o.toasters.length).toBe(1),expect(s.toasters.length).toBe(2),toaster.clear(2,1),rootScope.$digest(),expect(o.toasters.length).toBe(1),expect(s.toasters.length).toBe(1)})})}),describe("toasterContainer",function(){var t,e;inject(function(e){t=e}),beforeEach(function(){e=jasmine.createSpy("$interval",t),module("toaster",function(t){t.value("$interval",e)}),inject(function(t,e,o){toaster=t,rootScope=e,$compile=o})}),it("should use the toast.timeout argument if it is a valid number",function(){var t=compileContainer(),o=t.scope();spyOn(o,"configureTimer").and.callThrough(),toaster.pop({timeout:2}),expect(o.configureTimer).toHaveBeenCalled(),expect(o.configureTimer.calls.allArgs()[0][0].timeout).toBe(2),expect(e.calls.first().args[1]).toBe(2)}),it("should not use the toast.timeout argument if not a valid number",function(){var t=compileContainer(),o=t.scope();spyOn(o,"configureTimer").and.callThrough(),toaster.pop({timeout:"2"}),expect(o.configureTimer).toHaveBeenCalled(),expect(o.configureTimer.calls.allArgs()[0][0].timeout).toBe("2"),expect(e.calls.first().args[1]).toBe(5e3)}),it("should call scope.removeToast when toast.timeoutPromise expires",function(){var t=compileContainer(),o=t.scope();spyOn(o,"removeToast").and.callThrough(),toaster.pop({timeout:2}),e.calls.first().args[0](),rootScope.$digest(),expect(o.removeToast).toHaveBeenCalled()}),it("should retrieve timeout by toast type if mergedConfig toast-timeout is an object",function(){var t=angular.element("<toaster-container toaster-options=\"{'time-out': {'toast-info': 5}}\"></toaster-container>");$compile(t)(rootScope),rootScope.$digest(),toaster.pop({type:"info"}),expect(e.calls.first().args[1]).toBe(5)}),it("should not set a timeout if mergedConfig toast-timeout is an object and does not match toast type",function(){var t=angular.element("<toaster-container toaster-options=\"{'time-out': {'toast-info': 5}}\"></toaster-container>");$compile(t)(rootScope),rootScope.$digest(),toaster.pop({type:"warning"}),expect(e.calls.all().length).toBe(0)})});