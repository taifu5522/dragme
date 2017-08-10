const React = require('react');

class Dragme extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      canMove:false,
      x:0,
      y:0,
      top:0,
      left:0
    }
    this.timer = null;
  }

  mouseDownHandle(e){
    e.preventDefault();
    this.setState({
      canMove:true,
      x:e.clientX,
      y:e.clientY
    });
  }

  mouseUpHandle(e){
    e.preventDefault();
    this.setState({
      canMove:false,
      x:0,
      y:0,
    });
  }

  mouseMoveHandle(e){
    if(!this.state.canMove){
      return false;
    }
    if(this.timer){
      return false;
    }
    let _left = e.clientX - this.state.x;
    let _top = e.clientY - this.state.y;

    _left = this.calculationLeft(_left);
    _top = this.calculationTop(_top);

    this.setState({left:_left,top:_top,x:e.clientX,y:e.clientY});
    this.timer = null;
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

modules.exports = Dragme;