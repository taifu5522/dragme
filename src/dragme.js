const React = require('react');


/**
 * [speed] {Number} Drag acceleration
 * [width] {Number} Content width
 * top   {Number} Initial top
 * left  {Number} Initial left
 * onStart {Function} start hook function @params event 
 * onEnd   {Function} end hook function @params event 
 */

class Drag extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      canMove:false,
      x:0,
      y:0,
      top:this.props.top || 0,
      left:this.props.left || 0,
      cursor:'default'
    }
  }

  mouseDownHandle(e){
    e.preventDefault();
    this.setState({
      canMove:true,
      x:e.clientX,
      y:e.clientY,
      cursor:'hand'
    });
    try{
      this.props.onStart && this.props.onStart(e);
    }catch(e){
      if(e instanceof TypeError){
        throw new Error('Your onStart method may be not an function. Pless check your onStart function.')
      }else{
        throw new Error(e)
      }
    }
  }

  mouseUpHandle(e){
    e.preventDefault();
    this.setState({
      canMove:false,
      x:0,
      y:0,
      cursor:'default'
    });
    try{
      this.props.onEnd && this.props.onEnd(e);
    }catch(e){
      if(e instanceof TypeError){
        throw new Error('Your onEnd method may be not an function. Pless check your onEnd function.')
      }else{
        throw new Error(e)
      }
    }
  }

  mouseMoveHandle(e){
    if(!this.state.canMove){
      return false;
    }
    let _left = e.clientX - this.state.x;
    let _top = e.clientY - this.state.y;

    _left = this.calculationLeft(_left);
    _top = this.calculationTop(_top);

    this.setState({left:_left,top:_top,x:e.clientX,y:e.clientY});
    if(this.props.onMove){
      this.props.onMove(_left,_top,e)
    }
  }

  calculationLeft(left){
    let speed = this.props.speed || 0;
    if(left < 0){
      speed = -speed;
    }else if(left === 0){
      speed = 0
    }
    if(this.refs.content_box.clientWidth < window.document.documentElement.clientWidth){
      return 0;
    }
    if(this.state.left + left > 0){
      return 0;
    }
    if(this.state.left + left < -this.refs.content_box.clientWidth + window.document.documentElement.clientWidth){
      return -this.refs.content_box.clientWidth + window.document.documentElement.clientWidth;
    }
    return left + this.state.left + speed;
  }
  calculationTop(top){
    let speed = this.props.speed || 0;
    if(top < 0){
      speed = -speed;
    }else if(top === 0){
      speed = 0
    }
    if(this.refs.content_box.clientHeight < window.document.documentElement.clientHeight){
      return 0;
    }
    if(this.state.top + top > 0){
      return 0;
    }
    if(this.state.top + top < -this.refs.content_box.clientHeight + window.document.documentElement.clientHeight){
      return -this.refs.content_box.clientHeight + window.document.documentElement.clientHeight;
    }
    return top + this.state.top + speed;
  }

  render(){
    const width = this.props.width || 'auto';
    return (
      <div 
        style={{
          position:'relative',
          cursor:this.state.cursor
        }}
        onMouseDown={(e)=>{this.mouseDownHandle(e)}}
        onMouseMove={(e)=>{this.mouseMoveHandle(e)}}
        onMouseUp={(e)=>{this.mouseUpHandle(e)}}
      >
        <div 
          style={{
            width:width,
            position:'absolute',
            top:this.state.top,
            left:this.state.left,
          }}
          ref="content_box"
        >
          {this.props.content || this.props.children}
        </div>
      </div>
    )
  }
}

module.exports = Drag;