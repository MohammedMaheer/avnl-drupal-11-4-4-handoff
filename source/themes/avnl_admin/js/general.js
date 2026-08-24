/*---------------------------------------------------------------------*/
;(function($){
	$(document).ready( function(){	


		//show hide user tender/unit type category		
			$("#edit-roles-tenders-creator, #edit-roles-tender-admin, #edit-roles-tenders-publisher").click(function () {
				if ($(this).is(":checked")) {
					$("#edit-field-tender-category-wrapper").show();
				} else {
					$("#edit-field-tender-category-wrapper").hide();
				}
				
			});
			if($('form#user-form, form#user-register-form').length){
				$("#edit-field-tender-category-wrapper").hide();
				$(".form-checkbox").each(function(){
					var getFieldID = $(this).attr('id');
					if(getFieldID == 'edit-roles-tenders-creator'){
						if($("#"+getFieldID).is(":checked")) {
							$("#edit-field-tender-category-wrapper").show();
						}				
					} else if(getFieldID == 'edit-roles-tender-admin'){
						if($("#"+getFieldID).is(":checked")) {
							$("#edit-field-tender-category-wrapper").show();
						}
					} else if(getFieldID == 'edit-roles-tenders-publisher'){
						if($("#"+getFieldID).is(":checked")) {
							$("#edit-field-tender-category-wrapper").show();
						} 
					} 
				});
			} else {
				//console.log('out');
			}
			//show hide user tender/unit type category

		});

})(jQuery);
