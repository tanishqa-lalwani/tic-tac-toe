var pl = document.getElementsByName('credit-card');
var charValue;


function getChar() {
	for(var i=0;i<pl.length;i++){
    	if(pl[i].checked)
    	charValue = pl[i].value;
  	}
  	localStorage.setItem("choose_char",charValue);
  	//return window.location.assign("ttt.html");


}