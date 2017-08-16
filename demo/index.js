import React from 'react';
import { render } from 'react-dom'
import Drag from '../src/dragme';

render(
  <Drag>
    <div>
      <img src="http://overwatch.nos.netease.com/1/assets/images/media/screenshot/dva-screenshot-001.jpg" />
    </div>
  </Drag>,
  document.getElementById('app')
)
