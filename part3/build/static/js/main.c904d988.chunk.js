(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),u=t.n(o),c=t(2),l=t(3),i=t.n(l),s="/api/persons",m=function(e){return i.a.post(s,e).then((function(e){return e.data}))},d=function(){return i.a.get(s).then((function(e){return e.data}))},f=function(e){return i.a.delete("".concat(s,"/").concat(e)).then((function(e){console.log("successful deletion")}))},h=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{style:{color:"red",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",borderColor:"yellow",padding:"10px",marginBottom:"10px"}},n)},b=function(e){var n=e.searchVal,t=e.handleChange;return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:n,onChange:t}))},p=function(e){var n=e.handleSubmit,t=e.newName,a=e.handleNameChange,o=e.newNumber,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:o,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},v=function(e){var n=e.persons,t=e.searchVal,a=e.setPersons,o=e.setErrorMessage;return n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return r.a.createElement("div",{key:e.name},r.a.createElement("span",null,e.name," ",e.number,"   "),r.a.createElement("button",{type:"button",onClick:function(){return function(e,t){var r=n[n.map((function(e){return e.id})).indexOf(e)].name;if(t){var u=n.slice();u.splice(u.map((function(e){return e.id})).indexOf(e),1),f(e).then((function(){a(u);var e="".concat(r," was successfully removed from the phonebook");o(e),setTimeout((function(){return o(null)}),5e3)})).catch((function(){o("".concat(r," was already removed from the phonebook")),setTimeout((function(){return o(null)}),5e3),a(u)}))}else{o("No change was made to the phonebook"),setTimeout((function(){return o(null)}),5e3)}}(e.id,window.confirm("delete ".concat(e.name,"?")))}},"delete"))}))},g=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),l=Object(c.a)(u,2),i=l[0],s=l[1],f=Object(a.useState)(""),g=Object(c.a)(f,2),w=g[0],E=g[1],C=Object(a.useState)(""),k=Object(c.a)(C,2),O=k[0],y=k[1],j=Object(a.useState)(null),N=Object(c.a)(j,2),S=N[0],x=N[1];Object(a.useEffect)((function(){d().then((function(e){return o(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(h,{message:S}),r.a.createElement(b,{searchVal:O,handleChange:function(e){return y(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(p,{handleSubmit:function(e){if(e.preventDefault(),t.map((function(e){return e.name.toLowerCase()})).includes(i.toLowerCase()))if(window.confirm("".concat(i," is already added to phonebook, replace the old number with a new one?"))){var n=t.map((function(e){return e.name.toLowerCase()})).indexOf(i.toLowerCase()),a=t[n];a.number=w;var r=t.slice();r.splice(n,1),o(r.concat(a));var u="".concat(i,"'s phone number was successfully changed to ").concat(w);x(u),setTimeout((function(){return x(null)}),5e3)}else{x("No change was made to the phonebook"),setTimeout((function(){return x(null)}),5e3)}else{m({name:i,number:w}).then((function(e){return o(t.concat(e))})).catch((function(e){return console.log(e)}));var c="".concat(i," was successfully added to the phonebook");x(c),setTimeout((function(){return x(null)}),5e3)}s(""),E("")},newName:i,handleNameChange:function(e){return s(e.target.value)},newNumber:w,handleNumberChange:function(e){return E(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement("div",null,r.a.createElement(v,{persons:t,searchVal:O,setPersons:o,setErrorMessage:x})))};u.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.c904d988.chunk.js.map