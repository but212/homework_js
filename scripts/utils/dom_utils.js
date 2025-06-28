/**
 * 주어진 CSS 선택자에 해당하는 첫 번째 요소를 반환합니다.
 * @param {String} selector CSS 선택자
 * @returns {Element|null} 선택된 요소 또는 해당하는 요소가 없는 경우 null
 */
function $(selector) {
  return document.querySelector(selector);
}

/**
 * 주어진 CSS 선택자에 해당하는 모든 요소를 NodeList로 반환합니다.
 * @param {String} selector CSS 선택자
 * @returns {NodeList} 선택된 요소들의 NodeList 또는 빈 NodeList
 */
function $$(selector) {
  return document.querySelectorAll(selector);
}

/**
 * 요소의 클래스를 토글합니다.
 * @param {Element} element 클래스를 토글할 DOM 요소
 * @param {String} className 토글할 클래스 이름
 * @returns {Boolean} 클래스가 추가되었으면 true, 제거되었으면 false
 */
function toggleClass(element, className) {
  return element.classList.toggle(className);
}

/**
 * 요소에 이벤트 리스너를 추가합니다.
 * @param {Element} element 이벤트를 추가할 DOM 요소
 * @param {String} event 추가할 이벤트 타입 (예: 'click', 'keydown')
 * @param {Function} handler 이벤트 발생 시 실행될 콜백 함수
 */
function on(element, event, handler) {
  element.addEventListener(event, handler);
}

export { $, $$, toggleClass, on };
