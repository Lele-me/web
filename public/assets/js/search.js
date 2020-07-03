//获取到浏览器地址栏中搜索关键字
var keys = getUrlParams('keys');

//根据搜索关键字调用搜索接口  获取搜索结果
$.ajax({
	type: 'get',
	url: '/posts/search/' + keys,
	success: function(response){
		console.log(response);

		var html = template('searchTpl', {data: response});
		$('#listBox').html(html);
	}
})