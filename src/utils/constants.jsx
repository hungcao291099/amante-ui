export const baseURL = "https://shopping.amante.co.kr:3010/api/shop";

export const conceptRoomImageURL =
  "https://shopping.amante.co.kr:3010/uploads/concept_room";

export const mainWebURL = "https://amante.co.kr/shop";

export const baseImageUrl = "https://shopping.amante.co.kr:3010/uploads";

export const mainWebImageURL = "https://amante.co.kr/uploads";

export const noLayoutPath = [
  "/shop/join/join",
  "/shop/login/login",
  "/shop/new_home",
  "/shop/newConceptRoom",
  "/manager/login",
  "/manager/concept-room/list",
  "/manager/styles/list",
  "/manager/cdn-config",
  "/manager/product-view",
  "/manager/product-reg/list",
  "/manager/room-lookup/list",
  "/manager/concept-room/write",
  "/manager/concept-room/edit",
  "/manager/concept-room/restore",
];

export const noManagerLayout = ["/manager/login"];

export const koApiURL = "http://localhost:3010/v1.0";
// export const koApiURL = "http://192.168.80.6:3010/v1.0";
// export const koApiURL = "https://shopping.amante.co.kr:3010/v1.0";

export const importPath = [
  "/shop/main",
  "/shop/product/shopping_home",
  "/shop/special/special_product_lists",
  "/shop/sale/sale_product_lists",
  "/shop/pet/pet_product_lists",
  "/shop/join/join",
  "/shop/login/login",
];

export const tagPath = [
  {
    path: "/asset/css_v2.0/shop/layout.css",
    media: "",
    type: "text/css",
    tag: "link",
    rel: "stylesheet",
  },
  {
    path: "/asset/css_v2.0/shop/layout_pc.css",
    media: "screen and (min-width:768px)",
    type: "text/css",
    tag: "link",
    rel: "stylesheet",
  },
  {
    path: "/asset/css_v2.0/shop/main.css",
    media: "",
    type: "text/css",
    tag: "link",
    rel: "stylesheet",
  },
  {
    path: "/asset/css_v2.0/shop/main_pc.css",
    media: "screen and (min-width:768px)",
    type: "text/css",
    tag: "link",
    rel: "stylesheet",
  },
];

export const noHeaderPath = ["/shop/concept_room/concept_room_view"];
