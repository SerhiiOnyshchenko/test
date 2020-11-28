"use strict";
//Form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append("image", formImage.files[0]);

    if (error === 0) {
      form.classList.add('_loading')
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok){
        let result = await response.json()
        alert(result.message)
        formPreview.innerHTML = `<img src="img/icons/icons8-upload_to_cloud.png" for="file">`;
        form.reset()
      form.classList.remove("_loading");
      } else {
      alert("Ошибка");
      form.classList.remove("_loading");
      }
    } else {
      alert("Заполните обязательние поля");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let i = 0; i < formReq.length; i++) {
      const element = formReq[i];
      formRemoveError(element);

      if (element.value === "") {
        formAddError(element);
        error++;
      }
    }
    return error;
  }
  function formAddError(element) {
    element.parentElement.classList.add("_error");
    element.classList.add("_error");
  }
  function formRemoveError(element) {
    element.parentElement.classList.remove("_error");
    element.classList.remove("_error");
  }
  const formImage = document.getElementById("formImage");
  const formPreview = document.getElementById("formPreview");

  formImage.addEventListener("change", () => {
    uploadFile(formImage.files[0]);
  });

  function uploadFile(file) {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Разрешены только изображения.");
      formImage.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Файл долщен быть менее 2 МБ.");
      return;
    }
    var reander = new FileReader();
    reander.onload = function (e) {
      formPreview.innerHTML = `<img src="img/icons/clip.png" alt="file">`;
    };
    reander.onerror = function (e) {
      alert("Ошибка");
    };
    reander.readAsDataURL(file);
  }
});
//Slider
var multiItemSlider = (function () {
  return function (selector, config) {
    var _mainElement = document.querySelector(selector), // основный элемент блока
      _sliderWrapper = _mainElement.querySelector(".page2__slider-photos"), // обертка для .slider-item
      _sliderItems = _mainElement.querySelectorAll(".page2__slider-item"), // элементы (.slider-item)
      _sliderControls = _mainElement.querySelectorAll(".page2__slider-btn"), // элементы управления
      _sliderControlLeft = _mainElement.querySelector(".btn-left"), // кнопка "LEFT"
      _sliderControlRight = _mainElement.querySelector(".btn-right"), // кнопка "RIGHT"
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение транфсофрмации .slider_wrapper
      _step = (_itemWidth / _wrapperWidth) * 100, // величина шага (для трансформации)
      _items = []; // массив элементов
    _sliderControlLeft.disabled = true;
    // наполнение массива _items
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getMin: 0,
      getMax: _items.length - 2,
    };

    var _transformItem = function (direction) {
      if (direction === "right") {
        if (
          _positionLeftItem + _wrapperWidth / _itemWidth - 1 >=
          position.getMax
        ) {
          return;
        }
        if (_sliderControlLeft.disabled === true) {
          _sliderControlLeft.disabled = false;
        }
        if (
          _sliderControlRight.disabled === false &&
          _positionLeftItem + _wrapperWidth / _itemWidth >= position.getMax
        ) {
          _sliderControlRight.disabled = true;
        }
        _positionLeftItem++;
        _transform -= _step;
      }
      if (direction === "left") {
        if (_positionLeftItem <= position.getMin) {
          return;
        }
        if (_sliderControlRight.disabled === true) {
          _sliderControlRight.disabled = false;
        }
        if (
          _sliderControlLeft.disabled === false &&
          _positionLeftItem - 1 <= position.getMin
        ) {
          _sliderControlLeft.disabled = true;
        }
        _positionLeftItem--;
        _transform += _step;
      }
      _sliderWrapper.style.transform = "translateX(" + _transform + "%)";
    };

    // обработчик события click для кнопок "назад" и "вперед"
    var _controlClick = function (e) {
      if (e.target.classList.contains("page2__slider-btn")) {
        e.preventDefault();
        var direction = e.target.classList.contains("btn-right")
          ? "right"
          : "left";
        _transformItem(direction);
      }
    };

    var _setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
      _sliderControls.forEach(function (item) {
        item.addEventListener("click", _controlClick);
      });
    };

    // инициализация
    _setUpListeners();

    return {
      right: function () {
        // метод right
        _transformItem("right");
      },
      left: function () {
        // метод left
        _transformItem("left");
      },
    };
  };
})();

var slider = multiItemSlider(".page2__slider");

function show(e) {
  document.getElementById("activImg").innerText = e;
}
