//获取文章列表数据
$.ajax({
	type: 'get',
	url: '/posts',
	success: function(response){

		console.log(response);
		var html = template('postsTpl', response);
		$('#postsBox').html(html);
		var page = template('pageTpl', response);
		$('#page').html(page);
	}
});




//分页
function changePage(page){
	//向服务器端发送请求  获取文章列表数据
	$.ajax({
		type: 'get',
		url: '/posts',
		data: {
			page: page
		},
		success: function(response){
			console.log(response);
			var html = template('postsTpl', response);
			$('#postsBox').html(html);
			var page = template('pageTpl', response);
			$('#page').html(page);
		}
	})
}


//向服务器发送请求  索要分类数据
$.ajax({
	type: 'get',
	url: '/categories',
	success: function(response){
		console.log(response);
		var html = template('categoryTpl', {data: response});
		$('#categoryBox').html(html);
	}
})

//当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function(){
	//获取管理员选择的过滤条件
	var formData = $(this).serialize();
	//向服务器端发送请求  根据条件获取文章列表数据
	$.ajax({
		type: 'get',
		url: '/posts',
		data: formData,
		success: function(response){
			console.log(response);
			var html = template('postsTpl', response);
			$('#postsBox').html(html);
			var page = template('pageTpl', response);
			$('#page').html(page);
		}
	})
	return false;
})


//当用户点击删除的时候
$('#postsBox').on('click','.delete', function(){
	//弹出删除确认框
	if(confirm('你确认要删除吗？')){
		//获取用户id
		var id = $(this).attr('data-id');
		//向服务器端发送请求 实现删除功能
		$.ajax({
			type: 'delete',
			url: '/posts/' + id,
			success: function(){
				location.reload();
			}
		})
	}

})
