import ProductList from "@/pages/shop/product/ProductList";
import Layout from "@components/Layout";
import Index from "@pages/shop/Index";
import CsIndex from "@pages/shop/cs_index/CsIndex";
import ShoppingHome from "@pages/shop/product/ShoppingHome";
import SearchProductList from "@pages/shop/search_product/SearchProductList";
import SpecialProductList from "@pages/shop/special/SpecialProductList";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CommunityInquiry from "@pages/shop/community/Inquiry";
import CommunitySponsorship from "@pages/shop/community/SponsorshipList";
import CommunitySponsorshipView from "@pages/shop/community/SponsorshipView";
import BenefitView from "./pages/shop/community/benefit";

import Company from "@pages/shop/company/Company";
import ServiceGuide from "@pages/shop/cs/ServiceGuide";
import LawCon from "@pages/shop/join/LawCon";
import PrivacyCon from "@pages/shop/join/PrivacyCon";
import Login from "@pages/shop/login/Login";
import Join from "@pages/shop/member/Join";
import PetProductList from "@pages/shop/pet/PetProductList";
import ProductView from "@pages/shop/product/ProductView";
import SaleProductLists from "@pages/shop/sale/SaleProductLists";

import HousewarmingList from "@pages/shop/housewarming/HousewarmingList";
import HousewarmingView from "@pages/shop/housewarming/HousewarmingView";
import ReviewList from "@pages/shop/review/ReviewList";

import CartList from "@pages/shop/cart/CartList";
import ConceptRoomList from "@pages/shop/concept_room/ConceptRoomList/ConceptRoomList";
import ConceptRoomView from "@pages/shop/concept_room/ConceptRoomView/ConceptRoomView";
import FaqList from "@pages/shop/cs/FaqList";
import OrderWrite from "@pages/shop/order/OrderWrite";
import PromotionView from "@pages/shop/promotion/PromotionDetail";
import PromotionList from "@pages/shop/promotion/PromotionList";
import TipList from "@pages/shop/tip/TipList";
import TipView from "@pages/shop/tip/TipView";

import ScrollTop from "@components/ScrollTop";
import { CdnProvider } from "@contexts/cdnContext";
import UserData from "@utils/userData";

import ConceptRoomManagerList from "@pages/manager/ConceptRoomList";
import ManagerLogin from "@pages/manager/Login";

import Cdn from "@pages/manager/Cdn";
import StyleList from "@pages/manager/StyleList";

import ProductListManager from "@pages/manager/ProductList";
import ProductViewManager from "@pages/manager/ProductView";

import ConceptRoomEdit from "@pages/manager/ConceptRoomEdit";
import ConceptRoomWrite from "@pages/manager/ConceptRoomWrite";
import RoomLookUp from "@pages/manager/RoomLookUp";

import { ManagerProvider } from "@contexts/ManagerContext";
import RoomRestore from "@pages/manager/RoomRestore";
import NewHome from "./pages/shop/newHome/NewHome";
import MyPage from "./pages/shop/myPage/MyPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollTop />
    <UserData />
    <CdnProvider>
      <ManagerProvider>
        <Layout>
          <Routes>
            <Route path="/shop/main" element={<Index />} />
            <Route path="/shop/cs_index/cs_index" element={<CsIndex />} />
            <Route
              path="/shop/product/product_lists"
              element={<ProductList />}
            />
            <Route
              path="/shop/search_product/search_product_lists"
              element={<SearchProductList />}
            />
            <Route
              path="/shop/product/shopping_home"
              element={<ShoppingHome />}
            />
            <Route
              path="/shop/special/special_product_lists"
              element={<SpecialProductList />}
            />
            <Route
              path="/shop/product/product_view"
              element={<ProductView />}
            />
            <Route path="/shop/company/company" element={<Company />} />
            <Route path="/shop/cs/service_guide" element={<ServiceGuide />} />
            <Route path="/shop/join/law_con" element={<LawCon />} />
            <Route path="/shop/join/privacy_con" element={<PrivacyCon />} />
            <Route
              path="/shop/sale/sale_product_lists"
              element={<SaleProductLists />}
            />
            <Route
              path="/shop/pet/pet_product_lists"
              element={<PetProductList />}
            />
            <Route path="/shop/join/join" element={<Join />} />
            <Route path="/shop/login/login" element={<Login />} />
            <Route path="/shop/mypage" element={<MyPage />} />
            <Route
              path="/shop/community/inquiry/inquiry"
              element={<CommunityInquiry />}
            />
            <Route
              path="/shop/community/sponsorship_list"
              element={<CommunitySponsorship />}
            />
            <Route
              path="/shop/community/sponsorship_view"
              element={<CommunitySponsorshipView />}
            />
            <Route path="/shop/review/review_lists" element={<ReviewList />} />
            <Route
              path="/shop/housewarming/housewarming_lists"
              element={<HousewarmingList />}
            />
            <Route
              path="/shop/housewarming/housewarming_view"
              element={<HousewarmingView />}
            />
            <Route path="/shop/community/benefit" element={<BenefitView />} />
            <Route path="/shop/tip/tip_lists" element={<TipList />} />
            <Route path="/shop/tip/tip_view" element={<TipView />} />
            <Route
              path="/shop/event/promotion_lists"
              element={<PromotionList />}
            />
            <Route
              path="/shop/event/promotion_view"
              element={<PromotionView />}
            />
            <Route path="/shop/faq/faq_lists" element={<FaqList />} />
            <Route path="/shop/cart/cart_lists" element={<CartList />} />
            <Route
              path="/shop/concept_room/concept_room_lists"
              element={<ConceptRoomList />}
            />
            <Route
              path="/shop/concept_room/concept_room_view"
              element={<ConceptRoomView />}
            />
            <Route path="/shop/order/order_write" element={<OrderWrite />} />
            <Route path="/shop/new_home" element={<NewHome />} />
            <Route
              path="/manager"
              element={<Navigate to="/manager/login" replace={true} />}
            />
            <Route path="/manager/login" element={<ManagerLogin />} />
            <Route
              path="/manager/concept-room/list"
              element={<ConceptRoomManagerList />}
            />
            <Route path="/manager/styles/list" element={<StyleList />} />
            <Route path="/manager/cdn-config" element={<Cdn />}></Route>
            <Route
              path="/manager/product-view"
              element={<ProductViewManager />}
            />
            <Route
              path="/manager/product-reg/list"
              element={<ProductListManager />}
            />
            <Route path="/manager/room-lookup/list" element={<RoomLookUp />} />
            <Route
              path="/manager/concept-room/write"
              element={<ConceptRoomWrite />}
            />
            <Route
              path="/manager/concept-room/edit/:seq"
              element={<ConceptRoomEdit />}
            />
            <Route
              path="/manager/concept-room/restore"
              element={<RoomRestore />}
            />
            <Route path="*" element={<Navigate to="/shop/main" />} />
          </Routes>
        </Layout>
      </ManagerProvider>
    </CdnProvider>
  </BrowserRouter>
);
