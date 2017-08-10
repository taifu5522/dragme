'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var Dragme = function (_React$Component) {
  _inherits(Dragme, _React$Component);

  function Dragme(props) {
    _classCallCheck(this, Dragme);

    var _this = _possibleConstructorReturn(this, (Dragme.__proto__ || Object.getPrototypeOf(Dragme)).call(this, props));

    _this.state = {
      canMove: false,
      x: 0,
      y: 0,
      top: 0,
      left: 0
    };
    _this.timer = null;
    return _this;
  }

  _createClass(Dragme, [{
    key: 'mouseDownHandle',
    value: function mouseDownHandle(e) {
      e.preventDefault();
      this.setState({
        canMove: true,
        x: e.clientX,
        y: e.clientY
      });
    }
  }, {
    key: 'mouseUpHandle',
    value: function mouseUpHandle(e) {
      e.preventDefault();
      this.setState({
        canMove: false,
        x: 0,
        y: 0
      });
    }
  }, {
    key: 'mouseMoveHandle',
    value: function mouseMoveHandle(e) {
      if (!this.state.canMove) {
        return false;
      }
      if (this.timer) {
        return false;
      }
      var _left = e.clientX - this.state.x;
      var _top = e.clientY - this.state.y;

      _left = this.calculationLeft(_left);
      _top = this.calculationTop(_top);

      this.setState({ left: _left, top: _top, x: e.clientX, y: e.clientY });
      this.timer = null;
    }
  }, {
    key: 'calculationLeft',
    value: function calculationLeft(left) {
      var speed = this.props.speed || 0;
      if (left < 0) {
        speed = -speed;
      } else if (left === 0) {
        speed = 0;
      }
      if (this.refs.content_box.clientWidth < window.document.documentElement.clientWidth) {
        return 0;
      }
      if (this.state.left + left > 0) {
        return 0;
      }
      if (this.state.left + left < -this.refs.content_box.clientWidth + window.document.documentElement.clientWidth) {
        return -this.refs.content_box.clientWidth + window.document.documentElement.clientWidth;
      }
      return left + this.state.left + speed;
    }
  }, {
    key: 'calculationTop',
    value: function calculationTop(top) {
      var speed = this.props.speed || 0;
      if (top < 0) {
        speed = -speed;
      } else if (top === 0) {
        speed = 0;
      }
      if (this.refs.content_box.clientHeight < window.document.documentElement.clientHeight) {
        return 0;
      }
      if (this.state.top + top > 0) {
        return 0;
      }
      if (this.state.top + top < -this.refs.content_box.clientHeight + window.document.documentElement.clientHeight) {
        return -this.refs.content_box.clientHeight + window.document.documentElement.clientHeight;
      }
      return top + this.state.top + speed;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var width = this.props.width || 'auto';
      return React.createElement(
        'div',
        {
          style: {
            position: 'relative'
          },
          onMouseDown: function onMouseDown(e) {
            _this2.mouseDownHandle(e);
          },
          onMouseMove: function onMouseMove(e) {
            _this2.mouseMoveHandle(e);
          },
          onMouseUp: function onMouseUp(e) {
            _this2.mouseUpHandle(e);
          }
        },
        React.createElement(
          'div',
          {
            style: {
              width: width,
              position: 'absolute',
              top: this.state.top,
              left: this.state.left
            },
            ref: 'content_box'
          },
          this.props.content || this.props.children
        )
      );
    }
  }]);

  return Dragme;
}(React.Component);

modules.exports = Dragme;