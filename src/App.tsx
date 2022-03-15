import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button btnType={ButtonType.Link} href="www.baidu.com" disabled={true}>baidu</Button>
      <Button btnType={ButtonType.Primary} >hello</Button>
      <Button btnType={ButtonType.Default} >hello</Button>
      <Button btnType={ButtonType.Danger} onClick={() => { alert('danger') }} >hello</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Large} >hello</Button>
      <Button btnType={ButtonType.Default} size={ButtonSize.Small}>hello</Button>
    </div>
  );
}

export default App;
