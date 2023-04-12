// button use-javascript
// mouseover, mouseout 시
// css 함수 사용
$(".button.use-javascript")
  .mouseover(function () {
    $(this).css({
      backgroundColor: "#e8344e",
      color: "white",
    });
  })
  .mouseout(function () {
    $(this).css({
      backgroundColor: "white",
      color: "#e8344e",
    });
  });

// button use-class
// mouseenter, mouseleave 시
// addClass, removeClass 함수 사용 css로 컨트롤
$(".button.use-class")
  .mouseenter(function () {
    $(this).addClass("on");
  })
  .mouseleave(function () {
    $(this).removeClass("on");
  });
