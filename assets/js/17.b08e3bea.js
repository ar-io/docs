(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{251:function(t,e){t.exports=function(t){return null==t}},253:function(t,e,i){},266:function(t,e,i){"use strict";i(253)},276:function(t,e,i){"use strict";i.r(e);var a=i(251),s=i.n(a);i(90);const n=/\/$/,r=/^[a-z]+:/i;var d={name:"PageEdit",computed:{lastUpdated(){return this.$page.lastUpdated},lastUpdatedText(){return"string"==typeof this.$themeLocaleConfig.lastUpdated?this.$themeLocaleConfig.lastUpdated:"string"==typeof this.$site.themeConfig.lastUpdated?this.$site.themeConfig.lastUpdated:"Last Updated"},editLink(){const t=s()(this.$page.frontmatter.editLink)?this.$site.themeConfig.editLinks:this.$page.frontmatter.editLink,{repo:e,docsDir:i="",docsBranch:a="master",docsRepo:n=e}=this.$site.themeConfig;return t&&n&&this.$page.relativePath?this.createEditLink(e,n,i,a,this.$page.relativePath):null},editLinkText(){return this.$themeLocaleConfig.editLinkText||this.$site.themeConfig.editLinkText||"Edit this page"}},methods:{createEditLink(t,e,i,a,s){if(/bitbucket.org/.test(e)){return e.replace(n,"")+"/src"+`/${a}/`+(i?i.replace(n,"")+"/":"")+s+`?mode=edit&spa=0&at=${a}&fileviewer=file-view-default`}if(/gitlab.com/.test(e)){return e.replace(n,"")+"/-/edit"+`/${a}/`+(i?i.replace(n,"")+"/":"")+s}return(r.test(e)?e:"https://github.com/"+e).replace(n,"")+"/edit"+`/${a}/`+(i?i.replace(n,"")+"/":"")+s}}},l=(i(266),i(10)),o=Object(l.a)(d,(function(){var t=this,e=t._self._c;return e("footer",{staticClass:"page-edit"},[t.editLink?e("div",{staticClass:"edit-link"},[e("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))]),t._v(" "),e("OutboundLink")],1):t._e(),t._v(" "),t.lastUpdated?e("div",{staticClass:"last-updated"},[e("span",{staticClass:"prefix"},[t._v(t._s(t.lastUpdatedText)+":")]),t._v(" "),e("span",{staticClass:"time"},[t._v(t._s(t.lastUpdated))])]):t._e()])}),[],!1,null,null,null);e.default=o.exports}}]);