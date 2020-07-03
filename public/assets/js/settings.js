//当管理员选择logo时
$('#logo').on('change', function(){
	//获取选择的图片
	var file = this.files[0];
	//创建formData对象  实现二进制图片上传
	formData = new FormData();
	//将选择的文件添加到formData对象中
	formData.append('logo',file);
	//向服务器端发送请求  实现文件上传
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			$('#hiddenLogo').val(response[0].logo);
			//将logo显示在页面中
			$('#preview').prop('src', response[0].logo)
		}
	})
})


//当网站设置表单发生提交行为
$('#settingsForm').on('submit', function(){
	//获取输入的内容
	var formData = $(this).serialize();
	//向服务器端发送请求  实现网站设置数据添加功能
	$.ajax({
		type: 'post',
		url: '/settings',
		data: formData,
		success: function(){
			location.reload()
		}
	})

	return false;
})


//向服务器端发送请求   索要网站设置数据
$.ajax({
	type: 'get',
	url: '/settings',
	success: function(response){
		console.log(response);
		if(response){
			//将logo存储在隐藏域中
			$('#hiddenLogo').val(response.logo);
			//将logo显示在页面中
			$('#preview').prop('src', response.logo);
			//将网站标题显示在页面中
			$('#webtitle').val(response.title);


			//将是否开启评论功能显示在页面中
			$('#comment').prop('checked', response.comment);

			//将是否经过人工审核显示在页面中
			$('#review').prop('checked', response.review);
		}
	}
})