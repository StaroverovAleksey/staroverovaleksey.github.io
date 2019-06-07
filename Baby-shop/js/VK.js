ID = 6999903;

VK.init({apiId: ID, onlyWidgets: true});
VK.Widgets.Comments("vk_comments", {limit: 20, attach: "*"});

getCommentsCount = function() {
	var URL = window.location.origin + window.location.pathname + window.location.search;
	VK.Api.call('widgets.getComments', 
	{widget_api_id: ID, url: URL, v: 5.95}, 
	function(obj) {
	var num = obj.response.count;
	document.querySelector('.item__prices-count-comment').textContent = num + ' Комментариев';
	});
};
