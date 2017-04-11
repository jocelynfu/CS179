

// DATASETS

// Global variable with 1198 pizza deliveries
// console.log(deliveryData[0]);

// Global variable with 200 customer feedbacks
// console.log(feedbackData.length);

// console.log(feedbackData[0]);
// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART

createVisualization();

function createVisualization() {
	// delivery & feedback daya
	var delivery = deliveryData;
	var feedback = feedbackData;

	// create filtered data through function
	var filtered = dataFilter(delivery, feedback);
	var del = filtered[0];
	var feed = filtered[1];

	// display summary of data on top
	displaySummary (del, feed);

	// display bar chart
	renderBarChart(del);
}

/*********************************/
/*                               */
/* Calculates & displays summary */
/*                               */
/*********************************/

function displaySummary(delivery, feedback) {
	/***************************/
	/* Display Dataset Summary */
	/***************************/

	// establishing all the summary items we need to get
	var num_del = delivery.length;
	var num_piz = 0;
	var total_time = 0;
	var avg_time = 0;
	var sales = 0;
	var totalsales = 0;

	// feedback-related summary items
	var num_feedback = feedback.length;
	var num_feedback_low = 0;
	var num_feedback_med = 0;
	var num_feedback_high = 0;

	// Loop through delivery data, counting pizzas, time, sales, etc
	for (var i = 0; i < num_del; i++) {
		var order = delivery[i];
		num_piz += order.count;
		total_time += order.delivery_time;
		sales += order.price;
	}

	// rounding things to 2 significant figures
	totalsales = sales.toFixed(2);
	avg_time = (total_time / num_del).toFixed(2);

	// Loop through feedback data
	for (var i = 0; i < num_feedback; i++) {
		if (feedback[i].quality == "low") {
			num_feedback_low += 1;
		} else if (feedback[i].quality == "medium") {
			num_feedback_med += 1;
		} else if (feedback[i].quality == "high") {
			num_feedback_high += 1;
		}
	}

	// Append to homepage!
	document.getElementById("num_del").innerHTML = num_del;
	document.getElementById("num_piz").innerHTML = num_piz;
	document.getElementById("avg_time").innerHTML = avg_time;
	document.getElementById("totalsales").innerHTML = "$" + totalsales;
	document.getElementById("num_feedback").innerHTML = num_feedback;
	document.getElementById("num_feedback_low").innerHTML = num_feedback_low;
	document.getElementById("num_feedback_med").innerHTML = num_feedback_med;
	document.getElementById("num_feedback_high").innerHTML = num_feedback_high;
}

/*********************************/
/*                               */
/*  Filters data on user change  */
/*                               */
/*********************************/

function dataFilter(delivery,feedback) {

	var selectBoxArea = document.getElementById("area-filter");
	var selectedArea = selectBoxArea.options[selectBoxArea.selectedIndex].value;
	var selectBoxType = document.getElementById("type-filter");
	var selectedType = selectBoxType.options[selectBoxType.selectedIndex].value;

	// Filter accordingly
	if (selectedArea != "all" && selectedType != "all") {
		var filtered = delivery.filter(function (del) {
			return (del.area == selectedArea && del.order_type == selectedType);
		});
	} else if (selectedArea == "all" && selectedType != "all") {
		var filtered = delivery.filter(function (del) {
			return (del.order_type == selectedType);
		});
	} else if (selectedArea != "all" && selectedType == "all") {
		var filtered = delivery.filter(function (del) {
			return (del.area == selectedArea);
		});
	} else {
		var filtered = delivery;
	}

	var del_id = filtered.map(function(obj){
		return obj.delivery_id;
	});

	var fil_feedback = feedback.filter(function (obj) {
		var check = del_id.indexOf(obj.delivery_id);
		return (check != -1);
	});

	return [filtered, fil_feedback];
}