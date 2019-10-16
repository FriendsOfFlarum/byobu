module.exports=function(t){var e={};function n(s){if(e[s])return e[s].exports;var o=e[s]={i:s,l:!1,exports:{}};return t[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(s,o,function(e){return t[e]}.bind(null,o));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=45)}([function(t,e){t.exports=flarum.core.compat.extend},function(t,e){t.exports=flarum.core.compat["utils/ItemList"]},function(t,e){t.exports=flarum.core.compat["components/DiscussionComposer"]},function(t,e){t.exports=flarum.core.compat["models/User"]},function(t,e){t.exports=flarum.core.compat["models/Discussion"]},function(t,e){t.exports=flarum.core.compat.Model},function(t,e){t.exports=flarum.core.compat["components/Button"]},function(t,e){t.exports=flarum.core.compat["models/Group"]},function(t,e){t.exports=flarum.core.compat["components/DiscussionPage"]},function(t,e){},function(t,e){t.exports=flarum.core.compat["components/Switch"]},function(t,e){t.exports=flarum.core.compat["components/Select"]},function(t,e){t.exports=flarum.core.compat["helpers/highlight"]},function(t,e){t.exports=flarum.core.compat["helpers/username"]},function(t,e){t.exports=flarum.core.compat["utils/extract"]},function(t,e){t.exports=flarum.core.compat["components/DiscussionList"]},function(t,e){t.exports=flarum.core.compat["components/UserPage"]},function(t,e){t.exports=flarum.core.compat["components/LinkButton"]},function(t,e){t.exports=flarum.core.compat["helpers/listItems"]},function(t,e){t.exports=flarum.core.compat["utils/classList"]},,function(t,e,n){"use strict";var s=n(0),o=n(5),r=n.n(o),i=n(4),a=n.n(i),c=n(3),p=n.n(c),u=n(2),l=n.n(u);function d(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}var f=n(23),h=n.n(f),b=n(8),v=n.n(b),y=n(6),g=n.n(y),x=n(1),w=n.n(x),R=n(24),N=n.n(R),_=n(12),D=n.n(_),k=n(25),P=n.n(k),I=n(13),S=n.n(I),L=function(){function t(){}var e=t.prototype;return e.view=function(t){var e=this;if(!(t.length<3||this.loading)){if(app.cache.byobuResults||(app.cache.byobuResults=[]),this.query=t,app.cache.byobuResults[this.query])return[m("li",{className:"Dropdown-header"},app.translator.trans("core.forum.search.users_heading")),app.cache.byobuResults[this.query].map(function(t){var n=S()(t);return n.children[0]=D()(n.children[0],e.query),m("li",{className:"SearchResult","data-index":"users:"+t.id()},m("a",{"data-index":"users:"+t.id()},P()(t),n))})];this.loading=!0,app.cache.byobuResults[this.query]=[],app.store.find("users",{filter:{q:this.query+" allows-pd"},page:{limit:5}}).then(this.pushResults.bind(this))}},e.pushResults=function(t){var e=this;t.payload.data.map(function(t){var n=app.store.getById("users",t.id);app.cache.byobuResults[e.query].push(n)}),this.loading=!1,m.redraw()},t}(),O=function(){function t(){}var e=t.prototype;return e.search=function(t){return app.store.find("groups",{filter:{q:t},page:{limit:5}})},e.view=function(t){t=t.toLowerCase();var e=app.store.all("groups").filter(function(e){return e.namePlural().toLowerCase().substr(0,t.length)===t});return e.length?[m("li",{className:"Dropdown-header"},app.translator.trans("fof-byobu.forum.search.headings.groups")),e.map(function(e){var n=e.namePlural(),s=D()(n,t);return m("li",{className:"SearchResult","data-index":"groups:"+e.id()},m("a",{"data-index":"groups:"+e.id()},m("span",{class:"groupName"},s)))})]:""},t}(),j=n(19),A=n.n(j),U=n(26),B=n.n(U),C=n(27),M=n.n(C),G=n(14),T=n.n(G),q=n(7),E=n.n(q);function H(t,e){void 0===e&&(e={}),e.style=e.style||{},e.className="RecipientLabel "+(e.className||"");var n,s=T()(e,"link");return t instanceof p.a?(n=S()(t),s&&(e.title=t.username()||"",e.href=app.route.user(t),e.config=m.route)):t instanceof E.a?n=t.namePlural():(e.className+=" none",n=app.translator.trans("fof-byobu.forum.labels.user_deleted")),m(s?"a":"span",e,m("span",{className:"RecipientLabel-text"},n))}var W=function(t){function e(){return t.apply(this,arguments)||this}d(e,t);var n=e.prototype;return n.config=function(e){var n=this;if(!e){var s=this;this.$(".Search-results").on("click",function(t){var e=n.$(".SearchResult.active");s.addRecipient(e.data("index")),s.$(".RecipientsInput").focus()}),this.$(".Search-results").on("touchstart",function(t){var e=n.$(t.target.parentNode);s.addRecipient(e.data("index")),s.$(".RecipientsInput").focus()}),$(".RecipientsInput").on("keyup",function(){clearTimeout(n.typingTimer),n.doSearch=!1,n.typingTimer=setTimeout(function(){n.doSearch=!0,m.redraw()},900)}).on("keydown",function(){clearTimeout(n.typingTimer)}),t.prototype.config.call(this,e)}},n.view=function(){var t=this;void 0===this.value()&&this.value("");var e=this.value()&&this.value().length>=3;return this.sources||(this.sources=this.sourceItems().toArray()),m("div",{className:"AddRecipientModal-form-input"},[m("div",{className:"RecipientsInput-selected RecipientsLabel"},this.props.selected().toArray().map(function(e){return H(e,{onclick:function(){t.removeRecipient(e)}})})),m("input",{className:"RecipientsInput FormControl "+A()({open:!!this.value(),focused:!!this.value(),active:!!this.value(),loading:!!this.loadingSources}),config:function(t){t.focus()},type:"search",placeholder:B()(app.translator.trans("fof-byobu.forum.input.search_recipients")),value:this.value(),oninput:m.withAttr("value",this.value),onfocus:function(){return t.hasFocus=!0},onblur:function(){return t.hasFocus=!1}}),m("ul",{className:"Dropdown-menu Search-results fade "+A()({in:!!e})},this.doSearch?this.sources.map(function(e){return e.view(t.value())}):M.a.component({size:"tiny",className:"Button Button--icon Button--link"}))])},n.sourceItems=function(){var t=new w.a;return(!this.props.discussion&&app.forum.attribute("canStartPrivateDiscussionWithUsers")||this.props.discussion&&this.props.discussion.canEditUserRecipients())&&t.add("users",new L),(!this.props.discussion&&app.forum.attribute("canStartPrivateDiscussionWithGroups")||this.props.discussion&&this.props.discussion.canEditGroupRecipients())&&t.add("groups",new O),t},n.clear=function(){this.value(""),m.redraw()},n.addRecipient=function(t){var e=t.split(":"),n=e[0],s=e[1],o=this.findRecipient(n,s);this.props.selected().add(t,o),this.clear()},n.removeRecipient=function(t){var e;t instanceof p.a&&(e="users"),t instanceof E.a&&(e="groups"),this.props.selected().remove(e+":"+t.id()),m.redraw()},n.findRecipient=function(t,e){return app.store.getById(t,e)},e}(N.a),F=function(t){function e(){return t.apply(this,arguments)||this}d(e,t);var n=e.prototype;return n.init=function(){t.prototype.init.call(this),this.selected=m.prop(new w.a),this.props.discussion?this.assignInitialRecipients(this.props.discussion):this.props.selectedRecipients.toArray().length>0?this.selected().merge(this.props.selectedRecipients):this.selected().add("users:"+app.session.user.id(),app.session.user),this.recipientSearch=W.component({selected:this.selected,discussion:this.props.discussion})},n.assignInitialRecipients=function(t){var e=this;t.recipientUsers().map(function(t){e.selected().add("users:"+t.id(),t)}),t.recipientGroups().map(function(t){e.selected().add("groups:"+t.id(),t)})},n.className=function(){return"AddRecipientModal"},n.title=function(){return this.props.discussion?app.translator.trans("fof-byobu.forum.modal.titles.update_recipients",{title:m("em",null,this.props.discussion.title())}):app.translator.trans("fof-byobu.forum.modal.titles.add_recipients")},n.content=function(){return[m("div",{className:"Modal-body"},m("div",{className:"AddRecipientModal-form"},this.recipientSearch,m("div",{className:"AddRecipientModal-form-submit App-primaryControl"},g.a.component({type:"submit",className:"Button Button--primary",disabled:!1,icon:"fas fa-check",children:app.translator.trans("fof-byobu.forum.buttons.submit")}))))]},n.select=function(t){(t.metaKey||t.ctrlKey||-1!==this.selected.indexOf(this.index))&&this.selected().length&&this.$("form").submit()},n.onsubmit=function(t){t.preventDefault();var e=this.props.discussion,n=this.selected(),s=[],o=[];n.toArray().forEach(function(t){t instanceof p.a&&o.push(t),t instanceof E.a&&s.push(t)}),e&&e.save({relationships:{recipientUsers:o,recipientGroups:s}}).then(function(){app.current instanceof v.a&&app.current.stream.update(),m.redraw()}),this.props.onsubmit&&this.props.onsubmit(n),app.modal.close(),m.redraw.strategy("none")},e}(h.a);function K(t,e){void 0===e&&(e={}),e.style=e.style||{},e.className="RecipientLabel "+(e.className||"");var n=app.translator.transChoice("fof-byobu.forum.labels.recipients",t,{count:t});return m("span",e,m("span",{className:"RecipientLabel-text"},n))}var z=n(28),J=n.n(z),Q=n(29),V=n.n(Q),X=n(15),Y=n.n(X);function Z(t,e){void 0===e&&(e={});var n=[],s=T()(e,"link");return e.className="RecipientsLabel "+(e.className||""),t?t.forEach(function(t){n.push(H(t,{link:s}))}):n.push(H()),m("span",e,n)}var tt=n(30),et=n.n(tt),nt=function(){Object(s.extend)(et.a,"moderationControls",function(t,e){e.canEditRecipients()&&t.add("recipients",g.a.component({children:app.translator.trans("fof-byobu.forum.buttons.edit_recipients"),icon:"far fa-map",onclick:function(){return app.modal.show(new F({discussion:e}))}}))})},st=n(31),ot=n.n(st);function rt(){Object(s.extend)(a.a.prototype,"badges",function(t){(this.recipientUsers().length||this.recipientGroups().length)&&t.add("private",ot.a.component({type:"private",label:app.translator.trans("fof-byobu.forum.badges.is_private.tooltip"),icon:"fas fa-map"}),10)})}var it=n(32),at=n.n(it),ct=function(){Object(s.extend)(at.a,"userControls",function(t,e){return app.session.user&&app.session.user.id()!==e.id()&&app.forum.attribute("canStartPrivateDiscussion")&&(!1===e.blocksPd()||app.forum.attribute("canStartPrivateDiscussionWithBlockers"))&&!e.cannotBeDirectMessaged()&&t.add("private-discussion",g.a.component({children:app.translator.trans("fof-byobu.forum.buttons.send_pd",{username:e.username()}),icon:"far fa-map",onclick:function(){var t=m.deferred(),n=new w.a;n.add("users:"+e.id(),e),n.add("users:"+app.session.user.id(),app.session.user),l.a.prototype.recipients=n;var s=new l.a({user:app.session.user,recipients:n,recipientUsers:n});return app.composer.load(s),app.composer.show(),t.resolve(s),t.promise}})),t})},pt=n(33),ut=n.n(pt),lt=n(10),dt=n.n(lt),ft=function(){Object(s.extend)(ut.a.prototype,"privacyItems",function(t){var e=this;t.add("byobu-block-dm",dt.a.component({children:app.translator.trans("fof-byobu.forum.user.settings.block_pd"),state:this.user.preferences().blocksPd,onchange:function(t,n){return e.preferenceSaver("blocksPd")(t,n)}}))})},mt=n(16),ht=n.n(mt),bt=n(17),vt=n.n(bt),yt=function(t){function e(){return t.apply(this,arguments)||this}return d(e,t),e}(Y.a),gt=function(t){function e(){return t.apply(this,arguments)||this}d(e,t);var n=e.prototype;return n.init=function(){t.prototype.init.call(this),this.loadUser(m.route.param("username"))},n.show=function(e){this.list=new yt({params:{q:"byobu:"+e.username()+" is:private",sort:"newest"}}),this.list.refresh(),t.prototype.show.call(this,e)},n.content=function(){return m("div",{className:"DiscussionsUserPage"},this.list.render())},e}(ht.a),xt=function(){Number(app.data["fof-byobu.enable_byobu_user_page"])&&(app.routes["user.byobu"]={path:"/u/:username/byobu",component:gt.component()},Object(s.extend)(ht.a.prototype,"navItems",function(t){var e=app.route("user.byobu",{username:this.user.username()});(app.session.user||m.route()===e)&&t.add("byobu",vt.a.component({href:e,children:app.translator.trans("fof-byobu.forum.user.byobu_link"),icon:"fas fa-map"}),85)}))},wt=n(34),Rt=n.n(wt),Nt=n(35),_t=function(t){function e(){return t.apply(this,arguments)||this}d(e,t);var n=e.prototype;return n.icon=function(){return"fas fa-map"},n.href=function(){var t=this.props.notification.subject();return app.route.discussion(t)},n.content=function(){var t=this.props.notification.fromUser();return app.translator.trans("fof-byobu.forum.notifications.pd_text",{username:t.data.attributes.username})},e}(n.n(Nt).a),Dt=n(36),kt=n.n(Dt),Pt=n(18),It=n.n(Pt),St=n(37),Lt=n.n(St),Ot=n(38),jt=n.n(Ot),At=n(39),Ut=n.n(At),Bt=n(11),Ct=n.n(Bt),Mt=n(40),Gt=n.n(Mt),Tt=function(t){function e(){return t.apply(this,arguments)||this}d(e,t);var n=e.prototype;return n.init=function(){t.prototype.init.call(this),app.previous instanceof v.a&&(this.lastDiscussion=app.previous.discussion),app.previous instanceof e&&(app.cache.privateDiscussionList=null);var n=this.params();app.cache.privateDiscussionList&&Object.keys(n).some(function(t){if(app.cache.privateDiscussionList.props.params[t]!==n[t])return app.cache.privateDiscussionList=null,!0}),app.cache.privateDiscussionList||(app.cache.privateDiscussionList=new yt({params:n})),app.history.push("private-index",Lt()("far fa-map")),this.bodyClass="App--index"},n.onunload=function(){app.cache.scrollTop=$(window).scrollTop()},n.view=function(){return m("div",{className:"IndexPage"},this.hero(),m("div",{className:"container"},m("nav",{className:"IndexPage-nav sideNav"},m("ul",null,It()(this.sidebarItems().toArray()))),m("div",{className:"IndexPage-results sideNavOffset"},m("div",{className:"IndexPage-toolbar"},m("ul",{className:"IndexPage-toolbar-view"},It()(this.viewItems().toArray())),m("ul",{className:"IndexPage-toolbar-action"},It()(this.actionItems().toArray()))),app.cache.discussionList.render())))},n.config=function(e,n){if(t.prototype.config.apply(this,arguments),!e){Object(s.extend)(n,"onunload",function(){return $("#app").css("min-height","")}),app.setTitle(""),app.setTitleCount(0);var o=app.cache.heroHeight,r=app.cache.heroHeight=this.$(".Hero").outerHeight(),i=app.cache.scrollTop;$("#app").css("min-height",$(window).height()+r);var a=function(){return $(window).scrollTop(i-o+r)};if(a(),setTimeout(a,1),this.lastDiscussion){var c=this.$('.DiscussionListItem[data-id="'+this.lastDiscussion.id()+'"]');if(c.length){var p=$("#header").outerHeight(),u=$(window).height(),l=c.offset().top,d=l+c.outerHeight();(l<i+p||d>i+u)&&$(window).scrollTop(l-p)}}}},n.hero=function(){return jt.a.component()},n.sidebarItems=function(){var t=new w.a,e=app.forum.attribute("canStartDiscussion")||!app.session.user;return t.add("newDiscussion",g.a.component({children:app.translator.trans(e?"core.forum.index.start_discussion_button":"core.forum.index.cannot_start_discussion_button"),icon:"fas fa-edit",className:"Button Button--primary IndexPage-newDiscussion",itemClassName:"App-primaryControl",onclick:this.newDiscussion.bind(this),disabled:!e})),t.add("nav",Gt.a.component({children:this.navItems(this).toArray(),buttonClassName:"Button",className:"App-titleControl"})),t},n.navItems=function(){var t=new w.a,e=this.stickyParams();return t.add("allDiscussions",vt.a.component({href:app.route("index",e),children:app.translator.trans("core.forum.index.all_discussions_link"),icon:"far fa-comments"}),100),t},n.viewItems=function(){var t=new w.a,e=app.cache.discussionList.sortMap(),n={};for(var s in e)n[s]=app.translator.trans("core.forum.index_sort."+s+"_button");return t.add("sort",Ct.a.component({options:n,value:this.params().sort||Object.keys(e)[0],onchange:this.changeSort.bind(this)})),t},n.actionItems=function(){var t=new w.a;return t.add("refresh",g.a.component({title:app.translator.trans("core.forum.index.refresh_tooltip"),icon:"fas fa-refresh",className:"Button Button--icon",onclick:function(){return app.cache.discussionList.refresh()}})),app.session.user&&t.add("markAllAsRead",g.a.component({title:app.translator.trans("core.forum.index.mark_all_as_read_tooltip"),icon:"fas fa-check",className:"Button Button--icon",onclick:this.markAllAsRead.bind(this)})),t},n.searching=function(){return this.params().q},n.clearSearch=function(){var t=this.params();delete t.q,m.route(app.route(this.props.routeName,t))},n.changeSort=function(t){var e=this.params();t===Object.keys(app.cache.discussionList.sortMap())[0]?delete e.sort:e.sort=t,m.route(app.route(this.props.routeName,e))},n.stickyParams=function(){return{sort:m.route.param("sort"),q:m.route.param("q")}},n.params=function(){var t=this.stickyParams();return t.filter=m.route.param("filter"),t},n.newDiscussion=function(){var t=m.deferred();return app.session.user?this.composeNewDiscussion(t):app.modal.show(new Ut.a({onlogin:this.composeNewDiscussion.bind(this,t)})),t.promise},n.composeNewDiscussion=function(t){var e=new l.a({user:app.session.user});return app.composer.load(e),app.composer.show(),t.resolve(e),t.promise},n.markAllAsRead=function(){confirm(app.translator.trans("core.forum.index.mark_all_as_read_confirmation"))&&app.session.user.save({readTime:new Date})},e}(kt.a),$t=n(41),qt=function(t){function e(){return t.apply(this,arguments)||this}d(e,t),e.initProps=function(e){function n(t,e,n){return t.filter(function(t){return-1===e.indexOf(t)}).map(function(t){return app.store.getById(n,t)})}t.initProps.call(this,e);var s=e.post.content();if(s.new||2!=s.length){var o=n(s.new.users,s.old.users,"users"),r=n(s.old.users,s.new.users,"users"),i=n(s.new.groups,s.old.groups,"groups"),a=n(s.old.groups,s.new.groups,"groups");e.added=o.concat(i),e.removed=r.concat(a)}else{var c=e.post.content()[0],p=e.post.content()[1];e.added=n(p,c,"users"),e.removed=n(c,p,"users")}};var n=e.prototype;return n.icon=function(){return"far fa-map"},n.descriptionKey=function(){var t="fof-byobu.forum.post.recipients_modified.";return this.props.added.length?this.props.removed.length?t+"added_and_removed":t+"added":t+"removed"},n.descriptionData=function(){var t={};return this.props.added.length&&(t.added=Z(this.props.added,{link:!0})),this.props.removed.length&&(t.removed=Z(this.props.removed,{link:!0})),t},e}(n.n($t).a);app.initializers.add("fof-byobu",function(t){t.routes.private_discussions={path:"/private-discussions",component:Tt.component()},a.a.prototype.recipientUsers=r.a.hasMany("recipientUsers"),a.a.prototype.oldRecipientUsers=r.a.hasMany("oldRecipientUsers"),a.a.prototype.recipientGroups=r.a.hasMany("recipientGroups"),a.a.prototype.oldRecipientGroups=r.a.hasMany("oldRecipientGroups"),a.a.prototype.canEditRecipients=r.a.attribute("canEditRecipients"),a.a.prototype.canEditUserRecipients=r.a.attribute("canEditUserRecipients"),a.a.prototype.canEditGroupRecipients=r.a.attribute("canEditGroupRecipients"),a.a.prototype.canEditGroupRecipients=r.a.attribute("canEditGroupRecipients"),p.a.prototype.blocksPd=r.a.attribute("blocksPd"),p.a.prototype.cannotBeDirectMessaged=r.a.attribute("cannotBeDirectMessaged"),t.postComponents.recipientsModified=qt,function(t){l.a.prototype.recipients=new w.a,l.a.prototype.recipientUsers=[],l.a.prototype.recipientGroups=[],l.a.prototype.chooseRecipients=function(){var e=this;t.modal.show(new F({selectedRecipients:this.recipients,onsubmit:function(t){e.recipients=t,e.$(".RecipientsInput").focus()}}))},Object(s.extend)(l.a.prototype,"headerItems",function(e){if(t.session.user&&t.forum.attribute("canStartPrivateDiscussion")){var n=this.recipients.toArray();e.add("recipients",m("a",{className:"DiscussionComposer-changeRecipients",onclick:this.chooseRecipients.bind(this)},n.length?K(n.length):m("span",{className:"RecipientLabel none"},t.translator.trans("fof-byobu.forum.buttons.add_recipients"))),5)}}),Object(s.extend)(l.a.prototype,"data",function(t){var e=[],n=[];this.recipients.toArray().forEach(function(t){t instanceof p.a&&e.push(t),t instanceof E.a&&n.push(t)}),t.relationships=t.relationships||{},e.length&&(t.relationships.recipientUsers=e),n.length&&(t.relationships.recipientGroups=n)})}(t),function(){var t=function(t,e,n){var s=[];t.recipientUsers().length&&(s=s.concat(t.recipientUsers())),t.recipientGroups().length&&(s=s.concat(t.recipientGroups())),s&&s.length&&(n?e.add("recipients",Z(s),10):e.add("recipients",Z(s,{link:!0}),4))};Object(s.extend)(J.a.prototype,"infoItems",function(e){var n=this.props.discussion;t(n,e,!0)}),Object(s.extend)(v.a.prototype,"params",function(t){t.include.push("recipientUsers"),t.include.push("recipientGroups")}),Object(s.extend)(Y.a.prototype,"requestParams",function(t){t.include.push("recipientUsers"),t.include.push("recipientGroups")}),Object(s.extend)(V.a.prototype,"items",function(e){var n=this.props.discussion;t(n,e,!1)})}(),nt(),rt(),ft(),ct(),xt(),t.notificationComponents.byobuPrivateDiscussionCreated=_t,Object(s.extend)(Rt.a.prototype,"notificationTypes",function(e){e.add("byobuPrivateDiscussionCreated",{name:"byobuPrivateDiscussionCreated",icon:"fas fa-map",label:t.translator.trans("fof-byobu.forum.notifications.pd_label")})})})},,function(t,e){t.exports=flarum.core.compat["components/Modal"]},function(t,e){t.exports=flarum.core.compat["components/Search"]},function(t,e){t.exports=flarum.core.compat["helpers/avatar"]},function(t,e){t.exports=flarum.core.compat["utils/extractText"]},function(t,e){t.exports=flarum.core.compat["components/LoadingIndicator"]},function(t,e){t.exports=flarum.core.compat["components/DiscussionListItem"]},function(t,e){t.exports=flarum.core.compat["components/DiscussionHero"]},function(t,e){t.exports=flarum.core.compat["utils/DiscussionControls"]},function(t,e){t.exports=flarum.core.compat["components/Badge"]},function(t,e){t.exports=flarum.core.compat["utils/UserControls"]},function(t,e){t.exports=flarum.core.compat["components/SettingsPage"]},function(t,e){t.exports=flarum.core.compat["components/NotificationGrid"]},function(t,e){t.exports=flarum.core.compat["components/Notification"]},function(t,e){t.exports=flarum.core.compat["components/Page"]},function(t,e){t.exports=flarum.core.compat["helpers/icon"]},function(t,e){t.exports=flarum.core.compat["components/WelcomeHero"]},function(t,e){t.exports=flarum.core.compat["components/LogInModal"]},function(t,e){t.exports=flarum.core.compat["components/SelectDropdown"]},function(t,e){t.exports=flarum.core.compat["components/EventPost"]},,,,function(t,e,n){"use strict";n.r(e);var s=n(9);for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);n(21)}]);
//# sourceMappingURL=forum.js.map