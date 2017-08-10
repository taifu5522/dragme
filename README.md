# Dragme

### Dragme is an drag component with react.js

Use this component to wrap the components you want to drag
Or assign the component that you want to drag to the content props

### install:
    npm install drag-compoment --save

### How to using:
    import Dragme from 'drag-compoment'

    <Dragme><YouCompoment /></Dragme>

or

    <Dragme
      content={<YouComponent />}
    />

### APIS
1. onStart:
* Call when move start\
@params {Object} e Event Object

2. onEnd:
* Call when move end\
@params {Object} e Event Object

3. onMove:
* Call when moving\
@params {Number} left content left value\
@params {Number} top content top value\
@params {Object} e Event Object

### props
1. top 
* Initial top value

2. left
* Initial left value

3. [width]
* Content width

4. [speed]
* Drag acceleration default 0

### github:

* https://github.com/taifu5522/dragme

