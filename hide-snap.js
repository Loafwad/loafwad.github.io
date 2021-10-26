function mod_hideSnap(){
	if(document.querySelector(".snap-button [text-button]") !== null){
		var el = document.querySelector(".snap-button [text-button]")
		el.remove();
	}
	else{
		console.log("no snap buttons to remove");
	}
}

