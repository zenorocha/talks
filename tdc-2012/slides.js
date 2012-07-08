var PERMANENT_URL_PREFIX="http://talks.zenorocha.com/tdc-2012/";var SLIDE_CLASSES=["far-past","past","current","next","far-next"];var PM_TOUCH_SENSITIVITY=15;var curSlide;if(typeof document!=="undefined"&&!("classList" in document.createElement("a"))){(function(a){var f="classList",d="prototype",e=(a.HTMLElement||a.Element)[d],g=Object;strTrim=String[d].trim||function(){return this.replace(/^\s+|\s+$/g,"")},arrIndexOf=Array[d].indexOf||function(k){for(var j=0,h=this.length;j<h;j++){if(j in this&&this[j]===k){return j}}return -1},DOMEx=function(h,i){this.name=h;this.code=DOMException[h];this.message=i},checkTokenAndGetIndex=function(i,h){if(h===""){throw new DOMEx("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(h)){throw new DOMEx("INVALID_CHARACTER_ERR","String contains an invalid character")}return arrIndexOf.call(i,h)},ClassList=function(m){var l=strTrim.call(m.className),k=l?l.split(/\s+/):[];for(var j=0,h=k.length;j<h;j++){this.push(k[j])}this._updateClassName=function(){m.className=this.toString()}},classListProto=ClassList[d]=[],classListGetter=function(){return new ClassList(this)};DOMEx[d]=Error[d];classListProto.item=function(h){return this[h]||null};classListProto.contains=function(h){h+="";return checkTokenAndGetIndex(this,h)!==-1};classListProto.add=function(h){h+="";if(checkTokenAndGetIndex(this,h)===-1){this.push(h);this._updateClassName()}};classListProto.remove=function(i){i+="";var h=checkTokenAndGetIndex(this,i);if(h!==-1){this.splice(h,1);this._updateClassName()}};classListProto.toggle=function(h){h+="";if(checkTokenAndGetIndex(this,h)===-1){this.add(h)}else{this.remove(h)}};classListProto.toString=function(){return this.join(" ")};if(g.defineProperty){var c={get:classListGetter,enumerable:true,configurable:true};try{g.defineProperty(e,f,c)}catch(b){if(b.number===-2146823252){c.enumerable=false;g.defineProperty(e,f,c)}}}else{if(g[d].__defineGetter__){e.__defineGetter__(f,classListGetter)}}}(self))}function getSlideEl(a){if((a<0)||(a>=slideEls.length)){return null}else{return slideEls[a]}}function updateSlideClass(a,d){var c=getSlideEl(a);if(!c){return}if(d){c.classList.add(d)}for(var b in SLIDE_CLASSES){if(d!=SLIDE_CLASSES[b]){c.classList.remove(SLIDE_CLASSES[b])}}}function updateSlides(){for(var a=0;a<slideEls.length;a++){switch(a){case curSlide-2:updateSlideClass(a,"far-past");break;case curSlide-1:updateSlideClass(a,"past");break;case curSlide:updateSlideClass(a,"current");break;case curSlide+1:updateSlideClass(a,"next");break;case curSlide+2:updateSlideClass(a,"far-next");break;default:updateSlideClass(a);break}}triggerLeaveEvent(curSlide-1);triggerEnterEvent(curSlide);window.setTimeout(function(){disableSlideFrames(curSlide-2)},301);enableSlideFrames(curSlide-1);enableSlideFrames(curSlide+2);if(isChromeVoxActive()){speakAndSyncToNode(slideEls[curSlide])}updateHash()}function buildNextItem(){var a=slideEls[curSlide].querySelectorAll(".to-build");if(!a.length){return false}a[0].classList.remove("to-build","");if(isChromeVoxActive()){speakAndSyncToNode(a[0])}return true}function prevSlide(){if(curSlide>0){curSlide--;updateSlides()}}function nextSlide(){if(buildNextItem()){return}if(curSlide<slideEls.length-1){curSlide++;updateSlides()}}function triggerEnterEvent(d){var c=getSlideEl(d);if(!c){return}var b=c.getAttribute("onslideenter");if(b){new Function(b).call(c)}var a=document.createEvent("Event");a.initEvent("slideenter",true,true);a.slideNumber=d+1;c.dispatchEvent(a)}function triggerLeaveEvent(d){var b=getSlideEl(d);if(!b){return}var c=b.getAttribute("onslideleave");if(c){new Function(c).call(b)}var a=document.createEvent("Event");a.initEvent("slideleave",true,true);a.slideNumber=d+1;b.dispatchEvent(a)}function handleTouchStart(a){if(a.touches.length==1){touchDX=0;touchDY=0;touchStartX=a.touches[0].pageX;touchStartY=a.touches[0].pageY;document.body.addEventListener("touchmove",handleTouchMove,true);document.body.addEventListener("touchend",handleTouchEnd,true)}}function handleTouchMove(a){if(a.touches.length>1){cancelTouch()}else{touchDX=a.touches[0].pageX-touchStartX;touchDY=a.touches[0].pageY-touchStartY}}function handleTouchEnd(c){var b=Math.abs(touchDX);var a=Math.abs(touchDY);if((b>PM_TOUCH_SENSITIVITY)&&(a<(b*2/3))){if(touchDX>0){prevSlide()}else{nextSlide()}}cancelTouch()}function cancelTouch(){document.body.removeEventListener("touchmove",handleTouchMove,true);document.body.removeEventListener("touchend",handleTouchEnd,true)}function disableSlideFrames(e){var b=getSlideEl(e);if(!b){return}var d=b.getElementsByTagName("iframe");for(var a=0,c;c=d[a];a++){disableFrame(c)}}function enableSlideFrames(e){var b=getSlideEl(e);if(!b){return}var d=b.getElementsByTagName("iframe");for(var a=0,c;c=d[a];a++){enableFrame(c)}}function disableFrame(a){a.src="about:blank"}function enableFrame(b){var a=b._src;if(b.src!=a&&a!="about:blank"){b.src=a}}function setupFrames(){var c=document.querySelectorAll("iframe");for(var a=0,b;b=c[a];a++){b._src=b.src;disableFrame(b)}enableSlideFrames(curSlide);enableSlideFrames(curSlide+1);enableSlideFrames(curSlide+2)}function setupInteraction(){var a=document.createElement("div");a.className="slide-area";a.id="prev-slide-area";a.addEventListener("click",prevSlide,false);document.querySelector("section.slides").appendChild(a);var a=document.createElement("div");a.className="slide-area";a.id="next-slide-area";a.addEventListener("click",nextSlide,false);document.querySelector("section.slides").appendChild(a);document.body.addEventListener("touchstart",handleTouchStart,false)}function isChromeVoxActive(){if(typeof(cvox)=="undefined"){return false}else{return true}}function speakAndSyncToNode(a){if(!isChromeVoxActive()){return}cvox.ChromeVox.navigationManager.switchToStrategy(cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM,0,true);cvox.ChromeVox.navigationManager.syncToNode(a);cvox.ChromeVoxUserCommands.finishNavCommand("");var b=a;while(b.firstChild){b=b.firstChild}cvox.ChromeVox.navigationManager.syncToNode(b)}function speakNextItem(){if(!isChromeVoxActive()){return}cvox.ChromeVox.navigationManager.switchToStrategy(cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM,0,true);cvox.ChromeVox.navigationManager.next(true);if(!cvox.DomUtil.isDescendantOfNode(cvox.ChromeVox.navigationManager.getCurrentNode(),slideEls[curSlide])){var a=slideEls[curSlide];while(a.firstChild){a=a.firstChild}cvox.ChromeVox.navigationManager.syncToNode(a);cvox.ChromeVox.navigationManager.next(true)}cvox.ChromeVoxUserCommands.finishNavCommand("")}function speakPrevItem(){if(!isChromeVoxActive()){return}cvox.ChromeVox.navigationManager.switchToStrategy(cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM,0,true);cvox.ChromeVox.navigationManager.previous(true);if(!cvox.DomUtil.isDescendantOfNode(cvox.ChromeVox.navigationManager.getCurrentNode(),slideEls[curSlide])){var a=slideEls[curSlide];while(a.lastChild){a=a.lastChild}cvox.ChromeVox.navigationManager.syncToNode(a);cvox.ChromeVox.navigationManager.previous(true)}cvox.ChromeVoxUserCommands.finishNavCommand("")}function getCurSlideFromHash(){var a=parseInt(location.hash.substr(1));if(a){curSlide=a-1}else{curSlide=0}}function updateHash(){location.replace("#"+(curSlide+1))}function handleBodyKeyDown(a){switch(a.keyCode){case 39:case 13:case 32:case 34:nextSlide();a.preventDefault();break;case 37:case 8:case 33:prevSlide();a.preventDefault();break;case 40:if(isChromeVoxActive()){speakNextItem()}else{nextSlide()}a.preventDefault();break;case 38:if(isChromeVoxActive()){speakPrevItem()}else{prevSlide()}a.preventDefault();break}}function addEventListeners(){document.addEventListener("keydown",handleBodyKeyDown,false)}function addFontStyle(){var a=document.createElement("link");a.rel="stylesheet";a.type="text/css";a.href="http://fonts.googleapis.com/css?family=Open+Sans:regular,semibold,italic,italicsemibold|Droid+Sans+Mono";document.body.appendChild(a)}function addGeneralStyle(){var a=document.createElement("link");a.rel="stylesheet";a.type="text/css";a.href=PERMANENT_URL_PREFIX+"styles.css";document.body.appendChild(a);var a=document.createElement("link");a.rel="stylesheet";a.type="text/css";a.href=PERMANENT_URL_PREFIX+"css/custom.css";document.body.appendChild(a);var a=document.createElement("meta");a.name="viewport";a.content="width=1100,height=750";document.querySelector("head").appendChild(a);var a=document.createElement("meta");a.name="apple-mobile-web-app-capable";a.content="yes";document.querySelector("head").appendChild(a)}function makeBuildLists(){for(var d=curSlide,a;a=slideEls[d];d++){var b=a.querySelectorAll(".build > *");for(var c=0,e;e=b[c];c++){if(e.classList){e.classList.add("to-build")}}}}function handleDomLoaded(){slideEls=document.querySelectorAll("section.slides > article");setupFrames();addFontStyle();addGeneralStyle();addEventListeners();updateSlides();setupInteraction();makeBuildLists();document.body.classList.add("loaded")}function initialize(){getCurSlideFromHash();if(window._DEBUG){PERMANENT_URL_PREFIX="../"}if(window._DCL){handleDomLoaded()}else{document.addEventListener("DOMContentLoaded",handleDomLoaded,false)}}if(!window._DEBUG&&document.location.href.indexOf("?debug")!==-1){document.addEventListener("DOMContentLoaded",function(){window._DCL=true},false);window._DEBUG=true;var script=document.createElement("script");script.type="text/javascript";script.src="../slides.js";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(script,s);s.parentNode.removeChild(s)}else{initialize()};