<?php
    /**
     * @desc ʹ��hota�༭ҳ��
     * @author laserji
     * @mail jiguang1984@gmail.com
     * @date 2013-11-06
     */

	$include_path="../include/";
	$loadPage="page_edit_hota.html";
	$isLoadData=true;
	require($include_path."config.inc.php");	
	/*��ʽ���뿪ʼ*/
	
	if($pageId){
		$query="select * from tbl_page where page_id=$pageId";
		$row=show_row($query);
		if($row["page_edit_user"]!= ""){
	 		//ȡsession���û������ж��Ƿ���ͬһ���û�
	 		//ͬһ���û������޸ģ����������޸�
	 		if ( $row["page_edit_user"]!= $_SESSION['userName']){
				showMsg("��ҳ�����ڱ���".$row["page_edit_user"]."���༭");
				die();
	 		}
	 	}else{
			$query="update tbl_page set page_edit_user	= '".$_SESSION['userName']."' where page_id='$pageId'";
			
			if(!update_row($query)){
				showMsg("����ʧ��");
				exit();
			}
		}
		$parm["action_mode"] = "�༭";
	}
	else
	{
		$parm["action_mode"] = "����";
	}
	$parm["pageId"] = $pageId;

	//���select
 	$query="select id,name from tbl_page_sort order by id";
 	show_row($query,"","sortList","sL",0,"",0);	
	
	/*��ʽ�������*/
	require($include_path."foot.inc.php");	
?>