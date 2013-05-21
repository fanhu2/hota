/**
 * @desc ����ͼҳ��Ƭ���ߣ����ڱ༭����������ҳ��Ƭ
 * @author laserji
 * @mail jiguang1984#gmail.com
 * @date 2013-04-27
 */

$(function(){
    "use strict";

    var config = {
        canvas: '#hota_canvas',
        hot_area: 'a',
        init_width: 100,
        init_height: 100,
        area_info: '#area_info',
        v_line: '#v_line',
        h_line: '#h_line',
        tolerance: 5
    };
    var $cur = null;

    // ��ʼ��
    function init(){

        var $hot_list = $(config.canvas).find(config.hot_area);

        $hot_list.each(function(){
            $(this)
                .css({
                    'position': 'absolute',
                    'background-image': 'url(about:blank)',
                    'width': $(this).width(),
                    'height': $(this).height()
                }).resizable({
                    containment: "parent",

                    start: function(event, ui){
                        $cur = ui.helper;
                        $cur.addClass('cur').siblings().removeClass('cur');
                        $(config.area_info).show();
                    },
                    resize: function(event, ui){
                        $(config.area_info)
                            .css({
                                'left': ui.originalPosition.left,
                                'top': ui.originalPosition.top
                            }).html(ui.size.width + 'x' + ui.size.height);

                        $(ui.handler)
                            .css({
                                'width': ui.size.width,
                                'height': ui.size.height
                            });
                    },
                    stop: function(event, ui){
                        $(config.area_info).hide();
                    }
                })
                .draggable({

                    containment: "parent",

                    start: function(event, ui){
                        $cur = ui.helper;
                        $cur.addClass('cur').siblings().removeClass('cur');
                        $(config.area_info).show();
                    },

                    drag: function(event, ui){
                        var $me = $(this);

                        $(config.area_info)
                            .css({
                                'left': ui.position.left,
                                'top': ui.position.top
                            }).html('top:' + ui.position.top + '&nbsp;&nbsp;left:' + ui.position.left);

                        if($me.siblings('a').length > 0){
                            $me.siblings('a').each(function(){

                                /***** S ���Ҷ������ *****/
                                // ������ұ߶���
                                if(Math.abs(($(this).position().left + $(this).width()) - ui.position.left) <= config.tolerance){
                                    $(config.v_line).show().css('left', $(this).position().left + $(this).width());
                                }

                                // �ұ�����߶���
                                if(Math.abs(($(this).position().left) - (ui.position.left + ui.helper.width())) <= config.tolerance){
                                    $(config.v_line).show().css('left', $(this).position().left);
                                }

                                // �ұ����ұ߶���
                                if(Math.abs(($(this).position().left + $(this).width()) - (ui.position.left + ui.helper.width())) <= config.tolerance){
                                    $(config.v_line).show().css('left', $(this).position().left + $(this).width());
                                }

                                // �������߶��� �������ͬʱ��������룩
                                if(Math.abs($(this).position().left - ui.position.left) <= config.tolerance){
                                    $(config.v_line).show().css('left', $(this).position().left);
                                }
                                /***** E ���Ҷ������ *****/

                                /***** S ���¶������ *****/
                                // �ϱ����±߶���
                                if(Math.abs(($(this).position().top + $(this).height()) - ui.position.top) <= config.tolerance){
                                    $(config.h_line).show().css('top', ($(this).position().top + $(this).height()));
                                }

                                // �±����ϱ߶���
                                if(Math.abs($(this).position().top - (ui.position.top + ui.helper.height())) <= config.tolerance){
                                    $(config.h_line).show().css('top', $(this).position().top);
                                }

                                // �±����±߶���
                                if(Math.abs(($(this).position().top + $(this).height()) - (ui.position.top + ui.helper.height())) <= config.tolerance){
                                    $(config.h_line).show().css('top', $(this).position().top + $(this).height());
                                }

                                // �ϱ����ϱ߶��� ���߶���ͬʱ�����϶��룩
                                if(Math.abs($(this).position().top - ui.position.top) <= config.tolerance){
                                    $(config.h_line).show().css('top', $(this).position().top);
                                }
                                /***** E ���¶������ *****/
                            });
                        }
                    },
                    stop: function(event, ui){
                        $([config.area_info, config.v_line, config.h_line].toString()).hide();
                    }

                });
        });

        // ͼƬ��ַ
        if($('#bg').attr('src') != ''){
            $('#img_src').val($('#bg').attr('src'));
        }

        // ������Ϣ
        if(!$(config.canvas).find(config.area_info)[0]){
            $(config.canvas).append('<div id="area_info" class="area_info"></div>\
                <div id="h_line" class="h_line"></div>\
                <div id="v_line" class="v_line"></div>');
        }

        // ��������
        $('#code_wrap').val('');

        // IE��ʾ
        if($.browser.msie){
            $('#browser_tip').fadeIn(500).delay(4000).fadeOut(1000);
        }

        // ���ƴ���
        var clip = new ZeroClipboard( document.getElementById("btn_copy"), {
            moviePath: "./js/ZeroClipboard.swf"
        } );

        clip.on( 'complete', function(){
            alert('���Ƴɹ����뽫����ճ�����½���ҳ��Ƭ�л�ֱ��ʹ��');
        });


    }

    function addZone(position){

        position = position || {
            top: 10,
            left: 10
        };

        var $hot_list = $(config.canvas).find(config.hot_area),
            $hot_area = $('<a class="'+config.hot_area.substr(1)+'" href=""></a>');

        $hot_area.appendTo($(config.canvas))
            .css({
                'position': 'absolute',
                'background-image': 'url(about:blank)',
                'width': config.init_width,
                'height':  config.init_height,
                'top':  position.top,
                'left':  position.left
            });

        // ���³�ʼ��
        init();

        if($hot_list.length > 0 && !position){
            $cur = $hot_area;
            $hot_area
                .css('left', ($hot_list.last().position().left || 0) + 10)
                .css('top', ($hot_list.last().position().top || 0) + 10);
        }
    }

    $('#add').click(function(e){
        e.preventDefault();
        addZone();
    });

    // ����ͼƬ��ַ
    $('#img_src').on('keyup blur', function(){
        if(/http:\/\/.*?(jpg|jpeg|png|bmp|\d)/.test($(this).val())){
            $('#bg').attr('src', $(this).val());
            $('#bg').load(function(){
                $(config.canvas).width($(this).width()).height($(this).height());
            });
        }
    }).focus(function(){
            this.select();
        });

    // ���������
    $(document).keydown(function(e){

        var key = e.keyCode;

        // ɾ��
        if($cur && key == 46){
            $cur.remove();
        }

        if($cur && e.shiftKey){

            // ����
            if(key == 37 && parseInt($cur.css('left'), 10) > 0){
                $cur.css('left', parseInt($cur.css('left'), 10) - 1);
            }

            // ����
            if(key == 39 && parseInt($cur.css('left'), 10) <= $cur.parent().width() - $cur.width()){
                $cur.css('left', parseInt($cur.css('left'), 10) + 1);
            }

            // ����
            if(key == 38 && parseInt($cur.css('top'), 10) > 0){
                $cur.css('top', parseInt($cur.css('top'), 10) - 1);
            }

            // ����
            if(key == 40 && parseInt($cur.css('top'), 10) <= $cur.parent().height() - $cur.height()){
                $cur.css('top', parseInt($cur.css('top'), 10) + 1);
            }

            $(config.area_info).show()
                .css('left', $cur.css('left'))
                .css('top', $cur.css('top'))
                .html('top:' + parseInt($cur.css('top'), 10) + '&nbsp;&nbsp;left:' + parseInt($cur.css('left'), 10)); // ��ʾ��λ̫����
        }

    }).keyup(function(e){
        $(config.area_info).hide();
        e.stopPropagation();
    }).click(function(e){
        // �����Ҽ��˵�
        $('#context_menu').hide();

        if($cur){
            $cur.removeClass('cur');
            $cur = null;
        }
    });

    // �����Ҽ��˵�
    $(config.canvas).on('contextmenu', function(e){
        e.preventDefault();

        if(e.target.tagName.toLocaleLowerCase() === 'a'){
            $('#context_menu').show().css('left', e.pageX).css('top', e.pageY).draggable();
            $cur = $(e.target);
            $cur.addClass('cur').siblings().removeClass('cur');

            $('#link_addr').val($cur.attr('href'));
            $('#link_tit').val($cur.attr('title'));

            if($(e.target).attr('target') != undefined){
                $('#'+$(e.target).attr('target'))[0].checked = true;
            }
        }
        e.stopPropagation();
    }).click(function(e){
            e.preventDefault();

            if(e.target.tagName.toLocaleLowerCase() === 'a'){
                $cur = $(e.target);
                $cur.addClass('cur').siblings().removeClass('cur');
            }else{
                addZone({
                   top: e.pageY - $(e.target).offset().top - 10,
                    left: e.pageX - $(e.target).offset().left - 10
                });
            }



            e.stopPropagation();
        });

    // ���ڲ˵��հ״�������
    $('#context_menu').click(function(e){
        e.stopPropagation();
    });

    $('#confirm').click(function(){
        if($cur){
            if(!/^http:\/\/.*/.test($.trim($('#link_addr').val()))){
                alert('���ӵ�ַ����ȷ������������');
                return;
            }

            $cur.attr('href', $('#link_addr').val())
                .attr('title', $('#link_tit').val())
                .attr('target', $('#open_type input:checked')[0].id);

            $('#context_menu').hide();
        }
    });

    // ȡ������
    $('#cancel').click(function(){
        $('#context_menu').hide();
    });

    // ���沢����
    $('#get_code').click(function(e){
        e.preventDefault();

        // Ϊ�����ۣ����������������ó��뻭����ͬ
        $('#code_wrap').width($(config.canvas).find('img').width() - 20);

        // ���ɴ���
        var code = $('#workshop').clone()
            .find(config.canvas)
            .css({
                'width': $(config.canvas).find('img').width(),
                'height': $(config.canvas).find('img').height(),
                'position': 'relative'
            }).removeAttr('class').end()
            .find('#area_info, #v_line, #h_line').remove().end()
            .find('.ui-resizable-handle').remove().end()
            .find(config.hot_area).removeAttr('class').end()
            .html()
            .replace(/\s{2,}/ig, '');

        $('#code_wrap').show().val(code);
    });

    // ��ʼ��ʼ��һ��
    init();

});
