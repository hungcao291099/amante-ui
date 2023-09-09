const TabGuideSection = ({ productView, parse }) => {
  return (
    <div className="tab_con" id="tab_guide">
      <div className="tab_title">
        <h3>구매가이드</h3>
      </div>

      {Object.keys(productView).length > 0 &&
        (productView.productDetail !== null && productView?.productDetail?.product_component_editor !== '<p> </p>' &&
        productView?.productDetail?.product_component_editor?.trim() !== '' &&
        productView?.productDetail?.product_component_editor !== '<p>&nbsp;</p>' &&
        productView?.productDetail?.product_component_editor !== null
          ? parse(productView?.productDetail?.product_component_editor)
          : productView.buy_guide_con?.content && parse(productView.buy_guide_con?.content))}
    </div>
  );
};

export default TabGuideSection;
