-- GET CONCEPT ROOM INFO
SELECT
	A.concept_room_seq,
	A.concept_room_nm,
	B.code_nm2 AS brand,
	CASE
		WHEN A.state = 'I' THEN
		'진행' 
		WHEN A.state = 'W' THEN
		'대기' ELSE '마감' 
	END AS state,
	A.thumbnail_img,
	A.bg_url,
	A.vw_cnt,
	A.dl_cnt,
	A.upload_method,
	C.admin_nm AS user_nm 
FROM
	vn_concept_room A
	JOIN wt_code2 B ON A.brand = B.code_cd2
	JOIN wt_admin C ON A.admin_id = C.admin_id 
WHERE
	A.use_yn = 'Y' 
	AND A.del_yn = 'N' 
	AND A.concept_room_seq = '35';
	
-- GET CONCEPT ROOM STYLES
SELECT
	D.h_code,
	D.h_name,
	GROUP_CONCAT( C.d_name SEPARATOR ',' ) AS style,
	D.file_nm 
FROM
	vn_concept_room A
	JOIN vn_room_content_div B ON A.concept_room_seq = B.room_seq
	JOIN vn_room_div_d C ON C.d_code = B.d_code 
	AND C.h_code = B.h_code
	JOIN vn_room_div_h D ON D.h_code = B.h_code 
	AND D.h_code = C.h_code 
WHERE
	A.use_yn = 'Y' 
	AND A.del_yn = 'N' 
	AND C.use_yn = 'Y' 
	AND C.del_yn = 'N' 
	AND D.use_yn = 'Y' 
	AND D.del_yn = 'N' 
	AND A.concept_room_seq = '35' 
GROUP BY
	D.h_name 
ORDER BY
	B.h_code ASC;
	

-- GET CONCEPT ROOM VIEWS
SELECT
	A.* 
FROM
	vn_concept_room_view A
	JOIN vn_concept_room B ON A.concept_room_seq = B.concept_room_seq 
WHERE
	A.concept_room_seq = '35' 
	AND A.method = B.upload_method
	AND B.del_yn = 'N' 
	AND B.use_yn = 'Y';
	
-- GET CONCEPT ROOM OBJECTS
SELECT
	A.* 
FROM
	vn_concept_room_object A
	JOIN vn_concept_room B ON A.concept_room_seq = B.concept_room_seq 
WHERE
	B.concept_room_seq = '35' 
	AND B.upload_method = A.method
	AND B.del_yn = 'N' 
	AND B.use_yn = 'Y';
	
-- GET CONCEPT ROOM OPTIONS
SELECT
	A.option_seq,
	A.object_seq,
	A.id,
	A.product_cd,
	A.option_nm,
	A.thumbnail_img,
	A.option_file_nm 
FROM
	vn_concept_room_opt A
	LEFT JOIN vn_concept_room_object B ON A.object_seq = B.object_seq
	LEFT JOIN vn_concept_room C ON C.concept_room_seq = B.concept_room_seq 
WHERE
	C.concept_room_seq = '35' 
	AND C.use_yn = 'Y' 
	AND C.del_yn = 'N' 
	AND C.upload_method = B.method 
GROUP BY
	A.option_seq;
	
	
-- GET RELATED ROOM	
SELECT
	A.concept_room_seq,
	A.concept_room_nm,
	A.like_cnt,
	A.dl_cnt,
	A.vw_cnt,
	A.thumbnail_img,
	CONCAT(
		'#',
	GROUP_CONCAT( C.d_name SEPARATOR '#' )) AS style 
FROM
	vn_concept_room A
	JOIN vn_room_content_div B ON A.concept_room_seq = B.room_seq
	JOIN vn_room_div_d C ON C.d_code = B.d_code 
	AND C.h_code = B.h_code
	JOIN vn_room_div_h D ON D.h_code = B.h_code 
	AND D.h_code = C.h_code 
WHERE
	1 = 1
	AND A.use_yn = 'Y' 
	AND A.del_yn = 'N' 
	AND C.d_code IN ( SELECT d_code FROM vn_room_content_div WHERE room_seq = '35' ) 
	AND D.h_code IN ( SELECT h_code FROM vn_room_content_div WHERE room_seq = '35' ) 
	AND A.concept_room_seq <> '35' 
GROUP BY
	A.concept_room_nm
ORDER BY 
	A.like_cnt DESC, 
    A.dl_cnt DESC, 
    A.vw_cnt DESC, 
    A.reg_date DESC
LIMIT 0, 5;
	
	
-- GET RELATED PRODUCT	
SELECT DISTINCT
	A.product_cd,
	A.product_nm,
	A.supply_price,
	A.sale_price,
	A.discount_gb,
	A.icon,
	A.product_type,
	A.product_state,
	B.file_nm,
	ifnull( ( SELECT 'on' FROM wt_wishlist WHERE product_cd = A.product_cd AND cust_seq = '' LIMIT 1 ), '' ) AS wish_click_on,
	( SELECT COUNT(*) FROM wt_use_review WHERE use_yn = 'Y' AND product_cd = A.product_cd ) AS review_cnt,
	ifnull( ( SELECT round( avg( POINT ), 1 ) FROM wt_use_review_point WHERE product_cd = A.product_cd ), 0 ) AS review_avg_point,
	A.fee_rate,
	A.keywd 
FROM
	wt_product A
	LEFT JOIN wt_product_file B ON A.product_cd = B.product_cd 
WHERE
	FIND_IN_SET(
		A.product_cd,
		(
		SELECT
			GROUP_CONCAT( A.product_cd SEPARATOR ',' ) AS product_cd 
		FROM
			vn_concept_room_opt A
			JOIN vn_concept_room_object B ON A.object_seq = B.object_seq
			JOIN vn_concept_room C ON C.concept_room_seq = B.concept_room_seq 
			AND C.upload_method = B.method 
		WHERE
			C.concept_room_seq = '35' 
		) 
	) 
	AND del_yn = 'N' 
GROUP BY
	A.product_cd