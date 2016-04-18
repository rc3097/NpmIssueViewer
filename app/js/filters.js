'use strict';
/**
*  Module
*
* Description
*/
angular.module('js.issueFilters', []).filter("limitWords",function(){
	return function(input){
		if (input.length<=140) {
			return input;
		} else {
			for (var pos =139; pos<=input.length; pos++) {
				if (!(input.charAt(pos).toLowerCase()<="z" && input.charAt(pos).toLowerCase()>="a")) {
					return input.substring(0,pos);
				}
			}
			return input;
		}
	}
}).filter("addhref",function() {
	return function(input) {
		if (input==undefined) return input;
		var words = input.split(" ");
		var result = '';
		for (var i = words.length - 1; i >= 0; i--) {
			if (words[i].startsWith("@")) {
				var name = words[i].substring(1,words[i].length);
				var hrefname = "";
				for (var j = 0; j <= name.length - 1; j++) {
					if (!(name[j].toLowerCase()<="z" && name[j].toLowerCase()>="a")) break;
					hrefname += name[j];
				}
				words[i] = "<a href='https://github.com/"+hrefname+"'>"+words[i]+"</a>";
			}
			result+=words[i]+" ";
		}
		return result;
	}
});