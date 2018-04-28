const express = require('express');
const router = express.Router();
const fs = require('fs');

function addChild (data, name, age, parent) {
	if (data.name == parent) {
		data.children.push({
			name: name,
			age: age,
			children: []
		});
		return data;
	} else {
		let children = [];
		for (each of data.children) {
			children.push(addChild(each, name, age, parent));
		}
		data.children = children;
		return data;
	}
}

router.post('/', function (request, response) {
	fs.readFile('data.json', function(error, content) {
	  if (error) {
	  	response.status(400).json({
	  		error: error
	  	});
	  }

	  let parseJson = JSON.parse(content);

	  if (!request.body.parent) {
	  	parseJson.name = request.body.name;
	  	parseJson.age = request.body.age;
	  	parseJson.children = [];
	  } else {
	  	parseJson = addChild(parseJson, request.body.name, request.body.age, request.body.parent);
	  }

	  fs.writeFile('data.json', JSON.stringify(parseJson), function(error) {
	    if (error) {
	    	throw error;
	    } else {
	    	response.status(200).json({
	    		success: true
	    	});
	    }
	  });
	})
});

module.exports = router;