/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

    /* 언어 */
    config.language = 'ko';

    /* 에디터 사이즈 */
    config.width = '100%';
    config.height = '500';

    /* UI 색상 */
    config.uiColor = '#fafafa';

    /* 기본 폰트 설정 */
    config.font_defaultLabel = '나눔고딕';
    config.fontSize_defaultLabel = '12px';

    /* 폰트 */
    config.font_names =
        'OpenSans/Open Sans;나눔고딕/Nanum Gothic;굴림/Gulim;돋움/Dotum;바탕/Batang;궁서/Gungsuh;맑은고딕/Malgun Gothic;Arial/Arial;Comic Sans MS/Comic Sans MS;Courier New/Courier New;Georgia/Georgia;Lucida Sans Unicode/Lucida Sans Unicode;Tahoma/Tahoma;Times New Roman/Times New Roman;Trebuchet MS/Trebuchet MS;Verdana/Verdana;'
    config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;';

    config.toolbar = [
        { name: 'styles', items: [ 'Font', 'FontSize' ] },
        { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike' ] },
        { name: 'paragraph', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] }, '/',
        { name: 'insert', items: [ 'Link', 'Unlink', 'Image', 'Table', 'Smiley', 'SpecialChar', 'Iframe' ] },
        { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', 'Undo', 'Redo' ] },
        { name: 'document', items: [ 'Source', 'Preview', 'Print', 'Templates' ] },
        { name: 'tools', items: [ 'Maximize' ] }
    ];

    /*
        엔터모드
        1 = <p></p>, CKEDITOR.ENTER_P
        2 = <br />, CKEDITOR.ENTER_BR
        3 = <div></div>, CKEDITOR.ENTER_DIV
    */
    config.enterMode = CKEDITOR.ENTER_BR;

    /* 메뉴 클릭 딜레이 */
    config.menu_subMenuDelay = 0;

    /* 파일 업로드 경로 */
    config.filebrowserUploadUrl = '/manager/common/files/editor_upload';
    config.removeDialogTabs = 'image:advanced;image:Link;';

    /* html 필터링 여부 */
    config.allowedContent = true;
};
