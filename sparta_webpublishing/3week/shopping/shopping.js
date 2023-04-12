// 변수 설정
const $contents = $("#contents");
// 상품, 쇼핑물, MEN 각각의 컨텐츠
const $content = $contents.children(".shop_content");
// 상품, 쇼핑몰, MEN 탭 구현
const $tabs = $("#tab_title li");
// tab_title 밑에 a 버튼들 (상품, 쇼핑몰, MEN 탭)
const $tabsAtags = $tabs.find("a");
// 내가 사용할 swiper 객체
let shoppingSwiper = null;

// swiper 객체 사용
const createSwiper = () => {
  shoppingSwiper = new Swiper(".mySwiper", {
    observer: true,  // display:none 에러 막기위해 사용 
    observeParents: true,  // display:none 에러 막기위해 사용 
    loop: true,
    spaceBetween: 15,
    navigation: {
      nextEl: "#contents_productAd .btn_next",
      prevEl: "#contents_productAd .btn_prev",
    },
    // 참고
    // https://stackoverflow.com/questions/32196177/showing-number-of-slides-on-the-web-page
    pagination: {
      el: ".swiper-pagination",
      renderFraction: function (currentClass, totalClass) {
        return `
        <em class="current">
          <span class="blind">현재</span><span class="${currentClass}"></span>
        </em>
        <span class="blind">전체</span>/ <span class="${totalClass}"></span>
      `;
      },
      type: "fraction",
    },
  });
};

// swiper 생성
createSwiper();

// content 불러 오는 함수
const callContent = (type) => {
  switch (type) {
    case "tab_product":
      $content.hide();
      $content.eq(0).show();
      break;
    case "tab_mall":
      $content.hide();
      $content.eq(1).show();
      break;
    case "tab_men":
      $content.hide();
      $content.eq(2).show();
      break;
  }
};

// changeTabs
// 상품, 쇼핑몰, MEN 색상을 바꿔주는 함수
const changeTabColor = (flag) => {
  // $tabsAtags (상품, 쇼핑몰, MEN a 태그들 3개)
  // aria-selected 속성을 모두 false 로 바꿈
  $tabsAtags.attr("aria-selected", false);

  // tabID 이용시 (방식1)
  // 현재 선택된 a 태그에만 aria-selected 속성을 ture 로 전환
  // switch (flag) {
  //   case "tab_product":
  //     $tabsAtags.eq(0).attr('aria-selected', true);
  //     break;
  //   case "tab_mall":
  //     $tabsAtags.eq(1).attr('aria-selected', true);
  //     break;
  //   case "tab_men":
  //     $tabsAtags.eq(2).attr('aria-selected', true);
  //     break;
  // }

  // index 이용시 (방식2)
  $tabsAtags.eq(flag).attr("aria-selected", true);
};

// 상품, 쇼핑몰, MEN 탭 클릭시
$tabs.on("click", function () {
  const tabID = $(this).attr("id");
  const index = $tabs.index($(this));
  callContent(tabID);
  // tabID 이용시 (방식1)
  // changeTabColor(tabID);
  // index 이용시 (방식2)
  changeTabColor(index);
});

// load 되자마자
// tab_product 보여줌
callContent("tab_product");

// shoppingSwiper 객체를 이용한 예제들
// 브라우져 콘솔에서 실행!
// 참고 https://swiperjs.com/swiper-api
// shoppingSwiper.slideNext(1000);
// shoppingSwiper.slideTo(4, 100, false);
