(this["webpackJsonpdemo-app-group-2"]=this["webpackJsonpdemo-app-group-2"]||[]).push([[0],{103:function(e,n,r){e.exports={container:"Container_container__3eZVY"}},105:function(e,n,r){e.exports={login:"Login_login__23CLw"}},112:function(e,n,r){},113:function(e,n,r){e.exports={Posts:"Posts_Posts__3K9VI"}},114:function(e,n,r){},115:function(e,n,r){e.exports={signUp:"SignUp_signUp__qxV2U"}},116:function(e,n,r){},14:function(e,n,r){e.exports={header:"Header_header__1v0yI",header__container:"Header_header__container__1LmAh",header__content:"Header_header__content__1kpdW",active:"Header_active__3GX0s",header__nav:"Header_header__nav__Od4jx",header__link:"Header_header__link__3QJVY","header__link--light":"Header_header__link--light__15Qf2","header__cross-btn":"Header_header__cross-btn__3ASBm"}},17:function(e,n,r){e.exports={"profile-dropdown":"ProfileDropdown_profile-dropdown__3Cngu",active:"ProfileDropdown_active__2EY1J","profile-dropdown__icon":"ProfileDropdown_profile-dropdown__icon__1nxoo","profile-dropdown__name":"ProfileDropdown_profile-dropdown__name__3HXQs","profile-dropdown__arrow":"ProfileDropdown_profile-dropdown__arrow__Z9bDW","profile-dropdown__active-btn":"ProfileDropdown_profile-dropdown__active-btn__3Hy9S","profile-dropdown__content":"ProfileDropdown_profile-dropdown__content__13bAA","profile-dropdown__link":"ProfileDropdown_profile-dropdown__link__n4meU","profile-dropdown__link-icon":"ProfileDropdown_profile-dropdown__link-icon__3VW4-"}},247:function(e,n,r){},248:function(e,n,r){"use strict";r.r(n);var a=r(0),t=r.n(a),o=r(49),s=r.n(o),i=r(54),c=r(7),l=r(5),d=r(67),_=r.n(d),u=r(15),p=r(16),m=r.n(p),j="/login",b="/sign-up",h="/",x="/posts/:id",g="/profile/:username",O=r(103),f=r.n(O),w=r(1),v=function(e){var n=e.children,r=e.customClass,a=void 0===r?"":r;return Object(w.jsx)("div",{className:"".concat(f.a.container," ").concat(a),children:n})},N=r(14),F=r.n(N),B=r(68),C=r.n(B),A=t.a.memo((function(e){var n=e.img;return Object(w.jsx)(c.b,{to:h,className:C.a.logo,children:Object(w.jsx)("img",{src:n,className:C.a.logo__img})})}));A.displayName="Logo";var P=r(20),U=r.p+"static/media/selfie.5b5a7bf2.svg",S=r.p+"static/media/sign-out.01551941.svg",Q=r(17),y=r.n(Q),k=t.a.memo((function(e){var n=e.name,r=e.img,t=Object(a.useState)(!1),o=Object(u.a)(t,2),s=o[0],i=o[1];return Object(w.jsxs)("div",{className:m()(y.a["profile-dropdown"],Object(P.a)({},y.a.active,s)),children:[Object(w.jsxs)("button",{className:y.a["profile-dropdown__active-btn"],onClick:function(){return i((function(e){return!e}))},children:[Object(w.jsx)("div",{className:y.a["profile-dropdown__icon"],children:r&&Object(w.jsx)("img",{src:r,alt:n})}),Object(w.jsx)("span",{className:y.a["profile-dropdown__name"],children:n}),Object(w.jsx)("span",{className:y.a["profile-dropdown__arrow"]})]}),Object(w.jsxs)("div",{className:y.a["profile-dropdown__content"],children:[Object(w.jsxs)(c.b,{to:g,className:y.a["profile-dropdown__link"],children:[Object(w.jsx)("span",{className:y.a["profile-dropdown__link-icon"],children:Object(w.jsx)("img",{src:U})}),"Profile"]}),Object(w.jsxs)("button",{className:y.a["profile-dropdown__link"],children:[Object(w.jsx)("span",{className:y.a["profile-dropdown__link-icon"],children:Object(w.jsx)("img",{src:S})}),"Logout"]})]})]})}));k.displayName="ProfileDropdown";var q,L,H,J,T=t.a.memo((function(e){var n=e.isLoginPage,r=void 0!==n&&n,o=e.isSignupPage,s=void 0!==o&&o,i=Object(a.useState)(!1),l=Object(u.a)(i,2),d=l[0],_=l[1];return Object(w.jsx)("header",{className:F.a.header,children:Object(w.jsx)(v,{customClass:F.a.header__container,children:Object(w.jsxs)(t.a.Fragment,{children:[Object(w.jsx)(A,{img:"data:image/png;base64,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"}),Object(w.jsxs)("div",{className:"".concat(F.a.header__content," ").concat(d?F.a.active:""),children:[Object(w.jsxs)("nav",{className:F.a.header__nav,children:[Object(w.jsx)(c.b,{to:h,className:F.a.header__link,children:"Posts"}),!r&&Object(w.jsx)(c.b,{to:j,className:m()(F.a.header__link,F.a["header__link--light"]),children:"Log in"}),!s&&Object(w.jsx)(c.b,{to:b,className:m()(F.a.header__link,F.a["header__link--light"]),children:"Sign up"})]}),!1]}),Object(w.jsx)("div",{className:"".concat(F.a["header__cross-btn"]," ").concat(d?F.a.active:""),onClick:function(){return _((function(e){return!e}))}})]})})})}));T.displayName="Header",function(e){e.BODY="body",e.H1="h1",e.H2="h2",e.H3="h3",e.H4="h4",e.H5="h5",e.H6="h6"}(q||(q={})),function(e){e.PASSWORD="password",e.TEXT="text"}(L||(L={})),function(e){e.BUTTON="button",e.SUBMIT="submit",e.RESET="reset"}(H||(H={})),function(e){e.APPLICATION_JSON="application/json"}(J||(J={}));var M=function(e){var n=e.className,r=e.variant,a=void 0===r?q.BODY:r,t=e.children,o=a;return Object(w.jsx)(o,{className:n,children:t})},D=r(70),R=r.n(D),X=function(){return Object(w.jsx)("div",{className:R.a.hero,children:Object(w.jsx)(M,{className:R.a.hero__title,variant:q.H1,children:"A place to Share & discuss"})})},I=r(105),K=r.n(I),W=r(18),z=r.n(W),Y=r(30),E=r(53),V=r(3),G=r(4),Z=r(108),$=r.n(Z).a.create({baseURL:"https://starforum.herokuapp.com/api/v1"}),ee=function(){function e(){Object(V.a)(this,e)}return Object(G.a)(e,null,[{key:"signUp",value:function(){var e=Object(Y.a)(z.a.mark((function e(n){var r,a;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.username,a=n.password,e.abrupt("return",$.post("/users",{username:r,password:a},{headers:{"Content-type":J.APPLICATION_JSON}}).then((function(e){return e})).catch((function(e){return e.response})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},{key:"login",value:function(){var e=Object(Y.a)(z.a.mark((function e(n){var r,a;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.username,a=n.password,e.abrupt("return",$.post("/login",{username:r,password:a},{headers:{"Content-type":J.APPLICATION_JSON}}).then((function(e){return e})).catch((function(e){return e.response})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}]),e}(),ne=r(56),re=r.n(ne),ae=function(e){var n,r=e.className,a=e.type,t=void 0===a?H.BUTTON:a,o=e.disabled,s=e.children,i=e.primary,c=void 0!==i&&i,l=e.onClick;return Object(w.jsx)("button",{className:m()(re.a.button,r,(n={},Object(P.a)(n,re.a.button__disabled,o),Object(P.a)(n,re.a.button__primary,c),n)),disabled:o,type:t,onClick:l,children:s})},te=r(39),oe=r.n(te),se=function(e){var n=e.className,r=e.id,a=e.name,t=e.label,o=e.type,s=e.value,i=e.onChange,c=e.error,l=e.helperText;return Object(w.jsxs)("div",{className:oe.a.textField,children:[Object(w.jsx)("input",{className:m()(oe.a.textField__input,n,Object(P.a)({},oe.a.textField__input__error,c)),type:o,name:a,onChange:i,value:s,id:r,placeholder:t}),c&&Object(w.jsx)("div",{className:oe.a.textField__error,children:l})]})},ie=r(55),ce=function(e){return localStorage.setItem("user",JSON.stringify(e))},le=Object(ie.b)({name:"user",initialState:{user:JSON.parse(localStorage.getItem("user")||"{}")},reducers:{login:function(e,n){e.user=n.payload}}}),de=le.actions.login,_e=r(26),ue=_e.a({username:_e.b().min(4,"Username should be 4 chars min!").required("Username is required"),password:_e.b().min(8,"Password should be 8 chars min!").required("Password is required")}),pe=r(27),me=r.n(pe),je=function(){var e=Object(i.b)(),n=Object(l.f)(),r=function(){var r=Object(Y.a)(z.a.mark((function r(a){return z.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,ee.login(a);case 2:r.sent.status>=400?t.setStatus("Check your name/password"):(ce({username:a.username,loggedIn:!0}),e(de({username:a.username,loggedIn:!0})),n.push(h));case 4:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}(),a=function(e){t.handleChange(e),t.setStatus(null)},t=Object(E.a)({initialValues:{username:"",password:""},validationSchema:ue,onSubmit:r});return Object(w.jsx)("div",{className:me.a.loginForm,children:Object(w.jsxs)("div",{className:me.a.loginForm__content,children:[Object(w.jsx)(M,{variant:q.H1,className:me.a.loginForm__content__title,children:"Log in"}),Object(w.jsxs)("form",{onSubmit:t.handleSubmit,children:[Object(w.jsx)(se,{className:me.a.textField,id:"username",name:"username",label:"Username",type:L.TEXT,value:t.values.username,onChange:a,error:t.touched.username&&Boolean(t.errors.username),helperText:t.touched.username?t.errors.username:""}),Object(w.jsx)(se,{className:me.a.textField,id:"password",name:"password",label:"Password",type:L.PASSWORD,value:t.values.password,onChange:a,error:t.touched.password&&Boolean(t.errors.password),helperText:t.touched.password?t.errors.password:""}),t.status&&Object(w.jsx)(M,{variant:q.BODY,className:me.a.loginForm__apiError,children:t.status}),Object(w.jsx)(ae,{className:me.a.loginForm__submit,type:H.SUBMIT,disabled:!(t.values.username&&t.values.password),primary:!(!t.values.username||!t.values.password),children:"Log in"})]})]})})},be=function(){return Object(w.jsxs)("div",{className:K.a.login,children:[Object(w.jsx)(T,{isLoginPage:!0}),Object(w.jsx)(je,{}),Object(w.jsx)(X,{})]})},he=r(112),xe=r.n(he),ge=function(){return Object(w.jsxs)(t.a.Fragment,{children:[Object(w.jsx)(T,{}),Object(w.jsx)("div",{className:xe.a.NotFound,children:"Not Found page"})]})},Oe=r(32),fe=r.n(Oe),we=function(e){var n=e.children,r=e.showBackdrop,a=void 0===r||r,t=e.contentWidth,o=void 0===t?645:t,s=e.onCrossBtnClick,i=e.className;return Object(w.jsx)("div",{className:m()(fe.a.modal,Object(P.a)({},fe.a["modal--shadow"],a),i),children:Object(w.jsxs)("div",{className:fe.a.modal__container,style:{maxWidth:"".concat(o,"px")},children:[Object(w.jsx)("div",{className:fe.a.modal__content,children:n}),s&&Object(w.jsx)("button",{className:m()(fe.a.modal__btn,fe.a["modal__btn--cross"]),onClick:s})]})})},ve=r(40),Ne=r.n(ve),Fe=function(e){var n=e.onCrossBtnHandler;return Object(w.jsx)(we,{showBackdrop:!0,contentWidth:645,onCrossBtnClick:n,className:Ne.a.errorModal,children:Object(w.jsx)("div",{className:Ne.a.errorModal__content,children:Object(w.jsxs)("p",{children:[Object(w.jsx)("span",{children:"Please "}),Object(w.jsx)(c.b,{to:j,className:Ne.a.errorModal__link,children:"Log In"}),Object(w.jsx)("span",{children:" or "}),Object(w.jsx)(c.b,{to:b,className:Ne.a.errorModal__link,children:"Sign Up"}),Object(w.jsx)("span",{children:" to continue."})]})})})},Be=r(113),Ce=r.n(Be),Ae=function(){var e=Object(a.useState)(!1),n=Object(u.a)(e,2),r=n[0],o=n[1],s=function(){o(!r)};return Object(w.jsxs)(t.a.Fragment,{children:[Object(w.jsx)(T,{}),Object(w.jsxs)("div",{className:Ce.a.Posts,children:["Forum page ",Object(w.jsx)("br",{}),Object(w.jsx)(ae,{primary:!0,onClick:s,children:"Error modal"})]}),r&&Object(w.jsx)(Fe,{onCrossBtnHandler:s})]})},Pe=r(114),Ue=r.n(Pe),Se=function(){return Object(w.jsxs)(t.a.Fragment,{children:[Object(w.jsx)(T,{}),Object(w.jsx)("div",{className:Ue.a.Profile,children:"Profile page"})]})},Qe=r(115),ye=r.n(Qe),ke=_e.a({username:_e.b().min(4,"Username should be 4 chars min!").required("Username is required"),password:_e.b().min(8,"Password should be 8 chars min!").required("Password is required")}),qe=r(28),Le=r.n(qe),He=function(){var e=Object(l.f)(),n=function(){var n=Object(Y.a)(z.a.mark((function n(r){var t,o;return z.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,ee.signUp(r);case 2:(t=n.sent).status>=400?(o=t.data.validation.body.message,a.setStatus("username already exists"===o?"User with this name has been already registered: try another username or login":o)):e.push(j);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),r=function(e){a.handleChange(e),a.setStatus(null)},a=Object(E.a)({initialValues:{username:"",password:""},validationSchema:ke,onSubmit:n});return Object(w.jsx)("div",{className:Le.a.signUpForm,children:Object(w.jsxs)("div",{className:Le.a.signUpForm__content,children:[Object(w.jsx)(M,{variant:q.H1,className:Le.a.signUpForm__content__title,children:"Sign Up"}),Object(w.jsxs)("form",{onSubmit:a.handleSubmit,children:[Object(w.jsx)(se,{className:Le.a.textField,id:"username",name:"username",label:"Username",type:L.TEXT,value:a.values.username,onChange:r,error:a.touched.username&&Boolean(a.errors.username),helperText:a.touched.username?a.errors.username:""}),Object(w.jsx)(se,{className:Le.a.textField,id:"password",name:"password",label:"Password",type:L.PASSWORD,value:a.values.password,onChange:r,error:a.touched.password&&Boolean(a.errors.password),helperText:a.touched.password?a.errors.password:""}),a.status&&Object(w.jsx)(M,{variant:q.BODY,className:Le.a.signUpForm__apiError,children:a.status}),Object(w.jsx)(ae,{className:Le.a.signUpForm__submit,type:H.SUBMIT,disabled:!(a.values.username&&a.values.password),primary:!(!a.values.username||!a.values.password),children:"Sign up"})]})]})})},Je=function(){return Object(w.jsxs)(t.a.Fragment,{children:[Object(w.jsx)(T,{isSignupPage:!0}),Object(w.jsxs)("div",{className:ye.a.signUp,children:[Object(w.jsx)(He,{}),Object(w.jsx)(X,{})]})]})},Te=r(116),Me=r.n(Te),De=function(){return Object(w.jsxs)(t.a.Fragment,{children:[Object(w.jsx)(T,{isSignupPage:!0}),Object(w.jsx)("div",{className:Me.a.SinglePost,children:"Single post page"})]})},Re=function(){return Object(w.jsx)(c.a,{children:Object(w.jsx)("div",{className:_.a.appContainer,children:Object(w.jsx)("div",{className:_.a.appContainer__data,children:Object(w.jsxs)(l.c,{children:[Object(w.jsx)(l.a,{exact:!0,path:h,component:Ae}),Object(w.jsx)(l.a,{path:b,component:Je}),Object(w.jsx)(l.a,{path:j,component:be}),Object(w.jsx)(l.a,{path:x,component:De}),Object(w.jsx)(l.a,{path:g,component:Se}),Object(w.jsx)(l.a,{component:ge})]})})})})},Xe=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,249)).then((function(n){var r=n.getCLS,a=n.getFID,t=n.getFCP,o=n.getLCP,s=n.getTTFB;r(e),a(e),t(e),o(e),s(e)}))},Ie=(r(247),Object(ie.a)({reducer:{user:le.reducer}}));s.a.render(Object(w.jsx)(i.a,{store:Ie,children:Object(w.jsx)(Re,{})}),document.getElementById("root")),Xe()},27:function(e,n,r){e.exports={loginForm:"LoginForm_loginForm__Kq-8s",loginForm__content:"LoginForm_loginForm__content__3dFIC",loginForm__content__title:"LoginForm_loginForm__content__title__3BPvF",loginForm__submit:"LoginForm_loginForm__submit__yU9kU",loginForm__apiError:"LoginForm_loginForm__apiError__27Y3v",textField:"LoginForm_textField__bJ5P7"}},28:function(e,n,r){e.exports={signUpForm:"SignUpForm_signUpForm__21vyM",signUpForm__content:"SignUpForm_signUpForm__content__K0Ljd",signUpForm__content__title:"SignUpForm_signUpForm__content__title__29YVg",signUpForm__submit:"SignUpForm_signUpForm__submit__wKixw",signUpForm__apiError:"SignUpForm_signUpForm__apiError__1KnJL",textField:"SignUpForm_textField__2luUU"}},32:function(e,n,r){e.exports={modal:"Modal_modal__1vwov","modal--shadow":"Modal_modal--shadow__ZKMZM",modal__container:"Modal_modal__container__2-F4n",modal__btn:"Modal_modal__btn__2oBwN","modal__btn--cross":"Modal_modal__btn--cross__ErLQs"}},39:function(e,n,r){e.exports={textField__input:"TextField_textField__input__EmUdR",textField__input__error:"TextField_textField__input__error__E-ugZ",textField__error:"TextField_textField__error__27Qng"}},40:function(e,n,r){e.exports={errorModal__content:"ErrorModal_errorModal__content__L_y29",errorModal__link:"ErrorModal_errorModal__link__3qf9g"}},56:function(e,n,r){e.exports={button:"Button_button__2Lf63",button__primary:"Button_button__primary__2qzy9",button__disabled:"Button_button__disabled__QcICc"}},67:function(e,n,r){e.exports={appContainer:"App_appContainer__1hNk1",appContainer__data:"App_appContainer__data__3SCqF"}},68:function(e,n,r){e.exports={logo:"Logo_logo__3Q7Jg",logo__img:"Logo_logo__img__3RPzb"}},70:function(e,n,r){e.exports={hero:"Hero_hero___KI-N",hero__title:"Hero_hero__title__1hqyn"}}},[[248,1,2]]]);
//# sourceMappingURL=main.3369b0c3.chunk.js.map