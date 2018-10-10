import Vue from 'vue';

var Bus = new Vue();

const SS = {
	clist:[],
	plist:[]	
};

SS.addCart = function(id){
	const isAdded = this.clist.find(item => item.id === id);
	if(isAdded){
		isAdded.count ++;
	}else{
		this.clist.push({id: id,
				count: 1
		});
	}
}

SS.deleteCart = function(id){
	const index = this.clist.findIndex(item => item.id === id);
	this.clist.splice(index, 1);
}

SS.setData = function(id){
	this.clist.push(id);
};

SS.logData = function(){
	console.log(this.clist);
};

SS.SetPlist = function(list){
	this.plist = list;
	//console.log(this.plist);
}

SS.SetClist = function(list){
	this.clist = list;
}

export { Bus, SS};

