"use strict";(self.webpackChunkpurduepal_fe=self.webpackChunkpurduepal_fe||[]).push([[253],{9253:function(e,n,t){t.r(n);var o=t(5861),s=t(9439),c=t(7757),a=t.n(c),i=t(2791),r=t(6823),l=t(3721),u=t(5818),d=t(890),h=t(1131),p=t(3767),x=t(6151),f=t(5646),m=t(4070),g=t(6871),Z=t(4010),j=t(5489),S=t(184);n.default=function(){var e,n=(0,g.s0)(),t=(0,i.useContext)(Z.Z),c=(0,s.Z)(t,2),y=c[0],C=c[1],k=(0,i.useState)(!1),w=(0,s.Z)(k,2),v=w[0],I=w[1],b=(0,i.useState)(!1),D=(0,s.Z)(b,2),A=D[0],H=D[1],O=function(e,n){"clickaway"!==n&&H(!1)};return y?(0,S.jsx)(p.Z,{justifyContent:"start",alignItems:"center",width:"100%",mt:3,ml:{xs:0,sm:"110px",md:"240px",lg:"240px"},height:"100%",minHeight:"100vh",children:(0,S.jsxs)(r.Z,{expanded:"panel1"===v,onChange:(e="panel1",function(n,t){I(!!t&&e)}),sx:{width:"95%"},children:[(0,S.jsxs)(u.Z,{expandIcon:(0,S.jsx)(h.Z,{}),"aria-controls":"panel1bh-content",id:"panel1bh-header",children:[(0,S.jsx)(d.Z,{sx:{width:"33%",flexShrink:0},children:"Account Settings"}),(0,S.jsx)(d.Z,{sx:{color:"text.secondary"},children:"Logout and Account Deletion"})]}),(0,S.jsxs)(l.Z,{children:[(0,S.jsx)(x.Z,{onClick:function(){localStorage.removeItem("email"),localStorage.removeItem("username"),C(!1),n("/")},children:"Logout"}),(0,S.jsx)(x.Z,{onClick:function(){function e(){return(e=(0,o.Z)(a().mark((function e(){var n,t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=localStorage.getItem("email"),localStorage.setItem("email",""),t={email:n},console.log(JSON.stringify(t)),e.next=6,fetch("".concat(j.H,"/delete_user"),{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}H(!0),function(){e.apply(this,arguments)}()},children:"Delete Account and Data"}),(0,S.jsx)(f.Z,{open:A,autoHideDuration:6e3,onClose:O,children:(0,S.jsx)(m.Z,{onClose:O,severity:"success",sx:{width:"100%"},children:"Account Deleted :("})})]})]})}):(0,S.jsx)(g.Fg,{to:"/"})}}}]);
//# sourceMappingURL=253.46e7e7cd.chunk.js.map