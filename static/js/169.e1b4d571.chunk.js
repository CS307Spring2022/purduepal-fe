"use strict";(self.webpackChunkpurduepal_fe=self.webpackChunkpurduepal_fe||[]).push([[169],{5489:function(e,n,t){t.d(n,{H:function(){return r}});var r="http://localhost:5000"},4169:function(e,n,t){t.r(n),t.d(n,{default:function(){return _}});var r=t(5861),i=t(9439),a=t(1413),o=t(5987),l=t(7757),s=t.n(l),c=t(890),d=t(3967),u=t(5193),m=t(1889),h=t(3400),p=t(3767),x=t(6151),f=t(5725),Z=t(5091),j=t(9952),b=t(1286),v=t(2791),g=t(5228),S=t(3896),y=t(4554),C=t(4010),w=t(501),P=t(5489),T=t(7621),k=t(9585),N=t(3044),F=t(184),W=[{name:"Bruce Banner",bio:"Smash"},{name:"Thor",bio:"Worthy"},{name:"Wong",bio:".."}],B=["Marvel","Twitter","DC","Netflix","Cricket"],E={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,height:"75%",bgcolor:"#000",border:"2px solid #ddd",boxShadow:24,p:4,overflowY:"scroll"},I=function(e){var n=e.name,t=e.bio;return(0,F.jsx)(T.Z,{children:(0,F.jsx)(k.Z,{avatar:(0,F.jsx)(N.Z,{"aria-label":"recipe"}),title:n,subheader:t})})},D=function(e){var n=e.name;return(0,F.jsx)(T.Z,{children:(0,F.jsx)(k.Z,{title:n})})};function q(e){var n=e.number,t=e.property,r=e.isTopic,a=(0,d.Z)(),o=v.useState(!1),l=(0,i.Z)(o,2),s=l[0],u=l[1];return(0,F.jsxs)("div",{children:[(0,F.jsx)(x.Z,{onClick:function(){return u(!0)},disableRipple:!0,disableElevation:!0,children:(0,F.jsxs)(p.Z,{direction:"row",spacing:.5,children:[(0,F.jsx)(c.Z,{variant:"subtitle2",children:n||B.length}),(0,F.jsx)(c.Z,{variant:"subtitle2",color:"#c4c4c4",children:t})]})}),(0,F.jsx)(f.Z,{open:s,onClose:function(){return u(!1)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,F.jsx)(y.Z,{sx:E,children:(0,F.jsxs)(p.Z,{spacing:1,children:[(0,F.jsx)(c.Z,{id:"modal-modal-title",variant:"h4",component:"h2",color:a.palette.primary.main,children:(0,F.jsx)("strong",{children:t})}),r?B.map((function(e){return(0,F.jsx)(D,{name:e},e)})):W.map((function(e,n){return(0,F.jsx)(I,{name:e.name,bio:e.bio},n)}))]})})})]})}var M=["children","value","index"];function O(e){var n=e.children,t=e.value,r=e.index,i=(0,o.Z)(e,M);return(0,F.jsx)("div",(0,a.Z)((0,a.Z)({role:"tabpanel",hidden:t!==r,id:"simple-tabpanel-".concat(r),"aria-labelledby":"simple-tab-".concat(r)},i),{},{children:t===r&&(0,F.jsx)(y.Z,{sx:{p:3},children:(0,F.jsx)(c.Z,{color:"#fff",children:n})})}))}function H(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}function J(){var e=(0,v.useState)(0),n=(0,i.Z)(e,2),t=n[0],r=n[1];return(0,F.jsxs)(y.Z,{sx:{width:"100%"},children:[(0,F.jsx)(y.Z,{sx:{borderBottom:1,borderColor:"divider"},children:(0,F.jsxs)(g.Z,{value:t,onChange:function(e,n){r(n)},"aria-label":"basic tabs example",variant:"fullWidth",children:[(0,F.jsx)(S.Z,(0,a.Z)({label:"Posts"},H(0))),(0,F.jsx)(S.Z,(0,a.Z)({label:"Interactions"},H(1)))]})}),(0,F.jsx)(O,{value:t,index:0,children:"Posts"}),(0,F.jsx)(O,{value:t,index:1,children:"Interactions"})]})}var L={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:800,bgcolor:"secondary.main",border:"2px solid #000",boxShadow:50,p:4},_=function(){var e=(0,d.Z)(),n=(0,u.Z)(e.breakpoints.up("md")),t="calc(100vw - ".concat(n?"200":"75","px)"),a=(0,w.lr)(),o=(0,i.Z)(a,1)[0],l=(0,v.useState)(o.get("user")===localStorage.getItem("username")),g=(0,i.Z)(l,1)[0],S=(0,v.useContext)(C.Z),T=(0,i.Z)(S,1)[0],k=(0,v.useState)(!1),N=(0,i.Z)(k,2),W=N[0],B=N[1],E=function(){function e(){return(e=(0,r.Z)(s().mark((function e(){var n,t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=localStorage.getItem("email"),t={firstName:M,lastName:V,bio:ce,email:n},console.log(JSON.stringify(t)),e.next=5,fetch("".concat(P.H,"/update"),{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}B(!1),function(){e.apply(this,arguments)}()},I=(0,v.useState)("Dr. Stephen"),D=(0,i.Z)(I,2),M=D[0],O=D[1],H=(0,v.useState)(!1),_=(0,i.Z)(H,2),z=_[0],A=_[1],R=(0,v.useState)(""),Y=(0,i.Z)(R,2),G=Y[0],K=Y[1],Q=(0,v.useState)("Strange"),U=(0,i.Z)(Q,2),V=U[0],X=U[1],$=(0,v.useState)(!1),ee=(0,i.Z)($,2),ne=ee[0],te=ee[1],re=(0,v.useState)(""),ie=(0,i.Z)(re,2),ae=ie[0],oe=ie[1],le=(0,v.useState)("MD. Sorcerer Supreme. Avenger."),se=(0,i.Z)(le,2),ce=se[0],de=se[1],ue=(0,v.useState)(!1),me=(0,i.Z)(ue,2),he=me[0],pe=me[1],xe=(0,v.useState)(""),fe=(0,i.Z)(xe,2),Ze=fe[0],je=fe[1];return(0,v.useEffect)((function(){M.length>0&&G&&(K(""),A(!1))}),[M,G]),(0,v.useEffect)((function(){V.length>0&&ae&&(oe(""),te(!1))}),[V,ae]),(0,v.useEffect)((function(){ce.length>0&&Ze&&ce.length<240&&(je(""),pe(!1))}),[ce,Ze]),(0,F.jsxs)(m.ZP,{container:!0,spacing:2,children:[(0,F.jsx)(m.ZP,{width:t,justifyContent:"center",alignItems:"center",item:!0,container:!0,children:(0,F.jsxs)(m.ZP,{sm:12,mt:2,item:!0,container:!0,justifyContent:"space-around",direction:"row",spacing:4,children:[(0,F.jsx)(m.ZP,{sm:2,item:!0,children:(0,F.jsx)(h.Z,{color:"primary",children:(0,F.jsx)(j.Z,{sx:{fontSize:"100px"}})})}),(0,F.jsx)(m.ZP,{sm:7,item:!0,children:(0,F.jsxs)(p.Z,{direction:"column",children:[(0,F.jsx)(c.Z,{color:"#fff",variant:"h4",children:"".concat(M," ").concat(V)}),(0,F.jsx)(c.Z,{color:"#ddd",variant:"subtitle1",children:"@drstrange"})]})}),(0,F.jsxs)(m.ZP,{sm:2,item:!0,children:[T&&g?(0,F.jsx)(h.Z,{color:"primary",variant:"outlined",onClick:function(){return B(!0)},children:(0,F.jsx)(b.Z,{})}):(0,F.jsx)(x.Z,{children:"Follow"}),(0,F.jsx)(f.Z,{open:W,onClose:E,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,F.jsxs)(y.Z,{sx:L,children:[(0,F.jsx)(c.Z,{color:"#fff",id:"modal-modal-title",variant:"h6",component:"h2",children:"Edit Profile Details"}),(0,F.jsx)(Z.Z,{margin:"normal",required:!0,fullWidth:!0,id:"FirstName",label:"First Name",name:"firstName",autoComplete:"given-name",autoFocus:!0,error:z,onChange:function(e){return O(e.target.value)},helperText:G}),(0,F.jsx)(Z.Z,{margin:"normal",required:!0,fullWidth:!0,id:"Lastname",label:"Last Name",name:"lastName",autoComplete:"given-name",autoFocus:!0,error:ne,onChange:function(e){return X(e.target.value)},helperText:ae}),(0,F.jsx)(Z.Z,{margin:"normal",required:!0,fullWidth:!0,id:"Bio",label:"Bio",name:"bio",autoComplete:"given-name",autoFocus:!0,error:he,onChange:function(e){return de(e.target.value)},helperText:Ze}),(0,F.jsx)(x.Z,{variant:"filled",color:"success",onClick:E,children:"Submit"})]})})]})]})}),(0,F.jsx)(m.ZP,{item:!0,ml:2.5,children:(0,F.jsx)(c.Z,{variant:"h6",color:"#fff",children:"".concat(ce)})}),(0,F.jsx)(m.ZP,{item:!0,ml:2.5,sm:12,children:(0,F.jsxs)(p.Z,{direction:"row",spacing:3,children:[(0,F.jsx)(q,{number:"10M",property:"Followers",isTopic:!1}),(0,F.jsx)(q,{number:3,property:"Following",isTopic:!1}),(0,F.jsx)(q,{property:"Topics",isTopic:!0})]})}),(0,F.jsx)(m.ZP,{item:!0,sm:12,children:(0,F.jsx)(J,{})})]})}}}]);
//# sourceMappingURL=169.e1b4d571.chunk.js.map