var MONTHS = [
	{code: "0", name: "January"},
	{code: "1", name: "February"},
	{code: "2", name: "March"},
	{code: "3", name: "April"},
	{code: "4", name: "May"},
	{code: "5", name: "June"},
	{code: "6", name: "July"},
	{code: "7", name: "August"},
	{code: "8", name: "September"},
	{code: "9", name: "October"},
	{code: "10", name: "November"},
	{code: "11", name: "December"}
];

function monthName(code) {
	for(let m of MONTHS) {
		if (m.code === code) {
			return m.name;
		}
	}	
	
	return "";
}

function timeToUnix(st_dt) {
    var microseconds = parseInt(st_dt, 10);
	var millis = microseconds / 1000;
	var past = new Date(1601,0,1).getTime();
    return new Date(past + millis);
}

function json2bookmark(json, label)  {
	return {
		name: json.name,
		url: json.url,
		date_added: timeToUnix(json.date_added),
		label: label
	};
}

function convertDates(root) {
	
	traverse(root, el => {
		el.date_added = timeToUnix(el.date_added);
	});	
}

function preprocessTree(root) {
	convertDates(root);
	console.log("EHLO>>> preprocessTree")
	traverse(root, el => {
		if(!el.hasOwnProperty('children')) {
			return;
		}
		
		el.children.sort((a,b) => {
			if(a.children && !b.children) {
				return -1;
			}
			else if(!a.children && b.children) {
				return 1;
			}
			else if(a.children && b.children) {
				return a.name.localeCompare(b.name);
			}
			else if(a.date_added && b.date_added) {
				return -a.date_added.getTime() + b.date_added.getTime();
			}
			
			return a.name.localeCompare(b.name);
		});
	});
}

/**
 * Visits only children
 */
function traverse(rootEl, visit = (x) => console.log(x)) {
	var stack = [  ];
	stack.push(rootEl);

	while(stack.length > 0) {
		let next = stack.pop();
		visit(next);
		if(next.children) {
			for(let el of next.children) {
				stack.push(el);
			}
		}
	}
}

function jsonToBookmarksFlatten(jsonRoot, currDir='', results  = []) {
	if(jsonRoot.type === 'url') {
		results.push(json2bookmark(jsonRoot, currDir));
	}
	else if(jsonRoot.type === 'folder') {
		currDir += jsonRoot.name? "/" + jsonRoot.name: "";
		jsonRoot.children.forEach(el => {
			jsonToBookmarksFlatten(el, currDir, results);
		});
	}
}


export {MONTHS, timeToUnix, traverse, convertDates, monthName, preprocessTree};